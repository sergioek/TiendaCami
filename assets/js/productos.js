//Definiendo el array de productos de bazar
const arrayProductos = [
    {   codigo:'A001',
    nombre:'Taza frozzen',
    marca:'Genérica',
    categoria:'Tazas',
    precio:520,
    stock:3,
    imagen:'https://sergioek.github.io/TiendaCami/assets/img/productos/taza-frozen.png'
},

{   
    codigo:'A002',
    nombre:'Taza ibipo',
    marca:'Genérica',
    categoria:'Tazas',
    precio:420,
    stock:3,
    imagen:'https://sergioek.github.io/TiendaCami/assets/img/productos/taza-ibipo.png'
}, 

{   
    codigo:'A003',
    nombre:'Taza especiate',
    marca:'Genérica',
    categoria:'Tazas',
    precio:500,
    stock:3,
    imagen:'https://sergioek.github.io/TiendaCami/assets/img/productos/taza-especiate.jfif',
},

{   
    codigo:'A004',
    nombre:'Tazas rock x 3 unidades',
    marca:'Genérica',
    categoria:'Tazas',
    precio:1600,
    stock:3,
    imagen:'https://sergioek.github.io/TiendaCami/assets/img/productos/tazas-1024x819.jpg',
},

{   
    codigo:'B001',
    nombre:'Tazón azul de cerámica',
    marca:'Genérica',
    categoria:'Tazones',
    precio:800,
    stock:3,
    imagen:'https://sergioek.github.io/TiendaCami/assets/img/productos/tazon-blue.jpg'
},

];
//Clase producto y sus métodos
class Producto{
    constructor(codigo,nombre,marca,categoria,precio,stock,imagen){
        this.codigo=codigo;
        this.nombre=nombre;
        this.marca=marca;
        this.categoria=categoria;
        this.precio=precio;
        this.stock=stock;
        this.imagen=imagen;
    }
    //Busca los productos y los devuelve como array
    buscarTodosProductos(){
        let productos = arrayProductos;
        return productos;
    }
    //Verifica que exista un producto en el array haciendo uso del campo codigo( campo unique). Luego retona true o false
    existeProducto(codigo){
        let existeProducto = ((arrayProductos.some(producto => producto.codigo === codigo)));
        
        return existeProducto;
    }
    //Busca el producto por el campo codigo y devuelve  el objeto, Si no existe sera un objeto vacio. 
    buscarProductoCodigo(codigo){
        let productoCodigo = ((arrayProductos.find(producto => producto.codigo === codigo)));
        
        return productoCodigo;
    }
    //Buscamos los productos de acuerdo al nombre. Devuelve un array
    buscarProductosNombre(nombre){
        let arrayProductosNombre = ((arrayProductos.filter(producto =>producto.nombre.includes(nombre))));
        return arrayProductosNombre;
    }
    //Busca los productos por categoria. Devuelve un array
    buscarProductosCategoria(categoria){
        let arrayProductosCategoria = ((arrayProductos.filter(producto =>producto.categoria === categoria)));
        
        return arrayProductosCategoria;
    }
    //Ordena los productos por precios de manera ascendente. Recibe como parametro un array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
    ordenarProductosPrecioAscendente(arrayProd){
        let ordenAscendenteProductos= arrayProd.sort((a,b )=> a.precio-b.precio);
        return ordenAscendenteProductos;
    }
     //Ordena los productos por precios de manera descendente. Recibe como parametro un array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
    ordenarProductosPrecioDescendente(arrayProd){
        let ordenDescendenteProductos= arrayProd.sort((a,b )=> b.precio-a.precio);
        return ordenDescendenteProductos;
    }
     //Busca los productos de un rango de precio min y max. Recibe como parametro un array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
    buscarProductosRangoPrecio(arrayProd,valorMinimo,valorMaximo){
        let rangoMinimo = arrayProd.filter((producto => producto.precio >= valorMinimo ));
        let rangoMaximo = arrayProd.filter((producto => producto.precio <= valorMaximo ));
        //Une dos arrays. 
        let productosRangPrecio= rangoMaximo.concat(rangoMaximo);
        
        return productosRangPrecio;
    }
    
    
}

//Instanciando clase Productos
const instanciaProducto = new Producto;
//Definiendo el arrayCarito como vació. 
const arrayCarrito=[];
//Clase carrito
class Carrito{
    //Agergar al carrito
    agregarCarrito(codigo,cantidad){
        //Verifica que exista un producto en el array productos mediante el codigo. 
        if(instanciaProducto.existeProducto(codigo)){
            //buscamos ese producto en el array productos
            let producto= instanciaProducto.buscarProductoCodigo(codigo);
            //Verificamos si hay stock disponible para cubrir demanda
            if(producto.stock<cantidad){
                return 1;
            }else{
                //Creamos el objeto
                let agrCarrito={
                    codigo:producto.codigo,
                    nombre:producto.nombre,
                    precio:producto.precio,
                    cantidad:cantidad,
                    total:producto.precio*cantidad
                }
                //Agregamos un nuevo objeto al arrayCarrito
                arrayCarrito.push(agrCarrito);
                return 2;
            }
        }else{
            return 0;
        }
        
    }
    //Elimina un producto del carrito, haciendo uso del indice del objeto
    eliminarProductoCarrito(indice){
        arrayCarrito.splice(indice,1);
    }
    //Vacia el arrayCarrito
    vaciarProductosCarrito(){
        //por cada bucle elimina el elemento mediante el indice
        arrayCarrito.forEach((producto,indice) => {
            arrayCarrito.splice(indice,1)
        });
    }
    //Suma el total de todos los productos del carrito
    sumarTotalCarrito(){
        const totalCarrito = arrayCarrito.reduce((acumulador,carrito) =>acumulador + carrito.total,0);
        return totalCarrito;
    }
    //Comprar carrito
    comprarCarrito(){
        arrayCarrito.forEach(carrito => {
            //descontando del array Productos la cantidad de productos comprados en el carrito
            let producto= instanciaProducto.buscarProductoCodigo(carrito.codigo); 
            //restando del producto la cantidad comprada
            producto.stock=producto.stock-carrito.cantidad;
        });
 
    }

}
//Instanciamos la clase carrito
let instanciaCarrito = new Carrito;

//Funcion con la validacion de los datos ingresados codigo y cantidad para efectuar la compra
function validacionCompra(){
    //Ingreso del codigo de producto
    let codigo = prompt('Ingrese los codigos: A001 Taza frozzen $520 | A002 Taza ibipo $420 | A003 Taza especiate $500 | A004 Tazas rock x 3 unidades $1600 | B001 Tazón azul de cerámica $800');
    //Comprobando que la variable no este vacia
    while(codigo===''){
        alert('El codigo no puede estar vacio:');
        codigo = prompt('Reingrese los codigos: A001 Taza frozzen $520 | A002 Taza ibipo $420 | A003 Taza especiate $500 | A004 Tazas rock x 3 unidades $1600 | B001 Tazón azul de cerámica $800');
    }
    //ingreso de cantidad
    let cantidad = prompt('Ingrese la cantidad que desea comprar:');
    //Comprobando que la cantidad no este vacio y que no sea menor igual a 0
    while(parseInt(cantidad) <=0 || cantidad===''){
        alert('La cantidad no puede ser menor o igual a 0. Ingrese un valor nuevamente:');
        cantidad = prompt('Ingrese la cantidad que desea comprar:');
    }
    //retorna un array con los valores, luego de haber realizado la verificacion corrrespondiente
    return arrayCompra=[codigo,cantidad];

}

//Funcion comprar
const comprar = () =>{
    //Da la bienvenida al usuario
    alert('Bienvenido al sistema de compras de TiendaCami. A continuación se mostrara los productos. Ingrese su codigo para comprar.');
    //Llama a la funcion validacionCompra que solicitara al usuario los datos codigo y cantidad y efectuara las validaciones. 
    let arrayCompra= validacionCompra();
    //Comprobamos que lo que retorna arrayCompra es un array
    if(Array.isArray(arrayCompra)){
        //Llamamos a la funcion agregarCarrito
        let agregarAlCarrito = instanciaCarrito.agregarCarrito(arrayCompra[0],arrayCompra[1]);
        //Lo que nos retorne la funcion carrito, lo pasamos por un switch
        switch (agregarAlCarrito) {
           case 0:
                alert('El producto no existe en la base de datos de productos.');
                //Inicamos la funcion nuevamente
                comprar();
               break;
           case 1:
               alert('La cantidad solicitada no esta disponible en stock.')
                //Inicamos la funcion nuevamente
               comprar();
               break;
           case 2:
            //En este momento la funcion habra agregado el producto al carrito
               alert('Producto agregado al carrito:');
               //Pregunta al usuario si desea continuar la compra
               let agregarMas = prompt('¿Desea agergar mas productos al carrito?. Ingrese "SI" o "NO":');
               if(agregarMas==='SI' || agregarMas === 'si'){
                    //LLama nuevamente a la funcion
                    comprar();
               }else{
                    //Muestra una alerta con la suma total de la compra
                    alert('Su compra es $' + String(instanciaCarrito.sumarTotalCarrito()));
                    //Llama a la funcion que descuenta de stcok de un producto la cantidad comprada por el usuario
                    instanciaCarrito.comprarCarrito();
                    //Muestra alerta
                    alert('Muchas gracias :) lo esperamos nuevamente por TiendaCami.')
               }

               break;
           default:
               break;
       }
    }

}
//llama a la funcion comprar. 
comprar()
