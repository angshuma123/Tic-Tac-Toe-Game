const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// Creating variables
let currentPlayer;
let gameGrid;

// Defining winning postions in the game
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


// function to initialise the game
function initGame() {
    // Setting current player as X
    currentPlayer = "X";

    gameGrid = ["","","","","","","","",""];

    // Intialising Boxes to blank
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //initialise each box with respective css properties again
        box.classList = `box box${index+1}`;
    });

    // Removing the active class from new game button
    newGameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

// Function for swapping turn after each turn 
function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Fuction for checking if game is over
function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // All 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                // Check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 

                // Disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // Adding win class to the boxes
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
  });

  // If answer is not blank - There is a winner
  if( answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
  }

  //If no Winner Found , checking if there is a tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
  });

  // Board is Filled, game is tied
  if(fillCount === 9) {
      gameInfo.innerText = "Game Tied !";
      newGameBtn.classList.add("active");
  }

}

// Function for handling clicks on boxes
function handleClick(index) {
  if(gameGrid[index] === "" ) {
      boxes[index].innerText = currentPlayer;
      gameGrid[index] = currentPlayer;
      boxes[index].style.pointerEvents = "none";
      //swaping turn after a click
      swapTurn();
      //checking if there is a winner
      checkGameOver();
  }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

// After clicking on new button initGame function in called
newGameBtn.addEventListener("click", initGame);
