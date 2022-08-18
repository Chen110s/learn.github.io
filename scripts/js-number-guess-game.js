/**
 * 添加保留数据的变量; 
 * --------------------------------------------------
 */
// 随机1到100, 向下取整. 
let randomNumber = Math.floor(Math.random() * 100) + 1;

// 定义常量 -- 保存对界面元素的引用
// 结果
const guesses = document.querySelector('.guesses'); //之前猜的数
const lastResult = document.querySelector('.lastResult'); //上次是对还是错
const lowOrHi = document.querySelector('.lowOrHi'); //上次高了还是低了

// 猜测
const guessSubmit = document.querySelector('.guessSubmit'); //提交
const guessField = document.querySelector('.guessField'); //输入这次猜的数

// 猜测次数, 开启新游戏按钮
let guessCount = 1;
let resetButton;

// 函数:猜数
// --------------------------------------------------
function checkGuess() {
    let userGuess = Number(guessField.value); //取出玩家输入的数
    if (guessCount === 1) { //第一次输入数字
        guesses.textContent = '上次猜的数：'; //初始化猜数过程记录的开头
    }
    guesses.textContent += userGuess + ' '; //更新猜数过程记录

    // 判断
    if (userGuess === randomNumber) {
        lastResult.textContent = '恭喜你！猜对了';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = '你猜错了！';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = '你猜低了！';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = '你猜高了';
        }
    }

    // 判断出错, 猜测次数+1, 猜数数字清空, 将焦点赋予猜数的输入框
    guessCount++;
    guessField.value = '';
    guessField.focus();
}
// 事件监听 -- 提交
// --------------------------------------------------
guessSubmit.addEventListener('click', checkGuess);

// 函数: 游戏结束
// --------------------------------------------------
function setGameOver() {
    guessField.disabled = true; //输入框,确定按钮不可选中
    guessSubmit.disabled = true;
    resetButton = document.createElement('button'); //添加一个新按钮 -- 开始新游戏
    resetButton.textContent = '开始新游戏';
    document.body.appendChild(resetButton); //放到内容的结尾
    resetButton.addEventListener('click', resetGame); //设置监听
}

// 函数: 开始新游戏
// --------------------------------------------------
function resetGame() {
    guessCount = 1; //次数重设为1

    // 提示重设
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    // 删除重新开始按钮
    resetButton.parentNode.removeChild('resetButton');

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';
    // 重新生成一个数
    randomNumber = Math.floor(Math.random() * 100) + 1;
}