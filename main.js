require('./app.css');

let canvas = document.getElementById('canvas');
let parentBlockSizes = document.getElementById('main').getBoundingClientRect();
canvas.width = parentBlockSizes.width;
canvas.height = parentBlockSizes.height;
let ctx = canvas.getContext('2d');
let requestAnimFrame = window.requestAnimationFrame;

const init = () => {
    requestAnimFrame(tick)
}

const cubePosition = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
}

const dragNDropProperties = {
    startClickPos: {
        x: 0,
        y: 0,
    },
    mouseDown: false,
}

const tick = () => {
    ctx.clearRect(0, 0, parentBlockSizes.width, parentBlockSizes.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(cubePosition.x, cubePosition.y, cubePosition.w, cubePosition.h);
    requestAnimFrame(tick)
}


const handleMoving = (e, isResize) => {
    if (dragNDropProperties.mouseDown || isResize) {
        let nextCubePosition = {
            x: e.clientX - parentBlockSizes.x - dragNDropProperties.startClickPos.x,
            y: e.clientY - parentBlockSizes.y - dragNDropProperties.startClickPos.y,
        }
        if (nextCubePosition.x < 0) nextCubePosition.x = 0;
        if (nextCubePosition.y < 0) nextCubePosition.y = 0;
        if (nextCubePosition.x > parentBlockSizes.width - cubePosition.w)nextCubePosition.x = parentBlockSizes.width - cubePosition.w;
        if (nextCubePosition.y > parentBlockSizes.height - cubePosition.h)nextCubePosition.y = parentBlockSizes.height - cubePosition.h;
        cubePosition.x = nextCubePosition.x;
        cubePosition.y = nextCubePosition.y;
    }
}

document.addEventListener('mousemove', handleMoving);

document.addEventListener('mousedown', (e) => {
    dragNDropProperties.startClickPos.x = e.clientX - parentBlockSizes.x - cubePosition.x;
    dragNDropProperties.startClickPos.y = e.clientY - parentBlockSizes.y - cubePosition.y;
    if (e.clientX - parentBlockSizes.x > cubePosition.x && e.clientX - parentBlockSizes.x < cubePosition.x + cubePosition.w) {
        if (e.clientY - parentBlockSizes.y > cubePosition.y && e.clientY - parentBlockSizes.y < cubePosition.y + cubePosition.h) {
            dragNDropProperties.mouseDown = true;
        }
    }
});

document.addEventListener('mouseup', (e) => {
    dragNDropProperties.mouseDown = false;
});

addEventListener('resize', () => {
    parentBlockSizes = document.getElementById('main').getBoundingClientRect();
    canvas.width = parentBlockSizes.width;
    canvas.height = parentBlockSizes.height;
    let emulatedClientX = dragNDropProperties.startClickPos.x + parentBlockSizes.x + cubePosition.x;
    let emulatedClientY = dragNDropProperties.startClickPos.y + parentBlockSizes.y + cubePosition.y;
    handleMoving({clientX: emulatedClientX, clientY: emulatedClientY}, true)
});

init();