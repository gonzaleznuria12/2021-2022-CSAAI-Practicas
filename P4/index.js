console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const daltvila = document.getElementById('daltvila');
const esvedra = document.getElementById('esvedra');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const R_deslizador = document.getElementById('R_deslizador');
const G_deslizador = document.getElementById('G_deslizador');
const B_deslizador = document.getElementById('B_deslizador');
const trans_deslizador = document.getElementById('trans_deslizador');
const escalagrises = document.getElementById('escalagrises');
const aparecer = document.getElementById('aparecer');
const transparencia = document.getElementById('transparencia');
const trans = document.getElementById('transparente');
const negativo = document.getElementById('negativo');
const ruido = document.getElementById('ruido');
const colores = document.getElementById('colores');
const sepia = document.getElementById('sepia');
const mirror = document.getElementById('mirror');
const flip = document.getElementById('flip');
const restart = document.getElementById('reset');
const botones = document.getElementsByClassName('filtros');
const manipulada = document.getElementById('manipulada');
const mensaje = document.getElementById('inicio');

//-- Valor del deslizador
const R_value = document.getElementById('R_value');
const G_value = document.getElementById('G_value');
const B_value = document.getElementById('B_value');
const trans_value = document.getElementById('trans_value');
var reves = false;
var reflejo = false;

daltvila.onclick = () => {
  document.getElementById('filtros').style.display = 'block';
  document.getElementById('reset').style.display = 'block';
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('manipulada').style.display = 'block';
  img = daltvila;
  canvas.width = img.width;
  canvas.height =  img.height;
  ctx.drawImage(img, 0,0);
}

restart.onclick = () => {
  document.location.reload();
}

esvedra.onclick = () => {
  document.getElementById('filtros').style.display = 'block';
  document.getElementById('reset').style.display = 'block';
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('manipulada').style.display = 'block';
  img = esvedra;
  canvas.width = img.width;
  canvas.height =  img.height;
  ctx.drawImage(img, 0,0);
}

colores.onclick = () =>{
  ImagenOriginal();
  document.getElementById('aparecer').style.display = 'block';
  document.getElementById('transparencia').style.display = 'none';
  //-- Funcion de retrollamada del deslizador
  R_deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    R_value.innerHTML = R_deslizador.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral del desliador
    umbralR = R_deslizador.value;
    umbralG = G_deslizador.value;
    umbralB = B_deslizador.value;


    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
  }
      //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);

  }

  G_deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    G_value.innerHTML = G_deslizador.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral del desliador
    umbralR = R_deslizador.value;
    umbralG = G_deslizador.value;
    umbralB = B_deslizador.value;

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
  }
      //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

  B_deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    B_value.innerHTML = B_deslizador.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral del desliador
    umbralR = R_deslizador.value;
    umbralG = G_deslizador.value;
    umbralB = B_deslizador.value;

    //-- Filtrar la imagen según el nuevo umbral
    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR){
        data[i] = umbralR;
      }
      if (data[i+1] > umbralG){
        data[i+1] = umbralG;
      }
      if (data[i+2] > umbralB){
        data[i+2] = umbralB;
      }
  }
      //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
  }
}

escalagrises.onclick =()=>{
  ImagenOriginal();
  document.getElementById('aparecer').style.display = 'none';
  document.getElementById('transparencia').style.display = 'none';
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  for (let i = 0; i < data.length; i+=4) {
      brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8;
      data[i] = brillo;
      data[i+1] = brillo; 
      data[i+2] = brillo; 
  }
  ctx.putImageData(imgData, 0, 0);
}

negativo.onclick =()=>{
  ImagenOriginal();
  document.getElementById('aparecer').style.display = 'none';
  document.getElementById('transparencia').style.display = 'none';
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  for (let i = 0; i < data.length; i+=4) {
      data[i] = 255 - data[i];
      data[i+1] = 255- data[i+1]; 
      data[i+2] = 255 - data[i+2]; 
  }
  ctx.putImageData(imgData, 0, 0);
}

trans.onclick = () => {
  ImagenOriginal();
  document.getElementById('aparecer').style.display = 'none';
  document.getElementById('transparencia').style.display = 'block';
  trans_deslizador.oninput = () => {
    trans_value.innerHTML = trans_deslizador.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    umbral = trans_deslizador.value
    for (let i = 0; i < data.length; i+=4) {
      if (data[i+3] > umbral) //-- Si es mayor que el umbralm le asignamos el valor umbral
        data[i+3] = umbral;
      }
    ctx.putImageData(imgData, 0, 0);
  }
}

sepia.onclick = () =>{
  ImagenOriginal();
  document.getElementById('transparencia').style.display = 'none';
  document.getElementById('aparecer').style.display = 'none';
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  for (let i = 0; i < data.length; i+=4) {
      var r = data[i];
      var g = data[i+1];
      var b = data[i+2];

      data[i] = 255 - r;
      data[i+1] = 255 - g;
      data[i+2] = 255 - b;

      data[i] = ( r * 0.393 ) + ( g * 0.769 ) + ( b * 0.189 );
      data[i+1] = ( r * 0.349 ) + ( g * 0.686 ) + ( b * 0.168 );
      data[i+2] = ( r * 0.272 ) + ( g * 0.534 ) + ( b * 0.131 );
  }

  ctx.putImageData( imgData, 0, 0 );
}

function ImagenOriginal(){
  if(reves == true){
    flip();
    reves = false;
  }
  if(reflejo == true){
    mirror();
    reflejo = false;
  }
}

ruido.onclick =()=>{
  ImagenOriginal();
  document.getElementById('aparecer').style.display = 'none';
  document.getElementById('transparencia').style.display = 'none';
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  
  for (let i = 0; i < data.length; i+=4) {
    let numero= 0.6 + Math.random() * 0.8;
      data[i] = numero*data[i];
      data[i+1] = numero*data[i+1]; 
      data[i+2] = numero*data[i+2]; 
  }
  ctx.putImageData(imgData, 0, 0);
}

mirror.onclick = () =>{
  document.getElementById('aparecer').style.display = 'none';
  document.getElementById('transparencia').style.display = 'none';
  reflejo = true;
  ctx.drawImage(img, 0,0);
  ctx.translate(2*(img.width)/2,0);
  ctx.scale(-1,1);
  ctx.drawImage(img, 0, 0);
}

flip.onclick = () =>{
  document.getElementById('aparecer').style.display = 'none';
  document.getElementById('transparencia').style.display = 'none';
  reves = true;
  ctx.drawImage(img, 0,0);
  ctx.translate(0,2*(img.height)/2);
  ctx.scale(1,-1);
  ctx.drawImage(img, 0, 0);
}

console.log("Fin...");