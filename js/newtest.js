$(function(){
    $.get('https://www.jmcastellano.eu/json/temas.json', function(data) {
        var listadotemas = $('#listadotemas');
        var temas = [];
        var nuevo = '<li><a href="test.html?tema=0">Todos</a></li>';
        temas.push(nuevo);
        data.temas.forEach(tema => {
            var nuevo = '<li><a href="test.html?tema=' + tema.id + '">' + tema.nombre + '</a></li>';
            temas.push(nuevo);
        });
        listadotemas.append(temas.join(''));
    });
});