/**
 * 更改:
 * 1. 恶魔球不会出界
 * 2. 彩球不会静止
 * 3. 恶魔球会随着吞噬彩球而不断变大
 */

//彩球数
let count = 0;

// 创建段落引用
const para = document.querySelector('p');

// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //指定画布绘制类型为2d

// 浏览器窗口大小
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// 生成随机数的函数

function random(min, max) { //尺寸
    return Math.floor(Math.random() * (max - min)) + min;
}

// 随机颜色
function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}

// Shape构造器 -- 属性--------------------------------------------------

function Shape(x, y, velX, velY, exists) {
    this.x = x; //开始位置
    this.y = y;
    this.velX = velX; //水平速度
    this.velY = velY;
    this.exists = exists;
}


// 小球的构造器--------------------------------------------------
function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;


// 原型上写方法
// 绘制方法
Ball.prototype.draw = function() {
    ctx.beginPath(); //开始画
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //圆心, 半径, 弧度
    ctx.fill(); //画完
}


// 移动规则(球碰界,反弹, 移动)
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) { //范围
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    // 移动 
    this.x += this.velX;
    this.y += this.velY;
}

// 碰撞检测
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j]) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size && balls[j].exists) {
                balls[j].color = this.color = randomColor();
            }
        }
    }
}


// 恶魔圈--------------------------------------------------
function EvilCircle(x, y, velX = 20, velY = 20, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists)
    this.color = color;
    this.size = size;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
    ctx.beginPath(); //开始画
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //圆心, 半径, 弧度
    ctx.stroke(); //画完
}

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.x = width - this.size - 1.5;
    }

    if ((this.x - this.size) <= 0) {
        this.x = this.size + 1.5;
    }

    if ((this.y + this.size) >= height) {
        this.y = height - this.size - 1.5;
    }

    if ((this.y - this.size) <= 0) {
        this.y = this.size + 1.5;
    }
}

EvilCircle.prototype.setControls = function() {
    window.onkeydown = e => {
        switch (e.key) {
            case 'a':
            case 'A':
            case 'ArrowLeft':

                this.x -= this.velX;
                break;
            case 'd':
            case 'D':
            case 'ArrowRight':
                this.x += this.velX;
                break;
            case 'w':
            case 'W':
            case 'ArrowUp':
                this.y -= this.velY;
                break;
            case 's':
            case 'S':
            case 'ArrowDown':
                this.y += this.velY;
                break;
        }
    };
}

EvilCircle.prototype.collisionDetect = function() {
    for (const ball of balls) {
        if (ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
                ball.exists = false;
                count--;
                this.size += 5;
                para.textContent = '剩余彩球数量: ' + count;
            }
        }
    }
}


// 定义一个数组，生成并保存所有的球
const balls = [];

while (balls.length < 45) { //彩球个数
    const size = random(10, 20);
    let ball = new Ball(
        // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(0.5, 7),
        random(0.1, 7),
        true,
        randomColor(),
        size
    );
    balls.push(ball);
    count++;
    para.textContent = '剩余彩球数量: ' + count;
}

let evil = new EvilCircle(random(0, width), random(0, height), 20, 20, true, 'white', 10);
evil.setControls();

// 移动
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //画布底色
    ctx.fillRect(0, 0, width, height); //画布大小

    for (let i = 0; i < balls.length; i++) { //将所有的彩球画出来, 并更新
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect(); //碰撞, 同色
        }
    }

    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();

    requestAnimationFrame(loop);
}

loop(); //彩球移动;