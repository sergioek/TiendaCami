/*--------------PRODUCTOS--------------------*/

/*--------------1-Variables y constantes-----*/

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
 //Ordena los productos de manera por medio de precios de manera descendente. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
const ordenarProductosPrecioDescendente = (arrayProd) =>{
    let ordenDescendenteProductos= arrayProd.sort((a,b )=> b.precio-a.precio);
    return ordenDescendenteProductos;
}
 //Busca los productos de un rango de precio min y max. Recibe como parametro u array, ya que tambien hay que tener en cuenta si el usuario filtro por categoría. 
const buscarProductosRangoPrecio = (arrayProd,valorMinimo,valorMaximo)=>{
    let rangoMinimo = arrayProd.filter((producto => producto.precio >= valorMinimo ));
    let rangoMaximo = rangoMinimo.filter((producto => producto.precio <= valorMaximo ));
    
    let productosRangPrecio = rangoMaximo;
    return productosRangPrecio;
}

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
        
            for (let index = 0; index < stock; index++) {
                let valor = index+1;
                const option = document.createElement('option');
                option.setAttribute('value',valor)
                option.innerText=valor;
                selectorCantidad.append(option);
            }

            if(stock==0){
                botonAgregar.setAttribute('disabled',true);
                botonAgregar.classList='btn btn-danger  agregarProducto';
                botonAgregar.innerText='¡Sin stock';
                selectorCantidad.setAttribute('disabled',true);
            }

            divBody.append(p,h5,botonAgregar,selectorCantidad);
            divCard.append(imagenProducto,divBody);
            productos.append(divCard);

        });
        

    }

}

const buscarProducto = (event) =>{
    event.preventDefault();
    //Llamando a la tostada de otherFunctions
    tostadaBuscando();
    renderizarProductos(buscarProductosNombre(inputBuscarProductos.value));
}


const filtrarProductos = (event) =>{
    
    event.preventDefault();
    tostadaBuscando();

    let categoria;
    checkCategoria.forEach(check => {
        if(check.checked){
            arrayPorCategoria = (check.value==='Todos') ? arrayProductos : buscarProductosCategoria(check.value);
        }
    });

    let arrayPorOrdenPrecio= (selectPrecio.value==='menorPrecio') ? ordenarProductosPrecioAscendente(arrayPorCategoria) : ordenarProductosPrecioDescendente(arrayPorCategoria);
    
    let arrayFiltrado = buscarProductosRangoPrecio(arrayPorOrdenPrecio,precioMinimo.value,precioMaximo.value);
    
    renderizarProductos(arrayFiltrado);

     botonAgregarProducto = document.querySelectorAll('.agregarProducto');

    botonAgregarProducto.forEach(botonAgrProd => {
        botonAgrProd.addEventListener('click',agregarCarrito)
    });
    
}

function textPrecioMin(){
    textPrecioMinimo.innerText=`$ ${precioMinimo.value}`;
}

function textPrecioMax(){
    textPrecioMaximo.innerText=`$ ${precioMaximo.value}`;
}

/*--------------4-EventListeners-----*/

btnBuscarProductos.addEventListener('click',buscarProducto);

precioMinimo.addEventListener('change',textPrecioMin);

precioMaximo.addEventListener('change',textPrecioMax);

btnFiltrar.addEventListener('click',filtrarProductos);



/*--------------5-Ejecuciones-----*/
renderizarProductos(arrayProductos);



/*-----------------CARRITO-----------------------*/
/*--------------1-Variables y constantes-----*/
//Array Carrito
const arrayCarrito= JSON.parse(localStorage.getItem('carrito')) || [];

/*--------------2-QuerySelectors-----*/
let botonAgregarProducto = document.querySelectorAll('.agregarProducto');

const btnCarrito = document.querySelector('#btnCarrito');

/*--------------3-Funciones-----*/
function contadorACero(){
    btnCarrito.innerText= `+ 0`;
}

function actualizarContadorCarrito(){
    btnCarrito.innerText= `+ ${arrayCarrito.length}`;
}

const existeProductoCarrito = (codigo)=>{
    let existeProducto = ((arrayCarrito.some(producto => producto.codigo === codigo)));
    
    return existeProducto;
}

const buscarProductoCarrito = (codigo)=>{
    let producto = ((arrayCarrito.find(producto => producto.codigo === codigo)));
    
    return producto;
}

const eliminarProductoCarrito = (indice)=>{
   arrayCarrito.splice(indice,1);
}

const vaciarCarrito = ()=>{
    localStorage.removeItem('carrito');
    alertaExito('Su carrito fue eliminado con exito');
    contadorACero();
}

//Suma el total de todos los productos del carrito
const sumarTotalCarrito = ()=>{
    const totalCarrito = arrayCarrito.reduce((acumulador,carrito) =>acumulador + carrito.total,0);

    return totalCarrito;
}

const agregarCarrito = (event) =>{
    if(!sessionStorage.getItem('login')){
        window.location.href='login.html';
    }
  
    let id= event.target.getAttribute('data-id');
    const productoElegido = buscarProductoCodigo(id);

    let selectorCant = document.querySelector(`#${id}`);
    let cantidad = selectorCant.value;

    if(cantidad > productoElegido.stock){
        alertaError('La cantidad elegida supera al stock disponible.');
    }else{

        if(existeProductoCarrito(productoElegido.codigo)){
            let product =buscarProductoCarrito(productoElegido.codigo);

           let indice= arrayCarrito[product.indexOf];

            eliminarProductoCarrito(indice);

        }

        const producto={
            ...productoElegido,
            cantidad,
            total:cantidad*productoElegido.precio
        };
        
        arrayCarrito.push(producto);

        actualizarContadorCarrito();

        localStorage.setItem('carrito',JSON.stringify(arrayCarrito));

        //Alerta de tostify
        tostadaProductoAgregado(producto.nombre,producto.cantidad,producto.total);

    }
    

}


const eliminarProducto = (event)=>{
    let codigo = event.target.getAttribute('data-id');
   
    let product =buscarProductoCarrito(codigo);

    let indice= arrayCarrito[product.indexOf];

    eliminarProductoCarrito(indice);
    actualizarContadorCarrito()
    alertaExito('Se elimino un producto del carrito');
}

const finalizarCompra = ()=>{
    if(arrayCarrito.length === 0){
        alertaInformacion('No hay productos en el carrito para efectuar la compra')
    }else{
        localStorage.removeItem('carrito');
        let usuario = JSON.parse(sessionStorage.getItem('login'));
        contadorACero();
        alertaPersonalizable('Compra Finalizada',`Muchas gracias por su compra ${usuario.nombre} ${usuario.apellido}. El producto esta en proceso de envío a su domicilio.`,'success','Cerrar','#ECD813'); 
    } 
    
}


const mostrarCarrito = () =>{
    let total = sumarTotalCarrito();
// RIGHT SIDEBAR
 Swal.fire({
    title: 'Carrito de compras',
    html:`
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Codigo</th>
        <th scope="col">Nombre</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Precio</th>
        <th scope="col">Total</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody id="tbody">
   
    </tbody>

    
  </table>

  <h3 class="mt-3">Total Compra $${total}</h3>
  <button class="btn btn-primary mt-3" id='btnFinalizarCompra'>Finalizar Compra</button>

  <button class="btn btn-danger mt-3" id='btnVaciarCarrito'>Vaciar carrito</button>
    `,
    position: 'top-end',
    showClass: {
      popup: `
        animate__animated
        animate__fadeInRight
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutRight
        animate__faster
      `
    },
    grow: 'column',
    width: 600,
    showConfirmButton: false,
    showCloseButton: true
    
  })

  let tbody = document.querySelector('#tbody');

  arrayCarrito.forEach(producto => {
     tbody.innerHTML+=`
     <tr>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio}</td>
        <td>$${producto.total}</td>
        <td class='btn bi bi-trash btnEliminarProdCarrito' data-id='${producto.codigo}'></td>
     </tr>
     `
  });

 
  const btnFinalizarCompra=document.querySelector('#btnFinalizarCompra');

  btnFinalizarCompra.addEventListener('click',finalizarCompra); 

  const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');

  btnVaciarCarrito.addEventListener('click',vaciarCarrito); 

  const btnEliminarProdCarrito = document.querySelectorAll('.btnEliminarProdCarrito');

  
  btnEliminarProdCarrito.forEach(producto => {
    producto.addEventListener('click',eliminarProducto);
  });

}


/*--------------4-EventListeners-----*/
btnCarrito.addEventListener('click',mostrarCarrito)

botonAgregarProducto.forEach(botonAgrProd => {
    botonAgrProd.addEventListener('click',agregarCarrito)
});


/*--------------5-Ejecuciones-----*/
actualizarContadorCarrito();


