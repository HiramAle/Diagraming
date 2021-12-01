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
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            delShape = shapes[i];
            index = i;
            shapes.splice(i, 1);
        }
    }

    for (let i = 0; i < shapes.length; i++) {
        for (let j = 0; j < shapes[i].adj_shapes.length; j++) {
            if (Object.is(shapes[i].adj_shapes[j], delShape)) {
                shapes[i].adj_shapes.splice(j, 1);
            }
        }
    }

    let indexesCon = [];
    for (let i = 0; i < connectors.length; i++) {
        if (Object.is(connectors[i].start_shape, delShape)) {
            indexesCon.push(i);
        }else if (Object.is(connectors[i].end_shape, delShape)) {
            indexesCon.push(i);
        }
    }

    for (let i = 0; i < indexesCon.length; i++) {
        console.log(i + 1 + " " + connectors[indexesCon[i]].start_shape.text + " -> " + connectors[indexesCon[i]].end_shape.text);
        connectors.splice(indexesCon[i]);
    }


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
    let shapes_indexes = [];
    let s_i;
    let e_i;
    let linkin;
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            shapes[i].selected = true;
            linkin = true;
        }
    }

    if(linkin){
        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i].selected) {
                link_shapes.push(shapes[i]);
                shapes_indexes.push(i);
            }
        }

        s_i = shapes_indexes[0];
        e_i = shapes_indexes[1];

        shapes[s_i].adj_shapes.push(link_shapes[1]);
        shapes[e_i].adj_shapes.push(link_shapes[0]);

        let con = new Link(link_shapes[0], link_shapes[1]);
        con.draw(context);
        connectors.push(con);

        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i].selected) {
                shapes[i].selected = false;
            }
        }
    }else{
        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i].selected) {
                shapes[i].selected = false;
                linkin = false;
            }
        }
    }

    canvas.onclick = null;
    reDraw();
}

