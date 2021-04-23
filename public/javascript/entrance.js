let element = document.getElementById("btn_create").addEventListener('click', createLobby)

let element2 = document.getElementById("btn_join").addEventListener('click', joinLobby)

socket.on('alert', data => { alert(data) })
let isJoin = false;

socket.on('resJoinLobby', bool => {
    isJoin = bool;
})

socket.on('response', (responseData) => {
    console.log(responseData);
    if (responseData.code > 400) {
        alert(responseData.message);
    }
    else if(responseData.code < 300)
    {
        alert(responseData.message);
        window.location.href = "/lobby";
    }
})

function joinLobby() {
    let username = document.getElementById("txt_username").value;
    let lobbyId = document.getElementById("txt_lobby").value;
    let data = {
        id: username,
        lobbyId: lobbyId
    }
    socket.emit('joinLobby', data)
}
function createLobby() {
    let username = document.getElementById("txt_username").value;
    let lobbyId = document.getElementById("txt_username").value;

    let data = {
        id: username,
        lobbyId: lobbyId
    }

    socket.emit('createLobby', data);
    window.location.href = "/lobby";
}