
let recoveredShapes = [];
let recoveredLinks = [];

// Manejo  de JSON

// Crea y  descarga y el archivo .json
function crearJ(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shapes));
    var dataStr2 = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(connectors));
    var docs = [dataStr,dataStr2];

    var link = document.createElement('a');

    link.setAttribute('download', 'Diagrama.json');
    link.style.display = 'none';
  
    document.body.appendChild(link);
  
    for (var i = 0; i < docs.length; i++) {
      link.setAttribute('href', docs[i]);
      link.click();
    }
  
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
            for(var i in json_data){
                recoveredShapes.push([i, json_data [i]]);
            }  

            for(var i in recoveredShapes){
                let aux;
                switch (recoveredShapes[i][1].type) {
                    case "start":
                        a = new Start(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                    case "end":
                        a = new End(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                    case "variable":
                        a = new Variable(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                    case "input":
                        a = new DataInput(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                    case "output":
                        a = new DataOutput(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                    case "assigment":
                        a = new Assignment(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                    case "if":
                        a = new IfShape(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                    default:
                        a = new WhileShape(recoveredShapes[i][1].x, recoveredShapes[i][1].y)
                        a.text = recoveredShapes[i][1].text;
                        a.bg_color = recoveredShapes[i][1].bg_color;
                        shapes.push(a);
                        break;
                }
            } 
            reDraw();      
        };
        reader.readAsText(archivo);
    } else {
        alert('No se subio el archivo exitosamente')
    }    
}