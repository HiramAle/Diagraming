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
        case "falsePoint":
            ctx.moveTo(this.start_shape.x + this.start_shape.width / 2, this.start_shape.y);
            ctx.lineTo(this.start_shape.x + 100 + this.start_shape.width / 2, this.start_shape.y);
            ctx.lineTo(this.end_shape.x, this.end_shape.y);
            break;
        case "ciclePoint":
            ctx.moveTo(this.start_shape.x, this.start_shape.y);
            ctx.lineTo(this.start_shape.x, this.start_shape.y + 50 + this.start_shape.width / 2);
            ctx.lineTo(this.start_shape.x - 70, this.start_shape.y + 50 + this.start_shape.width / 2);
            ctx.lineTo(this.end_shape.x - 70, this.end_shape.y);
            ctx.lineTo(this.end_shape.x, this.end_shape.y);
            break;
        default:
            ctx.moveTo(this.start_shape.x, this.start_shape.y);
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

let startShape;
let endShape;
let startAnchorPoint;
let endAnchorPoint;

function startLink(e) {
    //Get the index of the start shape of the link
    startShape = getShape(e, "link");
    //Check if the click actually was on a shape
    if (startShape) {
        if (startShape instanceof IfShape || startShape instanceof WhileShape) {
            startAnchorPoint = getAnchorPointSelected(startShape, e.clientX - x_offset, e.clientY - y_offset);
        }
        canvas.onclick = endLink;
        startShape.selected = true;
        reDraw();
    } else {
        canvas.onclick = null;
    }
}

function endLink(e) {
    endShape = getShape(e, "link");
    //Check if the click actually was on a shape
    if (endShape) {
        let connection = new Link(startShape, endShape);
        if (startAnchorPoint) {
            linkingAnchorPoint(startShape, endShape, startAnchorPoint);
            connection.type = startAnchorPoint;
            startAnchorPoint = null;
        }
        if (endShape instanceof IfShape || endShape instanceof WhileShape) {
            endAnchorPoint = getAnchorPointSelected(endShape, e.clientX - x_offset, e.clientY - y_offset);
            if(endAnchorPoint){
                linkingAnchorPoint(endShape, startShape, endAnchorPoint);
                if (!connection.type){
                    connection.type = endAnchorPoint;
                }
                endAnchorPoint = null;
            }
        }
        startShape.adj_shapes.push(endShape);
        connectors.push(connection);
    }
    printConnectors();
    cleanSelection();
    canvas.onclick = null;
}

function linkingAnchorPoint(shape1, shape2, anchorPoint) {
    switch (anchorPoint) {
        case "truePoint":
            if (!shape1.trueValue){
                shape1.trueValue = shape2;
            }
            break;
        case "falsePoint":
            if (!shape1.falseValue) {
                shape1.falseValue = shape2;
            }
            break;
        case "connPoint":
            if (!shape1.connector) {
                shape1.connector = shape2;
            }
            break;
        case "ciclePoint":
            if (!shape1.cicle) {
                shape1.cicle = shape2;
            }
            break;
    }
}
