/*--------------REGISTRO DE USUARIOS--------------------*/
//1-Variables y constantes
//Array de provincias Argentinas
const arrayProvincias = ['Buenos Aires','Ciudad Autónoma de Buenos Aires','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego, Antártida e Islas del Atlántico Sur','Tucumán'];


//2-QuerySelectors
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const dni = document.querySelector('#dni');
const provincias = document.querySelector('#provincia');
const domicilio = document.querySelector('#domicilio');
const email = document.querySelector('#email');
const contrasena = document.querySelector('#contrasena');
const btnRegistrarse = document.querySelector('#btnRegistrarse');


//3-Funciones
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
//Validaciones de datos ingresados 
const validacionesNuevoUsuario = (event) =>{
    event.preventDefault();
    if(nombre.value.length < 3 ){
        
    }

    if(apellido.value.length < 3){

    }

    if(Number(dni.value) && dni.value.toString().length != 8 ){

    }

    if(provincias.value === ''){

    }

    if(domicilio.value.length < 4){

    }

    if(!validEmail.test(email.value)){

    }

    if(contrasena.value.length != 6){

    }
}
//Funcion crear usuario
const nuevoUsuario = function () {

}

//4-EventListeners
btnRegistrarse.addEventListener('click',validacionesNuevoUsuario);
//5-Ejecuciones y otros llamados
renderizarProvincias();
