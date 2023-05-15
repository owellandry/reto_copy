document.addEventListener("DOMContentLoaded", function() {
    var objetos = {
      "a": ["torre_1", "torre_2", "torre_3", "torre_4", "torre_5", "torre_6"]
    };
    var torresTotales = 3;
    var contador = 0;
    var primeraTorreMovida = false;
    var cronometro = document.getElementById('cronometro');
    var segundos = 0;
    var minutos = 0;
    var horas = 0;
    var interval;
  
    function main() {
      pintar("a");
      inicio();
    }
  
    function inicio() {
        console.log("Juego cargado");
        var torres = document.querySelectorAll("#contenedor > div > div");
        var soltar = document.querySelectorAll("#contenedor > div");
        for (var i = 0; i < torres.length; i++) {
          torres[i].addEventListener("dragstart", arrastradoInicial, false);
          torres[i].addEventListener("dragend", finalizado, false);
        }
        for (var i = 0; i < soltar.length; i++) {
          soltar[i].addEventListener("dragenter", (e) => e.preventDefault(), false);
          soltar[i].addEventListener("dragover", (e) => e.preventDefault(), false);
          soltar[i].addEventListener("drop", dropFinal, false);
        }
      }
      
      function arrastradoInicial(e) {
        var padre = e.target.parentNode;
        if (padre.childNodes[0].id === e.target.id) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData("Text", e.target.id);
        }
      }
      
      function finalizado(e) {
        e.preventDefault();
        var final = document.getElementById("c");
        var ganar = document.querySelector("div#salida > div");
        if (final.childNodes.length === torresTotales) {
          ganar.innerHTML = "<div><h1>HAS GANADO UN PREMIO :)</h1></div>";
        }
      }
      
      function dropFinal(e) {
        e.preventDefault();
        var puntero = e.target;
        var padre = document.getElementById(puntero.id).childNodes;
        var item = e.dataTransfer.getData("Text");
        var puedoPoner = cortaCompa(padre, item);
        var torreVacia = padre.length === 0;
        var fichaSuperior = padre.length > 0 ? padre[0].id.split("_")[1] : Infinity;
        var fichaArrastrada = item.split("_")[1];
      
        if (puntero.id !== "torre_1" && puntero.id !== "torre_2" && puntero.id !== "torre_3" && item !== '' && puedoPoner && (torreVacia || fichaArrastrada < fichaSuperior)) {
          var quitar = document.getElementById(item);
          quitar.parentNode.removeChild(quitar);
          puntero.innerHTML = '<div id="' + item + '" draggable="true"></div>' + puntero.innerHTML;
          contador++;
      
          if (!primeraTorreMovida) {
            primeraTorreMovida = true;
            iniciarCronometro();
          }
        }
      
        var sal = document.querySelector("div#salida span");
        sal.innerHTML = contador;
        inicio();
      }
      
      
      function pintar(p) {
        var cajas = document.getElementById(p);
        cajas.innerHTML = '';
        for (var i = 0; i < objetos[p].length; i++) {
          cajas.innerHTML += '<div id="' + objetos[p][i] + '" draggable="true"></div>';
        }
      }
      
      function cortaCompa(primero, segundo) {
        if (primero.length === 0) {
          return true;
        } else {
          var salida = segundo.split("_")[1] < primero[0].id.split("_")[1];
          return salida;
        }
      }
      
      function iniciarCronometro() {
        interval = setInterval(actualizarCronometro, 1000);
      }
      
      function actualizarCronometro() {
        segundos++;
      
        if (segundos >= 60) {
          segundos = 0;
          minutos++;
      
          if (minutos >= 60) {
            minutos = 0;
            horas++;
          }
        }
      
        cronometro.textContent = (horas ? (horas > 9 ? horas : "0" + horas) : "00") + ":" +
          (minutos ? (minutos > 9 ? minutos : "0" + minutos) : "00") + ":" +
          (segundos > 9 ? segundos : "0" + segundos);
      }
  
    window.addEventListener("load", main);
  });
  