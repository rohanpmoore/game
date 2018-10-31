const TO_WIN = 20;

function Player(name) {
  this.name = name;
  this.score = 0;
}

Player.prototype.addScore = function(amount) {
  this.score += amount;
}

function Game(playerOneName, playerTwoName = "Computer") {
  this.playerOne = new Player(playerOneName);
  this.playerTwo = new Player(playerTwoName);
  this.currentTurn = "playerOne";
  this.currentTotal = 0;
}

Game.prototype.AITurn = function() {
  this.roll();
  this.roll();
  this.nextTurn();
}

Game.prototype.resetTotal = function() {
  this.currentTotal = 0;
}

Game.prototype.nextTurn = function() {
  this.pushTotal();
  this.resetTotal();
  var winner = this.checkForWinner();
  if(winner != "Next Player") {
    hold(this, winner);
  }
  if(this.currentTurn === "playerOne") {
    this.currentTurn = "playerTwo";
    if((this.playerTwo).name === "Computer") {
      this.AITurn();
    }
  } else {
    this.currentTurn = "playerOne";
  }
  hold(this, "");
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
    rollDice(this, 1);
  } else {
    this.currentTotal += rollValue;
    rollDice(this, rollValue);
  }
}

Game.prototype.checkForWinner = function() {
  if((this.playerOne).score >= TO_WIN) {
    return (this.playerOne).name + " wins with " + (this.playerOne).score + " points!";
  } else if((this.playerTwo).score >= TO_WIN) {
    return (this.playerTwo).name + " wins with " + (this.playerTwo).score + " points!";
  }
  return "Next Player";
}

Game.prototype.newGame = function() {
  this.currentTurn = "playerOne";
  this.currentTotal = 0;
  (this.playerOne).score = 0;
  (this.playerTwo).score = 0;
}

function rollDice(game, roll) {
  if(roll === 1) {
    $("#gameStatus").text("Too bad!  You rolled a one!")
    if(game.currentTurn === "playerOne") {
      $("#gameStatus").append("  " + (game.playerOne).name + ", it's your turn!");
    } else {
      $("#gameStatus").append("  " + (game.playerTwo).name + ", it's your turn!");
    }
    $("#turnTotal").text("0");
    $("#currentRoll").text("1");
  } else {
    $("#gameStatus").text("You rolled a " + roll + "!  Would you like to roll again or hold?");
    $("#turnTotal").text((game.currentTotal).toString());
    $("#currentRoll").text(roll.toString());
  }
}

function hold(game, output) {
  $("#playerOneScore").text(((game.playerOne).score).toString());
  $("#playerTwoScore").text(((game.playerTwo).score).toString());
  if(output) {
    $("#turnTotals").hide();
    $("#gameButtons").hide();
    $("#gameEnd").show();
    $("#gameStatus").hide();
    $("#endStatus").text(output);
  } else {
    $("#gameStatus").text("You have ended your turn!");
    $("#turnTotal").text("0");
    $("#currentRoll").text("0");
    if(game.currentTurn === "playerOne") {
      $("#gameStatus").append("  " + (game.playerOne).name + ", it's your turn!");
    } else {
      $("#gameStatus").append("  " + (game.playerTwo).name + ", it's your turn!");
    }
  }
}

$(document).ready(function() {
  var game = new Game("Placeholder1", "Placeholder2");
  $("#namesForm").submit(function(event) {
    event.preventDefault();
    var nameOne = $("#playerOneName").val();
    var nameTwo = $("#playerTwoName").val();
    if(!nameOne) {
      $("#noNameGiven").show();
      return;
    } else if(!nameTwo) {
      game = new Game(nameOne);
    } else {
      game = new Game(nameOne, nameTwo);
    }
    $("#noNameGiven").hide();
    $("#namesForm").hide();
    $("#gameBoard").show();
    $("#gameStatus").text("Welcome to Pig Dice!  " + (game.playerOne).name + ", it's your turn!");
    $("#playerOneNameBox").prepend((game.playerOne).name + "'s ");
    $("#playerTwoNameBox").prepend((game.playerTwo).name + "'s ");
  });
  $("#roll").click(function() {
    game.roll();
  });
  $("#hold").click(function() {
    game.nextTurn();
  });
  $("#newGame").click(function() {
    game.newGame();
    $("#turnTotals").show();
    $("#gameButtons").show();
    $("#gameEnd").hide();
    $("#gameStatus").show();
    $("#gameStatus").text("Welcome to Pig Dice!  " + (game.playerOne).name + ", it's your turn!");
    $("#playerOneScore").text("0");
    $("#playerTwoScore").text("0");
    $("#currentRoll").text("0");
    $("#turnTotal").text("0");
  });
});
