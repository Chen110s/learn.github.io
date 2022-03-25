// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //指定画布绘制类型为2d

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

// 小球的构造器 -- 属性

function Ball(x, y, velX, velY, color, size) {
    this.x = x; //开始位置
    this.y = y;
    this.velX = velX; //水平速度
    this.velY = velY;
    this.color = color;
    this.size = size;
}

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

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
            }
        }
    }
}

// 动起来
// 生成样式
let balls = [];

while (balls.length < 25) { //彩球个数
    let size = random(10, 20);
    let ball = new Ball(
        // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomColor(),
        size
    );
    balls.push(ball);
}

// 移动
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //画布底色
    ctx.fillRect(0, 0, width, height); //画布大小

    for (let i = 0; i < balls.length; i++) { //将所有的彩球画出来, 并更新
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect(); //碰撞, 同色
    }

    requestAnimationFrame(loop);
}

loop(); //彩球移动