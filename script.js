// color picker and selected color
const colorPicker = document.getElementById('color-picker');
colorPicker.oninput = draw;
let color = colorPicker.value;

// option buttons
const drawBtn = document.getElementById('draw-btn');
drawBtn.onclick = draw;
const eraseBtn = document.getElementById('erase-btn');
eraseBtn.onclick = erase;
const clearBtn = document.getElementById('clear-btn');
clearBtn.onclick = resizeCanvas;

// canvas size slider
const canvasSize = document.getElementById('canvas-size');
const sizeSlider = document.getElementById('size-slider');
sizeSlider.oninput = resizeCanvas;

// canvas
const canvas = document.getElementById('canvas');

// detect if something is being drawn/erased on canvas
let mouseDown = false;
canvas.onmousedown = () => {mouseDown = true;};
document.body.onmouseup = () => {mouseDown = false;};

// initialize canvas
resizeCanvas();



function draw() {
    // set draw color, activate draw tool
    color = colorPicker.value;
    drawBtn.className = 'active';
    eraseBtn.className = null;
}

function erase() {
    // set eraser color (background color), activate eraser tool
    color = '#ffffff';
    drawBtn.className = null;
    eraseBtn.className = 'active';
}

function resizeCanvas() {
    // display current canvas size
    canvasSize.textContent = sizeSlider.value + ' x ' + sizeSlider.value;
    // remove all pixels from canvas
    canvas.innerHTML = '';

    // fill canvas with blank pixels
    for (let i = 0; i < sizeSlider.value * sizeSlider.value; i++) {
        canvas.appendChild(document.createElement('div'));
    }
    let pixels = canvas.childNodes;

    // set pixel size and click functions
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].style.width = 1 / sizeSlider.value * 100 + '%';
        pixels[i].style.height = 1 / sizeSlider.value * 100 + '%';
        pixels[i].addEventListener('mousedown', setColor);
        pixels[i].addEventListener('mouseover', setColor);
    }

    // activate draw mode
    draw();
}

function setColor(e) {
    // set pixel color when clicked/dragged (drawn) on
    if (e.type == 'mouseover' && !mouseDown) {
        return;
    }
    e.target.style.backgroundColor = color;
}