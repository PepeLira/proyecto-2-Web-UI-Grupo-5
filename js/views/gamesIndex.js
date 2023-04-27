import { GameController } from '../controllers/gameController.js'
import {gameList} from '../api.js'
import {refreshSesion} from '../app.js'

function showModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
}

function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

var gamesList = [];

function renderGames(games) {
	console.log(Object.keys(games).length);
	console.log(games);
	let parent = document.getElementById("roomsContainer");
	let elem = document.getElementsByClassName("template")[0];
	for (let index = 0; index < Object.keys(games).length; index++) {
		//clone the elem
		let clonedElement = elem.cloneNode(true);
		clonedElement.id = games[index].id;
		clonedElement.classList.remove("template");
		//get first child
		let titlediv = clonedElement.getElementsByClassName("room-players")[0];
		titlediv.textContent = games[index].name;
		//<div class="flex-row player-tag player"></div>  puede ser player o pregunton la clase
		//el class "icon" src puede ser src="css/player.svg"  o src="css/Pregunton.svg"
		//get player list
		let pListContainer = clonedElement.getElementsByClassName("players-tags-container")[0];
		let pList = clonedElement.getElementsByClassName("player-tag")[0];
		let pTagName = clonedElement.getElementsByClassName("player-tag-name")[0];
		for (let player = 0; player < Object.keys(games[index].players).length; player++) {	
			if (games[index].players[player].id !== games[index].creator.id) {
				let plistClone = pList.cloneNode(true);
				let icon = plistClone.getElementsByClassName("icon")[0];
				let tName = plistClone.getElementsByClassName("player-tag-name")[0];
				plistClone.classList.remove("pregunton");
				plistClone.classList.add("player");
				icon.src = "css/player.svg";
				tName.textContent = games[index].players[player].username;
				pListContainer.appendChild(plistClone);
			}
			else {
				pTagName.textContent = games[index].creator.username;
			}
		}


		//append to parent div
		parent.appendChild(clonedElement);
	}
	console.log(elem);
	console.log(clonedElement);
}

gameList(localStorage.getItem("access"), renderGames);

// const gController = new GameController();
// console.log(gController.games);

document.addEventListener("DOMContentLoaded", (event) => {
	refreshSesion();
	let btnJoinGame = document.getElementsByClassName("join-button");
	let submitBtn = document.getElementById("submit");

	submitBtn.addEventListener("click", function(e) {
		e.preventDefault();
		window.location.pathname = 'waitingRoom.html';
	});
	Array.from(btnJoinGame).forEach(element => {
		element.addEventListener("click", function(e){
			e.preventDefault();
		window.location.pathname = 'waitingRoom.html';
		});
	});
});