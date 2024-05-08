let inputDirection = {x: 0, y: 1};
let lastInputDirection = {x: 0, y: 1};


window.addEventListener('keydown', e => {
    // add 'and' to avoid 180 degree turns
    if(e.key === 'ArrowUp' && lastInputDirection.x !== 0) {
        if(lastInputDirection.y !== 0) return;
        inputDirection = {x: 0, y: -1};
    }
    else if(e.key === 'ArrowDown' && lastInputDirection.x !== 0) {
        if(lastInputDirection.y !== 0) return;
        inputDirection = {x: 0, y: 1};
    }
    else if(e.key === 'ArrowLeft' && lastInputDirection.y !== 0) {
        if(lastInputDirection.x !== 0) return;
        inputDirection = {x: -1, y: 0};
    }
    else if(e.key === 'ArrowRight' && lastInputDirection.y !== 0) {
        if(lastInputDirection.x !== 0) return;
        inputDirection = {x: 1, y: 0};
    }
});

let getInputDirection = () => {
    // change the last input direction to the current input direction
    lastInputDirection = inputDirection;
    return inputDirection;
}

