
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

    var start_shape = xml_data.getElementsByTagName("start_shape");
    var end_shape = xml_data.getElementsByTagName("end_shape");
    let cont  = 0;
    let cont_if = 0;
    let cont_while = 0;
    let a;
    while (result) {
        switch (result.childNodes[0].nodeValue) {
            case "start":
                a = new Start(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;

                shapes.push(a);
                break;
            case "end":
                a = new End(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "variable":
                a = new Variable(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "input":
                a = new DataInput(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "output":
                a = new DataOutput(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "assigment":
                a = new Assignment(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;


                shapes.push(a);
                break;
            case "if":
                cont_if ++;
                a = new IfShape(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;                
                
                shapes.push(a);
                break;
            case "while":
                cont_while++;
                a = new WhileShape(resultX.childNodes[0].nodeValue, resultY.childNodes[0].nodeValue);
                a.text = resultText.childNodes[0].nodeValue;
                a.bg_color = resultBg_color.childNodes[0].nodeValue;
                a.trueValue = resulttv.childNodes[0].nodeValue;
                a.falseValue = resultfv.childNodes[0].nodeValue;
                a.connector = resultConnector.childNodes[0].nodeValue;
                a.cicle = resultCicle.childNodes[0].nodeValue;
                shapes.push(a);
                break;
            default:
                break;
        }
        cont++;
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