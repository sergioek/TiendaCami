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
    codigo:'A005',
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
    //Ordena los productos de manera por medio de precios de manera ascendente. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
    ordenarProductosPrecioAscendente(arrayProd){
        let ordenAscendenteProductos= arrayProd.sort((a,b )=> a.precio-b.precio);
        return ordenAscendenteProductos;
    }
     //Ordena los productos de manera por medio de precios de manera descendente. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
    ordenarProductosPrecioDescendente(arrayProd){
        let ordenDescendenteProductos= arrayProd.sort((a,b )=> b.precio-a.precio);
        return ordenDescendenteProductos;
    }
     //Busca los productos de un rango de precio min y max. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
    buscarProductosRangoPrecio(arrayProd,valorMinimo,valorMaximo){
        let rangoMinimo = arrayProd.filter((producto => producto.precio >= valorMinimo ));
        let rangoMaximo = arrayProd.filter((producto => producto.precio <= valorMaximo ));
        
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
                return false;
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
                return true;
            }
        }else{
            return false;
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
// console.log(instanciaCarrito.agregarCarrito('A001',2));
// console.log(instanciaCarrito.agregarCarrito('A002',2));

// console.log(arrayCarrito)
// console.log(instanciaCarrito.sumarTotalCarrito())