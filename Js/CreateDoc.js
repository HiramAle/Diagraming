function crearJ(){
    const myObjStr = JSON.stringify(shapes);
    console.log(myObjStr);

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(shapes));
    var dlAnchorElem = document.getElementById('guardar');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "diagrama.json");
    dlAnchorElem.click();
}
