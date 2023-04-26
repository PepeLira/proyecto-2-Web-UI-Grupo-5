export class Game {
    constructor(id,name ,creator, created, playerCount, players, iCanStart, questionTime, answerTime, roundsNumber) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.created = created;
        this.playerCount = playerCount;
        this.players = players;
        this.iCanStart = iCanStart;
        this.questionTime = questionTime;
        this.answerTime = answerTime;
        this.roundsNumber = roundsNumber;
        this.currentQuestionIndex = -1;
        this.currentAskerIndex = -1;
        this.answers = {};
        this.qualifications = {};
        this.started = false;
        this.ended = false;
    }
  
    addPlayer(player) {
      this.players[player.id] = player;
    }
  
    removePlayer(playerId) {
      delete this.players[playerId];
    }
  
    getPlayers() {
      return Object.values(this.players);
    }
  
    getRound() {
      if (this.currentRoundIndex === -1) {
        return null;
      }
  
      return this.rounds[this.currentRoundIndex];
    }
  
    getCurrentQuestion() {
      const round = this.getRound();
  
      if (!round) {
        return null;
      }
  
      return round.questions[this.currentQuestionIndex];
    }
  
    getCurrentAsker() {
      const round = this.getRound();
  
      if (!round) {
        return null;
      }
  
      return round.askers[this.currentAskerIndex];
    }
  
    getScoreboard() {
      return Object.values(this.players)
        .sort((a, b) => b.score - a.score)
        .map((player) => ({ id: player.id, name: player.name, score: player.score }));
    }
  
    getWinner() {
      const scoreboard = this.getScoreboard();
  
      if (scoreboard.length === 0) {
        return null;
      }
  
      return scoreboard[0];
    }
  
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            creator: this.creator,
            created: this.created,
            playerCount: this.playerCount,
            players: this.players,
            iCanStart: this.iCanStart,
            questionTime: this.questionTime,
            answerTime: this.answerTime,
            roundsNumber: this.roundsNumber,
            currentQuestionIndex: this.currentQuestionIndex,
            currentAskerIndex: this.currentAskerIndex,
            answers: this.answers,
            qualifications: this.qualifications,
            started: this.started,
            ended: this.ended,
        };
    }
  
    static fromJSON(json) {
        const game = new Game(
            json.id,
            json.name,
            json.creator, 
            json.created, 
            json.playerCount, 
            json.players, 
            json.iCanStart, 
            json.questionTime, 
            json.answerTime, 
            json.roundsNumber
        );
  
        game.currentQuestionIndex = json.currentQuestionIndex
        game.currentAskerIndex = json.currentAskerIndex
        game.answers = json.answers
        game.qualifications = json.qualifications
        game.started = json.started
        game.ended = json.ended
  
        return game;    
    }
  }