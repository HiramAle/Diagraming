function crearJ(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shapes));
    var dlAnchorElem = document.getElementById('guardar');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "diagrama.json");
}
