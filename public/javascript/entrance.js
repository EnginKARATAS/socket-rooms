let element = document.getElementById("btn_create").addEventListener('click', createLobby)

let element2 = document.getElementById("btn_join").addEventListener('click', joinLobby)

socket.on('alert', data => { alert(data) })
let isJoin = false;

socket.on('resJoinLobby', bool => {
    isJoin = bool;
})

socket.on('response', (responseData) => {
    console.log(responseData);
    let code = responseData.code;
    let message = responseData.message
    if (code == 405 || code == 406) {
        alert(message);
    }
    else if (code == 200) {
        alert(message)
        window.location.href = "/lobby";
    }

})

function joinLobby() {
    let username = document.getElementById("txt_join_username").value;
    let lobbyId = document.getElementById("txt_join_lobby").value;
    let data = {
        id: username,
        lobbyId: lobbyId
    }
    socket.emit('joinLobby', data)
}
function createLobby() {
    let username = document.getElementById("txt_create_username").value;
    let lobbyId = document.getElementById("txt_create_lobby").value;
    console.log("createloby");
    console.log(username);
    console.log(lobbyId);

    let user = {
        id: username,
        about: "crazy lobby maker " + username
    }
    socket.emit('createLobby', user, lobbyId);
}