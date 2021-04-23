let element = document.getElementById("btn_create").addEventListener('click', createLobby)

let element2 = document.getElementById("btn_join").addEventListener('click', joinLobby)

function joinLobby() {
    let username = document.getElementById("txt_username").value;
    let data = {
        id: username,
        lobbyId: "abc123"
    }
    socket.emit('joinLobby', data)
    window.location.href = "/lobby";

}
function createLobby() {
    let username = document.getElementById("txt_username").value;
    // let lobbyId = document.getElementById("txt_username").value;

    let data = {
        lobbyId: "abc123",
        id: username
    }

    socket.emit('createLobby', data);
    window.location.href = "/lobby";
}