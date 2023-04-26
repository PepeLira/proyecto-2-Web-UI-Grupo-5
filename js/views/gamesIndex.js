function showModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
}

function closeModal() {
	var modal = document.getElementById("myModal");
	modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", (event) => {
	let btnJoinGame = document.getElementsByClassName("join-button");
	let submitBtn = document.getElementById("submit");
	submitBtn.addEventListener("click", function(e) {
		e.preventDefault();
		window.location.pathname = 'waitingRoom.html';
	});
	Array.from(btnJoinGame).forEach(element => {
		element.addEventListener("click", function(e){
			e.preventDefault();
		window.location.pathname = 'waitingRoom.html';
		});
	});
});