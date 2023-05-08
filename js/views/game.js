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

function renderDisplayTime(roundTime) {
    // Get the HTML element that will display the countdown
    let countdownElement = document.getElementsByClassName("displaytime");
    

    // Set the initial time value
    let timeLeft = roundTime;

    // Update the countdown text every second
    let countdownInterval = setInterval(() => {
    // Decrement the time left by one second
    timeLeft -= 1;
    // Update the countdown text
    countdownElement[0].textContent = timeLeft.toString() + "s";

    // Check if the timer has reached zero
    if (timeLeft <= 0) {
        // Clear the countdown interval
        clearInterval(countdownInterval);

        // Display a message when the timer is done
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

gameData(localStorage.getItem("access"),localStorage.getItem("joinedGame"), renderGameInfo);

document.addEventListener("DOMContentLoaded", (event) => {
    refreshSesion();
});