//Array container for the shape connectors
let connectors = [];
//Flag for If Links
let linkingIf = "none";
//Flag for While Links
let linkingWhile = "none";
// Index of start shape
let startIndex;
// Index of end shape
let endIndex;

function Link(start_shape, end_shape) {
    this.start_shape = start_shape;
    this.end_shape = end_shape;
    this.type = "normal";
}

Link.prototype.draw = function (ctx) {
    ctx.beginPath();
    switch (this.type) {
        case "normal":
            ctx.moveTo(this.start_shape.x, this.start_shape.y);
            ctx.lineTo(this.end_shape.x, this.end_shape.y);
            break;
        case "false":
            ctx.moveTo(this.start_shape.x + this.start_shape.width / 2, this.start_shape.y);
            ctx.lineTo(this.start_shape.x + 100 + this.start_shape.width / 2, this.start_shape.y);
            ctx.lineTo(this.end_shape.x, this.end_shape.y);
            break;
        case "cicle":
            ctx.moveTo(this.start_shape.x, this.start_shape.y);
            ctx.lineTo(this.start_shape.x, this.start_shape.y + 50 + this.start_shape.width / 2);
            ctx.lineTo(this.start_shape.x - 70, this.start_shape.y + 50 + this.start_shape.width / 2);
            ctx.lineTo(this.end_shape.x - 70, this.end_shape.y);
            ctx.lineTo(this.end_shape.x, this.end_shape.y);
            break;
    }
    ctx.stroke();

}

//Print all connectors on the diagram
function printConnectors() {
    for (let i = 0; i < connectors.length; i++) {
        console.log((i + 1) + " " + connectors[i].start_shape.text + " -> " + connectors[i].end_shape.text);
    }
}

function getShapeClickedIndex(e) {
    let clickOnShape = false;
    //Get the coords of the mouse click
    x_cord = e.clientX - x_offset;
    y_cord = e.clientY - y_offset;
    let indexShape = -1;
    for (let i = 0; i < shapes.length; i++) {
        if (mouseInShape(shapes[i], x_cord, y_cord)) {
            //Case the shape is an If Shape
            if (shapes[i] instanceof IfShape) {
                //Case click on the True part of the If Shape
                if (shapes[i].trueValue == null || shapes[i].falseValue == null || shapes[i].connector == null) {
                    if (ifLinkingTrue(shapes[i], x_cord, y_cord)) {
                        linkingIf = "true";
                    } else if (ifLinkingFalse(shapes[i], x_cord, y_cord)) {
                        //Case click on the False part of the If Shape
                        linkingIf = "false";
                    } else if (ifLinkingConn(shapes[i], x_cord, y_cord)) {
                        //Case click on the False part of the If Shape
                        linkingIf = "conn";
                    }
                    //In case the link start in the true or false part of the if
                    if (linkingIf !== "none") {
                        clickOnShape = true;
                        shapes[i].selected = true;
                        indexShape = i;
                    }
                }
            } else if (shapes[i] instanceof WhileShape) {
                if (shapes[i].trueValue == null || shapes[i].falseValue == null || shapes[i].connector == null || shapes[i].cicle == null) {
                    if (ifLinkingTrue(shapes[i], x_cord, y_cord)) {
                        linkingWhile = "true";
                    } else if (ifLinkingFalse(shapes[i], x_cord, y_cord)) {
                        //Case click on the False part of the If Shape
                        linkingWhile = "false";
                    } else if (ifLinkingConn(shapes[i], x_cord, y_cord)) {
                        //Case click on the False part of the If Shape
                        linkingWhile = "conn";
                    } else if (ifLinkingCicle(shapes[i], x_cord, y_cord)) {
                        linkingWhile = "cicle";
                    }
                    //In case the link start in the true or false part of the if
                    if (linkingWhile !== "none") {
                        clickOnShape = true;
                        shapes[i].selected = true;
                        indexShape = i;
                    }
                }
            } else {
                //Case the shape isn't an If Shape
                clickOnShape = true;
                shapes[i].selected = true;
                indexShape = i;
            }
        }
    }
    //Return the index of the shape clicked ( -1 if doesn't click on a shape)
    return indexShape;
}


function startLink(e) {
    //Get the index of the start shape of the link
    startIndex = getShapeClickedIndex(e);
    //Check if the click actually was on a shape
    if (startIndex >= 0) {
        //Update de canvas
        reDraw();
        //Change the canvas.onclick to register the end shape
        canvas.onclick = endLink;
    } else {
        //Case the click was in an empty space
        canvas.onclick = null;
    }
}

function endLink(e) {

    //Get the index of the end shape of the link
    endIndex = getShapeClickedIndex(e);
    //Check if the the click actually was on a shape
    if (endIndex >= 0) {
        //Create a new connection
        let con = new Link(shapes[startIndex], shapes[endIndex]);
        //Case linking If Shape
        if (linkingIf !== "none") {
            switch (linkingIf) {
                case "true":
                    shapes[startIndex].trueValue = shapes[endIndex];
                    break;
                case "false":
                    con.type = "false";
                    shapes[startIndex].falseValue = shapes[endIndex];
                    break;
                case "conn":
                    shapes[endIndex].connector = shapes[startIndex];
                    break;
            }
            linkingIf = "none";
        } else if (linkingWhile !== "none") {
            switch (linkingWhile) {
                case "true":
                    shapes[startIndex].trueValue = shapes[endIndex];
                    break;
                case "false":
                    con.type = "false";
                    shapes[startIndex].falseValue = shapes[endIndex];
                    break;
                case "conn":
                    shapes[endIndex].connector = shapes[startIndex];
                    break;
                case "cicle":
                    con.type = "cicle";
                    shapes[endIndex].cicle = shapes[startIndex];
                    break;
            }
            linkingWhile = "none";
        }
        printConnectors();
        //Add the end shape to the adjacency list of the start shape
        shapes[startIndex].adj_shapes.push(shapes[endIndex]);
        //Draw the connection
        con.draw(context);
        //Save the connection
        connectors.push(con);
    }
    //Deselect all the shapes
    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].selected) {
            shapes[i].selected = false;
        }
    }
    canvas.onclick = null;
    reDraw();
}
