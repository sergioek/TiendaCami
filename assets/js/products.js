/*--------------PRODUCTOS--------------------*/
/*--------------1-Variables y constantes-----*/
//Array Productos
let arrayProductos = [];
/*--------------2-QuerySelectors-----*/
const productos = document.querySelector('#productos');

const inputBuscarProductos = document.querySelector('#inputBuscarProductos');

const btnBuscarProductos = document.querySelector('#btnBuscarProductos');

const formularioCategorias = document.querySelector('#formularioCategorias');

const checkCategoria= document.querySelectorAll('.form-check-input');

const selectPrecio = document.querySelector('#selectPrecio');

const textPrecioMinimo = document.querySelector('#textPrecioMinimo');
const precioMinimo = document.querySelector('#precioMinimo');

const textPrecioMaximo = document.querySelector('#textPrecioMaximo');
const precioMaximo = document.querySelector('#precioMaximo');

const btnFiltrar = document.querySelector('#btnFiltrar');


/*--------------3-Funciones-----*/

//Verifica que exista un producto en el array haciendo uso del campo codigo. Luego retona true o false
const existeProducto = (codigo) =>{
    let existeProducto = ((arrayProductos.some(producto => producto.codigo === codigo)));

    return existeProducto;
}
//Busca el producto por el campo codigo y devuelve  el objeto, Si no existe sera un objeto vacio. 
const buscarProductoCodigo = (codigo) =>{
    let productoCodigo = ((arrayProductos.find(producto => producto.codigo === codigo)));
    
    return productoCodigo;
}

//Devuelve todos los productos 
const todosLosProductos = () =>{
    return arrayProductos;
}
//Buscamos los productos de acuerdo al nombre. Devuelve un array
const buscarProductosNombre = (nombre) =>{
   
    let arrayProductosTags = ((arrayProductos.filter(producto =>producto.tags.includes(nombre))));
   
    let arrayProductosNombre = ((arrayProductos.filter(producto =>producto.nombre.includes(nombre))));

    const arrayProd= arrayProductosTags.concat(arrayProductosNombre);

    return arrayProd;
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
 //Ordena los productos de manera por medio de precios de manera descendente. Recibe como parametro un array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
const ordenarProductosPrecioDescendente = (arrayProd) =>{
    let ordenDescendenteProductos= arrayProd.sort((a,b )=> b.precio-a.precio);
    return ordenDescendenteProductos;
}
 //Busca los productos de un rango de precio min y max. Recibe como parametro un array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
const buscarProductosRangoPrecio = (arrayProd,valorMinimo,valorMaximo)=>{
    let rangoMinimo = arrayProd.filter((producto => producto.precio >= valorMinimo ));
    let rangoMaximo = rangoMinimo.filter((producto => producto.precio <= valorMaximo ));
    
    let productosRangPrecio = rangoMaximo;
    return productosRangPrecio;
}
//Renderiza el HTML de productos
const renderizarProductos = (arrayProductos)=>{
    productos.innerHTML='';
    if(arrayProductos.length == 0){
        renderizarProductos(todosLosProductos());
        alertaPersonalizable('Búsqueda','No se encontraron resultados en la búsqueda.','error','Ok','red')
    }else{
        arrayProductos.forEach(producto => {
            const {nombre,precio,imagen,stock,codigo} = producto
            const divCard = document.createElement('div');
            divCard.classList.add('card');
            divCard.style='width:18rem ; height:auto';

            const imagenProducto = document.createElement('img');
            imagenProducto.setAttribute('src',`../assets/img/productos/${imagen}`);
            imagenProducto.classList.add('card-img-top');
            imagenProducto.setAttribute('alt',`${nombre}`);

            const divBody = document.createElement('div');
            divBody.classList.add('card-body');

            const h5= document.createElement('h5');
            h5.classList.add('card-title');
            h5.innerText=`${'$' + precio}`;

            const p = document.createElement('p');
            p.classList.add('card-text');
            p.innerText=`${nombre}`;

            const botonAgregar = document.createElement('button');
            botonAgregar.setAttribute('data-id',`${codigo}`)

            botonAgregar.classList='agregarProducto btn btn-outline-success bi bi-plus';

            botonAgregar.innerText='Agregar';
          
            const selectorCantidad = document.createElement('select');
            selectorCantidad.classList='select m-2';
            selectorCantidad.setAttribute('id',`${codigo}`)
        
            //Creamos opciones en el selector de cantidad
            for (let index = 0; index < stock; index++) {
                let valor = index+1;
                const option = document.createElement('option');
                option.setAttribute('value',valor)
                option.innerText=valor;
                selectorCantidad.append(option);
            }

            //Si el stock es 0, desabilitamos el boton agregar al carrito
            if(stock==0){
                botonAgregar.setAttribute('disabled',true);
                botonAgregar.classList='btn btn-danger  agregarProducto';
                botonAgregar.innerText='¡Sin stock';
                selectorCantidad.setAttribute('disabled',true);
            }
            //Insertamos todos los elementos HTML uno en otros
            divBody.append(p,h5,botonAgregar,selectorCantidad);
            divCard.append(imagenProducto,divBody);
            productos.append(divCard);

        }); 

    }
}

//Funcion buscar productos por nombre
const buscarProducto = (event) =>{
    event.preventDefault();
    //Llamando a la tostada de otherFunctions
    tostadaBuscando();
    //Efecto de retardo
    //renderizar
    renderizarProductos(buscarProductosNombre(inputBuscarProductos.value)); 
  
    
     //Para evitar not defined, addEventListener nuevamente al renderizar
     botonAgregarProducto = document.querySelectorAll('.agregarProducto');
  
    botonAgregarProducto.forEach(botonAgrProd => {
        botonAgrProd.addEventListener('click',agregarCarrito)
    });
}

//Filtrar productos
const filtrarProductos = (event) =>{
    event.preventDefault();
    tostadaBuscando();

    //Filtrar por categoria 
    let categoria;
    checkCategoria.forEach(check => {
        if(check.checked){
            arrayPorCategoria = (check.value==='Todos') ? arrayProductos : buscarProductosCategoria(check.value);
        }
    });
    //Por orden de precio 
    let arrayPorOrdenPrecio= (selectPrecio.value==='menorPrecio') ? ordenarProductosPrecioAscendente(arrayPorCategoria) : ordenarProductosPrecioDescendente(arrayPorCategoria);

    //Por rango de precio
    let arrayFiltrado = buscarProductosRangoPrecio(arrayPorOrdenPrecio,precioMinimo.value,precioMaximo.value);
    //Renderizar pasando un array 
    renderizarProductos(arrayFiltrado);   
   
    
    //Para evitar not defined, addEventListener nuevamente al renderizar
     botonAgregarProducto = document.querySelectorAll('.agregarProducto');
  
    botonAgregarProducto.forEach(botonAgrProd => {
        botonAgrProd.addEventListener('click',agregarCarrito)
    });
    
}
//Modifica el text del filtro por rango minimo de precio
function textPrecioMin(){
    textPrecioMinimo.innerText=`$ ${precioMinimo.value}`;
}
//Modifica el text del filtro por rango maximo de precio
function textPrecioMax(){
    textPrecioMaximo.innerText=`$ ${precioMaximo.value}`;
}

/*--------------4-EventListeners-----*/
btnBuscarProductos.addEventListener('click',buscarProducto);

precioMinimo.addEventListener('change',textPrecioMin);

precioMaximo.addEventListener('change',textPrecioMax);

btnFiltrar.addEventListener('click',filtrarProductos);

/*--------------5-Ejecuciones-----*/
fetch('../assets/DB/productos.json')
.then(response=>response.json())
.then((data)=>{
    arrayProductos=data;
    renderizarProductos(arrayProductos)
    //Para evitar que no se agrege la funcion de agregar carrito a los productos que se muestran al entrar a productos..
    let botonAgregarProducto = document.querySelectorAll('.agregarProducto');
    botonAgregarProducto.forEach(botonAgrProd => {
        botonAgrProd.addEventListener('click',agregarCarrito)
      });
})

