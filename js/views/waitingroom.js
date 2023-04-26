document.addEventListener("DOMContentLoaded", (event) => {
    let btnStartGame = document.getElementsByClassName("join-button")[0];
    btnStartGame.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.pathname = 'game.html';
    });
});