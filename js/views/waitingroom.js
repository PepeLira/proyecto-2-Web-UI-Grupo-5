import { gameData, getUser } from "../api.js";
import {refreshSesion} from '../app.js';
import {socket} from '../wSocket.js';

getUser(localStorage.getItem("access"));
function renderPlayerLits(game) {
    console.log(game);

    var RoomName = document.getElementsByClassName("room-name")[0];
    RoomName.innerHTML = game.name;

    var playerCount = document.getElementById("player-count");
    playerCount.innerHTML = game.playerCount;

    let partentTagsContainer = document.getElementsByClassName("players-tags-container")[0];
	let tagTemplate = document.getElementsByClassName("template")[0];

    for (let index = 0; index < Object.keys(game.players).length; index++) {
        let clonedElement = tagTemplate.cloneNode(true);
        clonedElement.classList.remove("template");
        let tag = clonedElement;
        let icon = clonedElement.getElementsByClassName("icon")[0];
        let name = clonedElement.getElementsByClassName("player-tag-name")[0];
        if (game.players[index].id === game.creator.id) {
            icon.src = "css/Pregunton.svg";
            tag.classList.add("pregunton");
            name.textContent = game.players[index].username + " (owner)";
        }
        else {
            icon.src = "css/player.svg";
            tag.classList.add("player");
            name.textContent = game.players[index].username;
        }
        partentTagsContainer.appendChild(clonedElement);
    }

    if (game.creator.id != localStorage.getItem("currentUserId")) {
        let joinButton = document.getElementsByClassName("join-button")[0];
        joinButton.style.visibility = "hidden";
      
        let roundSelector = document.getElementsByClassName("rounds-selector-contaier")[0];
        roundSelector.style.visibility = "hidden";
        
        let waitingText = document.createElement("p");
        waitingText.innerText = "Waiting for the game to start...";
        waitingText.style.visibility = "visible";
        waitingText.style.display = "inline-block";
        joinButton.parentNode.insertBefore(waitingText, joinButton.nextSibling);
      }
      localStorage.setItem("answerTime", game.answerTime);
      localStorage.setItem("questionTime", game.questionTime);
      localStorage.setItem("evaluationTime", game.evaluationTime);
      localStorage.setItem("qualifierTime", game.qualifierTime);
}

gameData(localStorage.getItem("access"),localStorage.getItem("joinedGame"), renderPlayerLits);

document.addEventListener("DOMContentLoaded", (event) => {
	refreshSesion();
    let btnStartGame = document.getElementsByClassName("join-button")[0];
    btnStartGame.addEventListener("click", function(e) {
        e.preventDefault();
        var rounds = document.getElementsByClassName("rounds-selector")[0].value;
        var info = {
            "action": "start",
            "rounds": rounds.toString()
        };
        console.log(socket);
        console.log(JSON.stringify(info));
        socket.send(
            JSON.stringify(info)
        )
        //setTimeout(function(){ window.location.pathname = 'game.html';}, 3000);
    });
});