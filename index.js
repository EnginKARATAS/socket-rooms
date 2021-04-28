const { text } = require('express');
const express = require('express');
const app = express(); //listining right now
const nunjucks = require('nunjucks');
const port = process.env.PORT || 3000;
const server = app.listen(port);

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
let path = __dirname + '\\public';
let entrance = '\\pages\\entrance\\index.html';
let lobby = '\\pages\\lobby\\index.html';

let user1 = {
    id: "elif",
    username: "elif",
}
let user2 = {
    id: "engin",
    username: "engin"
}


let lobbies = [
    {
        lobbyId: "abc123",
        users: []
    },
    {
        lobbyId: "efg456",
        users: []
    }
];
// setInterval(heartbeat, 1000);
// function heartbeat() {

//     io.sockets.emit('heartbeat', lobby);
// }

app.get('/', function (req, res) {
    res.render(path + entrance, { bilgi: "selam" });
});

app.get('/lobby', function (req, res) {

    res.render(path + lobby, { lobby });
});


function isOnlyAlphabetic(text) {
    return /^[A-Z]+$/i.test(text)
}
//test is my duty //true
function isSpace(text) {
    return !(/ /i.test(text))
}
//even if use in socket func. you need to use here 
let lobbyId;
let id;

let containerLobby;

function enterLobby(_lobbyId, _user) {
    //lobbyId determines lobby name to emit specified lobb(io.connect last row)  
    lobbyId = _lobbyId
    
    let lobbyUsers = lobbies.find(x => x.lobbyId = _lobbyId).users
    lobbyUsers.push(_user);

    //containerLobby send to lobby info to client  
    let lobby = lobbies.find(x => x.lobbyId == _lobbyId)
    containerLobby = lobby


}

io.on('connection', socket => {


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



    socket.on('isRoomExist', data => {
        socket.emit('resRoomExist', data);
    })


    socket.on('createLobby', (_user, _lobbyId) => {
        let username = _user.id;
        lobbyId = _lobbyId;
        if (isOnlyAlphabetic(username) && isSpace(username)) {
            enterLobby(_lobbyId, _user);
            responseMessage("you create a room", 200)
        }

        else {
            responseMessage("Username can only contain letters \nUsername can not contain space", 406)
        }

        let user =
        {
            id: _lobbyId,
            about: "a crazy kid, living on the mars"
        }
        let lobby =
        {
            lobbyId: _lobbyId,
            users: []
        }
        lobby.users.push(user);
        console.log(lobby);

        lobbies.push(lobby);
    })

    socket.on("joinLobby", data => {
        let user =
        {
            id: data.id,
            about: "a crazy kid, living on the mars"
        }

        isLobbyExist = lobbies.some(x => x.lobbyId == data.lobbyId)
        
        if (isLobbyExist) {
            //pushing
            enterLobby(data.lobbyId, user);
            responseMessage("You going to lobby", 200)
            socket.emit('response', responseMessage);
        }
        else {
            responseMessage("lobby doesn`t exist. create lobby first", 405)
        }

    })

    socket.join(lobbyId);

    io.to(lobbyId).emit('getUsersInLobby', containerLobby);

    //***************************************** */

})
