document.addEventListener("DOMContentLoaded", (event) => {
    let forms = document.getElementsByTagName("form")[0];
    forms.addEventListener("submit", function(e) {
        e.preventDefault();
        window.location.pathname = 'gamesIndex.html';
    });
});