var objetos = {
    "a": ["torre_1", "torre_2", "torre_3", "torre_4", "torre_5", "torre_6"]
}
var torresTotales = 3;
var contador = 0;
function main() {
    pintar("a");
    inicio();
}
function inicio() {
    console.log("Juego cargardo");
    var torres = document.querySelectorAll("#contenedor > div > div");
    var soltar = document.querySelectorAll("#contenedor > div");
    for(var i = 0; i < torres.length; i++) {
        torres[i].addEventListener("dragstart", arrastradoInicial, false);
        torres[i].addEventListener("dragend", finalizado, false);
    }
    for(var i = 0; i < soltar.length; i++) {
        soltar[i].addEventListener("dragenter", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("dragover", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("drop", dropFinal, false);
    }
    
}
function arrastradoInicial(e) {
    var padre = e.target.parentNode;
    if(padre.childNodes[0].id === e.target.id) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("Text", e.target.id);        
    }
}
function finalizado(e) {
    e.preventDefault();
    var final = document.getElementById("c");
    var ganar = document.querySelector("div#salida > div");
    if(final.childNodes.length === torresTotales) {
        ganar.innerHTML = "HAS GANADO UN PREMIO :)";
    }
}
function dropFinal(e) {
    e.preventDefault();
    var puntero = e.target;
    var padre = document.getElementById(puntero.id).childNodes;   
    var item = e.dataTransfer.getData("Text");
    var puedoPoner = cortaCompa(padre, item);
    if(puntero.id != "torre_1" && puntero.id != "torre_2" && puntero.id != "torre_3" && item != '' &&  puedoPoner) {
        var quitar = document.getElementById(item);
        quitar.parentNode.removeChild(quitar);
        puntero.innerHTML = '<div id="'+item+'" draggable="true"></div>' + puntero.innerHTML;
        contador++;
    }
    var sal = document.querySelector("div#salida span");
    sal.innerHTML = contador;
    inicio();
}
function pintar(p) {
    var cajas = document.getElementById(p);const objetos = {
        "a": ["torre_1", "torre_2", "torre_3", "torre_4", "torre_5", "torre_6"]
      };
      const torresTotales = 3;
      
      let contador = 0;
      
      function main() {
        pintar("a");
        inicio();
      }
      function inicio() {
        console.log("Juego cargardo");
        const torres = document.querySelectorAll("#contenedor > div > div");
        const soltar = document.querySelectorAll("#contenedor > div");
        for(const torre of torres) {
          torre.addEventListener("dragstart", arrastradoInicial);
          torre.addEventListener("dragend", finalizado);
        }
        for(const destino of soltar) {
          destino.addEventListener("dragenter", e => e.preventDefault());
          destino.addEventListener("dragover", e => e.preventDefault());
          destino.addEventListener("drop", dropFinal);
        }
      }
      function arrastradoInicial(e) {
        const padre = e.target.parentNode;
        if(padre.childNodes[0].id === e.target.id) {
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData("Text", e.target.id);
        }
      }
      function finalizado(e) {
        e.preventDefault();
        const final = document.getElementById("c");
        const ganar = document.querySelector("div#salida > div");
        if(final.childNodes.length === torresTotales) {
          ganar.innerHTML = "HAS GANADO UN PREMIO :)";
        }
      }
      function dropFinal(e) {
        e.preventDefault();
        const destino = e.target;
        if(!destino.id.startsWith("torre_")) return;
      
        const piezas = Array.from(destino.children).map(child => parseInt(child.id.split("_")[1]));
        const item = e.dataTransfer.getData("Text");
        const numItem = parseInt(item.split("_")[1]);
        if(isNaN(numItem)) return;
      
        if(piezas.length === 0 || numItem < piezas[0]) {
          const itemElement = document.getElementById(item);
          itemElement.parentNode.removeChild(itemElement);
          destino.prepend(itemElement);
          contador++;
        }
      
        const sal = document.querySelector("#salida span");
        sal.innerHTML = contador;
      }
      function pintar(p) {
        const cajas = document.getElementById(p);
        cajas.innerHTML = '';
        for(const torre of objetos[p]) {
          cajas.innerHTML += `<div id="${torre}" draggable="true"></div>`;
        }
      }
      window.addEventListener("load", main);
    cajas.innerHTML = '';
    for(var i = 0; i < objetos[p].length; i++) {
        cajas.innerHTML += '<div id="'+objetos[p][i]+'" draggable="true"></div>';
    }
}
function cortaCompa(primero, segundo) {
    if(primero[0] == undefined) {
        salida = true;
    } else {
        var salida = ( segundo.split("_")[1] < primero[0].id.split("_")[1] ) ? true: false;
      }
      console.log(contador);
    return salida;
}
window.addEventListener("load", main, false);

// Variables globales
let cronometro = document.getElementById('cronometro');
let startBtn = document.getElementById('start-btn');
let segundos = 0;
let minutos = 0;
let horas = 0;
let interval;

// Función para actualizar el cronómetro
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

// Función para iniciar el cronómetro
function iniciarCronometro() {
  interval = setInterval(actualizarCronometro, 1000);
  startBtn.disabled = true;
}

// Asignar el evento 'click' al botón para iniciar el cronómetro
startBtn.addEventListener('click', iniciarCronometro);
