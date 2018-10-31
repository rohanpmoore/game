function Player(name) {
  this.name = name;
  this.score = 0;
}

Player.prototype.addScore = function(amount) {
  this.score += amount;
}

function Game(playerOneName, playerTwoName) {
  this.playerOne = new Player(playerOneName);
  this.playerTwo = new Player(playerTwoName);
  this.currentTurn = "playerOne";
  this.currentTotal = 0;
}

Game.prototype.resetTotal = function() {
  this.currentTotal = 0;
}

Game.prototype.nextTurn = function() {
  this.pushTotal();
  this.resetTotal();
  var winner = this.checkForWinner();
  if(winner != "Next Player") {
    return winner;
  }
  if(this.currentTurn === "playerOne") {
    this.currentTurn = "playerTwo";
  } else {
    this.currentTurn = "playerOne";
  }
  return "";
}

Game.prototype.pushTotal = function() {
  if(this.currentTurn === "playerOne") {
    (this.playerOne).addScore(this.currentTotal);
  } else {
    (this.playerTwo).addScore(this.currentTotal);
  }
}

Game.prototype.roll = function() {
  var rollValue = Math.floor(Math.random() * 6 + 1);
  if(rollValue === 1) {
    this.resetTotal();
    this.nextTurn();
    return;
  }
  this.currentTotal += rollValue;
  return this.currentTotal;
}

Game.prototype.checkForWinner = function() {
  if(this.currentTurn === "playerOne") {
    if((this.playerOne).score >= 100) {
      return "Player One Wins with " + (this.playerOne).score + " points!";
    }
  } else {
    if((this.playerTwo).score >= 100) {
      return "Player Two Wins with " + (this.playerTwo).score + " points!";
    }
  }
  return "Next Player";
}

Game.prototype.newGame = function() {
  this.currentTurn = "playerOne";
  this.currentTotal = 0;
  (this.playerOne).score = 0;
  (this.playerTwo).score = 0;
}
