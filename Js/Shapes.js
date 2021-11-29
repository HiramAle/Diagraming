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
    ctx.moveTo(this.x + 20 - this.width / 2 , this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y + this.height / 2);
    ctx.lineTo(this.x - this.width / 2, this.y + 20 - this.height / 2);
    ctx.lineTo(this.x + 20- this.width / 2 , this.y - this.height / 2);
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

function Assignment(x,y){
    Shape.call(this, x, y);
    this.width = 75;
    this.height = 50;
    this.text = "Assignment";
}

Assignment.prototype.draw = function (ctx){
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

function Link(start_shape, end_shape) {
    this.start_shape = start_shape;
    this.end_shape = end_shape;
}

Link.prototype.draw = function (ctx) {
    let start_x;
    let start_y;
    let end_x;
    let end_y;

    // this.start_shape.adj_shapes.push(this.end_shape);
    // this.end_shape.adj_shapes.push(this.start_shape);

    start_x = this.start_shape.x;
    start_y = this.start_shape.y;
    end_x = this.end_shape.x;
    end_y = this.end_shape.y;

    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(end_x, end_y);
    ctx.stroke();
}
