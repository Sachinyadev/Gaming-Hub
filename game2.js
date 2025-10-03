let userScore = 0;
let compScore = 0;
const maxScore = 5;

const choices = document.querySelectorAll(".choice");
const msgContainer = document.querySelector(".msg-container");
const scoreBoard = document.querySelector(".score-board");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const finalWinner = document.querySelector(".final-container");
const winner = document.querySelector("#winner");
const newGameBtn = document.querySelector("#new-game");

finalWinner.classList.add("hide");

const genCompChoice = () => {
    const options = ["rock","paper","scissor"];
    const randomIdx = Math.floor(Math.random()*3);
    return options[randomIdx];
}

const checkWinner = (userChoice,compChoice) => {
    if(userChoice === compChoice){
        return "gameDraw"
    } else {
        if(userChoice === "rock"){
            return (compChoice === "scissor") ? "userWin" : "compWin";
        } else if(userChoice === "scissor"){
            return (compChoice === "paper") ? "userWin" : "compWin";
        } else { 
            return (compChoice === "rock") ? "userWin" : "compWin";
        }
    }
}

const updateScore = (result) => {
    if(result === "userWin"){
        userScore++;
        userScorePara.innerText = userScore;
    } else if(result === "compWin") {
        compScore++;
        compScorePara.innerText = compScore;
    }
}

const showWinner = (result,userChoice,compChoice) => {
    if(result === "gameDraw"){
        msg.innerText = "Game Draw!, Play again";
        msg.classList.remove("win-msg","loss-msg");
    } else if(result === "userWin"){
        msg.innerText = `You Win!, Your ${userChoice} beats ${compChoice}`;
        msg.classList.add("win-msg");
        msg.classList.remove("loss-msg");
    } else { 
        msg.innerText = `You Loss!, ${compChoice} beats Your ${userChoice}`;
        msg.classList.add("loss-msg");
        msg.classList.remove("win-msg");
    }
}

const showFinalWinner = () => {
    if(userScore === maxScore){
        winner.innerText = "🎉BOOHYA!🎉"; 

    } else if(compScore === maxScore){
        winner.innerText = "You Lost! 😢❌";
        
    }
    document.querySelector(".choices").classList.add("hide");
    scoreBoard.classList.add("hide");
    msgContainer.classList.add("hide");

    finalWinner.classList.remove("hide");
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    const result = checkWinner(userChoice,compChoice);

    updateScore(result);
    if(userScore === maxScore || compScore === maxScore){
        showFinalWinner(); 
        return; 
    }
    showWinner(result,userChoice,compChoice);
}

// new gmae 
newGameBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;

    document.querySelector(".choices").classList.remove("hide");
    scoreBoard.classList.remove("hide");
    msgContainer.classList.remove("hide");
    finalWinner.classList.add("hide");

    msg.innerText = "Play Your Turn";
    msg.classList.remove("win-msg", "loss-msg");
});

choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
