//	Event Listener

 let element = document.getElementById("btn_create").addEventListener('click', createLobby)

let element2 = document.getElementById("btn_join").addEventListener('click', joinLobby)

function joinLobby() {
    let username = document.getElementById("username").value;
    let data = {
        id: username,
        lobbyId: "abc123"
    }
    socket.emit('joinLobby',data)
    window.location.href = "/lobby";

}
function createLobby() {
    console.log("object");

    let username = document.getElementById("username").value;
    console.log("createLobby is called. username is:" + username);

    //generating unique room namespace string

    let data = {
        lobbyId: "abc123",
        id: username
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }

    fetch('/createlobby', options);
    window.location.href = "/lobby";




}