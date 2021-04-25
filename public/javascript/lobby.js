
let users = []
let lobbyId = "";
 

var input = document.getElementById("txt_message");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        alert("enter click")
    }
});

socket.on('getUsersInLobby', data => {
    console.log(data);
    users = data.users;
    lobbyId = data.lobbyId
    parseHTML();
})

function parseHTML() {
    let c = document.getElementById("user_table");
    let dom_lobbyId = document.getElementById("lobbyId");
    dom_lobbyId.innerText = lobbyId;
    c.innerHTML = "";
    users.forEach((element, i) => {
        //create null elements
        let newtrelement = document.createElement("tr");
            let newtrlielement1 = document.createElement("td");
            let newtrlielement2 = document.createElement("td");
            let newtrlielement3 = document.createElement("td");
        //newtrelement>newtrlielement4
        newtrelement.appendChild(newtrlielement1)
        newtrelement.appendChild(newtrlielement2)
        newtrelement.appendChild(newtrlielement3)
        //fill data
        newtrelement.children[0].innerHTML = i;
        newtrelement.children[1].innerHTML = element.id;
        newtrelement.children[2].innerHTML = element.about

        c.appendChild(newtrelement);
    });
};


