/*-----------Declaraciones generales del sistema-------*/
const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;


/*-----------ALERTAS ----------------------*/
//Funcion general de alertas informativas
function alertaInformacion(texto){
    Swal.fire({
        title:'Información',
        text:texto,
        icon:'info',
        confirmButtonText:'Aceptar',
    })
}
//Alerta de errror 
function alertaError(texto){
    Swal.fire({
        title:'Error',
        text:texto,
        icon:'error',
        confirmButtonText:'Aceptar',
        confirmButtonColor: '#DB2801',
    })
}
//Alerta exito
function alertaExito(titulo,texto){
    Swal.fire({
        title:titulo,
        text:texto,
        icon:'success',
        confirmButtonText:'Aceptar',
        confirmButtonColor:'#3085d6',
    })
}
//Funcion de alertas personalizables
function alertaPersonalizable(titulo,texto,icono,textoBoton,colorBoton){
    Swal.fire({
        title:titulo,
        text:texto,
        icon:icono,
        confirmButtonText:textoBoton,
        confirmButtonColor:colorBoton,
    })
}
//Tostada 
function tostadaBuscando (){
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 500,
        timerProgressBar: true,
      });
      
      Toast.fire({
        icon: 'success',
        title: 'Buscando Productos...'
      });
}


/*--------------------USUARIO LOGUEADO------------------*/
//1-Query Selectors
const creaCuenta = document.querySelector('.creaCuenta');
const ingresa = document.querySelector('.ingresa');
const linkIngresar = document.querySelector('.bi-box-arrow-in-right');

//2- Funciones
function salirSesion(e){
    e.preventDefault();
    sessionStorage.removeItem('login');
    window.location.reload();
}

function cambiarIngresar(){
    ingresa.removeChild(linkIngresar)
    const cerrarSesion = document.createElement('a');
    cerrarSesion.classList='bi bi-person-circle';
    cerrarSesion.innerText='  Salir';
    cerrarSesion.setAttribute('id','btnCerrarSesion');
    cerrarSesion.setAttribute('href','');
    const btnCerrarSesion = document.querySelector('#btnCerrarSesion');
    ingresa.append(cerrarSesion);
}
const sesionIniciada = JSON.parse(sessionStorage.getItem('login')) && (creaCuenta.remove(), cambiarIngresar());

//3 - EventListeners
const btnCerrar = JSON.parse(sessionStorage.getItem('login')) && btnCerrarSesion.addEventListener('click', salirSesion);
