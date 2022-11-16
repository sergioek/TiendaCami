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
        const {nombre,marca,precio,imagen,stock,codigo,categoria} = producto
        const divCard = document.createElement('div');
        divCard.classList='card';
        divCard.style='width:18rem';
        divCard.innerHTML=`<img src='../assets/img/productos/${imagen}' class='card-img-top' alt='${nombre}'>
        <div class='card-body'>
          <h5 class='card-title'>${'$' + precio}</h5>
          <p class='card-text'>${nombre}.</p>
          <button class='btn btn-outline-success bi bi-plus'>Agregar</button>
          <input type='number'  class='form-control cantidad' value='0' min='1' max='${stock}'>
        </div>`;
        productos.append(divCard)
       

     
       

        // // <!-- <div class="card" style="width: 18rem;">
        // <img src="../assets/img/productos/taza-frozen.png" class="card-img-top" alt="productos-bazar">
        // <div class="card-body">
        //   <h5 class="card-title">$520,00</h5>
        //   <p class="card-text">Taza frozzen.</p>
        //   <button class="btn btn-outline-success bi bi-plus">Agregar</button>
        //   <select class="select" >
        //     <option value="">1</option>
          
        //   </select>
        // </div>
        // // </div> -->
    });

}

/*--------------4-EventListeners-----*/

/*--------------5-Ejecuciones-----*/
renderizarProductos(arrayProductos);

