import { Game } from "./models/game.js";
import { Player } from "./models/player.js";

export function addTokensToStorage(data){
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("access", data.access);
}


export function getGameObjects(data){
    let gameObjects = [];
    for (let i = 0; i < data.length; i++) {
        gameObjects.push(new Game(data[i].id, data[i].name, data[i].question_time, data[i].answer_time, data[i].status, data[i].players, data[i].questions));
    }
    return gameObjects;
}