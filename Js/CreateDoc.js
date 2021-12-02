// Manejo  de JSON

// Crea y  descarga y el archivo .json
function crearJ(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shapes));
    var dlAnchorElem = document.getElementById('guardar');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "diagrama.json");
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
                alert('hola');
                shapes.push([i, json_data [i]]);
            }
            
            //reDraw();
        };
        reader.readAsText(archivo);
    } else {
        alert('No se subio el archivo exitosamente')
    }
}