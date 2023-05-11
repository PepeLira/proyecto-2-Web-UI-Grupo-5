import {refreshSesion} from '../app.js'
import {socket} from '../wSocket.js';


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

document.addEventListener("DOMContentLoaded", (event) => {
    renderPlayers(JSON.parse(localStorage.getItem("players")));
    refreshSesion();
});