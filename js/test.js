var preguntasfinales = [];
var respuestastotales = [];
var preguntaactual = 0;
var siguientePregunta;
var anteriorPregunta;
var marcarPregunta;
var respuestasindicadas = [];
const numpreguntas = 10;
$(function(){
const preg = $('#pregunta p');
const opcion1 = $('#respuesta1');
const opcion2 = $('#respuesta2');
const opcion3 = $('#respuesta3');
const opcion4 = $('#respuesta4');
const atras = $('#atras');
const adelante = $('#adelante');
  $.get('https://www.jmcastellano.eu/json/preguntas.json', function(data) {
    var options = window.location.search.slice(1)
                          .split('&')
                          .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
                            b = b.split('=');
                            a[b[0]] = decodeURIComponent(b[1]);
                            return a;
                          }, {});
    var tema = options.tema;
    var preguntas = data.preguntas;
    //ahora tenemos que quedarnos solo con las primeras 10 preguntas que encontremos
    var temaselegidos = [];
    //si el tema es el 0 entonces son todos los temas
    preguntas.forEach(element => {
      if(element.tema==tema || tema==0){
        temaselegidos.push(element);
      }
    });
    //aqui solo quedan las preguntas del tema en concreto. Ahora tenemos que hacer un random sort
    temaselegidos = mezclar(temaselegidos);
    var i = 0;
    while(i<numpreguntas){
        preguntasfinales.push(temaselegidos[i]);
        var respuestas = [];
        respuestas.push(temaselegidos[i].opcion1);
        respuestas.push(temaselegidos[i].opcion2);
        respuestas.push(temaselegidos[i].opcion3);
        respuestas.push(temaselegidos[i].opcion4);
        respuestas = mezclar(respuestas);
        respuestastotales.push(respuestas);
        respuestasindicadas[i]=null;
        i++;
    }
    
    var cargarPregunta = function(num){
      let p1 = preguntasfinales[num];
      preg.text((num+1) + ' - ' + p1.pregunta);
      //las 4 opciones vamos a meterlas en una array, a hacerla un mezclar() y luego las ponemos una a 1
      opcion1.attr("value", respuestastotales[num][0]);
      opcion2.attr("value", respuestastotales[num][1]);
      opcion3.attr("value", respuestastotales[num][2]);
      opcion4.attr("value", respuestastotales[num][3]);
      opcion1.text(respuestastotales[num][0]);
      opcion2.text(respuestastotales[num][1]);
      opcion3.text(respuestastotales[num][2]);
      opcion4.text(respuestastotales[num][3]);
      //quitamos la clase marcada de los 4 botones
      opcion1.removeClass("marcada");
      opcion2.removeClass("marcada");
      opcion3.removeClass("marcada");
      opcion4.removeClass("marcada");
      //y ahora marcamos la opcion de la que coincida
      if(respuestasindicadas[num]!=null){
        if(respuestasindicadas[num]==respuestastotales[num][0]){
          opcion1.addClass("marcada");
        }
        if(respuestasindicadas[num]==respuestastotales[num][1]){
          opcion2.addClass("marcada");
        }
        if(respuestasindicadas[num]==respuestastotales[num][2]){
          opcion3.addClass("marcada");
        }
        if(respuestasindicadas[num]==respuestastotales[num][3]){
          opcion4.addClass("marcada");
        }      
      }
      preguntaactual = num;
    }

    siguientePregunta = function(){
      if(preguntaactual + 1 >= numpreguntas){
        //aqui deberiamos ir a la pantalla de resultados
        //guardamos en el localstorage tanto la array de preguntas, como las respuestas indicadas
        var datos = [];
        //comprobamos si queda alguna respuesta a nulo
        var encontrado = false;
        respuestasindicadas.forEach(element => {
          if(element==null){
            encontrado=true;
          }
        });
        if(encontrado){
          alert("Se han encontrado preguntas sin contestar. Revise todas las preguntas");
          return;
        }
        //si llega aqui, es que esta todo
        //vamos a calcular la nota
        var i = 0;
        var nota = 0;
        while(i<numpreguntas){
          if(preguntasfinales[i].correcta==respuestasindicadas[i]){
            nota++;
          }
          i++;
        }
        //la nota final se calcula dividiendo por el numero de preguntas y multiplicando por 10
        nota = nota/numpreguntas*10;
        datos.push(new Date());
        datos.push(preguntasfinales);
        datos.push(respuestasindicadas);
        datos.push(nota);

        //y ahora lo almacenamos en el localstorage
        miStorage = window.localStorage;
        var cuenta = miStorage.getItem("cuenta");
        if(cuenta==null || cuenta==undefined){
          cuenta="0";
        }
        cuenta = parseInt(cuenta) + 1;
        miStorage.setItem("cuenta",cuenta);
        miStorage.setItem("" + cuenta,JSON.stringify(datos));
        //con esto esta todo guardado, vamos a cambiar a la pagina resumequiz
        document.location.href = "resumequiz.html?examen=" + cuenta;
      }
      else{
        cargarPregunta(preguntaactual+1);
      }
    }

    anteriorPregunta = function(){
      if(preguntaactual-1<0){
        //no hacemos nada
        return;
      }
      //si llega aqui es que es una pregunta valida
      cargarPregunta(preguntaactual-1);
    }

    marcarPregunta = function(valor){
      respuestasindicadas[preguntaactual] = valor;
      cargarPregunta(preguntaactual);
    }
    cargarPregunta(0);
  });
});

function mezclar(vector) {
  let indice = vector.length;
  let aleindex;

  while (indice != 0) {
    aleindex = Math.floor(Math.random() * indice);
    indice--;

    [vector[indice], vector[aleindex]] = [
      vector[aleindex], vector[indice]];
  }
  return vector;
}