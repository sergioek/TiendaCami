/*----------------SUSCRIPCION-----------------------*/ 
/* -----------1 Query de elementos-------------------*/
const emailSuscribirse= document.querySelector('#emailSuscribirse');
const btnSuscribirse= document.querySelector('#btnSuscribirse');
const textErrorSuscripcion= document.querySelector('#textErrorSuscripcion');

/* -----------2-Funciones-------------------*/
const verificarSuscripcion = (email) =>{
    const suscripto = arraySuscriptos.some((suscripto => suscripto.email == email));

    return suscripto;
}

const nuevaSuscripcion = (event) =>{
    //Prevenir el submit
    event.preventDefault()
    //Obteniendo el valor del input
    const emailIngresado= emailSuscribirse.value;
    //Validando que tenga el formato de email
    if(validEmail.test(emailIngresado)){
        //Enviando el valor a verificar si existe una suscripcion
        if(verificarSuscripcion(emailIngresado)){
            //Mostrando alerta
            alertaInformacion('El email ingresado ya esta suscripto a nuestras novedades. Muchas Gracias');

        }else{
            //Agregando una suscripcion al array
            let nuevaSuscripcion;
            arraySuscriptos.push(nuevaSuscripcion = new Suscripcion(emailIngresado,true));

            //Mostrando alerta de exito
            alertaExito('¡Suscripción exitosa!','Pronto recibirá novedades de nuestros productos por su email. ¡Muchas Gracias!');

            //Vaciar input email
            emailSuscribirse.value='';
        }

    }else{
        //Al tener un formato de email incorrecto
        alertaError('El formato de email no es válido.');
    }
    
}

/* -----------3-EventListerners-------------------*/btnSuscribirse.addEventListener('click',nuevaSuscripcion);
