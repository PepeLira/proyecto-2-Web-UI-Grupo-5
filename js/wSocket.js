import { renderQuestion, renderPregunton, renderEvaluation, startStepTimer, renderAnswer, getQuestion,  getAnswer} from './controllers/mainController.js';

let value = localStorage.getItem("joinedGame");
let token = localStorage.getItem("access");
let countdownInterval;
let sendBtnListener;

export var socket = "";

function parseInfo(event) {
    var info = JSON.parse(event.data);
    return info;
}

function sendInfo(info, mySocket) {
    if (mySocket && mySocket.readyState === WebSocket.OPEN) {
        mySocket.send(info);
    }
}

function gameStartMessage(r) {
    var message = {
        action: 'start',
        rounds: r
    };
    return JSON.stringify(message);
}

function sendGameStart(r, mySocket) {
    if ( value !== null && token !== null) {
        var messageJson = gameStartMessage(r);
        sendInfo(messageJson, mySocket);
    }
}

if ( value !== null && token !== null) {
    let wsUrl = "wss://trivia-bck.herokuapp.com/ws/trivia/" + value.toString() + "/?token=" + token.toString();
    socket = new WebSocket(wsUrl);

    // Event: WebSocket is opened
    socket.addEventListener('open', () => {
    console.log('WebSocket connection is open.');
    });
    // Event: Message received from the server
    socket.addEventListener('message', (event) => {
        console.log('Received message from the server:', event.data);
        let info = parseInfo(event);

        // Handle the info type here
        if (info.type === 'player_joined' || info.type === 'player_unjoined') {
            // Refresh the current page
            location.reload();
        }

        else if (info.type === 'game_started') {
            localStorage.setItem("step", '0');
            localStorage.setItem("players", JSON.stringify(info.players));
            localStorage.setItem("started", "true");
            setTimeout(function(){ window.location.pathname = 'game.html';}, 1000);
        }

        else if (info.type === 'round_started') {
            renderPregunton(info.nosy_id);
            localStorage.setItem("step", '1');
            localStorage.setItem("round_number", info.round_number);
            localStorage.setItem("pregunton", info.nosy_id);
            countdownInterval = startStepTimer(1, countdownInterval);
            sendBtnListener = getQuestion();
        }

        else if (info.type === "round_question") {
            localStorage.setItem("step", '2');
            getAnswer(sendBtnListener);
            localStorage.setItem("current_question", info.question);
            countdownInterval = startStepTimer(2, countdownInterval);
            renderQuestion(info.question);
        }

        else if (info.type === 'question_time_ended') {
            localStorage.setItem("step", '2');
            localStorage.setItem("pregunton", info.nosy_id);
        }
        else if (info.type === 'round_answer') {
            renderAnswer(info.answer, info.userid);
        }
        else if (info.type === 'answer_time_ended') {
            localStorage.setItem("step", '3');
            localStorage.setItem("pregunton", info.nosy_id);
            countdownInterval = startStepTimer(3, countdownInterval);
            sendBtnListener = renderEvaluation(sendBtnListener);
        }
        else if (info.type === 'qualify_timeout') {
            localStorage.setItem("step", '4');
        }
        else if (info.type === 'round_started') {
            localStorage.setItem("step", '1');
            localStorage.setItem("pregunton", info.nosy_id);
        }
        else if (info.type === "game_result") {
            localStorage.setItem("started", "false");
            localStorage.setItem("step", '0');
            //20 segundos para alcanzar leer consola
            setTimeout(function(){ window.location.pathname = 'gamesIndex.html';}, 20000);
        }
        else if (info.type === "game_canceled") {
            localStorage.setItem("started", "false");
            localStorage.setItem("step", '0');
            //20 segundos para alcanzar leer consola
            setTimeout(function(){ window.location.pathname = 'gamesIndex.html';}, 20000);
        }

    });
    // Event: WebSocket connection closed
    socket.addEventListener('close', (event) => {
    console.log('WebSocket connection is closed.');
    console.log(event);
    });
    
    // Event: WebSocket error occurred
    socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
    });
}

//Para enviar en socket
//socket.send(aqui un json);

