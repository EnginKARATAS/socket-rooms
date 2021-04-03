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

app.get('/', function (req, res) {
    res.render(path + '\\entrance\\entrance.html', {bilgi:"selam"});
});

app.post('createlobby', (req, res) => {
    let data = req.body;
    console.log(data);
    res.sendFile("../", data)
});

io.on('connection', socket => {

    socket.on('createLobby', data => {
        socket.join(data.lobbyId);
    });

})