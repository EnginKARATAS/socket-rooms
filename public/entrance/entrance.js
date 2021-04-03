//	Event Listener
let element = document.getElementById("btn_create");
element.addEventListener("click",  createLobby);


function createLobby() { 
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

    fetch('/tolobby',options);
 
    
}