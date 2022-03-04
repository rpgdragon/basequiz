$(function(){
    var listadonotas = $('#listadonotas');
    var miStorage = window.localStorage;
    var numexamenes = miStorage.getItem("cuenta");
    var i = 1;
    if(numexamenes==null || numexamenes==undefined){
        listadonotas.text("No has realizado ningún examen todavía");
        return;
    }

    var examenes = [];
    while(i <= numexamenes){
        var examen = JSON.parse(miStorage.getItem(i + ""));
        console.log(examen);
        var nota = examen[3];
        var nuevo = '<li><a href="resumequiz.html?examen=' + i + '"> Intento:' + i + '  -  Nota:' + nota + '</a></li>';
        examenes.push(nuevo);
        i++;
    }
    listadonotas.append(examenes.join(''));
});