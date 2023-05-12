import { socket } from "../wSocket.js";

var countDownInterval;

export function renderQuestion(questionText) {
    const questionAnswerZone = document.querySelector('.question-answer-zone');

    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.textContent = questionText;
    questionContainer.appendChild(questionElement);
    questionAnswerZone.appendChild(questionContainer);

    const textArea = document.querySelector('#qtextarea');
    textArea.value = '';
} 

function getUserName(userid){
    var username = "";
    JSON.parse(localStorage.getItem("players")).forEach((player) => {
        if (parseInt(player.userid) === parseInt(userid)) {
            username = player.username + ": ";
        }
    });
    return username;
}

export function renderAnswer(answerText, userid) {
    if (userid == 0 || userid == parseInt(localStorage.getItem("currentUserId")) || localStorage.getItem("pregunton") === localStorage.getItem("currentUserId")) {
        const questionAnswerZone = document.querySelector('.question-answer-zone');
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container');
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.textContent = getUserName(userid) + answerText;
        answerContainer.appendChild(answerElement);
        questionAnswerZone.appendChild(answerContainer);
        answerElement.setAttribute('userid', userid);

        const textArea = document.querySelector('#qtextarea');
        textArea.value = '';
    }
} 

export function renderPregunton(userid) {
    var playerName;
    const players = JSON.parse(localStorage.getItem("players"));
    players.forEach((player) => {
      if (player.userid === userid) {
        playerName = player.username;
      }
    });
    console.log(playerName);
  
    if (userid === parseInt(localStorage.getItem("currentUserId"))) {
      playerName += " (you)";
    }
  
    const container = document.getElementsByClassName(
      "players-tags-container"
    )[0];
  
    let foundPlayerTag = null;
    for (let i = 0; i < container.children.length; i++) {
      const playerTag = container.children[i];
      const userNameElement = playerTag.querySelector("span");
  
      if (userNameElement.textContent === playerName) {
        foundPlayerTag = playerTag;
        break;
      }
    }
  
    if (foundPlayerTag) {
      const prevPregunton = container.querySelector(".pregunton");
      if (prevPregunton) {
        prevPregunton.classList.remove("pregunton");
        prevPregunton.classList.add("player");

        const prevIconElement = prevPregunton.querySelector(".icon");
        prevIconElement.src = "css/player.svg";
      }
  
      const iconElement = foundPlayerTag.querySelector(".icon");
      iconElement.src = "css/pregunton.svg";
  
      foundPlayerTag.classList.remove("player");
      foundPlayerTag.classList.add("pregunton");
    }
  }
  



function renderDisplayTime(roundTime, previousInterval) {
    if (previousInterval) clearInterval(previousInterval);
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
    return countdownInterval;
}

export function startStepTimer(currentStep, previousInterval) {
    let stepTime;
    var stepElem;

    const indemoElem = document.querySelector('.indemo');

    if (indemoElem) {
        indemoElem.classList.remove('indemo');
    }

    if (currentStep == 1) {
        stepTime = localStorage.getItem("questionTime");
        stepElem = document.querySelector('#Preparando');
        stepElem.classList.add('indemo');
    }
    else if (currentStep == 2) {
        stepTime =  localStorage.getItem("answerTime");
        stepElem = document.querySelector('#Respondiendo');
        stepElem.classList.add('indemo');
    }
    else if (currentStep == 3) {
        stepTime = localStorage.getItem("evaluationTime");
        stepElem = document.querySelector('#Evaluando');
        stepElem.classList.add('indemo');
    }
    else if (currentStep == 4) {
        stepTime = localStorage.getItem("qualifierTime");
        stepElem = document.querySelector('#Revisando');
        stepElem.classList.add('indemo');
    }
    else {
        stepTime = 0;
    }
    return renderDisplayTime(stepTime, previousInterval);
}

export function getQuestion() {
    // if (btnListener) btnListener.removeEventListener("click");
    var btn = document.getElementById("btnsendaq");
    var sendQuestion = function(event) {
        event.preventDefault()
        let myText = document.getElementById("qtextarea");
        if (localStorage.getItem("pregunton") === localStorage.getItem("currentUserId")) {
            let message = {
                "action": "question",
                "text": myText.value.toString()
            };
            console.log(socket);
            console.log(JSON.stringify(message));
            socket.send(
                JSON.stringify(message)
            )
        }
        else {
            alert("No es tu turno de enviar una pregunta")
        }
    };

    btn.addEventListener("click", sendQuestion);

    return sendQuestion;
}

export function getAnswer(prevListener) {
    var btn = document.getElementById("btnsendaq");
    btn.removeEventListener("click", prevListener);
    var sendAnswer = function(event) {
        event.preventDefault()
        let myText = document.getElementById("qtextarea");

        let message = {
            "action": "answer",
            "text": myText.value.toString()
        };
        console.log(socket);
        console.log(JSON.stringify(message));
        socket.send(JSON.stringify(message));
        renderAnswer(myText.value.toString(), localStorage.getItem("currentUserId"));
        btn.removeEventListener("click", sendAnswer);
    };

    btn.addEventListener("click", sendAnswer);

    return sendAnswer;
}

function handleReviewClick(event){
    // Find the answer div and rating span
    const button = event.target;
    const evaluatorDiv = button.parentNode;
    const answerDiv = evaluatorDiv.parentNode.querySelector('.answer');
    let ratingSpan = answerDiv.querySelector('.showrating-zone span:last-child');

    // If the rating span doesn't exist, create it
    if (!ratingSpan) {
      ratingSpan = document.createElement('span');
      ratingSpan.classList.add('rating');
      const showRatingZone = document.createElement('div');
      showRatingZone.classList.add('showrating-zone');
      showRatingZone.appendChild(document.createTextNode('Evaluación: '));
      showRatingZone.appendChild(ratingSpan);
      answerDiv.appendChild(showRatingZone);
    }

    // Update the rating span with the appropriate emoji
    if (button.classList.contains('bad')) {
      ratingSpan.innerText = '😫';
    } else if (button.classList.contains('good')) {
      ratingSpan.innerText = '😀';
    } else if (button.classList.contains('perfect')) {
      ratingSpan.innerText = '🤩';
    }

    evaluatorDiv.remove();
    let message = {
        "action": "qualify",
        "userid": parseInt(answerDiv.getAttribute("userid")),
        "grade": parseInt(event.target.value)
    };
    console.log(socket);
    console.log(JSON.stringify(message));
    socket.send(JSON.stringify(message));
    var lastEvaluator = document.getElementsByClassName("evaluator");

    if (lastEvaluator.length == 0) {
        startStepTimer(4, countDownInterval);
    }
}

export function renderEvaluation(prevListener, previousInterval) {
    var btn = document.getElementById("btnsendaq");
    countDownInterval = previousInterval;
    btn.removeEventListener("click", prevListener);

    var aContainer = document.getElementsByClassName("answer-container");
    Array.from(aContainer).forEach(function(element) {
        if (element.getElementsByClassName("answer")[0].getAttribute("userid").toString() != localStorage.getItem("pregunton").toString()) {
            var div = document.createElement("div");
            div.classList.add("evaluator");

            var btnOne = document.createElement("button");
            var btnTwo = document.createElement("button");
            var btnThree = document.createElement("button");

            btnOne.classList.add("bad");
            btnTwo.classList.add("good");
            btnThree.classList.add("perfect");

            btnOne.textContent = "Mala 😫";
            btnTwo.textContent = "Mas o Menos 😀";
            btnThree.textContent = "Buena 🤩";

            btnOne.value = "0";
            btnTwo.value = "1";
            btnThree.value = "2";

            btnOne.addEventListener("click", handleReviewClick);
            btnTwo.addEventListener("click", handleReviewClick);
            btnThree.addEventListener("click", handleReviewClick);

            div.appendChild(btnOne);
            div.appendChild(btnTwo);
            div.appendChild(btnThree);

            element.appendChild(div);
        }
    });

    return handleReviewClick;
}


function handleEvaluatorClick(event) {
    const response = event.target.classList.contains('bad') ? "false" : "true";

    const message = {
        "action": "assess",
        "correctness": response
    };

    console.log(socket);
    console.log(JSON.stringify(message));
    socket.send(JSON.stringify(message));

    const evaluatorDiv = event.target.parentNode;
    evaluatorDiv.parentNode.removeChild(evaluatorDiv);
}


export function renderReview(answer, grade) {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answer');
    answerDiv.innerText = answer;
  
    const evaluatorDiv = document.createElement('div');
    evaluatorDiv.classList.add('evaluator');
  
    const badButton = document.createElement('button');
    badButton.classList.add('bad');
    badButton.innerText = 'Mala 😫';
    badButton.addEventListener('click', handleEvaluatorClick);
    evaluatorDiv.appendChild(badButton);
  
    const perfectButton = document.createElement('button');
    perfectButton.classList.add('perfect');
    perfectButton.innerText = 'Buena 🤩';
    perfectButton.addEventListener('click', handleEvaluatorClick);
    evaluatorDiv.appendChild(perfectButton);
  
    const ratingSpan = document.createElement('span');
    ratingSpan.classList.add('rating');
    let ratingEmoji;
    if (grade == 0) {
      ratingEmoji = '😫';
    } else if (grade == 1) {
      ratingEmoji = '😀';
    } else if (grade == 2) {
      ratingEmoji = '🤩';
    }
    ratingSpan.innerText = ratingEmoji;
  
    const showRatingZone = document.createElement('div');
    showRatingZone.classList.add('showrating-zone');
    showRatingZone.appendChild(document.createTextNode('Evaluación: '));
    showRatingZone.appendChild(ratingSpan);
    
    
    
    answerDiv.appendChild(showRatingZone);
    const answerContainer = document.createElement('div');
    answerContainer.classList.add('answer-container');
    answerContainer.appendChild(answerDiv);
    answerContainer.appendChild(evaluatorDiv);
  
    const questionAnswerZone = document.getElementsByClassName('question-answer-zone')[0];
    questionAnswerZone.appendChild(answerContainer);
  }

export function addPlayerScores(game_scores) {
    const players = JSON.parse(localStorage.getItem("players"));
    const container = document.getElementsByClassName("players-tags-container")[1];
    container.innerHTML = '';

    for (const userId in game_scores) {
        const score = game_scores[userId];
        const player = players.find(p => p.userid == userId);

        if (player) {
            const tag = document.createElement("div");
            tag.classList.add("flex-row", "player-tag", "player");

            const left = document.createElement("div");
            left.classList.add("left");
            const icon = document.createElement("img");
            icon.classList.add("icon");
            icon.setAttribute("src", "css/player.svg");
            const username = document.createElement("span");
            username.innerText = player.username;
            left.appendChild(icon);
            left.appendChild(username);
            tag.appendChild(left);

            const right = document.createElement("div");
            right.classList.add("right");
            const scoreDisplay = document.createElement("div");
            scoreDisplay.innerText = score;
            right.appendChild(scoreDisplay);
            tag.appendChild(right);

            container.appendChild(tag);
        }
    }
}

export function clearQuestionAnswers() {
    const questionAnswerZone = document.getElementsByClassName('question-answer-zone')[0];
    questionAnswerZone.innerHTML = '';
}