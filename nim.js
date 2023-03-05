import { renderSticks } from "./renderSticks.js";

window.onload = () => {
    const numOfTotalSticks = 11;
    let numOfCurrentSticks = numOfTotalSticks;
    let isPlayer1turn = true;

    const gameMsgBox = document.getElementById("gameMsgBox");

    const player1Container = document.getElementById("player1Container");
    const player1Btn = document.getElementById("player1Btn");
    const player1Text = document.getElementById("player1Input");

    const player2Container = document.getElementById("player2Container");
    const player2Btn = document.getElementById("player2Btn");
    const player2Text = document.getElementById("player2Input");

    // int => array(int)
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
        // player1Text.value = "";
        // player2Text.value = "";
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
        const numOfPicked = isPlayer1turn ? parseInt(player1Text.options[player1Text.selectedIndex].value) : parseInt(player2Text.options[player2Text.selectedIndex].value);
        console.log(numOfPicked);
        console.log(getLegalMove(numOfCurrentSticks));
        if (getLegalMove(numOfCurrentSticks).includes(numOfPicked)) {
            numOfCurrentSticks -= numOfPicked;
            if (numOfCurrentSticks == 0) {
                // current player lost; Game Over
                gameMsgBox.innerHTML = isPlayer1turn ? "<b>Player 2 WIN !</b>" : "<b>Player 1 WIN !</b>";
                player1Container.className = "player-input-disenabled";
                player2Container.className = "player-input-disenabled";
            } else {
                // game ongoing
                gameMsgBox.innerHTML = `<b>${numOfCurrentSticks}</b> LEFT <br> ${isPlayer1turn ? "Player2" : "Player1"} 's turn`;
                otherPlayer();
            }
        }
        else {
            console.log("error: please pick legal moves");
            gameMsgBox.innerHTML = `Warning:<b>${numOfCurrentSticks}</b> Left. <br> ${isPlayer1turn ? "Player1" : "Player2" } 's turn.<br> Please pick ${getLegalMove(numOfCurrentSticks)} stick(s)`;
            if (isPlayer1turn) {
                player1Container.className = "player-input-warning";
                player1Text.value = "";
            } else {
                player2Container.className = "player-input-warning"
                player2Text.value = "";
            }
        }
        // render sticks
        renderSticks(numOfCurrentSticks,canvasWidth,canvasHeight,5,canvasHeight*0.1);
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

    const canvasWidth = 0.7 * window.innerWidth;
    const canvasHeight = 0.5 *  window.innerHeight;
    // function updateSticks() {  
        renderSticks(numOfCurrentSticks,canvasWidth,canvasHeight,5,canvasHeight*0.15); // sticks
    // }
}
