import { gameData } from "../api.js";
import {refreshSesion} from '../app.js'

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
            name.textContent = game.players[index].username;
        }
        else {
            icon.src = "css/player.svg";
            tag.classList.add("player");
            name.textContent = game.players[index].username;
        }
        partentTagsContainer.appendChild(clonedElement);
    }

}

gameData(localStorage.getItem("access"),637, renderPlayerLits);

document.addEventListener("DOMContentLoaded", (event) => {
	refreshSesion();
    let btnStartGame = document.getElementsByClassName("join-button")[0];
    btnStartGame.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.pathname = 'game.html';
    });
});