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
  
 // Recupera el xml
 function abrirArchivoXML (evento){
    let archivo = evento.target.files[0];
    if (archivo) {
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            let parser = new DOMParser();
            xml_data = parser.parseFromString(contenido,"text/xml");
            let path = "/item/item/type|/item/item/parent::item";
            let pathParte1 = "/item/item/";
            let pathParte2 = "|/item/item/parent::item";
            recoveredSxml(xml_data, path, pathParte1, pathParte2);
            reDraw();      
        };
        reader.readAsText(archivo);
    } else {
        alert('No se subio el archivo exitosamente')
    }    

}

function recoveredSxml(xml_data, path, pathParte1, pathParte2){
    var nodes = xml_data.evaluate(path, xml_data, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();

    var x = xml_data.evaluate(pathParte1+"x"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultX = x.iterateNext();
    var y = xml_data.evaluate(pathParte1+"y"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultY = y.iterateNext();
    var text = xml_data.evaluate(pathParte1+"text"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultText = text.iterateNext();
    var bg_color = xml_data.evaluate(pathParte1+"bg_color"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultBg_color = bg_color.iterateNext();
    var trueValue = xml_data.evaluate(pathParte1+"trueValue"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resulttv = trueValue.iterateNext();
    var falseValue = xml_data.evaluate(pathParte1+"falseValue"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultfv = falseValue.iterateNext();
    var connector = xml_data.evaluate(pathParte1+"connector"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultConnector = connector.iterateNext();
    var cicle = xml_data.evaluate(pathParte1+"cicle"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultCicle = cicle.iterateNext();

    let count_if = 0;
    let count_while = 0;
    let count = 0;
    let a;
    while (result) {
        switch (result.childNodes[0].nodeValue) {
            case "start":
                a = new Start(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);
                shapes.push(a);
                break;
            case "end":
                a = new End(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);
                shapes.push(a);
                break;
            case "variable":
                a = new Variable(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);
                shapes.push(a);
                break;
            case "input":
                a = new DataInput(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);

                shapes.push(a);
                break;
            case "output":
                a = new DataOutput(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);

                shapes.push(a);
                break;
            case "assigment":
                a = new Assignment(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);

                shapes.push(a);
                break;
            case "if":
                count_if++;
                a = new IfShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue; 
                a.trueValue = resulttv.childNodes[0].nodeValue;
                a.falseValue = resultfv.childNodes[0].nodeValue;
                //a.connector = resultConnector.childNodes[0].nodeValue;  
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);

                shapes.push(a);
                resulttv = trueValue.iterateNext();
                resultfv = falseValue.iterateNext();
                resultConnector = connector.iterateNext(); 
                break;
            case "while":
                count_while++;
                a = new WhileShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                a.trueValue = resulttv.childNodes[0].nodeValue;
                a.falseValue = resultfv.childNodes[0].nodeValue;
                //a.connector = resultConnector.childNodes[0].nodeValue;
                a.cicle = resultCicle.childNodes[0].nodeValue;
                path = "/item/item/adj_shapes/item/type|/item/item/adj_shapes/item/parent::adj_shapes";
                pathParte1 = "/item/item/adj_shapes/item/";
                pathParte2 = "|/item/item/adj_shapes/item/parent::adj_shapes";
                a.adj_shapes = recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if);

                shapes.push(a);
                resulttv = trueValue.iterateNext();
                resultfv = falseValue.iterateNext();
                resultConnector = connector.iterateNext();                        
                resultCicle = cicle.iterateNext();
                break;
            default:
                path = "/item/item/start_shape/item/type|/item/item/start_shape/item/parent::start_shape";
                pathParte1 = "/item/item/start_shape/item/";
                pathParte2 = "|/item/item/start_shape/item/parent::start_shape";
                start_shape = recoverShape(xml_data, path, pathParte1, pathParte2,count,count_while,count_if);
                
                path = "/item/item/end_shape/item/type|/item/item/end_shape/item/parent::end_shape";
                pathParte1 = "/item/item/end_shape/item/";
                pathParte2 = "|/item/item/end_shape/item/parent::end_shape";
                end_shape = recoverShape(xml_data, path, pathParte1, pathParte2,count,count_while,count_if);
                count++;
                for(j in shapes){
                    if(shapes[j].x  == start_shape.x && shapes[j].y == start_shape.y){
                        for(k in shapes){
                            if(shapes[k].x  == end_shape.x && shapes[k].y == end_shape.y){
                                let a = new Link (shapes[j], shapes[k]);
                                a.type = result.childNodes[0].nodeValue;
                                connectors.push(a);
                            }
                        }
                    }
                }
                break;
        }
        result = nodes.iterateNext();
        resultX = x.iterateNext();
        resultY = y.iterateNext();
        resultText = text.iterateNext();
        resultBg_color = bg_color.iterateNext();
    }
}

function recoverShape(xml_data, path, pathParte1, pathParte2, count, count_while, count_if){
    var nodes = xml_data.evaluate(path, xml_data, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();

    var x = xml_data.evaluate(pathParte1+"x"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultX = x.iterateNext();
    var y = xml_data.evaluate(pathParte1+"y"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultY = y.iterateNext();
    var text = xml_data.evaluate(pathParte1+"text"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultText = text.iterateNext();
    var bg_color = xml_data.evaluate(pathParte1+"bg_color"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultBg_color = bg_color.iterateNext();
    var trueValue = xml_data.evaluate(pathParte1+"trueValue"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resulttv = trueValue.iterateNext();
    var falseValue = xml_data.evaluate(pathParte1+"falseValue"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultfv = falseValue.iterateNext();
    var connector = xml_data.evaluate(pathParte1+"connector"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultConnector = connector.iterateNext();
    var cicle = xml_data.evaluate(pathParte1+"cicle"+pathParte2, xml_data, null, XPathResult.ANY_TYPE, null);
    var resultCicle = cicle.iterateNext();
    for(var i = 0; i < count; i++ ){
        result = nodes.iterateNext();
        resultX = x.iterateNext();
        resultY = y.iterateNext();
        resultText = text.iterateNext();
        resultBg_color = bg_color.iterateNext();
        
    }
    for (let j = 0; j < (count_if+count_while); j++) {
        resulttv = trueValue.iterateNext();
        resultfv = falseValue.iterateNext();
        resultConnector = connector.iterateNext();
    }

    for (let k = 0; k < count_while; k++) {
        resultCicle = cicle.iterateNext();
    }
    let a;
        switch (result.childNodes[0].nodeValue) {
            case "start":
                a = new Start(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;

                return a;
            case "end":
                a = new End(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                return a;
            case "variable":
                a = new Variable(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                return a;
            case "input":
                a = new DataInput(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                return a;
            case "output":
                a = new DataOutput(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                return a;
            case "assigment":
                a = new Assignment(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                return a;
            case "if":
                a = new IfShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue; 
                a.trueValue = resulttv.childNodes[0].nodeValue;
                a.falseValue = resultfv.childNodes[0].nodeValue;
                //a.connector = resultConnector.childNodes[0].nodeValue;               
                return a;
            default :
                a = new WhileShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                a.trueValue = resulttv.childNodes[0].nodeValue;
                a.falseValue = resultfv.childNodes[0].nodeValue;
                //a.connector = resultConnector.childNodes[0].nodeValue;
                a.cicle = resultCicle.childNodes[0].nodeValue;
                return a;
    }
}
