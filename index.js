let serverFunctions = require("./serverfunctions.js");
const { text } = require('express');
const express = require('express');
const app = express(); //listining right now
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;
const server = app.listen(port);

let path = __dirname + '\\public';
let entrance = '\\pages\\entrance\\index.html';
let lobby = '\\pages\\lobby\\index.html';

app.use(express.static('public'));//client reachs 'public' folder
app.use(express.json({ limit: "1mb" }));//server allows json and taken data size max 1mb, If this row not exist it will be undifined for request parameter

// Start socket.io
let socket = require('socket.io');
// Connect it to the web server
let io = socket(server);

//body parsing
nunjucks.configure('public', {
    autoscape: true,
    express: app
})

let user1 = {
    id: "engin",
    about: "crazi55"
}
let user2 = {
    id: "adad",
    about: "bb1azd15"
}

let lobbies = [
    {
        lobbyId: "qwe",
        users: [user1, user2]
    },
    {
        lobbyId: "asd",
        users: [user1]
    },
    {
        lobbyId: "zxc",
        users: [user1, user1]
    }
];
console.log("node server çalıştı");
console.log(lobbies);

app.get('/', function (req, res) {
    res.render(path + entrance, { bilgi: "selam" });
});

app.get('/lobby', function (req, res) {

    res.render(path + lobby, { lobby });
});

//even if use in socket func. you need to use here 
let containerLobbyId;
let containerLobby;

function createLobby(_lobbyId, _user) {
    containerLobbyId = _lobbyId;
    let funcin_lobby = {
        lobbyId: _lobbyId,
        users: [_user]
    }
    //empty lobby push
    lobbies.push(funcin_lobby);
    containerLobby = funcin_lobby
}

function enterLobby(_lobbyId, _user) {
    //lobbyId determines lobby name to io.to(lobbyId).emit specified lobby(io.connect last row)  
    containerLobbyId = _lobbyId;

    lobbies.forEach((element, i) => {
        console.log("-----------");
        console.log(element.lobbyId);
        console.log("************");
        console.log(_lobbyId);
        if (element.lobbyId === _lobbyId) {
            element.users.push(_user);
        }
    })

    //containerLobby send to lobby data to client  
    let lobby = lobbies.find(x => x.lobbyId == _lobbyId);
    containerLobby = lobby;
}

io.on('connection', socket => {

    socket.on('lobbyStart', () => {

    });

    //*****************Sent response************** */
    //object, Number
    let responseMessage = function (message, code) {
        this.responseMessage = {
            message: message,
            code: code,
        }
        socket.emit('response', this.responseMessage);
    }

    //*****************Room Join*************** */

    socket.on('createLobby', (_user, _lobbyId) => {
        isLobbyExist = lobbies.some(x => x.lobbyId == _lobbyId)
        if (isLobbyExist) {
            responseMessage("Lobby exist. Choose diffrent lobby name", 407)
        }
        else {
            if (serverFunctions.isOnlyAlphabetic(_user.id) && serverFunctions.isSpace(_user.id)) {

                createLobby(_lobbyId, _user)
                // enterLobby(_lobbyId, _user);

                responseMessage("you create a room", 200)
            }
            else
                responseMessage("Username can only contain letters \nUsername can not contain space", 406)
        }
    })

    socket.on("joinLobby", data => {
        let user =
        {
            id: data.id,
            about: "a crazy kid, living on the mars",
            socketId: socket.id.substring(1,7)
        }

        isLobbyExist = lobbies.some(x => x.lobbyId == data.lobbyId)

        if (isLobbyExist) {
            enterLobby(data.lobbyId, user);
            responseMessage("You going to lobby", 200)
        }
        else {
            responseMessage("lobby doesn`t exist. create lobby first", 405)
        }

    })
    console.log("connection sonu");
    console.log(lobbies);


    socket.join(containerLobbyId);

    io.to(containerLobbyId).emit('getUsersInLobby', containerLobby);

    //***************************************** */

})