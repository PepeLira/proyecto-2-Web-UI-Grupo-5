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



// gameList("token");