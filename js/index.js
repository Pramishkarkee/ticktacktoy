let gameOn = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winMatrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

testLogic = () => {
  /* console.log(JSON.stringify(gameState) === JSON.stringify(["X", "", "", "", "", "", "", "", ""])) */
  /* console.log(gameState === ["X", "", "", "", "", "", "", "", ""]) */
  /* Compare above two results and research */
  let chBit = true;
  const filledPlayerpos = (gameState.map((item, index) => {
    if (item === currentPlayer) {
      console.log("this is filte play",index)
      return index;
      
    }
  }))
// })).filter(item => typeof item === "undefined");
  console.log("this is filte play *** data",filledPlayerpos)
  winMatrix.forEach(item => {
          const success = item.every(el => filledPlayerpos.includes(el));
          console.log("you are success ***",success,item)
          if(success) {
            chBit = false;
            console.log("you are success")
          }
  })

  if (!chBit) {
    console.log(currentPlayer, ' Won!!!');
    gameOn = false;
    document.getElementById("turn").innerHTML = "Click Restart to restart the Game";
    document.getElementById("result").innerHTML = currentPlayer + ' Won!!!'
  }
}

handleCellClick = (cell) => {
  const indexClicked = cell.getAttribute('id');
  // alert("ksjdhfksdjf")
  console.log("click %%%%%%%%%%%%%%%",cell,gameState[indexClicked])
  if (gameOn && gameState[indexClicked] === "") {
    // alert("sjgfsdjhfgdsj")
    gameState[indexClicked] = currentPlayer;
    document.getElementById(indexClicked).innerHTML = currentPlayer;
    /*Logic for Win*/
    testLogic();
    console.log("current player",currentPlayer,gameOn)
    if (gameOn && (currentPlayer === "X")) {
      currentPlayer = "O"
      document.getElementById("turn").innerHTML = "Turn of: " + currentPlayer;
    } else if (gameOn && currentPlayer === "O") {
      currentPlayer = "X"
      document.getElementById("turn").innerHTML = "Turn of: " + currentPlayer;
    }


    if (!gameState.includes("")) {
      gameOn = false;
      document.getElementById("result").innerHTML += " Game Over."
      document.getElementById("turn").innerHTML = "Click Restart to restart the Game";
    }
  } else {
    console.log('already clicked');
  }
}

handleRestart = () => {
  gameState = ["", "", "", "", "", "", "", "", "O"];
  gameOn = true;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerHTML = "";
  });
  document.getElementById("result").innerHTML = ""
  document.getElementById("turn").innerHTML = "Start By X";
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', () => handleCellClick(cell)));
document.getElementById("btn").addEventListener("click", handleRestart);
