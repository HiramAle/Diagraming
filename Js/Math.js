function random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

function distance(sx, sy, ex, ey) {
    let x = sx - ex;
    let y = sy - ey;
    return Math.sqrt(x * x + y * y);
}

function insideEllipse(shape, mx, my) {
    let x = Math.pow(mx - shape.x, 2) / Math.pow(shape.rx, 2);
    let y = Math.pow(my - shape.y, 2) / Math.pow(shape.ry, 2);
    return x + y <= 1;
}

function insideSquare(shape, mx, my) {
    return mx >= shape.x && my >= shape.y && mx <= shape.x + shape.side && my <= shape.y + shape.side;
}

function insideRectangle(shape, mx, my) {
    return mx >= shape.x - shape.width / 2 && my >= shape.y - shape.height / 2 && mx <= shape.x + shape.width / 2 && my <= shape.y + shape.height / 2;
}

function insideIfShape(shape, mx, my) {
    return mx >= shape.x - (shape.width + 10) / 2 && my >= shape.y - (shape.height + 10) / 2 && mx <= shape.x + (shape.width + 10) / 2 && my <= shape.y + (shape.height + 10) / 2;
}

function ifLinkingFalse(shape, mx, my) {
    if (distance(mx, my, shape.x + shape.width / 2, shape.y) <= 10) {
        return true;
    }
}

function ifLinkingTrue(shape, mx, my) {
    if (distance(mx, my, shape.x, shape.y + shape.height / 2) <= 10) {
        return true;
    }
}

function ifLinkingConn(shape, mx, my) {
    if (distance(mx, my, shape.x, shape.y - shape.height / 2) <= 10) {
        return true;
    }
}

function ifLinkingCicle(shape, mx, my) {
    if (distance(mx, my, shape.x - shape.width / 2, shape.y) <= 10) {
        return true;
    }
}

function getAnchorPointSelected(shape, mx, my) {
    if (distance(mx, my, shape.x + shape.width / 2, shape.y) <= 10) {
        return "falsePoint";
    }
    if (distance(mx, my, shape.x, shape.y + shape.height / 2) <= 10) {
        return "truePoint";
    }
    if (distance(mx, my, shape.x, shape.y - shape.height / 2) <= 10) {
        return "connPoint";
    }
    if (distance(mx, my, shape.x - shape.width / 2, shape.y) <= 10) {
        return "ciclePoint";
    }
    return false;
}