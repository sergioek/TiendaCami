/*--------------REGISTRO DE USUARIOS--------------------*/
/*--------------1-Variables y constantes-----*/
//Array de provincias Argentinas y localidades
let arrayProvincias = [];
let arrayLocalidades = [];

/*-------------2-QuerySelectors-------------*/
//Formulario
const formularioRegistro = document.querySelector('.formularioRegistro');
//Inputs
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const dni = document.querySelector('#dni');
const provincias = document.querySelector('#provincia');
const localidades = document.querySelector('#localidad');
const domicilio = document.querySelector('#domicilio');
const email = document.querySelector('#email');
const contrasena = document.querySelector('#contrasena');

const visibilidadContrasena = document.querySelector('#visibilidadContrasena');
const btnRegistrarse = document.querySelector('#btnRegistrarse');

//Divs
const errorNombre = document.querySelector('#errorNombre');
const errorApellido = document.querySelector('#errorApellido');
const errorDni = document.querySelector('#errorDni');
const errorProvincia = document.querySelector('#errorProvincia');
const errorLocalidad = document.querySelector('#errorLocalidad');
const errorDomicilio = document.querySelector('#errorDomicilio');
const errorEmail = document.querySelector('#errorEmail');
const errorContrasena = document.querySelector('#errorContrasena');


/* -----------3-Funciones-------------------*/
//Consumiendo api de provincias argentinas
const renderizarProvincias = function(){
    fetch('https://apis.datos.gob.ar/georef/api/provincias')
        .then(response=>response.json())
        .then((data)=>{
            arrayProvincias = data.provincias;
            arrayProvincias.forEach(provincia => {
                const opcionProvincia = document.createElement('option');
                opcionProvincia.setAttribute('value',provincia.nombre);
                opcionProvincia.innerText=provincia.nombre;
                provincias.append(opcionProvincia);
            });
            
        })
}
//Trae las localidades de la provincia seleccionada por el usuario
const renderizarLocalidades = function(){
    let provincia = provincias.value.toLowerCase() || 'misiones';
     fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&campos=id,nombre&max=300`)
         .then(response=>response.json())
         .then((data)=>{
             arrayLocalidades = data.localidades;
             localidades.innerHTML='';
             arrayLocalidades.forEach(localidad => {
                 const opcionLocalidad = document.createElement('option');
                 opcionLocalidad.setAttribute('value',localidad.nombre);
                 opcionLocalidad.innerText=localidad.nombre;
                 localidades.append(opcionLocalidad);
             });
         })
 }
 

//Verificar si el usuario existe, por medio del campo unico email 
const verificarUsuarioEmail = (email,arrayUsuarios) => {
    const usuario = arrayUsuarios.some((usuario => usuario.email === email));
    return usuario;
}

//Muestra la contraseña en el formulario de registro
function mostrarPassword(){
    contrasena.setAttribute('type','text');

}
//Oculta el password del campo contraseña
function ocultarPassword(){
    contrasena.setAttribute('type','password');
}
//Habilitar el boton cuando se realizo la validacion
const habilitarBtnRegistrarse = (val1,val2,val3,val4,val5,val6,val7) =>{
    (val1 && val2 && val3 && val4 && val5 && val6 && val7) ? btnRegistrarse.removeAttribute('disabled'): btnRegistrarse.setAttribute('disabled',true)
    
}

//Funcion de Validaciones de datos ingresados 
const validacionesNuevoUsuario = () =>{
    errorNombre.innerText='';
    errorApellido.innerText='';
    errorDni.innerText='';
    errorDomicilio.innerText='';
    errorEmail.innerText='';
    errorContrasena.innerText='';

    let val1 = val2 = val3 = val4 = val5 = val6 = val7= val8=true;
    if(nombre.value.length < 3 || !isNaN(nombre.value)){
        val1=false;
        errorNombre.innerText='El campo nombre debe contener al menos 3 caracteres de texto.';
    }

    if(apellido.value.length < 3 || !isNaN(apellido.value)){
        val2=false;
        errorApellido.innerText='Apellido debe contener al menos 3 caracteres de texto.';

    }

    if(!isNaN(dni.value) && dni.value.toString().length != 8 ){
        val3=false;
        errorDni.innerText='DNI debe ser numérico de 8 digítos.';
    }

    if(provincias.value === ''){
        val4=false;
        errorProvincia.innerText='Provincia no debe estar vacío.';
    }

    if(localidades.value === ''){
        val5=false;
        errorLocalidad.innerText='Localidad no debe estar vacío.';
    }
    
    if(domicilio.value.length < 3){
        val6=false;
        errorDomicilio.innerText='Domicilio debe contener al menos 3 caracteres.';
    }

    if(!validEmail.test(email.value)){
        val7=false;
        errorEmail.innerText='Debe tener formato de correo electrónico.';

    }
    
    if(contrasena.value.length != 8 || !isNaN(contrasena.value)){
        val8=false;
        errorContrasena.innerText='Contraseña debe tener una longitud de 8 caracteres alfanuméricos.,';
    }
    
    return habilitarBtnRegistrarse(val1,val2,val3,val4,val5,val6,val7,val8);
}

//Funcion crear usuario
const nuevoUsuario = function (event) {
    event.preventDefault();
    let emailIngresado = email.value;
    let dniIngresado = Number(dni.value);
    if(!verificarUsuarioEmail(emailIngresado,arrayUsuarios)){
        arrayUsuarios.push(new Usuario(nombre.value,apellido.value,dniIngresado,provincias.value,localidades.value,domicilio.value,email.value,contrasena.value));

        alertaExito('Nuevo usuario',`Se registró un nuevo usuario con el email ${email.value}`);

        //Guardando datos en localStorage
        localStorage.setItem('usuarios',JSON.stringify(arrayUsuarios));

        nombre.value='';
        apellido.value='';
        dni.value='';
        domicilio.value='';
        email.value='';
        contrasena.value='';
    }else{
        alertaInformacion('El email ingresado ya esta registrado. Por favor, verifique los datos.');
    }
}

/* -----------4-EventListeners-------------------*/
formularioRegistro.addEventListener('change',validacionesNuevoUsuario);

//Al presionar el boton en compu
visibilidadContrasena.addEventListener('mousedown',mostrarPassword);

//Al presionar el boton en mobile
visibilidadContrasena.addEventListener('touchstart',mostrarPassword);

//Al dejar de presionar el boton en compu
visibilidadContrasena.addEventListener('mouseup',ocultarPassword);

//Al  dejar de presionar el boton en mobile
visibilidadContrasena.addEventListener('touchend',ocultarPassword);

//Al elegir provincia, mostrar sus localidades
provincias.addEventListener('change',renderizarLocalidades);

btnRegistrarse.addEventListener('click',nuevoUsuario);

/* -----------5-Ejecuciones y otros-------------------*/
renderizarProvincias();
renderizarLocalidades();
btnRegistrarse.setAttribute('disabled',true)


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

   