
 // Recupera el xml
 function abrirArchivoXML (evento){
    let archivo = evento.target.files[0];
    if (archivo) {
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            let parser = new DOMParser();
            xml_data = parser.parseFromString(contenido,"text/xml");
            recoveredSxml(xml_data);
            reDraw();      
        };
        reader.readAsText(archivo);
    } else {
        alert('No se subio el archivo exitosamente')
    }    

}

function recoveredSxml(xml_data){
    let path = "/item/item/type|/item/item/parent::item";
    var nodes = xml_data.evaluate(path, xml_data, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();

    var x = xml_data.evaluate("/item/item/x|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resultX = x.iterateNext();
    var y = xml_data.evaluate("/item/item/y|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resultY = y.iterateNext();
    var text = xml_data.evaluate("/item/item/text|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resultText = text.iterateNext();
    var bg_color = xml_data.evaluate("/item/item/bg_color|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resultBg_color = bg_color.iterateNext();
    var trueValue = xml_data.evaluate("/item/item/trueValue|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resulttv = trueValue.iterateNext();
    var falseValue = xml_data.evaluate("/item/item/falseValue|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resultfv = falseValue.iterateNext();
    var connector = xml_data.evaluate("/item/item/connector|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resultConnector = connector.iterateNext();
    var cicle = xml_data.evaluate("/item/item/cicle|/item/item/parent::item", xml_data, null, XPathResult.ANY_TYPE, null);
    var resultCicle = cicle.iterateNext();

    let a;
    while (result) {
        switch (result.childNodes[0].nodeValue) {
            case "start":
                a = new Start(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;

                shapes.push(a);
                break;
            case "end":
                a = new End(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "variable":
                a = new Variable(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "input":
                a = new DataInput(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "output":
                a = new DataOutput(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "assigment":
                a = new Assignment(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "if":
                cont_if ++;
                a = new IfShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;                
                
                shapes.push(a);
                break;
            case "while":
                cont_while++;
                a = new WhileShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                a.trueValue = resulttv.childNodes[0].nodeValue;
                a.falseValue = resultfv.childNodes[0].nodeValue;
                a.connector = resultConnector.childNodes[0].nodeValue;
                a.cicle = resultCicle.childNodes[0].nodeValue;
                shapes.push(a);
                break;
            default:
                path = "/item/item/start_shape/item/type|/item/item/start_shape/item/parent::start_shape";
                pathParte1 = "/item/item/start_shape/item/";
                pathParte2 = "|/item/item/start_shape/item/parent::start_shape";
                start_shape = recoverShape(xml_data, path, pathParte1, pathParte2);
                path = "/item/item/end_shape/item/type|/item/item/end_shape/item/parent::end_shape";
                pathParte1 = "/item/item/end_shape/item/";
                pathParte2 = "|/item/item/end_shape/item/parent::end_shape";
                end_shape = recoverShape(xml_data, path, pathParte1, pathParte2);
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
        resulttv = trueValue.iterateNext();
        resultfv = falseValue.iterateNext();
        resultConnector = connector.iterateNext();
        resultCicle = cicle.iterateNext();
    }
}

function recoverShape(xml_data, path, pathParte1, pathParte2){
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
                cont_if ++;
                a = new IfShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;                
                return a;
            default :
                cont_while++;
                a = new WhileShape(parseInt(resultX.childNodes[0].nodeValue), parseInt(resultY.childNodes[0].nodeValue));
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                a.trueValue = resulttv.childNodes[0].nodeValue;
                a.falseValue = resultfv.childNodes[0].nodeValue;
                a.connector = resultConnector.childNodes[0].nodeValue;
                a.cicle = resultCicle.childNodes[0].nodeValue;
                return a;
    }
}