let randomNumber = Math.floor((Math.random() * 100) + 1);

let guess = document.querySelector('.guess');
let guessSubmit = document.querySelector('.guessSubmit');

let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessCount = 1;
let resetButton;

function checkGuess() {

    let guessNumber = Number(guess.value);

    if (guessCount === 1) {
        guesses.textContent += '猜过的数有: ';
    }
    guesses.textContent += guessNumber + ' ';

    if (guessNumber === randomNumber) {
        lastResult.textContent = '恭喜, 你猜对了!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        gameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!! Game Over !!!';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '';
        gameOver();
    } else if (guessNumber < randomNumber) {
        lastResult.textContent = '猜错了';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '你猜的数低了';
        guess.focus();

    } else if (guessNumber > randomNumber) {
        lastResult.textContent = '猜错了';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '你猜的数高了';
        guess.focus();
    }

    guessCount++;
    guess.value = '';
}
guessSubmit.addEventListener('click', checkGuess);

function gameOver() {
    guess.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement('button');
    resetButton.textContent = '开始新游戏';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    console.log('resetGame');
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guess.disabled = false;
    guessSubmit.disabled = false;
    guess.value = '';
    guess.focus();

    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}