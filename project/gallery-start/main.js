// 大图
const displayedImage = document.querySelector('.displayed-img');

// 小图
const thumbBar = document.querySelector('.thumb-bar');

// 变暗按钮
const btn = document.querySelector('button');
// 实际变暗
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */
for (let i = 1; i < 6; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `./images/pic${i}.jpg`);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', showImg);
}
// e.target 才事件对象本身
function showImg(e) {
    displayedImage.src = e.target.src;
}

/* 编写 变暗/变量 按钮功能 */

btn.addEventListener('click', change);

function change() {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = '变亮';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'; //黑色,不透明度50%
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = '变暗';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)'; //黑色,不透明度100%
    }
}