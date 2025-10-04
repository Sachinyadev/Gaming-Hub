let randomNum = Math.floor(Math.random() * 100) + 1;
let userAttempts = 5;

const userInput = document.querySelector("#guess");
const checkBtn = document.querySelector("#check-btn");
const msg = document.querySelector("#msg");
const attempts = document.querySelector("#attempts");
const resetBtn = document.querySelector("#reset-btn");

const soundWin = new Audio("win.mp3");
const soundWrong = new Audio("loss.mp3");
const soundGameOver = new Audio("gameOver.mp3");

const playGame = () => {
    checkBtn.addEventListener("click", () => { 
        const userGuess = Number(userInput.value);

        if(!userGuess || userGuess < 1 || userGuess > 100){
            msg.innerText = "Please enter a number between 1 and 100!";
            return;
        }

        userAttempts--;
        attempts.innerText = userAttempts;

        if(userAttempts <= 2){
            attempts.style.color = "red";
        } else if(userAttempts <= 4){
            attempts.style.color = "orange";
        } else {
            attempts.style.color = "green";
        }

        // user wins
        if(userGuess === randomNum){
            msg.innerText = "🎉 Correct! You win!";
            msg.classList.add("win-msg");
            msg.classList.remove("loss-msg");
            checkBtn.disabled = true;
            soundWin.play(); 

        } else if(userGuess < randomNum){
            msg.innerText = "⬇ Too Low! Guess again";
            soundWrong.play(); 
        } else {
            msg.innerText = "⬆ Too High! Guess again";
            soundWrong.play(); 
        }

        // user loses
        if(userAttempts === 0 && userGuess !== randomNum){
            msg.innerText = `❌ Game Over! Number was ${randomNum}`;
            msg.classList.add("loss-msg");
            msg.classList.remove("win-msg");
            checkBtn.disabled = true;
            soundGameOver.play(); 
        }

        userInput.value = "";
    });
};
playGame();

// reset the game
const resetGame = () => {
    [soundWin, soundWrong, soundGameOver].forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });

    randomNum = Math.floor(Math.random() * 100) + 1;
    userAttempts = 5;
    attempts.innerText = userAttempts;
    attempts.style.color = "green"; 
    msg.innerText = "Play the Game";
    msg.classList.remove("win-msg", "loss-msg");
    userInput.value = "";
    checkBtn.disabled = false;
};

resetBtn.addEventListener("click", resetGame);
