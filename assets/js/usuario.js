//Array de provincias Argentinas
const arrayProvincias = ['Buenos Aires','Ciudad Autónoma de Buenos Aires','Catamarca','Chaco','Chubut','Córdoba','Corrientes','Entre Ríos','Formosa','Jujuy','La Pampa','La Rioja','Mendoza','Misiones','Neuquén','Río Negro','Salta','San Juan','San Luis','Santa Cruz','Santa Fe','Santiago del Estero','Tierra del Fuego, Antártida e Islas del Atlántico Sur','Tucumán'];

//Creando array de usuarios
const arrayUsuarios = [
    {
        nombre: 'Sergio',
        apellido: 'Khairallah',
        dni: 11111111,
        provincia:arrayProvincias[21],
        domicilio:'Av. Jhon Kennedy',
        email:'khairallahsergio4@gmail.com',
        contrasena: '12345',
    },

    {
        nombre: 'Camila',
        apellido: 'Khairallah',
        dni: 22222222,
        provincia:arrayProvincias[5],
        domicilio:'Av. Rivadavia ',
        email:'camikhairallah@gmail.com',
        contrasena: '12345',
    },
];

//Creando la clase Usuario y sus metodos
class Usuario{
    constructor(nombre, apellido,dni,provincia,domicilio,email,contrasena){
        this.nombre=nombre
        this.apellido=apellido
        this.dni=dni
        this.provincia=provincia
        this.domicilio=domicilio
        this.email=email
        this.contrasena=contrasena
    }
    //Verificar si el usuario existe, por medio del campo unico email 
    verificarUsuarioEmail(email){
        const usuario = arrayUsuarios.some((usuario => usuario.email === email));
        return usuario;
    }
    //Cerificar si el usuario existe por medio del campo identificador DNI
    verificarUsuarioDni(dni){
        const usuarioDni = arrayUsuarios.some((usuario => usuario.dni === dni));
        return usuarioDni;
    }
    //Buscar un usuario por email
    buscarUsuario(email){
        const usuario = arrayUsuarios.find((usuario => usuario.email === email));
        return usuario;
    }
    //Crear un nuevo usuario y agregarlo al arrayUsuarios
    nuevoUsuario(){
        const usuarioNuevo = {
            nombre:this.nombre,
            apellido:this.apellido,
            dni: this.dni,
            provincia:this.provincia,
            domicilio:this.domicilio,
            email:this.email,
            contrasena:this.contrasena,
        }
        arrayUsuarios.push(usuarioNuevo);
    }

 }

 //instanciando la clase
const instanciaUsuario = new Usuario;


//Funcion de bienvenida
const usuarioRegistro = (funcion) =>{
   funcion;
   ingresoDatosRegistro();

}

//Ingreso de datos y validaciones
const ingresoDatosRegistro = function(){
    let nombre = prompt('Ingrese su nombre:');
    let apellido = prompt('Ingrese su apellido:');
    let dni = prompt('Ingrese su DNI Nº:');
    let provincia = prompt('Ingrese su provincia:');
    let domicilio = prompt('Ingrese su domicilio:');
    let email = prompt('Ingrese su email:');
    let contasena = prompt('Ingrese una contraseña:'); 
    //Validacion de formato email
    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    //Si los datos no tienen el sig formato, se los vuelve a solicitar
    while(nombre==='' || apellido==='' || dni.length !== 8 || provincia === '' || domicilio === '' || validEmail.test(email)==false|| contasena === ''){
        alert('¡Hubo errores en los datos ingresados!.')
        //Solicitando que el usuario reingrese los datos
        let nombre = prompt('Ingrese nuevamente su nombre:');
        let apellido = prompt('Ingrese nuevamente su apellido:');
        let dni = prompt('Ingrese nuevamente su DNI Nº:');
        let provincia = prompt('Ingrese nuevamente su provincia:');
        let domicilio = prompt('Ingrese nuevamente su domicilio:');
        let email = prompt('Ingrese nuevamente su email:');
        let contasena = prompt('Ingrese nuevamente una contraseña:'); 
    }
    //Agregando los datos a un array 
    let datosUsuario = [nombre,apellido,dni,provincia,domicilio,email,contasena];
    //Pasar el array a la funcion Validacion
    validacionUsuario(datosUsuario)
    
}
//Validar que el usuario ya no exista
const validacionUsuario = (datosUsuario)=>{
    let controlEmail=instanciaUsuario.verificarUsuarioEmail(datosUsuario[5]);
    let controlDni = instanciaUsuario.verificarUsuarioDni(parseInt(datosUsuario[2]));
    //Comprobando que el el email o el DNI no existan
    if(controlEmail || controlDni){
        alert('Error. Ya existe un usuario registrado con el email ' + datosUsuario[5] + 'o con el DNI N°' + datosUsuario[2]);

    }else{
        //Se crea un nuevo usuario
        let nuevo = new Usuario(datosUsuario[0],datosUsuario[1],parseInt(datosUsuario[2]),datosUsuario[3],datosUsuario[4],datosUsuario[5],datosUsuario[6]);
        nuevo.nuevoUsuario()
        alert('Se registro un nuevo usuario');
    }
    
}
//Pasando una funcion a otra para iniciar la bienvenida
usuarioRegistro(alert('¡Bienvenido, registre su cuenta para acceder a nuestro sistema de compras!'));

