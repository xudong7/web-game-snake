let lastRenderTime = 0;
let gameOver = false;
let nextGameLevel = false;
let difficultyLevel = 1;
let LENGTH_TO_NEXT_LEVEL = 10;
const BASE_SNAKE_SPEED = 5;
let SNAKE_SPEED = BASE_SNAKE_SPEED * difficultyLevel;


const gameBoard = document.getElementById("game-board");

const main = (currentTime) => {
    // Check if the player has lost
    if (gameOver) {
        if (confirm("You lost. Press ok to restart.")) {
            window.location.reload();
        }
        return;
    }

    // Check if the game state is saved
    if (localStorage.getItem('nextGameLevel') === 'true') {
        nextGameLevelReload();
        // Clear the game state
        localStorage.removeItem('nextGameLevel');
    }

    // Check if the player has won
    if (nextGameLevel) {
        if (confirm("You won! Press ok to play next level.")) {
            // Save the game state
            localStorage.setItem('nextGameLevel', 'true');
            window.location.reload();
        }
        return;
    }

    // recursively call the main function
    window.requestAnimationFrame(main);
    // set the time between the current and last render
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    // if the time since the last render is less than the speed of the snake, return
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
    // set the last render time to the current time
    lastRenderTime = currentTime;
    update();
    draw();
};

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const difficultySelect = document.getElementById('difficulty-select');
    
    startButton.addEventListener('click', () => {
      const difficulty = difficultySelect.value; // 获取选中的难度系数
      startGame(difficulty); // 调用 startGame 函数并传递难度系数
    });
});
  
// you need to finish the startGame to set difficulty at the beginning
const startGame = (difficulty) => {
    console.log(`Starting game with difficulty: ${difficulty}`);
    // 根据难度系数调整游戏设置
    difficultyLevel = difficulty;
    window.requestAnimationFrame(main);
    // 隐藏开始菜单
    document.getElementById('start-menu').style.display = 'none';
    // 根据难度调整游戏逻辑，例如蛇的速度等
};

  
const update = () => {
    // check if the snake has died
    gameOver = checkDeath();
    nextGameLevel = checkNextLevel();
    // update the snake and food
    updateSnake();
    updateFood();
};

const draw = () => {
    // wipe the game board before drawing the new snake
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
};

const nextGameLevelReload = () => {
    difficultyLevel += 1; // when the player wins, increase the difficulty level
    SNAKE_SPEED = BASE_SNAKE_SPEED * difficultyLevel; // update the snake speed
}

const checkNextLevel = () => {
    // check if the snake has reached the next level
    return snakeBody.length === LENGTH_TO_NEXT_LEVEL;
}

