/*---------------------LOGIN------------------*/
/*--------------1-Variables y constantes-----*/

/*-------------2-QuerySelectors-------------*/
const emailInicioSesion = document.querySelector('#emailInicioSesion');

const contrasenaInicioSesion = document.querySelector('#contrasenaInicioSesion');

const visibilidadContrasena = document.querySelector('.visibilidadContrasena');

const recordarInicioSesion = document.querySelector('#recordarInicioSesion');

const btnIngresar = document.querySelector('#btnIngresar');

/* -----------3-Funciones-------------------*/
function recuperarUsuarioGuardado(){
    let usuarioRecuperado= JSON.parse(localStorage.getItem('usuarioGuardado'));
    emailInicioSesion.value=usuarioRecuperado.email;
    recordarInicioSesion.checked=true;
}


const verificarUsuarioEmail = (email) => {
    const usuario = arrayUsuarios.some((usuario => usuario.email === email));
    return usuario;
}

const buscarUsuario = (email) => {
    const usuario = arrayUsuarios.find((usuario => usuario.email === email));
    return usuario;
}

function mostrarPassword(){
    contrasenaInicioSesion.setAttribute('type','text');

}

function ocultarPassword(){
    contrasenaInicioSesion.setAttribute('type','password');
}

//Funcion anonima iniciar sesion
const iniciarSesion = function (event){
    event.preventDefault();

    if(verificarUsuarioEmail(emailInicioSesion.value)){
        let usuario = buscarUsuario(emailInicioSesion.value);
       
        if(usuario.contrasena === contrasenaInicioSesion.value){
            const login = {
                nombre:usuario.nombre,
                apellido:usuario.apellido,
                email:usuario.email,
            }

            sessionStorage.setItem('login',JSON.stringify(login));

            if(recordarInicioSesion.checked){
               const recordarUsuario ={
                    email:usuario.email,
               }

               const guardar = JSON.stringify(recordarUsuario);
               localStorage.setItem('usuarioGuardado',guardar);
            }

           window.location.href='./productos.html';

        }else{
            alertaError(`La contraseña ingresada no corresponde con el usuario con email ${emailInicioSesion.value}`);
        }
    }else{
        alertaInformacion(`El email ingresado ${emailInicioSesion.value} no se encuentra registrado como usuario. Por favor, registresé en la seccion "Creá tu cuenta".`);
    }
}

/* -----------4-EventListeners-------------------*/
visibilidadContrasena.addEventListener('mousedown',mostrarPassword);

visibilidadContrasena.addEventListener('touchstart',mostrarPassword);

visibilidadContrasena.addEventListener('mouseup',ocultarPassword);

visibilidadContrasena.addEventListener('touchend',ocultarPassword);

btnIngresar.addEventListener('click',iniciarSesion);
/* -----------5-Ejecuciones y otros-------------------*/
recuperarUsuarioGuardado();