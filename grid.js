const GRID_SIZE = 21

const randomGridPosition = () => {
    return {
        // give a random x and y position within the grid from 1 to 21
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}