
let users = []
let lobbyName = "";
socket.on('showLobbyPlayers', data => {
    console.log(data);
    console.log("any");
});

var input = document.getElementById("txt_message");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        alert("enter click")
    }
});

socket.on('getUsersInLobby', data=>{
    users = data.users
    lobbyId =  data.lobbyId
    parseHTML();
})

function parseHTML() {
    let c = document.getElementsByTagName("tbody")[1]
    c.innerHTML = "";
    let counter = 1;
    users.forEach((element, i) => {
        //create null elements
        let newtrelement = document.createElement("tr");
        let newtrlielement1 = document.createElement("td");
        let newtrlielement2 = document.createElement("td");
        let newtrlielement3 = document.createElement("td");
        let newtrlielement4 = document.createElement("td");
        //make nested
        newtrelement.appendChild(newtrlielement1)
        newtrelement.appendChild(newtrlielement2)
        newtrelement.appendChild(newtrlielement3)
        newtrelement.appendChild(newtrlielement4)
        //fill data
        newtrelement.children[0].innerHTML = i;
        newtrelement.children[1].innerHTML = element;
        newtrelement.children[2].innerHTML = "selamlar cümlesi";
        newtrelement.children[3].innerHTML = "komik mi saat 7";

        c.appendChild(newtrelement);
    });
};


