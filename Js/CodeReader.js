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
        if (!queue.includes(actual_shape.adj_shapes[i])) {
          queue.push(actual_shape.adj_shapes[i]);
        }
      }
    }
  }
  return visited;
}

//Variable
let itemWhile = null;
let itemFirstCicle = null;

segment = '';
codeArea = document.getElementById('codeArea');
codeArea.innerHTML = '';

function createCode(code) {
  actual_queue = [...code];
  codeArea.innerHTML = '';

  //While the code array have items, the function continues reading the array
  while (actual_queue.length > 0) {
    //Check if there is a while
    actual_queue.some((element) => {
      if (element instanceof WhileShape) {
        itemWhile = element;
        itemFirstCicle = element.cicle;
        return true;
      }
      return false;
    });

    //Check if the first element of the cycle is the next in the queue
    if (actual_queue.indexOf(itemFirstCicle) === 0) {
      actual_shape = itemWhile;
      actual_queue.splice(actual_queue.indexOf(actual_shape), 1);
    } else {
      //Pop the first node in the array
      actual_shape = actual_queue.shift();
    }

    console.log(actual_shape);
    codeForShapes(actual_shape);
  }
}

function caseIfShape() {
  let trueRoot = [];
  let falseRoot = [];
  let itemRootTrue = actual_shape.trueValue;
  let itemRootFalse = actual_shape.falseValue;

  while (itemRootTrue != null) {
    trueRoot = [...trueRoot, itemRootTrue];
    itemRootTrue =
      itemRootTrue.adj_shapes.length === 0 ? null : itemRootTrue.adj_shapes[0];
  }

  while (itemRootFalse != null) {
    falseRoot = [...falseRoot, itemRootFalse];
    itemRootFalse =
      itemRootFalse.adj_shapes.length === 0 ? null : itemRootFalse.adj_shapes[0];
  }

  ifRoots(trueRoot, falseRoot, actual_queue);
  segment = '}\n';
  codeArea.innerHTML += segment;

  if (falseRoot.length > 0) {
    segment = 'else {\n';
    codeArea.innerHTML += segment;
    ifRoots(falseRoot, trueRoot, actual_queue);
    segment = '}\n';
    codeArea.innerHTML += segment;
  }

  segment = '';
  console.log('end Imprimir if');
}

function caseWhileShape() {
  let trueRoot = [];
  let falseRoot = [];
  let itemRootTrue = actual_shape.cicle;
  let itemRootFalse = actual_shape.falseValue;
  let count = 0;

  while (itemRootTrue != null) {
    trueRoot = [...trueRoot, itemRootTrue];
    if (
      trueRoot.includes(itemRootTrue.adj_shapes[0]) &&
      itemRootTrue.adj_shapes.length > 1
    )
      count++;
    itemRootTrue =
      itemRootTrue.adj_shapes.length === 0 ? null : itemRootTrue.adj_shapes[count];

    count = 0;
  }

  while (itemRootFalse != null) {
    falseRoot = [...falseRoot, itemRootFalse];
    itemRootFalse =
      itemRootFalse.adj_shapes.length === 0 ? null : itemRootFalse.adj_shapes[0];
  }

  trueRoot.some((shape) => {
    if (actual_queue.indexOf(shape) !== -1)
      actual_queue.splice(actual_queue.indexOf(shape), 1);
    if (shape instanceof WhileShape) return true;
    codeForShapes(shape);
    return false;
  });

  segment = '}\n';
  codeArea.innerHTML += segment;
  segment = '';
  itemWhile = null;
  itemFirstCicle = null;
  console.log('end Imprimir while');
}

function ifRoots(root_1, root_2, mainRoot = []) {
  root_1.some((shape, i) => {
    if (root_2.indexOf(shape) === -1) {
      if (mainRoot.indexOf(shape) !== -1)
        mainRoot.splice(mainRoot.indexOf(shape), 1);
      console.log(shape);
      codeForShapes(shape);
      return false;
    }
    return true;
  });
}

function codeForShapes(actual_shape) {
  //Case Start Shape
  if (actual_shape instanceof Start) {
    segment = '#include <stdio.h>\n' + 'int main (int argc,char **argv)\n' + '{\n';
  }
  //Case Variable Shape
  if (actual_shape instanceof Variable) {
    segment = actual_shape.text + ';\n';
  }
  //Case Input Shape
  if (actual_shape instanceof DataInput) {
    segment = ' scanf();\n';
  }
  //Case Output Shape
  if (actual_shape instanceof DataOutput) {
    segment = " printf('" + actual_shape.text + "');\n";
  }
  //Case Assigment or simple code Shape
  if (actual_shape instanceof Assignment) {
    segment = ' ' + actual_shape.text + ';\n';
  }
  //Case End Shape
  if (actual_shape instanceof End) {
    segment = ' return 0;\n}';
  }
  //Case If Shape
  if (actual_shape instanceof IfShape) {
    segment = 'if(' + actual_shape.text + '){\n';
    codeArea.innerHTML += segment;
    segment = '';
    caseIfShape();
  }
  //Case While Shape
  if (actual_shape instanceof WhileShape) {
    segment = 'while(' + actual_shape.text + '){\n';
    codeArea.innerHTML += segment;
    segment = '';
    caseWhileShape();
  }
  if (segment != null) {
    codeArea.innerHTML += segment;
    segment = '';
  }
  hljs.highlightAll();
}
