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
function enterLobby(_lobbyId, _user) {
    let lobbyUsers = lobbies.find(x => x.lobbyId = _lobbyId).users
    lobbyUsers.push(_user);
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
console.log(lobbies);
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



io.on('connection', socket => {

    let lobbyId;
    let id;

    socket.on('createLobby', data => {
        let user = {
            id: data.id,
            username: data.
        }
        let lobby = 
        {
                lobbyId: data.lobbyId,
                users: []
        }

     

        
     })

    socket.on("joinLobby", data => {
        console.log(data);
        //enterLobby("abc123","supo")
        enterLobby(data.lobbyId,data.id);
        console.log("lobi");
        console.log(lobbies);

    })


    socket.join(lobbyId);

    io.to(lobbyId).emit('hi', lobby.lobbyId);
})
