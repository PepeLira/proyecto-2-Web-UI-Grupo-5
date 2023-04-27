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
	console.log(games);
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