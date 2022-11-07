//Creando array de objetos de clientes suscriptos a las noticias (Index.html)
const arraySuscriptos = [
    {
        email:'khairallahsergio4@gmail.com',
        estado:true
    },

    {
        email:'camikhairallah@gmail.com',
        estado:true
    }

];

//Creando la clase suscripcion con sus metodos
class Suscripcion{
    constructor(email,estado){
        this.email=email;
        this.estado=estado

    }
    //Dar de baja una suscripcion eliminandola
    bajaSuscripcion(usuarioSuscripto){
        let indice = arraySuscriptos.indexOf(usuarioSuscripto);
        arraySuscriptos.splice(indice,1);
    }

    //Verificar suscripto. Devuelve true o false
    verificarSuscripcion(email){
        const suscripto = arraySuscriptos.some((suscripto => suscripto.email == email));

        return suscripto;
    }
    //Buscar suscripto. Devuelve un objeto si la busqueda es exitosa
    buscarSuscripto(email){
        const busquedaSuscripto= arraySuscriptos.find((suscripto => suscripto.email === email ));

        return busquedaSuscripto;
    }
    //Generando un nuevo objeto suscripcion y agregandolo al arraySuscriptos
    nuevaSuscripcion(){
        const nuevoSuscripto={
            email:this.email,
            estado:this.estado
        }
        arraySuscriptos.push(nuevoSuscripto);

    }

  
}

//Instanciando la suscripcion
const instanciaSuscripcion = new Suscripcion;


//funcion para la bienvenida 
const bienvenidaSuscripcion = () =>{
    alert('Hola, bienvenido a TiendaCami! La tienda de venta online de artículos de bazar mas importante de Argentina.')
    //Pedir el email para suscribirse
    let emailIngresado= prompt('Para suscribirse a nuestras novedades y recibir ofertas ingrese su email y presione "Aceptar", de lo contrario use "Cancelar".')
    //Si el email esta vacio, solicita nuevamente el dato
   while(emailIngresado === ''){
    let emailIngresado= prompt('El email ingresado no es correcto. Ingrese su email nuevamente Si desea cancelar la operación ingrese "CANCELAR" y presione "ACEPTAR".')
    //Si el usuario ingresa cancelar o CANCELAR, interrumpe el bucle
    if(emailIngresado ==='CANCELAR' || emailIngresado === 'cancelar'){
        break;
    }
   }

   //constante para la validacion de formato email
  const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
   //Comprobando si el email ingresado tiene formato de email
   if(validEmail.test(emailIngresado)){
    //Transformando el email en minusculas
    suscripcionCliente(emailIngresado.toLowerCase());
   }

}
//funcion suscripcionCliente, para generar una nueva suscripcion, es decir agregar un objeto al arraySuscriptos
const suscripcionCliente = function (emailIngresado){
    //Verificamos si el usuario ya existe en el array
    if(suscripcion.verificarSuscripcion(emailIngresado)){
     let darBaja = prompt('Usted posee una suscripción activa a nuestras novedades. Si desea darla de baja ingrese "SI", de lo contrario presione el botón "CANCELAR"');
        //Si el usuario poner dar de baja, se llama a la funcion bajaSuscripcion
        if(darBaja === 'SI' || darBaja === 'si'){
            let emailBaja =suscripcion.buscarSuscripto(emailIngresado);
            suscripcion.bajaSuscripcion(emailBaja);
            alert(`La suscripción de fue dada de baja. Muchas gracias`);
        }else{
            alert(`La suscripción seguirá activa. Muchas gracias`);
        }

    }else{
        //Si la suscripcion no existe, se da de alta una nueva suscripcion
        const suscripcion1= new Suscripcion (emailIngresado,true);
        suscripcion1.nuevaSuscripcion();
        alert('Se ha suscripto a nuestras novedades. Recibirá por email nuestras ofertas.');  
    }
}

bienvenidaSuscripcion()


