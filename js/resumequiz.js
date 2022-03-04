$(function(){
    var options = window.location.search.slice(1)
                          .split('&')
                          .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
                            b = b.split('=');
                            a[b[0]] = decodeURIComponent(b[1]);
                            return a;
                          }, {});
    var examen = options.examen;
    var miStorage = window.localStorage;
    var ex =JSON.parse(miStorage.getItem(examen + ""));
    var cuestionario = $("#cuestionario");
    var encabezado = $("#encabezado h1");
    encabezado.text("Examen-" + examen + "   Nota:" + ex[3]);
    var preguntas = ex[1];
    var respuestas = ex[2];
    var i = 0;
    var lineas = [];
    console.log(preguntas);
    while(i < preguntas.length){
        var nuevo = '';
        var textopregunta = preguntas[i].pregunta;
        var textorespuesta = respuestas[i];
        textopregunta = textopregunta.replace('<','&lt;');
        textopregunta = textopregunta.replace('>','&gt;');
        textorespuesta = textorespuesta.replace('<','&lt;');
        textorespuesta = textorespuesta.replace('>','&gt;');
        if(preguntas[i].correcta==respuestas[i]){
            //esta hay que marcarla como verde
            nuevo = '<li><span class="negrita">' + textopregunta + '</span>: <span class="verde">' + textorespuesta + '</span></li>';
        }
        else{
            nuevo = '<li><span class="negrita">' + textopregunta + '</span>: <span class="rojo">' + textorespuesta + '</span></li>';
        }
        lineas.push(nuevo);
        i++;
    }
    cuestionario.append(lineas.join(''));
});