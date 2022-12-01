/*----------------SUSCRIPCION-----------------------*/ 
//Creando la clase suscripcion con sus metodos
class Suscripcion{
    constructor(email,estado){
        this.email=email;
        this.estado=estado; 
    }
}

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
//arrayUsuarios
let arrayUsuarios = [];



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






