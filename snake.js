// TODO 1.1: Create the snake

const snakeBody = [
    { x: 11, y: 11 },
    { x: 11, y: 10 },
    { x: 11, y: 9 }
];
  
const updateSnake = () => {
    // move the nth segment to the n-1th segment which means the snake will move forward
    // remember that the head of the snake is the first element of the snakeBody array
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // create a new object to avoid reference issues
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    const inputDirection = getInputDirection();
    // the head of the snake will move based on the input direction
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

// TODO 1.2: Create a function that updates the snake
// Hint: Search for the documentation for the Array pop() and unshift() methods
// in the MDN docs.

// Don't change this function!
const drawSnake = (gameBoard) => {
    // loop through the snakeBody array and create a div element for each segment
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        // create a div element for the snake segment
        const snakeElement = document.createElement("div");
        // set the position of the snake segment
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        // add the snake class to the snake segment
        snakeElement.classList.add("snake");
        // append the snake segment to the game board to display it
        gameBoard.appendChild(snakeElement);
    }
};


const onSnake = (position) => {
    // check if the position is on the snake
    for(let i = 0; i < snakeBody.length; i++) {
        if(equalPositions(snakeBody[i], position)) {
            return true;
        }
    }
    return false;
}

const equalPositions = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

const expandSnake = (amount) => {
    for (let i = 0; i < amount; i++) {
        // get the last segment of the snake
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
}

const checkDeath = () => {
    // check if the snake is outside the game board
    return isSnakeOutsideGrid() || isSnakeIntersection();
}

const isSnakeOutsideGrid = () => {
    // check if the head of the snake is outside the grid
    return isOutsideGrid(snakeBody[0]);
}

const isOutsideGrid = (position) => {
    // check if the position is outside the grid
    return position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21;
}

const isSnakeIntersection = () => {
    // check if the head of the snake is on the snake body
    return isIntersection(snakeBody[0], snakeBody.length - 1);
}

const isIntersection = (position, index) => {   
    // check if the position is on the snake body
    for (let i = 1; i < index; i++) {
        if (equalPositions(position, snakeBody[i])) {
            return true;
        }
    }
    return false;
}