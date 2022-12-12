let canvas2 = document.getElementById("canvas");
let context = canvas2.getContext("2d");

let img = new Image();
img.src = "/images/image.png";

const canvasWidth = 5000;
const canvasHeight = 2800;
const objectsCount = 500;

const t0 = performance.now();
let t1;

img.onload = function() {
    for (let i = 0; i < objectsCount; i++) {
        new Entity();
    }
    bufferImageWithShadow()
}

let gradColors = [[0, 125, 255], [123, 0, 100], [200, 51, 0]];
let gradDirs = [1, 1, 1];

const componentToHex = (c) => {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
const bufferImageWithShadow = () => {
    let imageCanvas = document.getElementById("myCanvas"),
        iCtx = imageCanvas.getContext("2d");
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    iCtx.width = 200;
    iCtx.height = 200;

    iCtx.shadowOffsetX = 10;
    iCtx.shadowOffsetY = 10;
    iCtx.shadowColor = 'black';
    iCtx.shadowBlur = 12;
    iCtx.drawImage(img, 0, 0, 200, 200);

    let image = new Image();
    image.src = imageCanvas.toDataURL();

    const drawBuffered = () => {
        canvas2.width = canvasWidth;
        canvas2.height = canvasHeight;
        let grd = context.createRadialGradient(
            canvasWidth / 2,
            canvasHeight / 2,
            5,
            canvasWidth / 2,
            canvasHeight / 2, canvasWidth / 2
        );
        for (let i = 0; i < 3; i++) {
            gradColors[i][i] += gradDirs[i];
            if (gradColors[i][i] > 254 || gradColors[i][i] < 1) {
                gradDirs[i] = -gradDirs[i];
            }

        }
        grd.addColorStop(0, rgbToHex(...gradColors[0]));
        grd.addColorStop(0.5,  rgbToHex(...gradColors[1]));
        grd.addColorStop(1,  rgbToHex(...gradColors[2]));

        context.fillStyle = grd;
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        objects.forEach((item, index) => {
            item.tick();
            context.drawImage(image, item.x, item.y, 200, 200);
        })
        if (!t1) {
            t1 = performance.now();
            document.getElementById('performance').innerHTML = `first render after: ${Math.round(t1 - t0)} ms`;
        }
        requestAnimationFrame(drawBuffered);
    }
    drawBuffered();

}
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

let objects = [];
class Entity {
    constructor() {
        this.x = Math.round(Math.random() * canvasWidth);
        this.y = Math.round(Math.random() * canvasHeight);
        this.xDelta = Math.random() * 2 - 1;
        this.yDelta = Math.random() * 2 - 1;
        objects.push(this);
    }

    tick() {
        this.x += this.xDelta;
        this.y += this.yDelta;
        if (this.x > canvasWidth) {
            this.xDelta = -Math.random();
        }
        if (this.y > canvasHeight) {
            this.yDelta = -Math.random();
        }

        if (this.x < 0) {
            this.xDelta = Math.random();
        }

        if (this.y < 0) {
            this.yDelta = Math.random();
        }
    }
}

document.getElementById('toggleFullScreen').addEventListener('click', toggleFullScreen);


