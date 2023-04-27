import { Game } from "./models/game.js";

export function addTokensToStorage(data){
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("access", data.access);
}

export function renewTokens(data){
    localStorage.setItem("access", data.access);
}


export function getGameObjects(data){
    let gameObjects = [];
    for (let i = 0; i < data.length; i++) {
        gameObjects.push(new Game(data[i].id,data[i].name, data[i].creator, data[i].created, data[i].player_count, data[i].players, data[i].i_can_start, data[i].question_time, data[i].answer_time, data[i].rounds_number));
    }
    return gameObjects;
}

export function getGameObject(data, id){
    for (let i = 0; i < data.length; i++) {
        if(data[i].id == id){
            return new Game(data[i].id,data[i].name, data[i].creator, data[i].created, data[i].player_count, data[i].players, data[i].i_can_start, data[i].question_time, data[i].answer_time, data[i].rounds_number);
        }
    }
    return "not found";
}