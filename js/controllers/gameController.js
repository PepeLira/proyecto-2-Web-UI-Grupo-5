import {gameList, CreateGame, deleteGame} from '../api.js'
import {Game} from '../models/game.js'
import {getGameObjects} from '../dataManagement.js'

let gamesList = [];

async function fetchReqData(games) {
    gamesList = await games;
}

console.log(gamesList);
export class GameController{ 
    constructor(){     
        gameList(localStorage.getItem("access"), fetchReqData);
        this.games = gamesList;
    }

    async getGames(){
        console.log(this.games);
        return this.games[0];
    }
}