/*---------------------LOGIN------------------*/
/*-------------1-QuerySelectors-------------*/
const emailInicioSesion = document.querySelector('#emailInicioSesion');

const contrasenaInicioSesion = document.querySelector('#contrasenaInicioSesion');

const visibilidadContrasena = document.querySelector('.visibilidadContrasena');

const recordarInicioSesion = document.querySelector('#recordarInicioSesion');

const btnIngresar = document.querySelector('#btnIngresar');

/* -----------2-Funciones-------------------*/
function recuperarUsuarioGuardado(){
    let usuarioRecuperado= JSON.parse(localStorage.getItem('usuarioGuardado'));
    if(usuarioRecuperado != null){
        emailInicioSesion.value=usuarioRecuperado.email;
        contrasenaInicioSesion.value=usuarioRecuperado.contrasena;
        recordarInicioSesion.checked=true;
    }
    
}

//Verifica si existe un email registrado
const verificarUsuarioEmail = (email) => {
    const usuario = arrayUsuarios.some((usuario => usuario.email === email));
    return usuario;
}
//Busca un usuario por medio del email
const buscarUsuario = (email) => {
    const usuario = arrayUsuarios.find((usuario => usuario.email === email));
    return usuario;
}
//Funcion mostrar password
function mostrarPassword(){
    contrasenaInicioSesion.setAttribute('type','text');
    
}
//Funcion ocultar password
function ocultarPassword(){
    contrasenaInicioSesion.setAttribute('type','password');
}

//Funcion anonima iniciar sesion
const iniciarSesion = function (event){
    event.preventDefault();
    
    if(verificarUsuarioEmail(emailInicioSesion.value)){
        //Aplicando la desestructuracion de objetos
        const {nombre,apellido,email,contrasena,domicilio,dni} = buscarUsuario(emailInicioSesion.value);
        
        if(contrasena === contrasenaInicioSesion.value){
            const login = {
                nombre:nombre,
                apellido:apellido,
                email:email,
                domicilio:domicilio,
                dni:dni,
            }
            
            sessionStorage.setItem('login',JSON.stringify(login));
            
            if(recordarInicioSesion.checked){
                const recordarUsuario ={
                    email:email,
                    contrasena:contrasena
                }
                
                const guardar = JSON.stringify(recordarUsuario);
                localStorage.setItem('usuarioGuardado',guardar);
            }
            
            window.location.href='./productos.html';
            
            
        }else{
            alertaError(`La contrase??a ingresada no corresponde con el usuario con email ${emailInicioSesion.value}`);
        }
    }else{
        alertaInformacion(`El email ingresado ${emailInicioSesion.value} no se encuentra registrado como usuario. Por favor, registrese en la seccion "Cre?? tu cuenta".`);
    }
}

/* -----------3-EventListeners-------------------*/
visibilidadContrasena.addEventListener('mousedown',mostrarPassword);

visibilidadContrasena.addEventListener('touchstart',mostrarPassword);

visibilidadContrasena.addEventListener('mouseup',ocultarPassword);

visibilidadContrasena.addEventListener('touchend',ocultarPassword);

btnIngresar.addEventListener('click',iniciarSesion);
/* -----------4-Ejecuciones y otros-------------------*/
//Traer los datos del JSON
fetch('../assets/DB/usuarios.json')
.then(response=>response.json())
.then((data)=>{
    //Si no estan guardados en el localstorage
    if(!localStorage.getItem('usuarios')){
        //Guardar los datos del JSON en local
        localStorage.setItem('usuarios',JSON.stringify(data))
        //Asignar esos datos a arrayUsuarios
        arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
    }else{
        //Si ya existe en local, recuperar esos datos
        arrayUsuarios = JSON.parse(localStorage.getItem('usuarios'))
    }
});

//Recuperar usuario guardado
recuperarUsuarioGuardado();

