/*-----------------CARRITO-----------------------*/
/*--------------1-Variables y constantes-----*/
//Array Carrito que se guarda en el localstrorage
let arrayCarrito= JSON.parse(localStorage.getItem('carrito')) || [];

/*--------------2-QuerySelectors-----*/
//Boton agregar producto
let botonAgregarProducto = document.querySelectorAll('.agregarProducto');
//Boton carrito de la barra de navegacion
const btnCarrito = document.querySelector('#btnCarrito');

/*--------------3-Funciones-----*/
//Pone el contador que se ve en la barra de navegacion en 0
function contadorACero(){
    btnCarrito.innerText= `+ 0`;
}
//Incrementa el contador de la barra de nav. cuando se agrega un producto
function actualizarContadorCarrito(){
    btnCarrito.innerText= `+ ${arrayCarrito.length}`;
}
//Comprueba si un producto fue agregado previamente al carrito
const existeProductoCarrito = (codigo)=>{
    let existeProducto = ((arrayCarrito.some(producto => producto.codigo === codigo)));
    
    return existeProducto;
}
//Busca un producto en el carrito (objeto)
const buscarProductoCarrito = (codigo)=>{
    let producto = ((arrayCarrito.find(producto => producto.codigo === codigo)));
    
    return producto;
}
//Elimina un producto del carrito por indice del array
const eliminarProductoCarrito = (indice)=>{
   arrayCarrito.splice(indice,1);
}

//Vacia el carrito del localstrorage
const vaciarCarrito = ()=>{
  localStorage.removeItem('carrito');
  arrayCarrito= [];
  alertaExito('Su carrito fue eliminado con exito');
  contadorACero();
 
}

//Suma el total de todos los productos del carrito
const sumarTotalCarrito = ()=>{
    const totalCarrito = arrayCarrito.reduce((acumulador,carrito) =>acumulador + carrito.total,0);

    return totalCarrito;
}
//Agrega un producto al carrito
const agregarCarrito = (event) =>{
    //El usuario debe iniciar sesion para comprar
    if(!sessionStorage.getItem('login')){
        window.location.href='login.html';
    }
    //Buscamos el poducto
    let id= event.target.getAttribute('data-id');
    const productoElegido = buscarProductoCodigo(id);
    //Tomamos la cantidad de prod que se quiere comprar el usuario
    let selectorCant = document.querySelector(`#${id}`);
    let cantidad = selectorCant.value;
    //Verificamos si el stock es suficiente para la demanda
    if(cantidad > productoElegido.stock){
        alertaError('La cantidad elegida supera al stock disponible.');
    }else{
        //Si el producto ya existia en el carrito y el usuario lo volvio a agregar, lo borramos porque es posible que su cant cambie
        if(existeProductoCarrito(productoElegido.codigo)){
            let product =buscarProductoCarrito(productoElegido.codigo);

           let indice= arrayCarrito.indexOf(product);
            eliminarProductoCarrito(indice);

        }
        //Creando un objeto nuevo 
        const producto={
            ...productoElegido,
            cantidad,
            total:cantidad*productoElegido.precio
        };
        //Enviando al array
        arrayCarrito.push(producto);

        actualizarContadorCarrito();
        //Guardando prod en el carrito
        localStorage.setItem('carrito',JSON.stringify(arrayCarrito));

        //Alerta de tostify
        tostadaProductoAgregado(producto.nombre,producto.cantidad,producto.total);
    }
}

//Funcion elim prod del carrito
const eliminarProducto = (event)=>{
    let codigo = event.target.getAttribute('data-id');
   
    let product =buscarProductoCarrito(codigo);

    let indice= arrayCarrito[product.indexOf];

    eliminarProductoCarrito(indice);
    actualizarContadorCarrito()
    alertaExito('Se elimino un producto del carrito');
}
//Finalizar compra
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

//Muestra el carrito como sidebar
const mostrarCarrito = () =>{
    let total = sumarTotalCarrito();
// RIGHT SIDEBAR
 Swal.fire({
    title: 'Carrito de compras',
    html:`
    <div class='table-responsive'>
      <table class="table table-sm tablaCarrito">
        <thead>
          <tr>
            <th scope="col">Cod.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Cant.</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody id="tbody">
   
        </tbody>

    
      </table>
    </div>

  <h3 class="mt-3">Total Compra $${total}</h3>

  <div class ='col'>
    <button class="btn btn-primary mt-3 col-auto" id='btnFinalizarCompra'>Finalizar Compra</button>

    <button class="btn btn-danger mt-3 col-auto" id='btnVaciarCarrito'>Vaciar carrito</button>
  </div>
  
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
    width: 1000,
    showConfirmButton: false,
    showCloseButton: true
    
  })

  let tbody = document.querySelector('#tbody');
  tbody.innerHTML='';
  arrayCarrito.forEach(producto => {
     tbody.innerHTML+=`
     <tr>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
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
//Btn mostrar carrito
btnCarrito.addEventListener('click',mostrarCarrito)
//Boton agr producto
botonAgregarProducto.forEach(botonAgrProd => {
    botonAgrProd.addEventListener('click',agregarCarrito)
});

/*--------------5-Ejecuciones-----*/
//Al iniciar la app se carga la cantidad en el ico de carrito
actualizarContadorCarrito();


