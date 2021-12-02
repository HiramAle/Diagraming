//Array container for the shape connectors
let connectors = [];
//Flag for If Links
//Case linking true value of If
let linkingTrue = false;
//Case linking false value of If
let linkingFalse = false;
// Index of start shape
let startIndex;
// Index of end shape
let endIndex;

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
                if(shapes[i].trueValue == null || shapes[i].falseValue == null){
                    if (ifLinkingTrue(shapes[i], x_cord, y_cord)) {
                        linkingTrue = true;
                    } else if (ifLinkingFalse(shapes[i], x_cord, y_cord)) {
                        //Case click on the False part of the If Shape
                        linkingFalse = true;
                    }
                    //In case the link start in the true or false part of the if
                    if (linkingFalse || linkingTrue) {
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
    //Check if the the click actually was on a shape
    if (endIndex >= 0) {
        //Case linking true or false part of the if shape
        if (linkingTrue) {
            shapes[startIndex].trueValue = shapes[endIndex];
            console.log(shapes[startIndex].trueValue.text)
            linkingTrue = false;
        } else if(linkingFalse) {
            shapes[startIndex].falseValue = shapes[endIndex];
            console.log(shapes[startIndex].falseValue.text)
            linkingFalse = false;
        }
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
