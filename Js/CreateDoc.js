
let recoveredShapes = [];
let recoveredLinks = [];

let diagram = [shapes, connectors]; 
// Manejo  de JSON

// Crea y  descarga y los archivos .json
function crearJ(){
    for(var i=0; i< connectors.length; i++)
    {
        if(connectors[i].start_shape.adj_shapes[0].connector != undefined)
            connectors[i].start_shape.adj_shapes[0].connector = '';
    }
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
                a.trueValue = recoveredShapes[i][1].trueValue;
                a.falseValue = recoveredShapes[i][1].falseValue;
                a.connector = recoveredShapes[i][1].connector;
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
                a.trueValue = recoveredShapes[i][1].trueValue;
                a.falseValue = recoveredShapes[i][1].falseValue;
                a.cicle = recoveredShapes[i][1].cicle;
                a.connector = recoveredShapes[i][1].connector;
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
        
        for(j in shapes){
            if(shapes[j].x  == shape1.x && shapes[j].y == shape1.y){
                for(k in shapes){
                    if(shapes[k].x  == shape2.x && shapes[k].y == shape2.y){
                        let a = new Link (shapes[j], shapes[k]);
                        a.type = recoveredLinks[i][1].type;
                        connectors.push(a);
                    }
                }
            }
        }
    }
}

function recover(figura){
    let a;
    let recovered_adj = [];
        switch (figura.type) {
            case "start":
                a = new Start(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
            case "end":
                a = new End(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
            case "variable":
                a = new Variable(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
            case "input":
                a = new DataInput(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
            case "output":
                a = new DataOutput(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
            case "assigment":
                a = new Assignment(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
            case "if":
                a = new IfShape(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                a.trueValue = figura.trueValue;
                a.falseValue = figura.falseValue;
                a.connector = figura.connector;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
            default:
                a = new WhileShape(figura.x, figura.y);
                a.text = figura.text;
                a.bg_color = figura.bg_color;
                a.trueValue =figura.trueValue;
                a.falseValue = figura.falseValue;
                a.cicle = figura.cicle;
                a.connector = figura.connector;
                for(j in figura.adj_shapes){
                    let b = recover(figura.adj_shapes[j]);
                    recovered_adj.push(b);
                }
                return a;
        }
}

//XML 
function crearXML(){
    for(var i=0; i< connectors.length; i++)
    {
        if(connectors[i].start_shape.adj_shapes[0].connector != undefined)
            connectors[i].start_shape.adj_shapes[0].connector = '';
    }
    var InputJSON = JSON.stringify(diagram);
    var output = eval("OBJtoXML("+InputJSON+");")

    var dataStr = "data:text/xml;charset=utf-8," + encodeURIComponent(output);
    var link = document.createElement('a');
    link.setAttribute('download', 'Diagrama.xml');
    link.style.display = 'none';
  
    document.body.appendChild(link);
      link.setAttribute('href', dataStr);
      link.click();
    document.body.removeChild(link);
    
    
}

//Convierte el  json en xml
function OBJtoXML(obj) {
    var xml = '';
    xml += "<item>"
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          xml += OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    xml += "</item>"
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml
  }