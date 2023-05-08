let value = localStorage.getItem("joinedGame");
let token = localStorage.getItem("access");

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
    var socket = new WebSocket(wsUrl);

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
            // Refresh the current page
            window.location.pathname = 'game.html';
        }
    });
    // Event: WebSocket connection closed
    socket.addEventListener('close', () => {
    console.log('WebSocket connection is closed.');
    });
    
    // Event: WebSocket error occurred
    socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
    });
}

//Para enviar en socket
//socket.send(aqui un json);