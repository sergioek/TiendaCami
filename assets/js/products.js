/*--------------PRODUCTOS--------------------*/

/*--------------1-Variables y constantes-----*/

/*--------------2-QuerySelectors-----*/
const productos = document.querySelector('#productos');

/*--------------3-Funciones-----*/
//Verifica que exista un producto en el array haciendo uso del campo codigo( campo unique). Luego retona true o false
const existeProducto = (codigo) =>{
    let existeProducto = ((arrayProductos.some(producto => producto.codigo === codigo)));

    return existeProducto;
}
//Busca el producto por el campo codigo y devuelve  el objeto, Si no existe sera un objeto vacio. 
const buscarProductoCodigo = (codigo) =>{
    let productoCodigo = ((arrayProductos.find(producto => producto.codigo === codigo)));
    
    return productoCodigo;
}
//Buscamos los productos de acuerdo al nombre. Devuelve un array
const buscarProductosNombre = (nombre) =>{
    let arrayProductosNombre = ((arrayProductos.filter(producto =>producto.nombre.includes(nombre))));
    return arrayProductosNombre;
}
//Busca los productos por categoria. Devuelve un array
const buscarProductosCategoria = (categoria) =>{
    let arrayProductosCategoria = ((arrayProductos.filter(producto =>producto.categoria === categoria)));
    
    return arrayProductosCategoria;
}

//Ordena los productos de manera por medio de precios de manera ascendente. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
const ordenarProductosPrecioAscendente = (arrayProd) =>{
    let ordenAscendenteProductos= arrayProd.sort((a,b )=> a.precio-b.precio);
    return ordenAscendenteProductos;
}
 //Ordena los productos de manera por medio de precios de manera descendente. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
const ordenarProductosPrecioDescendente = (arrayProd) =>{
    let ordenDescendenteProductos= arrayProd.sort((a,b )=> b.precio-a.precio);
    return ordenDescendenteProductos;
}
 //Busca los productos de un rango de precio min y max. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
const buscarProductosRangoPrecio = (arrayProd,valorMinimo,valorMaximo)=>{
    let rangoMinimo = arrayProd.filter((producto => producto.precio >= valorMinimo ));
    let rangoMaximo = arrayProd.filter((producto => producto.precio <= valorMaximo ));
    
    let productosRangPrecio= rangoMaximo.concat(rangoMaximo);
    
    return productosRangPrecio;
}

const renderizarProductos = (arrayProductos)=>{
    arrayProductos.forEach(producto => {
        const {nombre,precio,imagen,stock,codigo} = producto

        const divCard = document.createElement('div');
        divCard.classList='card';
        divCard.style='width:18rem';

        const imagenProducto = document.createElement('img');
        imagenProducto.setAttribute('src',`../assets/img/productos/${imagen}`);
        imagenProducto.classList='card-img-top';
        imagenProducto.setAttribute('alt',`${nombre}`);

        const divBody = document.createElement('div');
        divBody.classList='card-body';

        const h5= document.createElement('h5');
        h5.classList='card-title';
        h5.innerText=`${'$' + precio}`;

        const p = document.createElement('p');
        p.classList='card-text';
        p.innerText=`${nombre}`;

        const botonAgregar = document.createElement('button');
        botonAgregar.setAttribute('data-id',`${codigo}`)
        botonAgregar.classList='btn btn-outline-success bi bi-plus agregarProducto';
        botonAgregar.innerText='Agregar';

        const selectorCantidad = document.createElement('select');
        selectorCantidad.classList='select'
        
        
        for (let index = 0; index < stock; index++) {
            
            selectorCantidad.innerHTML+=`
                <option value=''>${index+1}</option>
            `; 
        }

        if(stock==0){
            botonAgregar.setAttribute('disabled',true);
            botonAgregar.classList='btn btn-danger  agregarProducto';
            botonAgregar.innerText='¡Sin stock';
            selectorCantidad.setAttribute('disabled',true);
        }

        divBody.append(h5,p,botonAgregar,selectorCantidad);
        divCard.append(imagenProducto,divBody);
        productos.append(divCard);
    });

}

/*--------------4-EventListeners-----*/

/*--------------5-Ejecuciones-----*/
renderizarProductos(arrayProductos);

