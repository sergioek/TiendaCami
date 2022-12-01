/*----------------SUSCRIPCION-----------------------*/ 
/* -----------1-Variables y constantes-------------------*/
//Arrya Suscriptos
let arraySuscriptos= [];
/* -----------2 Query de elementos-------------------*/
const emailSuscribirse= document.querySelector('#emailSuscribirse');
const btnSuscribirse= document.querySelector('#btnSuscribirse');
const textErrorSuscripcion= document.querySelector('#textErrorSuscripcion');

/* -----------3-Funciones-------------------*/

const verificarSuscripcion = (email) =>{
    const suscripto = arraySuscriptos.some((suscripto => suscripto.email == email));

    return suscripto;
}
//Nueva suscripcion
const nuevaSuscripcion = (event) =>{
    //Prevenir el submit
    event.preventDefault()
    //Obteniendo el valor del input
    const emailIngresado= emailSuscribirse.value;
    //Validando que tenga el formato de email
    if(validEmail.test(emailIngresado)){
        //Enviando el valor a verificar si existe una suscripcion
        if(!verificarSuscripcion(emailIngresado)){
             //Agregando una suscripcion al array
             let nuevaSuscripcion;
             arraySuscriptos.push(nuevaSuscripcion = new Suscripcion(emailIngresado,true));
             //Guardando los datos de suscriptos en el localStorage
             localStorage.setItem('suscriptos',JSON.stringify(arraySuscriptos));
             //Mostrando alerta de exito
             alertaExito('¡Suscripción exitosa! ','Pronto recibirá novedades de nuestros productos por su email. ¡Muchas Gracias!');
            
             //Vaciar input email
             emailSuscribirse.value='';
        }else{
            //Mostrando alerta
            alertaInformacion('Nos alegra saber que el email ingresado ya esta suscripto a nuestras novedades 😉. Si deseas generar una nueva suscripción, ingrese un correo diferente.');
        }

    }else{
        //Al tener un formato de email incorrecto
        alertaError('El formato de email no es válido.');
    }
}
/* -----------4-EventListerners-------------------*/btnSuscribirse.addEventListener('click',nuevaSuscripcion);


/* -----------5-Ejecuciones-------------------*/
//Traer los datos del JSON
fetch('assets/DB/suscriptos.json')
    .then(response=>response.json())
    .then((data)=>{
        //Si no estan guardados en el localstorage
        if(!localStorage.getItem('suscriptos')){
            //Guardar los datos del JSON en local
            localStorage.setItem('suscriptos',JSON.stringify(data))
            //Asignar esos datos a arraySuscriptos
            arraySuscriptos = JSON.parse(localStorage.getItem('suscriptos'))
        }else{
            //Si ya existe en local, recuperar esos datos
            arraySuscriptos = JSON.parse(localStorage.getItem('suscriptos'))
        }
    });


