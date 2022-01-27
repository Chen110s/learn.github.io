/**
 * 获取dom
 */
let myHeading = document.querySelector('h1');
let myBtn = document.querySelector('button');
let myImg = document.querySelector('img');

/**
 * 读取用户名
 */
function setUserName(){
    let myName = prompt('请输入您的名字。');
    localStorage.setItem('name',myName);
    myHeading.textContent='Mozilla酷毙了，'+myName;
}

/**
 * 用户初始化代码
 */

if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla 酷毙了，' + storedName;
}

/**
 * 切换火狐logo图片
 */
function changeImage(){
    let mySrc = myImg.getAttribute('src');
    if(mySrc === './images/firefox.png') {
        myImg.setAttribute('src', './images/firefox1.png');
    } else {
        myImg.setAttribute('src', './images/firefox.png');
    }
}

/**
 * 设置按钮点击事件
 */
myBtn.onclick = function() {
    setUserName();
}


myImg.onclick = function(){
    changeImage();
}
