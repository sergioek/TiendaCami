/*----------------SUSCRIPCION-----------------------*/ 
//Creando la clase suscripcion con sus metodos
class Suscripcion{
    constructor(email,estado){
        this.email=email;
        this.estado=estado; 
    }
     
}

//Instanciando la suscripcion
const suscripcion1=new Suscripcion('khairallahsergio4@gmail.com',true);
const suscripcion2=new Suscripcion('camikhairallah@gmail.com',true);
//Agregando los objetos al array
const arraySuscriptos = [suscripcion1,suscripcion2];

