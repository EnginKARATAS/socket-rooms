let express = require('express');



app.post('tolobby',(req,res) => {
    let data = req.body;
    res.sendFile("../",data)
});

io.on('connection', socket=>{ 

    socket.on('createLobby',data=>{
        socket.join(data.lobbyId);
    });



})