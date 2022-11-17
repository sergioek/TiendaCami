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
    constructor(nombre, apellido,dni,provincia,domicilio,email,contrasena){
        this.nombre=nombre
        this.apellido=apellido
        this.dni=dni
        this.provincia=provincia
        this.domicilio=domicilio
        this.email=email
        this.contrasena=contrasena
    }
}
//Creando un usuario
const usuario1= new Usuario('Sergio Ezequiel','Khairallah',11111111,'Santiago del Estero','Av. Jesús Fernández Nº256','khairallahsergio4@gmail.com','12345');

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

//Instanciando y creando objetos 
const producto1=new Producto('A001','Taza frozzen','Genérica','Tazas','taza , frozeen , tazas',520,0,'taza-frozen.png');
const producto2=new Producto('A002','Taza Ibipo','Genérica','Tazas','taza , ibipo , tazas',420,3,'taza-ibipo.png');
const producto3=new Producto('A003','Taza especiate','Genérica','Tazas','taza , especiate , tazas',500,3,'taza-especiate.jfif');
const producto4=new Producto('A004','Tazas rock x 3 unidades','Genérica','Tazas','taza , rock , tazas',1600,3,'tazas-1024x819.jpg');
const producto5=new Producto('B001','Tazón azul de cerámica','Genérica','Tazones','tazon , azul , ceramica , tazones',800,3,'tazon-blue.jpg');
const producto6=new Producto('B002','Tazón sopero plumita','Plumita','Tazones','tazon , sopa, plumita , tazones',820.50,3,'tazones-plumita.jpg');
const producto7=new Producto('C001','Chopp Quilmes','Quilmes','Chopps','chopps , cerveza , chopps , quilmes',920,5,'chopp-quilmes.jpeg');
const producto8=new Producto('C002','Chopp Heineken','Heineken','Chopps','chopps , cerveza , chopps , heineken',1020,4,'chopp-heineken.jpg');
const producto9=new Producto('D001','Vasos plásticos x 8u','Genérica','Vasos','vasos , vaso , plastico , set',2000,4,'vasos-set8.jpg');
const producto10=new Producto('D002','Vasos de vidrio','Genérica','Vasos','vasos , vaso , vidrio',300,50,'vaso-generico-vidrio.jpg');
const producto11=new Producto('E001','Copas de vidrio x 6u','Genérica','Copas','copa , copas , vidrio , set',600,50,'copas-set-vidrio.jpg');
const producto12=new Producto('E002','Copa para Champagne','Genérica','Copas','copa , copas , vidrio , champagne',900,25,'copa-champagne.jpg');
const producto13=new Producto('F001','Combo infantil plástico Minecraf','Genérica','Combos','combo , combos , plastico , infantil , minecraft',1500,4,'combo-infanil-minecraft.jpg');
const producto14=new Producto('G001','Termo tupperware','Tupperware','Otros','termo , mate , agua , tupperware',9500,7,'termo-tupperware.jpg');

const arrayProductos = [producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8,producto9,producto10,producto11,producto12,producto13,producto14];

// 



