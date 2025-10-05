
let flippedCards = [];
let moves = 0;
let pairFound = 0;
const totalPairs = 4;

let seconds = 0;
let minutes = 0;
let timerInterval;

const cards = document.querySelectorAll(".card");


const movesPara = document.querySelector("#moves");
const pairPara = document.querySelector("#pair-found");
const timer = document.getElementById("Timer");

const msg = document.querySelector(".msg-container");
const newGame = document.querySelector("#new-game");

const soundGameOver = new Audio("gameOver.mp3");

let timerStarted = false;
// function that traggred when user click on cards
const flipCard = () => {
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!timerStarted) {
            startTimer();
            timerStarted = true;
        }
            if(card.classList.contains("flipped") || flippedCards.length === 2){
                return;
            }
            card.classList.add("flipped");
            flippedCards.push(card); //array me store kerne ke liye 

            if(flippedCards.length === 2){
                checkMatch();
            }
        })
    })
}

const checkMatch = () =>{
    moves++;
    updateMoves();
    let card1 = flippedCards[0];
    let card2 = flippedCards[1];

    let value1 = card1.dataset.card;
    let value2 = card2.dataset.card;

    if(value1 === value2){
        pairFound++;
        updatePairs();
        card1.style.pointerEvents = "none";
        card2.style.pointerEvents = "none";
        flippedCards = [];
    }else{
        setTimeout(() =>{
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        },1000);
    }
    //win condition
    if(pairFound === totalPairs){
        clearInterval(timerInterval);
        msg.classList.remove("hide")
        const totalSecondsElapsed = minutes * 60 + seconds;
        const score = (totalPairs * 100) - (moves * 5) - totalSecondsElapsed;
    
        const scorePara = document.getElementById("score");
        scorePara.innerText = `Score: ${score}`;
        soundGameOver.play(); 
    }
};

// reset game function
const resetGame = () => {
    randomIdx();
    moves = 0;
    pairFound = 0;
    updateMoves();
    updatePairs();

    timerStarted = false;
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    timer.innerText = "Timer: 00:00";

    cards.forEach(card => {
    card.classList.remove("flipped");
    card.style.pointerEvents = "auto";
});
    flippedCards = [];

}
// restart the game
newGame.addEventListener("click", () => {
    resetGame();
    msg.classList.add("hide")

});

// timer start when game start
const startTimer = () => {
    timerInterval =setInterval(() => {
        seconds++;

        if(seconds === 60){
            minutes++;
            seconds = 0;
        }

        let min = minutes < 10 ? "0" + minutes : minutes;
        let sec = seconds < 10 ? "0" + seconds: seconds;
        
        timer.innerText = `Timer:${min}:${sec}`;

    },1000);
};

const updateMoves = () => {
    movesPara.innerText = "Moves:" + moves;
}
const updatePairs = () => {
    pairPara.innerText = "Pair found:" + pairFound;
}

// random index
const randomIdx = () => {
    const gameBoard = document.querySelector(".game-board");
    const cards = [...document.querySelectorAll(".card")]; 

    cards.sort(() => Math.random() - 0.5); 

    cards.forEach(card => gameBoard.appendChild(card)); 

}

const playGame = () => {
    randomIdx();
    flipCard();
}
playGame();