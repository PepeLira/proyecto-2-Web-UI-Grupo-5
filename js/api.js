import {addTokensToStorage} from './dataManagement.js'
import {getGameObjects} from './dataManagement.js'

let BASE_URL = "https://trivia-bck.herokuapp.com/api/"

export function login (username, password) {
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

export function gameList (token) {
    let path = BASE_URL + "games/";
    fetch(path,{
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    })
    .then((response) => response.json())
    .then((data) => {
        let games = getGameObjects(data);
        console.log("Success:", games);
        return "ok"
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
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

export function GetUser(token) {
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



gameList("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNDg1MTU0LCJpYXQiOjE2ODI0NzkyMzMsImp0aSI6IjM3ZDVmOWZhNmFiYTRkMjA4NWVmYTM0YjhmMWU4MDdiIiwidXNlcl9pZCI6MTI0fQ.NSkhuK4CsL-bgOLPZbyaR_i0jOMIIEeunDWeM_CvIRM");