const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

function openTira() {
  document.getElementById("myNav").style.width = "100%";
}

function closeTira() {
  document.getElementById("myNav").style.width = "0%";
}



// FECHA

let hoy = new Date();
let dia = hoy.getDate();
let mes = hoy.getMonth() + 1;
let year = hoy.getFullYear();

dia = ('0' + dia).slice(-2);
mes = ('0' + mes).slice(-2);

let fechaActual = `${dia}/${mes}/${year}`;
const fecha = document.getElementById("fechaCred");
fecha.textContent = fechaActual;

// 


// ELEMENTOS HTML credencial

const nombreElemento = document.getElementById("nombreCred");
const numCuentaElemento = document.getElementById("numCred");
const promedioElemento = document.getElementById("promedioCred");
const reprobadasElemento = document.getElementById("reprobadasCred");
const claveElemento = document.getElementById("claveCred");
const imgTira = document.getElementById("tiraMaterias");


// ELEMENTOS PARA MOSTRAR Y OCULTAR

const nav = document.getElementById("myNav");
const containerForm = document.getElementById("containerForm");
const credencialContainer = document.getElementById("credencial");


// function to call



const datos = {
  nombre: '',
  nCuenta: '',
  promedio: '',
  reprobadas: '',
  claveTira: '',
  mIngles: false
}


let opt = {
  margin: 0,
  filename: 'tiraMaterias.pdf',
  image: { type: 'svg', quality: 0.98},
  html2canvas: { scale: 1},
  jsPDF: { format: 'letter', orientation: 'portrait' }
}

function generatePDF() {
  html2pdf(credencialContainer, opt);
}


let form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName");
  const nCuenta = document.getElementById("nCuenta");
  const promedio = document.getElementById("promedio");
  const reprobadas = document.getElementById("reprobadas");
  const claveTira = document.getElementById("claveTira");
  const checkbox = document.getElementById("cbx-12");
  const inglesCheckbox = checkbox.checked;

  datos.nombre = fullName.value;
  datos.nCuenta = nCuenta.value;
  datos.promedio = promedio.value;
  datos.reprobadas = reprobadas.value;
  datos.claveTira = claveTira.value;
  datos.mIngles = inglesCheckbox;

  nombreElemento.textContent = datos.nombre;
  numCuentaElemento.textContent = datos.nCuenta;
  promedioElemento.textContent = datos.promedio;
  reprobadasElemento.textContent = datos.reprobadas;
  claveElemento.textContent = datos.claveTira;

  if(!inglesCheckbox) {
    imgTira.src = 'assets/tira-sin-ingles.svg';
  }

  let datosVerificados = datos.nombre!=="" && datos.nCuenta!=="" && datos.promedio!=="" && datos.reprobadas!=="" && datos.claveTira!=="";

  if (!datosVerificados){

    swal("Error!", "Todos los campos son obligatorios, favor de verificar", "error");

  } else {
     
    nav.style.display="none";
    containerForm.style.display="none";
    credencialContainer.style.display = "flex"; 
    generatePDF();

  }

  
});


