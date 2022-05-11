console.log("Ejecutando JS....")

//-- Acceso a los botones
const boton_img1 = document.getElementById("boton_img1")
const boton_img2 = document.getElementById("boton_img2")
const boton_filtro_grises = document.getElementById("boton_filtro_grises")
const boton_filtro_colores = document.getElementById("boton_filtro_colores")
const boton_filtro_nuclear = document.getElementById("boton_filtro_nuclear")
const boton_filtro_demoniaco = document.getElementById("boton_filtro_demoniaco")
const boton_filtro_pincel = document.getElementById("boton_filtro_pincel")
const boton_filtro_especular = document.getElementById("boton_filtro_especular")
const boton_filtro_bocaabajo = document.getElementById("boton_filtro_bocaabajo")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
var img_original = document.getElementById('img_original1')

//-- El usuario decide la imagen que se carga
boton_img1.onclick = () => {
  img_original = document.getElementById('img_original1');
  ctx.drawImage(img_original, 0, 0, 800, 525);
}

boton_img2.onclick = () => {
  img_original = document.getElementById('img_original2');
  ctx.drawImage(img_original, 0, 0, 800, 525);
}

const ctx = canvas.getContext('2d');

//-- Acceso a los deslizadores
const deslizador_rojo = document.getElementById('deslizador_rojo');
const deslizador_verde = document.getElementById('deslizador_verde');
const deslizador_azul = document.getElementById('deslizador_azul');

//-- Valor de los deslizadores
const range_value_rojo = document.getElementById('range_value_rojo');
const range_value_verde = document.getElementById('range_value_verde');
const range_value_azul = document.getElementById('range_value_azul');

//-- Estados del editor
const ESTADO = {
  INIT: 0,
  GRISES: 1,
  COLORES: 2,
  NUCLEAR: 3,
  DEMONIACO: 4,
  PINCEL: 5,
  ESPECULAR: 6,
  BOCAABAJO: 7,
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img_original.onload = function () {

  console.log("Imagen cargada");

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = 800;
  canvas.height = 525;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);
};



//-- Funciones para cada uno de los filtros

function funcion_colores() {
  //-- Mostrar el nuevo valor de los deslizadores
  range_value_rojo.innerHTML = deslizador_rojo.value;
  range_value_verde.innerHTML = deslizador_verde.value;
  range_value_azul.innerHTML = deslizador_azul.value;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  var imgData = ctx.getImageData(0, 0, 800, 525);

  //-- Obtener el array con todos los píxeles
  var data = imgData.data

  //-- Obtener el umbral de rojo del desliador
  umbral_rojo = deslizador_rojo.value
  umbral_verde = deslizador_verde.value
  umbral_azul = deslizador_azul.value

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_rojo)
      data[i] = umbral_rojo;
    if (data[i+1] > umbral_verde)
      data[i+1] = umbral_verde;
    if (data[i+2] > umbral_azul)
      data[i+2] = umbral_azul;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro de Color por Umbrales", 10, 30);
}

function funcion_grises() {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  var imgData2 = ctx.getImageData(0, 0, 800, 525);

  //-- Obtener el array con todos los píxeles
  var data2 = imgData2.data

  //-- Hay que calcular el brillo usando la ecuación:
  //-- brillo = (3 * r + 4 * g + b)/8
  for (let i = 0; i < data2.length; i+=4) {
    brillo = (3 * data2[i] + 4 * (data2[i+1]) + (data2[i+2]))/8

    //-- Hay que asignarle el nivel de brillo a las 3 componentes de color
    data2[i] = brillo;
    data2[i+1] = brillo;
    data2[i+2] = brillo;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData2, 0, 0);

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Escala de Grises", 10, 30);

}

function funcion_demoniaco() {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  var imgData3 = ctx.getImageData(0, 0, 800, 525);

  //-- Obtener el array con todos los píxeles
  var data3 = imgData3.data

  //-- Ponemos a cero el canal verde y el canal azul
  for (let i = 0; i < data3.length; i+=4) {
    data3[i+1] = 0; //-- Canal verde a 0
    data3[i+2] = 0; //-- Canal azul a 0
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData3, 0, 0);

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Demoniaco", 10, 30);

}

function funcion_pincel() {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  var imgData4 = ctx.getImageData(0, 0, 800, 525);

  //-- Obtener el array con todos los píxeles
  var data4 = imgData4.data

  //-- Vamos a pasar de una imagen con 255 niveles de intensidad
  //-- a una imagen con 3 niveles de intensidad
  for (let i = 0; i < data4.length; i+=4) {

    //-- Región de intensidad de 0 a 127 le asignamos intensidad 65
    if (data4[i] < 128)
      data4[i] = 65;
    if (data4[i+1] < 128)
      data4[i+1] = 25;
    if (data4[i+2] < 128)
      data4[i+2] = 25;

    //-- Región de intensidad de 128 a 255 le asignamos intensidad 190
    if (data4[i] > 127)
      data4[i] = 190;
    if (data4[i+1] > 127)
      data4[i+1] = 190;
    if (data4[i+2] > 127)
      data4[i+2] = 190;img_original1

  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData4, 0, 0);

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Pincel", 10, 30);

}

function funcion_nuclear() {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  var imgData5 = ctx.getImageData(0, 0, 800, 525);

  //-- Obtener el array con todos los píxeles
  var data5 = imgData5.data

  //-- Se halla la intensidad de color promedio de cada pixel
  //-- pero solo se le asocia a la componente verde
  for (let i = 0; i < data5.length; i+=4) {
    brillo = (3 * data5[i] + 4 * (data5[i+1]) + (data5[i+2]))/8

    //-- Hay que asignarle el nivel de brillo a las 3 componentes de color
    data5[i] = 0;
    data5[i+1] = brillo;
    data5[i+2] = 0;
  }

  //-- Vamos a pasar de una imagen con 255 niveles de intensidad
  //-- a una imagen con 3 niveles de intensidad
  for (let i = 1; i < data5.length; i+=4) {

    //-- Región de intensidad de 0 a 127 le asignamos intensidad 65
    if (data5[i] < 128)
      data5[i] = 65;

    //-- Región de intensidad de 128 a 255 le asignamos intensidad 190
    if (data5[i] > 127)
      data5[i] = 190;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData5, 0, 0);

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Nuclear", 10, 30);

}

function funcion_especular() {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  var imgData6 = ctx.getImageData(0, 0, 800, 525);

  //-- Obtener el array con todos los píxeles
  var data6 = imgData6.data

  //-- Ponemos a cero el canal verde y el canal azul
  //-- Tengo imagen de 800x525
  //-- Cada pixel tiene 4 casillas de data
  //-- Así que data es una matriz de 3200x2100
  for (let i = 0; i < data6.length; i+=3200) {

    //-- Solo recorro hasta la mitad de la fila
    for (let j = 0; j < 1600; j+=4) {

      //-- Guardo el valor porque lo voy a machacar
      let aux = data6[i+j];
      data6[i+j] = data6[i-j+3200];
      data6[i-j+3200] = aux;

      //-- No importa machacar el auxiliar porque ya lo puse donde quería
      aux = data6[i+j+1];
      data6[i+j+1] = data6[i-j+3200+1];
      data6[i-j+3200+1] = aux;

      aux = data6[i+j+2];
      data6[i+j+2] = data6[i-j+3200+2];
      data6[i-j+3200+2] = aux;

      aux = data6[i+j+3];
      data6[i+j+3] = data6[i-j+3200+3];
      data6[i-j+3200+3] = aux;
    }
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData6, 0, 0);

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Imagen Especular", 10, 30);

}

function funcion_bocaabajo() {

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img_original, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  var imgData6 = ctx.getImageData(0, 0, 800, 525);

  //-- Obtener el array con todos los píxeles
  var data6 = imgData6.data

  //-- Ponemos a cero el canal verde y el canal azul
  //-- Tengo imagen de 800x525
  //-- Cada pixel tiene 4 casillas de data
  //-- Así que data es una matriz de 3200x2100
  for (let i = 0; i < (data6.length)/2; i+=4) {

    //-- Esta vez recorro las filas enteras,
    //-- pero solo recorro la mitad de las filas

    //-- Guardo el valor porque lo voy a machacar
    let aux = data6[i];
    data6[i] = data6[data6.length-i];
    data6[data6.length-i] = aux;

    //-- No importa machacar el auxiliar porque ya lo puse donde quería
    aux = data6[i+1];
    data6[i+1] = data6[data6.length-i+1];
    data6[data6.length-i+1] = aux;

    aux = data6[i+2];
    data6[i+2] = data6[data6.length-i+2];
    data6[data6.length-i+2] = aux;

    aux = data6[i+3];
    data6[i+3] = data6[data6.length-i+3];
    data6[data6.length-i+3] = aux;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData6, 0, 0);

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Imagen Boca Abajo", 10, 30);

}



//-- Acciones de los botones que llaman a las funciones

//-- Filtro Escala de Grises
boton_filtro_grises.onclick = () => {
  estado = ESTADO.GRISES;

  funcion_grises();

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Escala de Grises", 10, 30);
}

//-- Filtro de Color por Umbrales usando los deslizadores
boton_filtro_colores.onclick = () => {
  estado = ESTADO.COLORES;

  funcion_colores();

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro de Color por Umbrales", 10, 30);
}

//-- Funcion de retrollamada de los deslizadores
deslizador_rojo.oninput = () => {
  //-- Se permiten los deslizadores sólo con la función Colores
  if (estado == ESTADO.COLORES) {
    funcion_colores();
  }
}

deslizador_verde.oninput = () => {
  //-- Se permiten los deslizadores sólo con la función Colores
  if (estado == ESTADO.COLORES) {
    funcion_colores();
  }
}

deslizador_azul.oninput = () => {
  //-- Se permiten los deslizadores sólo con la función Colores
  if (estado == ESTADO.COLORES) {
    funcion_colores();
  }
}

//-- Filtro Nuclear
boton_filtro_nuclear.onclick = () => {
  estado = ESTADO.NUCLEAR;

  funcion_nuclear();

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Nuclear", 10, 30);
}

//-- Filtro Demoniaco
boton_filtro_demoniaco.onclick = () => {
  estado = ESTADO.DEMONIACO;

  funcion_demoniaco();

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Demoniaco", 10, 30);
}

//-- Filtro Pincel
boton_filtro_pincel.onclick = () => {
  estado = ESTADO.PINCEL;

  funcion_pincel();

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Pincel", 10, 30);
}

//-- Filtro Imagen Especular
boton_filtro_especular.onclick = () => {
  estado = ESTADO.ESPECULAR;

  funcion_especular();

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Imagen Especular", 10, 30);
}

//-- Filtro Imagen Boca Abajo
boton_filtro_bocaabajo.onclick = () => {
  estado = ESTADO.BOCAABAJO;

  funcion_bocaabajo();

  //-- Texto solido
  ctx.font = "25px Arial";
  ctx.fillStyle = 'aqua'
  ctx.fillText("Filtro Imagen Boca Abajo", 10, 30);
}



console.log("Fin...");