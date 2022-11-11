/*----------------SUSCRIPCION-----------------------*/ 
//2-Query de elementos
const emailSuscribirse= document.querySelector('#emailSuscribirse');
const btnSuscribirse= document.querySelector('#btnSuscribirse');
const textErrorSuscripcion= document.querySelector('#textErrorSuscripcion');

//3-Funciones
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
            Swal.fire({
                title:'Información',
                text:'El email ingresado ya esta suscripto a nuestras novedades. Muchas Gracias',
                icon:'info',
                confirmButtonText:'Aceptar',
            })

        }else{
            //Agregando una suscripcion al array
            let nuevaSuscripcion;
            arraySuscriptos.push(nuevaSuscripcion = new Suscripcion(emailIngresado,true));

            //Mostrando alerta de exito
            Swal.fire({
                title:'¡Suscripción exitosa!',
                text:'Pronto recibirá novedades de nuestros productos por su email. ¡Muchas Gracias!.',
                icon:'success',
                confirmButtonText:'Aceptar',
                confirmButtonColor: '#3085d6',
            })

            //Vaciar input email
            emailSuscribirse.value='';
        }

    }else{
        //Al tener un formato de email incorrecto
        Swal.fire({
            title:'Error',
            text:'El formato de email no es válido.',
            icon:'error',
            confirmButtonText:'Aceptar',
            confirmButtonColor: '#DB2801',
        })
    }
    
}

//4-EventListeners
btnSuscribirse.addEventListener('click',nuevaSuscripcion);
