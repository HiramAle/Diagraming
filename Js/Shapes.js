let shapes = [];

//Print all the shapes in the Diagram
function printShapes() {
    for (let i = 0; i < shapes.length; i++) {
        console.log((i + 1) + " " + shapes[i].text);
    }
}

function Shape(x, y) {
    this.x = x;
    this.y = y;
    this.text = "";
    this.bg_color = "#FFFFFF";
    this.text_color = "black";
    this.stroke_color = "black";
    this.adj_shapes = [];
    this.dragging = false;
    this.selected = false;
}

function Start(x, y) {
    Shape.call(this, x, y);
    this.rx = 50;
    this.ry = 25;
    this.text = "Inicio";
}

Start.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.ry, this.rx, Math.PI / 2, 0, 2 * Math.PI);
    //Apply Properties
    ctx.fillStyle = this.bg_color;
    ctx.fill();
    ctx.fillStyle = this.text_color;
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x - this.rx / 4, this.y);
    //If Selected
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
};

function End(x, y) {
    Shape.call(this, x, y);
    this.rx = 50;
    this.ry = 25;
    this.text = "Final";
}

End.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.ry, this.rx, Math.PI / 2, 0, 2 * Math.PI);
    //Apply Properties
    ctx.fillStyle = this.bg_color;
    ctx.fill();
    ctx.fillStyle = this.text_color;
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x - this.rx / 4, this.y);
    //If Selected
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
};

function Variable(x, y) {
    Shape.call(this, x, y);
    this.width = 75;
    this.height = 50;
    this.text = "Variable";
}

Variable.prototype.draw = function (ctx) {
    ctx.beginPath();
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
    }
    ctx.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    ctx.fillStyle = this.bg_color;
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x - 25 / 2, this.y);
    ctx.moveTo(this.x - this.width / 2, this.y + 5 - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + 5 - this.height / 2);
    ctx.moveTo(this.x - this.width / 2, this.y - 5 + this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y - 5 + this.height / 2);
    ctx.stroke();
};


function DataInput(x, y) {
    Shape.call(this, x, y);
    this.width = 75;
    this.height = 50;
    this.text = "Input";
}

DataInput.prototype.draw = function (ctx) {
    //Draw Shape
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y + this.height / 2);
    ctx.bezierCurveTo(this.x, this.y - 25 + this.height / 2, this.x, this.y + 25 + this.height / 2, this.x + this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
    //Apply Properties
    ctx.fillStyle = this.bg_color;
    ctx.fill();
    ctx.fillStyle = this.text_color;
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x - this.width / 4, this.y);
    //If Selected
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
};

function DataOutput(x, y) {
    Shape.call(this, x, y);
    this.width = 75;
    this.height = 50;
    this.text = "Output";
}

DataOutput.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x + 20 - this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y + 20 - this.height / 2);
    ctx.lineTo(this.x + 20 - this.width / 2, this.y - this.height / 2);
    //Apply Properties
    ctx.fillStyle = this.bg_color;
    ctx.fill();
    ctx.fillStyle = this.text_color;
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x - this.width / 4, this.y);
    //If Selected
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
};

function Assignment(x, y) {
    Shape.call(this, x, y);
    this.width = 75;
    this.height = 50;
    this.text = "Assignment";
}

Assignment.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    ctx.fillStyle = this.bg_color;
    ctx.fill();
    ctx.fillStyle = this.text_color;
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x - this.width / 2 + 10, this.y);
    //If Selected
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
}

function IfShape(x, y) {
    Shape.call(this, x, y);
    this.width = 75;
    this.height = 50;
    this.text = "Si";
    this.trueValue = null;
    this.falseValue = null;
    this.connector = null;
}

IfShape.prototype.draw = function (ctx) {
    ctx.beginPath();
    //Draw dimond
    ctx.moveTo(this.x, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y);
    ctx.lineTo(this.x, this.y - this.height / 2);
    //Apply Properties
    ctx.fillStyle = this.bg_color;
    ctx.fill();
    ctx.fillStyle = this.text_color;
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x, this.y);
    //If Selected
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
    //Draw Circle Connect To
    if (this.connector == null) {
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.height / 2, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    }
    //Draw Circle False
    if (this.falseValue == null) {
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    }
    //Draw Circle True
    if (this.trueValue == null) {
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.height / 2, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    }

};

function WhileShape(x, y) {
    Shape.call(this, x, y);
    this.width = 75;
    this.height = 50;
    this.text = "While";
    this.trueValue = null;
    this.falseValue = null;
    this.cicle = null;
    this.connector = null;
}

WhileShape.prototype.draw = function (ctx) {
    ctx.beginPath();
    //Draw dimond
    ctx.moveTo(this.x, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y);
    ctx.lineTo(this.x, this.y - this.height / 2);
    //Apply Properties
    ctx.fillStyle = this.bg_color;
    ctx.fill();
    ctx.fillStyle = this.text_color;
    ctx.font = "10px Montserrat";
    ctx.fillText(this.text, this.x, this.y);
    //If Selected
    if (this.selected) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = this.stroke_color;
        ctx.lineWidth = 1;
    }
    ctx.stroke();
    //Draw Circle Connect To
    if (this.connector == null) {
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.height / 2, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    }
    //Draw Circle False
    if (this.falseValue == null) {
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    }
    //Draw Circle True
    if (this.trueValue == null) {
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.height / 2, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    }
    //Draw Circle Cicle
    if (this.cicle == null) {
        ctx.beginPath();
        ctx.arc(this.x - this.width / 2, this.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ffff";
        ctx.fill();
    }

};