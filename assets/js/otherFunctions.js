// ES6 Modules or TypeScript
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
        color:'#FCFCFC',
        background:'#252525'
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
        color:'#FCFCFC',
        background:'#252525'
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
        color:'#FCFCFC',
        background:'#252525'
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
        color:'#FCFCFC',
        background:'#252525'
        
    })
}
//Tostada 
function tostadaBuscando (){
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      
      Toast.fire({
        icon: 'success',
        title: 'Buscando Productos...',
        color:'#FCFCFC',
        background:'#252525'
      });
}

// Tostada producto agregado Tostify.js
function tostadaProductoAgregado(nombre,cantidad,total){
    Toastify({
        text: `Producto agregado al carrito ${nombre} x ${cantidad} $ ${total}`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){
            mostrarCarrito()
        } // Callback after click
      }).showToast();
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
//Cambiar la barra de nav al loguearse
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

const comprobarLogin = ()=>{
    if(!sessionStorage.getItem('login')){
        window.location.href='login.html';
    }
}

const datosUsuarioLogueado = ()=>{
    const usuario = JSON.parse(sessionStorage.getItem('login'));
    return usuario;
}

const sesionIniciada = JSON.parse(sessionStorage.getItem('login')) && (creaCuenta.remove(), cambiarIngresar());

//3 - EventListeners
const btnCerrar = JSON.parse(sessionStorage.getItem('login')) && btnCerrarSesion.addEventListener('click', salirSesion);
