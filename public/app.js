var scores, roundScore, activePlayer, dice, playingGame, lastDice;

init();

document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (playingGame) {
    // 1. random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. display result
    document.querySelector("#dice-1").style.display = "block";
    document.querySelector("#dice-1").src = "dice-" + dice1 + ".png";

    document.querySelector("#dice-2").style.display = "block";
    document.querySelector("#dice-2").src = "dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      // next player
      nextPlayer();
    }

    // if (dice === 6 && lastDice === 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector("#score-" + activePlayer).textContent = 0;
    //   nextPlayer();
    // }
    // // 3. update score if roll not a number 1
    // else if (dice !== 1) {
    //   roundScore += dice;
    //   document.querySelector("#current-" + activePlayer).textContent = roundScore;
    // } else {
    //   // next player
    //   nextPlayer();
    // }
    // lastDice = dice;
  } else {
    init();
    alert('The new game is created!');
  }

});

document.querySelector(".btn-hold").addEventListener("click", function () {

  if (playingGame) {
    // add current score to global score
    scores[activePlayer] += roundScore;

    // update to UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    // undefined, 0, null, "" are coerced to false
    // anything else is coerced to true
    var winnerScore;
    if (input) {
      winnerScore = input;
    } else {
      winnerScore = 100;
    }

    // check if player won the game
    if (scores[activePlayer] >= winnerScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";

      document.querySelector("#dice-1").style.display = "none";
      document.querySelector("#dice-2").style.display = "none";

      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      playingGame = false;
    } else {
      // next player
      nextPlayer();
    }
  } else {
    init();
    alert('The new game is created!');
  }

});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  activePlayer = 0;
  scores = [0, 0];
  roundScore = 0;
  playingGame = true;

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";

  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  document.querySelector("#name-0").textContent = "PLAYER 1";
  document.querySelector("#name-1").textContent = "PLAYER 2";


  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}