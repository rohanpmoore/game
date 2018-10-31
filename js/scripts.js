const TO_WIN = 20;

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
    return 1;
  }
  this.currentTotal += rollValue;
  return rollValue;
}

Game.prototype.checkForWinner = function() {
  if(this.currentTurn === "playerOne") {
    if((this.playerOne).score >= TO_WIN) {
      return (this.playerOne).name + " wins with " + (this.playerOne).score + " points!";
    }
  } else {
    if((this.playerTwo).score >= TO_WIN) {
      return (this.playerTwo).name + " wins with " + (this.playerTwo).score + " points!";
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

$(document).ready(function() {
  var game = new Game("Placeholder1", "Placeholder2");
  $("#namesForm").submit(function(event) {
    event.preventDefault();
    var nameOne = $("#playerOneName").val();
    var nameTwo = $("#playerTwoName").val();
    if(!nameOne || !nameTwo) {
      $("#noNameGiven").show();
      return;
    }
    $("#noNameGiven").hide();
    $("#namesForm").hide();
    $("#gameBoard").show();
    game = new Game(nameOne, nameTwo);
    $("#gameStatus").text("Welcome to Pig Dice!  " + (game.playerOne).name + ", it's your turn!");
    $("#playerOneNameBox").prepend(nameOne + "'s ");
    $("#playerTwoNameBox").prepend(nameTwo + "'s ");
  });
  $("#roll").click(function() {
    var roll = game.roll();
    if(game.currentTotal === 0) {
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
  });
  $("#hold").click(function() {
    var output = game.nextTurn();
    $("#playerOneScore").text(((game.playerOne).score).toString())
    $("#playerTwoScore").text(((game.playerTwo).score).toString())
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
  });
});
