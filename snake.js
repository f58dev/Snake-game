
const landingPage = document.getElementById('landingPage');
const instructionsPage = document.getElementById('instructionsPage');
const gameContainer = document.getElementById('gameContainer');
const gameOverPage = document.getElementById('gameOver');

const startGameBtn = document.getElementById('startGame');
const instructionsBtn = document.getElementById('instructions');
const backToMenuBtn = document.getElementById('backToMenu');
const restartGameBtn = document.getElementById('restartGame');
const backToMenu2Btn = document.getElementById('backToMenu2');

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const finalScoreDisplay = document.getElementById('finalScore');

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let speed = 100;


highScoreDisplay.textContent = highScore;


function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * 20, y: snake[0].y + direction.y * 20 };
    snake.unshift(head);

   
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
        speed = Math.max(50, speed - 2);
    } else {
        snake.pop();
    }


    if (
        head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameLoop);
    finalScoreDisplay.textContent = score;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = highScore;
    }

    gameContainer.style.display = 'none';
    gameOverPage.style.display = 'block';
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
}


startGameBtn.addEventListener('click', () => {
    landingPage.style.display = 'none';
    gameContainer.style.display = 'block';
    direction = { x: 0, y: 0 };
    snake = [{ x: 200, y: 200 }];
    score = 0;
    scoreDisplay.textContent = score;
    speed = 100;
    gameLoop = setInterval(updateGame, speed);
});

instructionsBtn.addEventListener('click', () => {
    landingPage.style.display = 'none';
    instructionsPage.style.display = 'block';
});

backToMenuBtn.addEventListener('click', () => {
    instructionsPage.style.display = 'none';
    landingPage.style.display = 'block';
});

restartGameBtn.addEventListener('click', () => {
    gameOverPage.style.display = 'none';
    gameContainer.style.display = 'block';
    direction = { x: 0, y: 0 };
    snake = [{ x: 200, y: 200 }];
    score = 0;
    scoreDisplay.textContent = score;
    speed = 100;
    gameLoop = setInterval(updateGame, speed);
});

backToMenu2Btn.addEventListener('click', () => {
    gameOverPage.style.display = 'none';
    landingPage.style.display = 'block';
});


document.addEventListener('keydown', event => {
    const { key } = event;
    if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
    if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
    if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
    if (key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
});
