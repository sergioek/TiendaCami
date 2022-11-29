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

/*------------REGISTRO DE USUARIOS----------------------*/

//Creando la clase Usuario y sus metodos
class Usuario{
    constructor(nombre, apellido,dni,provincia,localidad,domicilio,email,contrasena){
        this.nombre=nombre
        this.apellido=apellido
        this.dni=dni
        this.provincia=provincia
        this.localidad=localidad
        this.domicilio=domicilio
        this.email=email
        this.contrasena=contrasena
    }
}
//Creando un usuario
const usuario1= new Usuario('Sergio Ezequiel','Khairallah',11111111,'Santiago del Estero','FERNÁNDEZ','Av. Jesús Fernández Nº256','khairallahsergio4@gmail.com','12345');

//Agregando un usuario al arrayUsuarios
const arrayUsuarios = [usuario1];

/*------------PRODUCTOS----------------------*/
class Producto{
    constructor(codigo,nombre,marca,categoria,tags,precio,stock,imagen){
        this.codigo=codigo;
        this.nombre=nombre;
        this.marca=marca;
        this.categoria=categoria;
        this.tags=tags;
        this.precio=precio;
        this.stock=stock;
        this.imagen=imagen;
    }
}

let arrayProductos = [];





