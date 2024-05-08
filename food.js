let foodPosition = { x: 5, y: 18 };
const EXPANSION_RATE = 1;

const updateFood = () => {
    if (onSnake(foodPosition)) {
        // expand snake and generate new food
        expandSnake(EXPANSION_RATE);
        // move food to new position
        foodPosition = getRandomFoodPosition();
    }
}

const drawFood = (gameBoard) => {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

const getRandomFoodPosition = () => {
    let newFoodPosition = randomGridPosition();
    // if the new food position is on the snake, generate a new position
    while (onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    // when the new food position is not on the snake, return it
    return newFoodPosition;
}

const getRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * 21) + 1,
        y: Math.floor(Math.random() * 21) + 1
    }
}
