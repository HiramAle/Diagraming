function readGraph() {
    let actual_shape;
    let queue = [];
    let visited = [];

    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i] instanceof Start) {
            queue.push(shapes[i]);
        }
    }

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

    createCode(visited);
}

function createCode(code) {
    let codeArea = document.getElementById("codeArea");
    codeArea.innerHTML = "";
    let actual_shape;
    let segment;
    while (code.length > 0) {
        actual_shape = code[0];
        if (actual_shape instanceof Start) {
            segment = "#include <stdio.h>\n" +
                "int main (int argc,char **argv)\n" +
                "{\n";
        }
        if (actual_shape instanceof Variable) {
            segment = actual_shape.text + ";\n";
        }
        if (actual_shape instanceof DataInput) {
            segment = "scanf();\n"
        }
        if (actual_shape instanceof DataOutput) {
            segment = "printf(" + actual_shape.text + ");\n";
        }
        if (actual_shape instanceof DataOutput) {
            segment = "printf(" + actual_shape.text + ");\n";
        }
        if (segment != null){
            codeArea.innerHTML += segment;
        }
        hljs.highlightAll();
        code.shift();
    }
}

