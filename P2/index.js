console.log("Ejecutando JS...");

display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
clearone = document.getElementById("clearone")

//-- Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OP2: 2,
    OP3: 3,
    OP4: 4
}
 
//-- Variable de estado de la calculadora
//-- Al comenzar estamos en el estado incial
 let estado = ESTADO.INIT;   

//-- Función de retrollamada de los digitos
function digito(boton){
    if(estado == ESTADO.INIT){
        display.innerHTML = boton;
        estado = ESTADO.OP1;
    }else if(estado == ESTADO.OP1){
        display.innerHTML += boton;
    }else if(estado == ESTADO.OP2){
        display.innerHTML += boton;
      estado = ESTADO.OP3;
    }else if (estado == ESTADO.OP3) {
      display.innerHTML +=  boton;
      estado = ESTADO.OP4;
    }else if (estado == ESTADO.OP4){
      display.innerHTML += boton;
    }
}

//-- Obtener una colección con todos los elementos
//-- de la clase digito
let digitos = document.getElementsByClassName("digito")
for(i=0; i<digitos.length; i++){
    digitos[i].onclick = (ev) =>{
        digito(ev.target.value);
        console.log(estado, "digito");
    }
}

// Leemos operaciones
let operation = document.getElementsByClassName("operation")
for(i=0; i<operation.length; i++){
    operation[i].onclick = (ev) =>{
        operations(ev.target.value);
        console.log(estado, "operation");
    }
}

function operations(operation){
    if (estado != ESTADO.OP2){
        display.innerHTML += operation;
        estado = ESTADO.OP2;
      }
}

//-- Evaluar la expresion
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
}


// Borrar último dígito
clearone.onclick = () => {
    estado = ESTADO.OP2;
    display.innerHTML = display.innerHTML.slice(0,-1);
}

// Poner coma
coma.onclick = () => {
    if(estado == ESTADO.OP1 || estado == ESTADO.OP3 || estado == ESTADO.INIT){
      display.innerHTML += coma.innerHTML;
      estado = ESTADO.OP2;
      console.log(estado, "coma");
    }
}
  
//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
  console.log("clear");
  estado = ESTADO.INIT;
}