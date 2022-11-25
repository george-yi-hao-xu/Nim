const numOfTotalSticks = 21;
let numOfCurrentSticks = numOfTotalSticks;
let isPlayer1turn = true;

const gameMsgBox = document.getElementById("gameMsgBox");

const player1Container = document.getElementById("player1Container");
const player1Btn = document.getElementById("player1Btn");
const player1Text = document.getElementById("player1Input");

const player2Container = document.getElementById("player2Container");
const player2Btn = document.getElementById("player2Btn");
const player2Text = document.getElementById("player2Input");

// int => list(int)
let getLegalMove = (numOfCurrentSticks) => {
    switch (numOfCurrentSticks) {
        case 1:
            return [1];
        case 2:
            return [1, 2];
        default:
            return [1, 2, 3];
    }
};

let otherPlayer = () => {
    player1Text.value = "";
    player2Text.value = "";
    if (isPlayer1turn) {
        isPlayer1turn = false;
        player1Container.className = "player-input-disenabled";
        player2Container.className = "player-input-enabled";
    } else {
        isPlayer1turn = true;
        player1Container.className = "player-input-enabled";
        player2Container.className = "player-input-disenabled";
    }
};

let nextMove = () => {
    //const currentPlayerName = isPlayer1turn? "Player1" : "Player2";
    const numOfPicked = isPlayer1turn ? parseInt(player1Text.value) : parseInt(player2Text.value);
    console.log(numOfPicked);
    console.log(getLegalMove(numOfCurrentSticks));
    if (getLegalMove(numOfCurrentSticks).includes(numOfPicked)) {
        numOfCurrentSticks -= numOfPicked;
        if (numOfCurrentSticks == 0) {
            // current player lost; Game Over
            gameMsgBox.innerText = isPlayer1turn ? "Player 2 WIN !" : "Player 1 WIN !";
            player1Container.className = "player-input-disenabled";
            player2Container.className = "player-input-disenabled";
        } else {
            // game ongoing
            gameMsgBox.innerHTML = `Now there are <b>${numOfCurrentSticks}</b> on the table. <br> It is ${isPlayer1turn ? "Player2" : "Player1"}'s turn`;
            otherPlayer();
        }
    }
    else {
        console.log("error: please pick legal moves");
        gameMsgBox.innerHTML = `Now there are <b>${numOfCurrentSticks}</b> on the table. <br> It is ${isPlayer1turn ? "Player2" : "Player1"}'s turn.<br> Please pick ${getLegalMove(numOfCurrentSticks)} stick(s)`;
        if (isPlayer1turn) {
            player1Container.className = "player-input-warning";
            player1Text.value = "";
        } else {
            player2Container.className = "player-input-warning"
            player2Text.value = "";
        }
    }
};

let releaseWarning = () => {
    if (isPlayer1turn) {
        if (player1Container.className == "player-input-warning") {
            player1Container.className = "player-input-enabled";
        }
    } else {
        if (player2Container.className == "player-input-warning") {
            player2Container.className = "player-input-enabled";
        }
    }
};

player1Btn.addEventListener("click", nextMove);
player2Btn.addEventListener("click", nextMove);

player1Text.addEventListener("click", releaseWarning);
player2Text.addEventListener("click", releaseWarning);