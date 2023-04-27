import {addTokensToStorage} from './dataManagement.js'
import {renewTokens, getGameObjects, getGameObject} from './dataManagement.js'

let BASE_URL = "https://trivia-bck.herokuapp.com/api/"

export async function login (username, password) {
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
        addTokensToStorage(data)
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}

export function refreshLogin (token) {
    let path = BASE_URL + "token/refresh/";
    let formData = new FormData();
    formData.append("refresh", token);

    fetch(path, {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        renewTokens(data)
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}


export async function gameList(token, callback) {
    try {
        const path = BASE_URL + "games/";
        const response = await fetch(path, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });
        const data = await response.json();
        const games = getGameObjects(data);
        callback(games);
    } catch (error) {
        console.log("Error", error);
        return error;
    }
}

export async function gameData(token, id, callback) {
    try {
        const path = BASE_URL + "games/";
        const response = await fetch(path, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });
        const data = await response.json();
        console.log(data);
        const game = getGameObject(data, id);
        callback(game);
    } catch (error) {
        console.log("Error", error);
        return error;
    }
}

export function CreateGame(token, gameName, QTIMER, ATIMER) {
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
        localStorage.setItem("joinedGame", data.id);
        setTimeout(function(){ window.location.pathname = 'waitingRoom.html';}, 1000);
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}

export function deleteGame(token, gameid){
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

export function getUser(token) {
    let path = BASE_URL + "profile/";
    fetch(path,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        localStorage.setItem("currentUserId", data.id)
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}

//https://trivia-bck.herokuapp.com/api/games/gameid/join_game/
export function JoinGame(token, gameID) {
    let path = BASE_URL + "games/" + gameID + "/" + "join_game/";
    fetch(path,{
        method: 'POST',
        headers: {"Content-Type": "application/json", 'Authorization': 'Bearer ' + token}
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        setTimeout(function(){ window.location.pathname = 'waitingRoom.html';}, 1000);
        //window.location.pathname = 'waitingRoom.html';
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}