function showModal() {
	var modal = document.getElementById("myModal");
    console.log("holaaa");
	modal.style.display = "block";
}

function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", (event) => {
    let preparando = document.getElementById("Preparando");
    let respondiendo = document.getElementById('Respondiendo');
    let evaluando = document.getElementById('Evaluando');
    let revisando = document.getElementById('Revisando');
    let hints = document.getElementsByClassName('hint-container')[0];
    let answerscontainer = document.getElementsByClassName('answer-container');
    let ratingzone = document.getElementsByClassName('showrating-zone');
    let eltor = document.getElementsByClassName('evaluator');
    let inputzone = document.getElementById('qtextarea');
    let btnsent = document.getElementById('btnsendaq');
    let btnend = document.getElementById('btn-leave');
    preparando.addEventListener('click', function(e){
        preparando.classList.add('indemo');
        respondiendo.classList.remove('indemo');
        evaluando.classList.remove('indemo');
        revisando.classList.remove('indemo');
        hints.classList.add('hiddeninterface');
        Array.from(answerscontainer).forEach(elm => {
            elm.classList.add('hiddeninterface');
        });
        Array.from(ratingzone).forEach(elm => {
            elm.classList.add('hiddeninterface');
        });
        Array.from(eltor).forEach(elm => {
            elm.classList.add('hiddeninterface');
        });
        inputzone.classList.remove('hiddeninterface');
        btnsent.classList.remove('hiddeninterface');
    });
    respondiendo.addEventListener('click', function(e){
        hints.classList.remove('hiddeninterface');
        Array.from(answerscontainer).forEach(elm => {
            elm.classList.remove('hiddeninterface');
        });
        preparando.classList.remove('indemo');
        respondiendo.classList.add('indemo');
        inputzone.classList.remove('hiddeninterface');
    });
    evaluando.addEventListener('click', function(e){
        hints.classList.remove('hiddeninterface');
        Array.from(answerscontainer).forEach(elm => {
            elm.classList.remove('hiddeninterface');
        });
        Array.from(eltor).forEach(elm => {
            elm.classList.remove('hiddeninterface');
        });
        respondiendo.classList.remove('indemo');
        evaluando.classList.add('indemo');
        inputzone.classList.add('hiddeninterface');
        btnsent.classList.add('hiddeninterface');
    });
    revisando.addEventListener('click', function(e){
        hints.classList.remove('hiddeninterface');
        Array.from(answerscontainer).forEach(elm => {
            elm.classList.remove('hiddeninterface');
        });
        Array.from(ratingzone).forEach(elm => {
            elm.classList.remove('hiddeninterface');
        });
        Array.from(eltor).forEach(elm => {
            elm.classList.add('hiddeninterface');
        });
        evaluando.classList.remove('indemo');
        revisando.classList.add('indemo');
        inputzone.classList.add('hiddeninterface');
        btnsent.classList.remove('hiddeninterface');
    });
    preparando.classList.add('indemo');
    respondiendo.classList.remove('indemo');
    evaluando.classList.remove('indemo');
    revisando.classList.remove('indemo');
    hints.classList.add('hiddeninterface');
    Array.from(answerscontainer).forEach(elm => {
        elm.classList.add('hiddeninterface');
    });
    Array.from(ratingzone).forEach(elm => {
        elm.classList.add('hiddeninterface');
    });
    Array.from(eltor).forEach(elm => {
        elm.classList.add('hiddeninterface');
    });
    btnend.addEventListener('click', function(e){
        window.location.pathname = 'gamesIndex.html';
    });
});