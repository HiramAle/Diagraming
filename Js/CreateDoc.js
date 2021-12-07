
let recoveredShapes = [];
let recoveredLinks = [];

let diagram = [shapes, connectors]; 
// Manejo  de JSON

// Crea y  descarga y los archivos .json
function crearJ(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(diagram));
    var link = document.createElement('a');
    link.setAttribute('download', 'Diagrama.json');
    link.style.display = 'none';
  
    document.body.appendChild(link);
      link.setAttribute('href', dataStr);
      link.click();
    document.body.removeChild(link);
}
  

//Lee el archivo .json
function abrirArchivo (evento){
    let archivo = evento.target.files[0];
    if (archivo) {
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            let json_data = JSON.parse(contenido);
            for(var i in json_data[0]){
                recoveredShapes.push([i, json_data [0][i]]);
            }  

            for(var i in json_data[1]){
                recoveredLinks.push([i, json_data [1][i]]);
            } 

            recoveredS();
            recoveredL();
            reDraw();      
        };
        reader.readAsText(archivo);
    } else {
        alert('No se subio el archivo exitosamente')
    }    

}


function recoveredS (){
    for(var i in recoveredShapes){
        let a;
        let recovered_adj = [];
        switch (recoveredShapes[i][1].type) {
            case "start":
                a = new Start(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
            case "end":
                a = new End(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
            case "variable":
                a = new Variable(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
            case "input":
                a = new DataInput(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
            case "output":
                a = new DataOutput(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
            case "assigment":
                a = new Assignment(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
            case "if":
                a = new IfShape(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
            default:
                a = new WhileShape(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                a.text = recoveredShapes[i][1].text;
                a.bg_color = recoveredShapes[i][1].bg_color;
                for(j in recoveredShapes[i][1].adj_shapes){
                    let b = recover(recoveredShapes[i][1].adj_shapes[j]);
                    recovered_adj.push(b);
                }
                a.adj_shapes = recovered_adj;
                shapes.push(a);
                break;
        }
    } 
}

function recoveredL(){
    for(var i in recoveredLinks){
        let shape1 = recover(recoveredLinks[i][1].start_shape);
        let shape2 = recover(recoveredLinks[i][1].end_shape);
        let a = new Link (shape1, shape2);
        a.type = recoveredLinks[i][1].type;
        connectors.push(a);
    }
}

function recover(figura){
    let a;
        switch (figura.type) {
            case "start":
                a = new Start(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
            case "end":
                a = new End(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
            case "variable":
                a = new Variable(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
            case "input":
                a = new DataInput(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
            case "output":
                a = new DataOutput(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
            case "assigment":
                a = new Assignment(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
            case "if":
                a = new IfShape(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
            default:
                a = new WhileShape(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                return a;
        }
}