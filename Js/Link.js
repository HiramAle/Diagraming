//Array container for the shape connectors
let connectors = [];
//Flag for If Links
let linkingIf = "none";
// Index of start shape
let startIndex;
// Index of end shape
let endIndex;

function Link(start_shape, end_shape) {
    this.start_shape = start_shape;
    this.end_shape = end_shape;
}

Link.prototype.draw = function (ctx) {
    let start_x;
    let start_y;
    let end_x;
    let end_y;


    start_x = this.start_shape.x;
    start_y = this.start_shape.y;
    end_x = this.end_shape.x;
    end_y = this.end_shape.y;


    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(end_x, end_y);
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
                if(shapes[i].trueValue == null || shapes[i].falseValue == null || shapes[i].connector == null){
                    if (ifLinkingTrue(shapes[i], x_cord, y_cord)) {
                        linkingIf = "true";
                    } else if (ifLinkingFalse(shapes[i], x_cord, y_cord)) {
                        //Case click on the False part of the If Shape
                        linkingIf = "false";
                    } else if(ifLinkingConn(shapes[i],x_cord,y_cord)){
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
    //Check if the the click actually was on a shape
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
    console.log(endIndex);
    //Check if the the click actually was on a shape
    if (endIndex >= 0) {
        //Case linking If Shape
        if (linkingIf !== "none"){
            switch (linkingIf){
                case "true":
                    shapes[startIndex].trueValue = shapes[endIndex];
                    break;
                case "false":
                    shapes[startIndex].falseValue = shapes[endIndex];
                    break;
                case "conn":
                    shapes[endIndex].connector = shapes[startIndex];
                    break;
            }
            linkingIf = "none";
        }
        printConnectors();
        //Add the end shape to the adjacency list of the start shape
        shapes[startIndex].adj_shapes.push(shapes[endIndex]);
        //Create a new connection
        let con = new Link(shapes[startIndex], shapes[endIndex]);
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
