document.addEventListener("DOMContentLoaded", (event) => {
    let btnNewGame = document.getElementsByClassName("new-game-button")[0];
    let btnJoinGame = document.getElementsByClassName("join-button");
    btnNewGame.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.pathname = 'creategame.html';
    });
    Array.from(btnJoinGame).forEach(element => {
        element.addEventListener("click", function(e){
            e.preventDefault();
        window.location.pathname = 'waitingRoom.html';
        });
    });
});