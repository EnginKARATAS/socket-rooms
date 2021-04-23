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
let lobby =    '\\pages\\lobby\\index.html';

let data2 = {
    id:"engin but fake data",
    lobbyId:"abc123"
}
let data = {
    id:"engin",
    lobbyId:"abc123"
}
let room1 = [data,data2];

setInterval(heartbeat,1000);
function heartbeat() {
    io.sockets.emit('heartbeat',room1);
}

app.get('/', function (req, res) {
    res.render(path + entrance , {bilgi:"selam"});
});

app.get('/lobby', function (req, res) {
    
    res.render(path+lobby,{room1});
});

app.post('/createlobby', (req, res) => {
    let data = {
        id: req.body.id,
        lobbyId: req.body.lobbyId
    };
    room1.push(data); 
    console.log(room1);   
    // socket.join(data.lobbyId);
    console.log(room1);;
});


io.on('connection',socket=>{
    socket.on('getLobbyUsers',()=>{
        console.log("al sana");
    })
    socket.on("joinLobby",data=>{
        console.log("room1");
        console.log(room1);
        room1.push(data);
        // socket.join(data.roomId)
        socket.emit('showLobbyPlayers',data);
    })
})
