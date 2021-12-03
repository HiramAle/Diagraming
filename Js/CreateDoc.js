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
                shapes.push([i, json_data [i]]);
            }         
        };
        reader.readAsText(archivo);
    } else {
        alert('No se subio el archivo exitosamente')
    }

    reDraw();
    
}