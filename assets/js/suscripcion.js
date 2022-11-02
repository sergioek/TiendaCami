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

    bajaSuscripcion(usuarioSuscripto){
        let indice = arraySuscriptos.indexOf(usuarioSuscripto);
        arraySuscriptos[indice].estado=false;
    }

    verificarSuscripcion(email){
        const suscripto = arraySuscriptos.some((suscripto => suscripto.email == email));

        return suscripto;
    }
    buscarSuscripto(email){
        const busquedaSuscripto= arraySuscriptos.find((suscripto => suscripto.email === email ));

        return busquedaSuscripto;
    }

    nuevaSuscripcion(){
        const nuevoSuscripto={
            email:this.email,
            estado:this.estado
        }
        arraySuscriptos.push(nuevoSuscripto);

    }

  
}

const suscripcion = new Suscripcion;

//funcion para la bienvenida 



const bienvenidaSuscripcion = () =>{
    alert('Hola, bienvenido a TiendaCami! La tienda de venta online de artículos de bazar mas importante de Argentina.')
    
    let emailIngresado= prompt('Para suscribirse a nuestras novedades y recibir ofertas ingrese su email y presione "Aceptar", de lo contrario use "Cancelar".')

   while(emailIngresado === ''){
    let emailIngresado= prompt('El email ingresado no es correcto. Ingrese su email nuevamente Si desea cancelar la operación ingrese "CANCELAR" y presione "ACEPTAR".')
    if(emailIngresado ==='CANCELAR' || emailIngresado === 'cancelar'){
        break;
    }
   }

  let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

   if(validEmail.test(emailIngresado)){
    suscripcionCliente(emailIngresado.toLowerCase());
   }

}

const suscripcionCliente = function (emailIngresado){

    if(suscripcion.verificarSuscripcion(emailIngresado)){
     let darBaja = prompt('Usted posee una suscripción activa a nuestras novedades. Si desea darla de baja ingrese "SI", de lo contrario presione el botón "CANCELAR"');

        if(darBaja === 'SI' || darBaja === 'si'){
            let emailBaja =suscripcion.buscarSuscripto(emailIngresado);
            suscripcion.bajaSuscripcion(emailBaja);
            alert(`La suscripción de fue dada de baja. Muchas gracias`);
        }else{
            alert(`La suscripción seguirá activa. Muchas gracias`);
        }

    }else{
        const suscripcion1= new Suscripcion (emailIngresado,true);
        suscripcion1.nuevaSuscripcion();
        alert('Se ha suscripto a nuestras novedades. Recibirá por email nuestras ofertas.');  
    }
}

bienvenidaSuscripcion()


