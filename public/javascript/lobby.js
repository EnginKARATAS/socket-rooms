 let room1 = []
socket.on('showLobbyPlayers', data => {
    console.log(data);
    console.log("any");
});

socket.on('heartbeat', data => {
    room1 = data;
    let c = document.getElementsByTagName("tbody")[0]
        c.innerHTML = ""
        let counter = 1;
    room1.forEach((element,i) => {
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
        newtrelement.children[1].innerHTML = element.id;
        newtrelement.children[2].innerHTML = element.lobbyId;
        newtrelement.children[3].innerHTML = "komik mi saat 7";
        
        let text_area = document.getElementById("text_area")
        text_area.attributes.rows.value = (1.9*++counter);
        c.appendChild(newtrelement);

    });
    
});


