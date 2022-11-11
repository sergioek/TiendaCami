//El codigo que esta declarado a continuacion es una extension del codigo disponible en usuarios. Cuando se realice el tercer practico, sera unificado.
//Creando un array de provincias
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

    verificarUsuarioEmail(email){
        const usuario = arrayUsuarios.some((usuario => usuario.email === email));
        return usuario;
    }

    verificarUsuarioDni(dni){
        const usuarioDni = arrayUsuarios.some((usuario => usuario.dni === dni));
        return usuarioDni;
    }

    buscarUsuario(email){
        const usuario = arrayUsuarios.find((usuario => usuario.email === email));
        return usuario;
    }

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
    //Buscando un usuario, para poder iniciar sesion
    sesionUsuario(email){
        const usuarioEmail = arrayUsuarios.find((usuario => usuario.email === email));

        return usuarioEmail;
    }

 }

 //instanciando la clase
const instanciaUsuario = new Usuario;
//Funcion iniciar sesion
const iniciarSesion = () =>{
    //Pide datos de email y contraseña
    let email = prompt('Ingrese su email:');
    let contrasena = prompt('Ingrese su contraseña:');
    //Si los campos estan vacios se los vuelve a solicitar 
    while(email === '' && contrasena === ''){
        let email = prompt('Ingrese nuevamente su email:');
        let contrasena = prompt('Ingrese nuevamente su contraseña:');
    }

    //Verificando que exista un email
    if(instanciaUsuario.verificarUsuarioEmail(email)){
        let usuarioLogueado = instanciaUsuario.sesionUsuario(email);
        //Verificamos que la contraseña pertenezacan al mismo objeto al cual esta asociado el email
        if(usuarioLogueado.email === email && usuarioLogueado.contrasena === contrasena){
            //Inicia sesión
            alert(`Inicio sesión como ${usuarioLogueado.email}.`)
        }else{
            //Alerta de contraseña incorrecta
            alert(`Contraseña incorrecta.`)
    
        }
    }else{
        //Alerta no tiene cuenta
        alert('Usted no posee una cuenta en TiendaCami.')
    }
   
}
//LLamando funcion
iniciarSesion()