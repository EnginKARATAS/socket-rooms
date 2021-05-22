
let users = []
let lobbyId = "";


var input = document.getElementById("txt_message");

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        alert("enter click")
    }
});



socket.on('response', (responseData) => {
    console.log(responseData);
    let code = responseData.code;
    let message = responseData.message
    if (code == 200) {
        alert(message)
    }
})

socket.on("user:left", _socketId => {
   
    let waitSocketId = new Promise((basarili, basarisiz) => {
        let sonuc = function loop() {
            for (let i = 0; i < users.length; i++) {
                console.log(users[i].socketId, " eşit mi ", _socketId);
                if (users[i].socketId == _socketId) {
                    console.log("girdi");
                    console.log(i);
                    users.splice(i, 1);
                    console.log("doğru döndüğünü idda ediyor");
                    console.log(users[i].socketId, " -- " , _socketId);
                    return true
                }
            }
        }
        if (sonuc) {
            basarili("for looped")
        }
        else
            basarisiz("hey wait")
    });
    waitSocketId
        .then(cevap => {
            console.log(cevap);
            console.log("then worked");
            parseHTML();
        })
        .catch(cevap => console.log("döndüremedim"))

});


socket.on('getUsersInLobby', data => {
    console.log(data);
    users = data.users;
    lobbyId = data.lobbyId
    parseHTML();
})

function parseHTML() {
    let c = document.getElementById("user_table");
    c.innerHTML = "";

    let dom_lobbyId = document.getElementById("lobbyId");
    dom_lobbyId.innerText = lobbyId;
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


