//Coords of the mouse click
let x_cord;
let y_cord;
//Draw Start Shape
function drawStart(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new Start(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}
//Draw End Shape
function drawEnd(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new End(x_cord, y_cord);
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

function drawIf(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new IfShape(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}

function drawWhile(e) {
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    canvas.onclick = null;
    let shape = new WhileShape(x_cord, y_cord);
    shape.draw(context);
    shapes.push(shape);
}

function editShape(e) {
    //Prevee que no se dé mas de un click
    canvas.onclick = null;
    //Obtiene la ubicación del mouse
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    let shape;
    //Limpia las selecciones pasadas
    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].selected) {
            shapes[i].selected = false;
        }
    }
    //Marca la selección actual
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            shapes[i].selected = true;
            shape = shapes [i];
        }
    }
    //Actualiza el canvas
    reDraw();
    //Muestra las opciones de edición
    if (shape) {
        document.getElementById("bg_color").style.display = "inline-flex";
        document.getElementById("text").style.display = "inline-flex";
        document.getElementById("save_btn").style.display = "inline-flex";
        document.getElementById("cancel_btn").style.display = "inline-flex";
        document.getElementById("bg_color").value = shape.bg_color;
        document.getElementById("text").value = shape.text;
    }
}

function saveEdit() {
    //Obtiene los valores del texto y el fondo
    let bg_color = document.getElementById("bg_color").value;
    let text = document.getElementById("text").value;
    //Actualiza el 
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

function eraseShape(e) {
    canvas.onclick = null;
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    let delShape;
    let index;
    //Get the shape to erase and the index in the array
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            delShape = shapes[i];
            index = i;
        }
    }
    //Delete the shape
    shapes.splice(index, 1);
    //Delete the shape in the adj list of all the shapes
    for (let i = 0; i < shapes.length; i++) {
        for (let j = 0; j < shapes[i].adj_shapes.length; j++) {
            if (Object.is(shapes[i].adj_shapes[j], delShape)) {
                shapes[i].adj_shapes.splice(j, 1);
            }
        }
    }
    //Get the indexes of the connectors with the shape
    let delConn = [];
    for (let i = 0; i < connectors.length; i++) {
        if (Object.is(connectors[i].start_shape, delShape)) {
            delConn.push(connectors[i]);
        }
        if (Object.is(connectors[i].end_shape, delShape)) {
            delConn.push(connectors[i]);
        }
    }
    //Delete the connectors of the shape
    while (delConn.length > 0) {
        for (let i = 0; i < connectors.length; i++) {
            connectors.splice(connectors.indexOf(delConn.pop()), 1);
        }
    }
    //Update the canvas
    reDraw();
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




