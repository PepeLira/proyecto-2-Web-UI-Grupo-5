let value = localStorage.getItem("joinedGame");
let token = localStorage.getItem("access");
if ( value !== null && token !== null) {
    let wsUrl = "wss://trivia-bck.herokuapp.com/ws/trivia/" + value.toString() + "/?token=" + token.toString();
    let socket = new WebSocket(wsUrl);

    // Event: WebSocket is opened
    socket.addEventListener('open', () => {
    console.log('WebSocket connection is open.');
    });
    // Event: Message received from the server
    socket.addEventListener('message', (event) => {
        console.log('Received message from the server:', event.data);
      
        // Process the received message as needed
        // ...
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