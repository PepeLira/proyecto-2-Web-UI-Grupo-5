let BASE_URL = "https://trivia-bck.herokuapp.com/api/"

function login (username, password) {
    let path = BASE_URL + "token/";
    fetch(path,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "username": username,
            "password": password,
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("access", data.access);
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}

function gameList (token) {
    let path = BASE_URL + "games/";
    fetch(path,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}

function CreateGame(token, gameName, QTIMER, ATIMER) {
    let path = BASE_URL + "games/";
    fetch(path, {
        method: "POST",
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + token},
        body: JSON.stringify({
            "name": gameName,
            "question_time": QTIMER,
            "answer_time": ATIMER,
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}

function deleteGame(token, gameid){
    let path = BASE_URL + "games/" + gameid + "/";
    fetch(path, {
        method: "DELETE",
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => response.json())
    .then((data) => {
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}

function GetUser(token) {
    let path = BASE_URL + "profile/";
    fetch(path,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}



// gameList("token");