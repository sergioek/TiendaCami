/*--------------REGISTRO DE USUARIOS--------------------*/

/*--------------1-Variables y constantes-----*/
//Array de provincias Argentinas
const arrayProvincias = ['Buenos Aires','Ciudad Autónoma de Buenos Aires','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego, Antártida e Islas del Atlántico Sur','Tucumán'];


/*-------------2-QuerySelectors-------------*/
//Formulario
const formularioRegistro = document.querySelector('.formularioRegistro');
//Inputs
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const dni = document.querySelector('#dni');
const provincias = document.querySelector('#provincia');
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
const errorDomicilio = document.querySelector('#errorDomicilio');
const errorEmail = document.querySelector('#errorEmail');
const errorContrasena = document.querySelector('#errorContrasena');


/* -----------3-Funciones-------------------*/
const renderizarProvincias = function(){
    arrayProvincias.forEach(provincia => {
        const opcionProvincia = document.createElement('option');
        opcionProvincia.setAttribute('value',provincia);
        opcionProvincia.innerText=provincia;
        provincias.append(opcionProvincia);
    });
}

//Verificar si el usuario existe, por medio del campo unico email 
const verificarUsuarioEmail = (email) => {
    const usuario = arrayUsuarios.some((usuario => usuario.email === email));
    return usuario;
}
//Cerificar si el usuario existe por medio del campo identificador DNI
const verificarUsuarioDni = (dni) => {
    const usuarioDni = arrayUsuarios.some((usuario => usuario.dni === dni));
    return usuarioDni;
}

//Buscar un usuario por email
const buscarUsuario = (email) => {
    const usuario = arrayUsuarios.find((usuario => usuario.email === email));
    return usuario;

}

//Muestra la contraseña en el formulario de registro
function mostrarPassword(){
    contrasena.setAttribute('type','text');

}

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

    let val1 = val2 = val3 = val4 = val5 = val6 = val7=true;
    if(nombre.value.length < 3 && !Number(nombre.value)){
        val1=false;
        errorNombre.innerText='El campo nombre debe contener al menos tres caracteres alfanuméricos.';
    }

    if(apellido.value.length < 3 && !Number(apellido.value)){
        val2=false;
        errorApellido.innerText='Apellido debe contener al menos 3 caracteres alfanuméricos.';

    }

    if(Number(dni.value) && dni.value.toString().length != 8 ){
        val3=false;
        errorDni.innerText='DNI debe ser numérico de 8 digítos.';
    }

    if(provincias.value === ''){
        val4=false;
        errorProvincia.innerText='Provincia no debe estar vacío.';
    }

    if(domicilio.value.length < 3 && !Number(domicilio.value)){
        val5=false;
        errorDomicilio.innerText='Domicilio debe contener al menos 3 caracteres alfanuméricos,';
    }

    if(!validEmail.test(email.value)){
        val6=false;
        errorEmail.innerText='Email debe tener formato de correo electrónico.';

    }

    if(contrasena.value.length != 6 && !Number(contrasena.value)){
        val7=false;
        errorContrasena.innerText='Contraseña debe tener una longitud de 6 caracteres alfanuméricos.,';
    }
    
    return habilitarBtnRegistrarse(val1,val2,val3,val4,val5,val6,val7);
}

//Funcion crear usuario
const nuevoUsuario = function (event) {
    event.preventDefault();

    let dniIngresado = Number(dni.value);

    if(verificarUsuarioEmail(email.value) || verificarUsuarioDni(dniIngresado)){

     alertaInformacion('El email o DNI ingresados ya estan registrados como usuarios. Por favor, verifique los datos.');
        
    }else{
        arrayUsuarios.push(new Usuario(nombre.value,apellido.value,dniIngresado,provincias.value,domicilio.value,email.value,contrasena.value));
        console.log(arrayUsuarios);

        alertaExito('Nuevo usuario',`Se registró un nuevo usuario con el emial ${email.value}`);

        nombre.value='';
        apellido.value='';
        dni.value='';
        domicilio.value='';
        email.value='';
        contrasena.value='';
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


btnRegistrarse.addEventListener('click',nuevoUsuario);

/* -----------5-Ejecuciones y otros-------------------*/
renderizarProvincias();
btnRegistrarse.setAttribute('disabled',true)

