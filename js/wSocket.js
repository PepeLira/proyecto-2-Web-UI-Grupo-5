let value = localStorage.getItem("joinedGame");
let token = localStorage.getItem("access");
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

function renderPlayers(players) {
    const container = document.getElementsByClassName('.players-tags-container')[0];

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
            localStorage.setItem("round_number", info.round_number);
            localStorage.setItem("pregunton", info.nosy_id);
        }

        else if (info.type === 'question_time_ended') {
            localStorage.setItem("step", '2');
            localStorage.setItem("pregunton", info.nosy_id);
        }
        else if (info.type === 'answer_time_ended') {
            localStorage.setItem("step", '3');
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
            //20 segundos para alcanzar leer consola
            setTimeout(function(){ window.location.pathname = 'gamesIndex.html';}, 20000);
        }
        else if (info.type === "game_canceled") {
            localStorage.setItem("started", "false");
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

