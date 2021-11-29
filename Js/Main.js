let x_cord = 0;
let y_cord = 0;
let shapes = [];
let connectors = [];


function drawStart(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new Start(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}

function drawVariable(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new Variable(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}

function drawDataInput(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new DataInput(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}

function drawDataOutput(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new DataOutput(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}

function drawAssignment(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new Assignment(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}

function editShape(e) {
    canvas.onclick = null;
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    let shape;
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            shapes[i].selected = true;
            shape = shapes [i];
        }
    }
    reDraw();
    if (shape){
        document.getElementById("bg_color").style.display = "block";
        document.getElementById("text").style.display = "block";
        document.getElementById("save_btn").style.display = "block";
        document.getElementById("cancel_btn").style.display = "block";
        document.getElementById("bg_color").value = shape.bg_color;
        document.getElementById("text").value = shape.text;
    }
}

function saveEdit() {
    let bg_color = document.getElementById("bg_color").value;
    let text = document.getElementById("text").value;
    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].selected) {
            shapes[i].text = text;
            shapes[i].bg_color = bg_color;
            shapes[i].selected = false;
        }
    }
    document.getElementById("bg_color").style.display = "none";
    document.getElementById("text").style.display = "none";
    document.getElementById("save_btn").style.display = "none";
    document.getElementById("cancel_btn").style.display = "none";
    reDraw();

}

function cancelEdit() {
    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].selected) {
            shapes[i].selected = false;
        }
    }
    reDraw();
    document.getElementById("bg_color").style.display = "none";
    document.getElementById("text").style.display = "none";
    document.getElementById("save_btn").style.display = "none";
    document.getElementById("cancel_btn").style.display = "none";
}

function reDraw() {
    clearCanvas();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    for (let i = 0; i < connectors.length; i++) {
        connectors[i].draw(context);
    }
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].draw(context);
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function startLink(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            shapes[i].selected = true;
        }
    }
    reDraw();
    canvas.onclick = endLink;
}

function endLink(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    let link_shapes = [];

    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            shapes[i].selected = true;
        }
    }

    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].selected) {
            link_shapes.push(shapes[i]);
        }
    }

    let con = new Link(link_shapes[0], link_shapes[1]);
    con.draw(context);
    connectors.push(con);

    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].selected) {
            shapes[i].selected = false;
        }
    }
    canvas.onclick = null;
    reDraw();
}

