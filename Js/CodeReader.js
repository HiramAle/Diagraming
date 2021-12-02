function readGraph(startIndex = null) {
    let actual_shape;
    let queue = [];
    let visited = [];
    //If the parameter is null search the Start node
    if (startIndex == null) {
        for (let i = 0; i < shapes.length; i++) {
            if (shapes[i] instanceof Start) {
                queue.push(shapes[i]);
            }
        }
    } else {
        //If the parameter is not null, queue the index shape
        queue.push(shapes[startIndex]);
    }

    //Start BFS search in the Start node
    while (queue.length > 0) {
        actual_shape = queue.shift();
        visited.push(actual_shape);
        for (let i = 0; i < actual_shape.adj_shapes.length; i++) {
            if (!visited.includes(actual_shape.adj_shapes[i])) {
                if (!queue.includes((actual_shape.adj_shapes[i]))) {
                    queue.push(actual_shape.adj_shapes[i]);
                }
            }
        }
    }
    return visited;
}


let codeArea = document.getElementById("codeArea");
codeArea.innerHTML = "";

function createCode(code) {
    let actual_shape;
    let segment;
    //Get the code area
    let codeArea = document.getElementById("codeArea");
    //While the code array have items, the function continues reading the array
    while (code.length > 0) {
        //Pop the first node in the array
        actual_shape = code.shift();
        //Case Start Shape
        if (actual_shape instanceof Start) {
            segment = "#include <stdio.h>\n" +
                "int main (int argc,char **argv)\n" +
                "{\n";
        }
        //Case Variable Shape
        if (actual_shape instanceof Variable) {
            segment = actual_shape.text + ";\n";
        }
        //Case Input Shape
        if (actual_shape instanceof DataInput) {
            segment = " scanf();\n"
        }
        //Case Output Shape
        if (actual_shape instanceof DataOutput) {
            segment = " printf('" + actual_shape.text + "');\n";
        }
        //Case Assigment or simple code Shape
        if (actual_shape instanceof Assignment) {
            segment = actual_shape.text + ";\n";
        }
        //Case End Shape
        if (actual_shape instanceof End) {
            segment = " return 0;\n}";
        }
        //Case If Shape
        if (actual_shape instanceof IfShape) {
            //Search for the last instruction inside if
            segment = "if(" + actual_shape.text + "){\n";
        }
        if (segment != null) {
            codeArea.innerHTML += segment;
        }
        hljs.highlightAll();
    }
}

