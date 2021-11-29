let canvas = document.getElementById("main-canvas");
let context = canvas.getContext("2d");
let dragging;
let startX;
let startY;
let x_offset = canvas.offsetLeft;
let y_offset = canvas.offsetTop;

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;

canvas.width = window.innerWidth * .6;
canvas.height = window.innerHeight * .8;

function mouseInShape(shape, mx, my) {
    if (shape instanceof Start) {
        return insideEllipse(shape, mx, my);
    }

    if (shape instanceof Variable || shape instanceof DataInput || shape instanceof DataOutput || shape instanceof Assignment){
        return insideRectangle(shape, mx, my);
    }
}

function mouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    let mouseX = e.clientX - x_offset;
    let mouseY = e.clientY - y_offset;
    dragging = false;
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], mouseX, mouseY)) {
            document.getElementById("main-canvas").style.cursor = "grabbing";
            dragging = true;
            shapes[i].dragging = true;
        }
    }
    reDraw();
    startX = mouseX;
    startY = mouseY;
}

function mouseUp(e) {
    e.preventDefault();
    e.stopPropagation();
    dragging = false;
    for (let i = 0; i < shapes.length; i++) {
        document.getElementById("main-canvas").style.cursor = "-webkit-grab";
        shapes[i].dragging = false;
    }
}

function mouseMove(e) {
    let mouseX = e.clientX - x_offset;
    let mouseY = e.clientY - y_offset;
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], mouseX, mouseY)) {
            document.getElementById("main-canvas").style.cursor = "-webkit-grab";
        } else {
            document.getElementById("main-canvas").style.cursor = "auto";
        }
    }
    if (dragging) {
        document.getElementById("main-canvas").style.cursor = "grabbing";
        e.preventDefault();
        e.stopPropagation();
        let mx = e.clientX - x_offset;
        let my = e.clientY - y_offset;
        let dx = mx - startX;
        let dy = my - startY;
        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i].dragging) {
                shapes[i].x += dx;
                shapes[i].y += dy;
            }
        }
        reDraw();
        startX = mx;
        startY = my;
    }
}