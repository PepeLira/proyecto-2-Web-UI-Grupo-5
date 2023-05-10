import {refreshSesion} from '../app.js'
import { gameData, getUser } from "../api.js";


function showModal() {
	var modal = document.getElementById("myModal");
    console.log("holaaa");
	modal.style.display = "block";
}

function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

function renderPlayers(players) {
    const container = document.getElementsByClassName('players-tags-container')[0];

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        
        if (player.userid === parseInt(localStorage.getItem('currentUserId'))) {
            player.username += ' (you)';
        }
        
        const playerTag = document.createElement('div');
        playerTag.classList.add('flex-row', 'player-tag', 'player');
        
        const left = document.createElement('div');
        left.classList.add('left');
        const icon = document.createElement('img');
        icon.classList.add('icon');
        icon.setAttribute('src', 'css/player.svg');
        const span = document.createElement('span');
        span.textContent = player.username;
        left.appendChild(icon);
        left.appendChild(span);
        
        const right = document.createElement('div');
        right.classList.add('right');
        
        for (let j = 0; j < 3; j++) {
            const heart = document.createElement('img');
            heart.classList.add('heart');
            heart.setAttribute('src', 'css/heart.svg');
            right.appendChild(heart);
        }
        
        playerTag.appendChild(left);
        playerTag.appendChild(right);
        
        container.appendChild(playerTag);
    }
}

function renderDisplayTime(roundTime) {
    let countdownElement = document.getElementsByClassName("displaytime");
    
    let timeLeft = roundTime;

    let countdownInterval = setInterval(() => {
        timeLeft -= 1;
        countdownElement[0].textContent = timeLeft.toString() + "s";

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);

            countdownElement[0].textContent = "0s";
        }
    }, 1000);

}

function renderGameInfo(game) {
    console.log(game);
    let currentStep = localStorage.getItem("step");
    let stepTime;
    if (currentStep == "1") {
        stepTime = game.questionTime;
    }
    else if (currentStep == "2") {
        stepTime = game.answerTime;
    }
    else if (currentStep == "3") {
        stepTime = game.evaluationTime;
    }
    else if (currentStep == "4") {
        stepTime = game.qualifierTime;
    }
    else {
        stepTime = 0;
    }
    renderDisplayTime(stepTime);

}


renderPlayers(JSON.parse(localStorage.getItem("players")));

gameData(localStorage.getItem("access"),localStorage.getItem("joinedGame"), renderGameInfo);

document.addEventListener("DOMContentLoaded", (event) => {
    refreshSesion();
});