alert('添加了确定按钮绑定回车, 开始新游戏按钮绑定空格');

// 百内一个随机数[1,100]
let randomNumber = Math.floor(Math.random() * 100) + 1;

// 用常量保存对元素的引用
const guess = document.querySelector('.guess');
const guessSubmit = document.querySelector('.guessSubmit');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

// 计录次数, 重开按钮
let guessCount = 1;
let resetButton;

function checkGuess() {
    //拿到玩家猜的数.
    let guessNumber = Number(guess.value);

    if (guessCount === 1) {
        guesses.textContent += '你猜过的数有: ';
    }

    guesses.textContent += guessNumber + ' ';
    // 先写结束条件
    if (guessNumber === randomNumber) {
        lastResult.textContent = '❀ 恭喜你猜对了 ❀'
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        gameOver();
        guessCount = 10
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!游戏结束!!!';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '';
        gameOver();
    } else if (guessNumber < randomNumber) {
        lastResult.textContent = '你猜错了';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '你猜小了';
    } else if (guessNumber > randomNumber) {
        lastResult.textContent = '你猜错了';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '你猜大了';
    }

    guessCount++;
    guess.value = '';
    guess.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function gameOver() {
    guess.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement('button');
    document.body.appendChild(resetButton);
    resetButton.textContent = '开始新游戏';
    resetButton.addEventListener('click', resetGame);

}

function resetGame() {
    guessCount = 1;

    guess.disabled = false;
    guessSubmit.disabled = false;

    guesses.textContent = '';
    lastResult.textContent = '';
    lastResult.style.backgroundColor = 'white';
    lowOrHi.textContent = '';
    resetButton.parentNode.removeChild(resetButton);

    randomNumber = Math.floor(Math.random() * 100) + 1;

    guess.focus();
}


// 确定绑定回车, 开始新游戏绑定空格
document.onkeydown = function(e) {
    e = e || event;
    if (e.keyCode === 13 && guessCount <= 10) {
        checkGuess();
    } else if (e.keyCode === 32 && guessCount > 10) {
        resetGame();
    }
}