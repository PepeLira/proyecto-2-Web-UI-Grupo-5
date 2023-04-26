let BASE_URL = "https://trivia-bck.herokuapp.com/api/"

export function login(username, password) {
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
        return data;
    })
    .catch((error) => {
        console.log("Error", error);
        return error;
    })
}