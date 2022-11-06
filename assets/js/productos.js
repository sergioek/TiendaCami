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

    buscarTodosProductos(){
        let productos = arrayProductos;
        return productos;
    }

    buscarProductoCodigo(codigo){
        let productoCodigo = ((arrayProductos.find(producto => producto.codigo === codigo)));

        return productoCodigo;
    }

    buscarProductosNombre(nombre){
        let arrayProductosNombre = ((arrayProductos.filter(producto =>producto.nombre.includes(nombre))));
        return arrayProductosNombre;
    }

    buscarProductosCategoria(categoria){
        let arrayProductosCategoria = ((arrayProductos.filter(producto =>producto.categoria === categoria)));

        return arrayProductosCategoria;
    }

    ordenarProductosPrecioAscendente(arrayProd){
       let ordenAscendenteProductos= arrayProd.sort((a,b )=> a.precio-b.precio);
       return ordenAscendenteProductos;
    }

    ordenarProductosPrecioDescendente(arrayProd){
        let ordenDescendenteProductos= arrayProd.sort((a,b )=> b.precio-a.precio);
        return ordenDescendenteProductos;
     }

     buscarProductosRangoPrecio(arrayProd,valorMinimo,valorMaximo){
        let rangoMinimo = arrayProd.filter((producto => producto.precio >= valorMinimo ));
        let rangoMaximo = arrayProd.filter((producto => producto.precio <= valorMaximo ));

        let productosRangPrecio= rangoMaximo.concat(rangoMaximo);

        return productosRangPrecio;
     }


}

const instanciaProducto = new Producto;

const arrayCarrito=[];

class Carrito{
    agregarCarrito(codigo,cantidad){
       let producto= instanciaProducto.buscarProductoCodigo(codigo);
       if(producto.stock<cantidad){
        return false;
       }else{
        let agrCarrito={
            codigo:producto.codigo,
            nombre:producto.nombre,
            precio:producto.precio,
            cantidad:cantidad,
            total:producto.precio*cantidad
        }

        
       }
    }
}

let catto = new Carrito;
console.log(catto.agregarCarrito('A001',2))