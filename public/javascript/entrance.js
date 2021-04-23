let element = document.getElementById("btn_create").addEventListener('click', createLobby)

let element2 = document.getElementById("btn_join").addEventListener('click', joinLobby)

socket.on('alert', data => { alert(data) })
let isJoin = false;

socket.on('resJoinLobby', bool => {
    isJoin = false;
})

function joinLobby() {
    let username = document.getElementById("txt_username").value;
    let lobbyId = document.getElementById("txt_username").value;
    let data = {
        id: username,
        lobbyId: lobbyId
    }

    if (isJoin) {
        socket.emit('joinLobby', data)
        window.location.href = "/lobby";
    }
    else{alert("room is not defined");}

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