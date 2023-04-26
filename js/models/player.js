export class Player {
    constructor(id, username) {
      this.id = id;
      this.username = username;
      this.score = 0;
      this.connected = false;
      this.joined = false;
      this.disqualified = false;
    }
  
    addPoints(points) {
      this.score += points;
    }
  
    connect() {
      this.connected = true;
    }
  
    disconnect() {
      this.connected = false;
    }
  
    join() {
      this.joined = true;
    }
  
    unjoin() {
      this.joined = false;
    }
  
    disqualify() {
      this.disqualified = true;
    }
  
    isDisqualified() {
      return this.disqualified;
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        score: this.score,
        connected: this.connected,
        joined: this.joined,
        disqualified: this.disqualified,
      };
    }
  
    static fromJSON(json) {
      const player = new Player(json.id, json.name);
  
      player.score = json.score;
      player.connected = json.connected;
      player.joined = json.joined;
      player.disqualified = json.disqualified;
  
      return player;
    }
  }
  