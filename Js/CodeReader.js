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
    //Call the interpreter function of the array
    return visited;
}

function createCode(code = []) {
    if (code.length <= 0){
        code = readGraph();
    }
    let actual_shape;
    let segment;
    //Get the code area
    let codeArea = document.getElementById("codeArea");
    //Clean the code area
    codeArea.innerHTML = "";
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
            let truePath = readGraph(shapes.indexOf(actual_shape.trueValue));
            let falsePath = readGraph(shapes.indexOf(actual_shape.falseValue));
            let endif;

            for (let j = 0; j < falsePath.length; j++) {
                if (truePath.includes(falsePath[j])) {
                    endif = falsePath[j];
                    break;
                }
            }
            let eraseTrue = [];
            let eraseFalse = [];

            for (let i = 0; i < truePath.length; i++) {
                if (Object.is(truePath[i], endif)) {
                    break;
                }else {
                    eraseTrue.push(truePath[i]);
                }
            }

            for (let i = 0; i < falsePath.length; i++) {
                if (Object.is(falsePath[i], endif)) {
                    break;
                }else {
                    eraseFalse.push(falsePath[i]);
                }
            }

            segment = " if(" + actual_shape.text + "){\n" +
                "\t" + "a" + "\n} else {\n" +
                "\t" + "a" + "\n};\n";

            createCode([eraseTrue]);
            createCode([eraseFalse]);


            console.log(endif.text);

            code.splice(code.indexOf(actual_shape.trueValue), 1);
            code.splice(code.indexOf(actual_shape.falseValue), 1);

        }
        if (segment != null) {
            codeArea.innerHTML += segment;
        }

        hljs.highlightAll();

    }
}

