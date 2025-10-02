let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let newGame = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let moves = 0;

let winPatterns = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

// Reset game
const resetGame = () => {
  turnO = true;
  moves = 0;
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("playerO", "playerX", "winner");
  });
  msgContainer.classList.add("hide");
  document.querySelector(".container").style.marginTop = "0"; 
  document.querySelector(".container").style.opacity = "1"; 
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = winner === "O" ? "You won!" : "Computer won!";
  msgContainer.classList.remove("hide");
  disableBoxes();
  document.querySelector(".container").style.opacity = "0.3";
  document.querySelector(".container").style.marginTop = "50vh"; 
};

// Check winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let valA = boxes[a].innerText;
    let valB = boxes[b].innerText;
    let valC = boxes[c].innerText;

    if (valA && valA === valB && valB === valC) {
      boxes[a].classList.add("winner");
      boxes[b].classList.add("winner");
      boxes[c].classList.add("winner");
      showWinner(valA);
      return true;
    }
  }
  return false;
};

// Check draw
const checkDraw = () => {
  if (moves === 9 && msg.innerText === "") {
    msg.innerText = "Match was draw!";
    msgContainer.classList.remove("hide");
    document.querySelector(".container").style.opacity = "0.3";
    document.querySelector(".container").style.marginTop = "50vh";
  }
};

// Computer move
const computerMove = () => {
  const emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
  if (emptyBoxes.length === 0) return;

  const box = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  box.innerText = "X";
  box.classList.add("playerX");
  box.disabled = true;
  moves++;

  if (!checkWinner()) checkDraw();
  turnO = true;
};

// User move
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (!turnO || box.innerText !== "") return;

    box.innerText = "O";
    box.classList.add("playerO");
    box.disabled = true;
    moves++;

    if (!checkWinner()) {
      checkDraw();
      turnO = false;
      setTimeout(computerMove, 500);
    }
  });
});

resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
