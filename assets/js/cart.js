/*-----------------CARRITO-----------------------*/
/*--------------1-Variables y constantes-----*/
//Array Carrito que se guarda en el localstrorage
let arrayCarrito= JSON.parse(localStorage.getItem('carrito')) || [];

/*--------------2-QuerySelectors-----*/
//Boton agregar producto
let botonAgregarProducto = document.querySelectorAll('.agregarProducto');
//Boton carrito de la barra de navegacion
const btnCarrito = document.querySelector('#btnCarrito');
const btnCarritoFlotante = document.querySelector('#btnCarritoFlotante');

/*--------------3-Funciones-----*/
//Pone el contador que se ve en la barra de navegacion en 0
function contadorACero(){
    btnCarrito.innerText= `+ 0`;
    btnCarritoFlotante.innerText= `+ 0`;
}
//Incrementa el contador de la barra de nav. cuando se agrega un producto
function actualizarContadorCarrito(){
    btnCarrito.innerText= `+ ${arrayCarrito.length}`;
    btnCarritoFlotante.innerText= `+ ${arrayCarrito.length}`;
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
   localStorage.setItem('carrito',JSON.stringify(arrayCarrito));
}

//Vacia el carrito del localstrorage
const vaciarCarrito = ()=>{
  localStorage.removeItem('carrito');
  arrayCarrito= [];
  alertaExito('Se elimino el carrito');
  contadorACero();
 
}

//Suma el total de todos los productos del carrito
const sumarTotalCarrito = ()=>{
    const totalCarrito = arrayCarrito.reduce((acumulador,carrito) =>acumulador + carrito.total,0);

    return totalCarrito;
}
//Agrega un producto al carrito
const agregarCarrito = (event) =>{
    //El usuario debe iniciar sesion para comprar (ver otherFunctions)
    comprobarLogin()
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

    let indice= arrayCarrito.indexOf(product);
    eliminarProductoCarrito(indice);

    actualizarContadorCarrito()
    alertaExito('Se elimino un producto del carrito');
}

//Modificar Cantidad de productos del carrito
const modificarCantidadProducto = (event)=>{
  let input= event.target;
  let codigo = input.getAttribute('data-id');
  let cantidad = input.value;
  let product= buscarProductoCarrito(codigo);
  let indice= arrayCarrito.indexOf(product);
  eliminarProductoCarrito(indice);
  //Creando un objeto nuevo 
  const producto={
    ...product,
    cantidad,
    total:cantidad*product.precio
  };
  //Enviando al array
  arrayCarrito.push(producto);

  actualizarContadorCarrito();
  mostrarCarrito()
  //Guardando prod en el carrito
  localStorage.setItem('carrito',JSON.stringify(arrayCarrito));
}

//Comprar carrito
const compraFinalizada = ()=>{
  localStorage.removeItem('carrito');
  let usuario = JSON.parse(sessionStorage.getItem('login'));
  contadorACero();
  alertaPersonalizable('Compra Finalizada',`Muchas gracias por su compra ${usuario.nombre} ${usuario.apellido}. El producto esta en proceso de envío a su domicilio.Verifique en su correo electrónico su factura y código de seguimiento de OCA.`,'success','Cerrar','#ECD813'); 
}

const elegirPago = ()=>{
  // RIGHT SIDEBAR
  //Datos de usuario logueado de othersFunction
  let usuario = datosUsuarioLogueado();
 Swal.fire({
  title: 'DATOS DE PAGO',
  color:'#e9890b',
  background:'#8e9494',
  html:`
  <div class="datosPago">
    <div>
      <h5>Total compra $${Math.round(sumarTotalCarrito().toFixed(2))}</h5>
    </div>

    <form id='formularioFinalizarCompra'>
      <div class="container mb-3 row">
        <label for="nombre" class="col-sm-2 col-form-label">Nombre</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="nombre" placeholder="Ingrese su nombre" required value="${usuario.nombre}">
        </div>
      </div>

      <div class="container mb-3 row">
        <label for="apellido" class="col-sm-2 col-form-label">Apellido</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="apellido" placeholder="Ingrese su apellido" required value="${usuario.apellido}">
        </div>
      </div>

      <div class="container mb-3 row">
        <label for="dni" class="col-sm-2 col-form-label">DNI</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" id="dni" placeholder="Ingrese DNI" required value="${usuario.dni}">
        </div>
      </div>

      <div class="container mb-3 row">
        <label for="email" class="col-sm-2 col-form-label">Correo electrónico</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="email" placeholder="Ingrese su email" required value="${usuario.email}">
        </div>
      </div>

      <div class="container mb-3 row">
        <label for="pago" class="col-sm-2 col-form-label">Método de pago</label>
        <div class="col-sm-10">
          <select class="form-select metodoPago">
            <option value="Tarjeta Naranja">Tarjeta Naranja</option>
            <option value="Tarjeta Visa">Tarjeta Visa</option>
            <option value="Tarjeta MasterCard">Tarjeta MasterCard</option>
          </select>
        </div>
      </div>

      <div class="container mb-3 row cuotas">
        <label for="cuotas" class="col-sm-2 col-form-label">Cuotas</label>
        <div class="col-sm-10">
          <select class="form-select">
            <option>1 Cuota de $${Math.round(sumarTotalCarrito().toFixed(2))}</option>
            <option>3 Cuotas de $${Math.round(sumarTotalCarrito()/3).toFixed(2)}</option>
            <option>6 Cuotas de $${Math.round(sumarTotalCarrito()/6).toFixed(2)}</option>
            <option>12 Cuotas de $${Math.round(sumarTotalCarrito()/12).toFixed(2)}</option>
          </select>
        </div>
      </div>

      <div class="container mb-3 row">
        <label for="tarjeta" class="col-sm-2 col-form-label">Nº Tarjeta</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" id="tarjeta" placeholder="Ingrese el número de la tarjeta" required>
        </div>
      </div>

      <div class="container mb-3 row">
        <label for="codigoTarjeta" class="col-sm-2 col-form-label">Código Tarjeta</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" id="codigoTarjeta" placeholder="Ingrese el código de la tarjeta" required>
        </div>
      </div>

      <div class="container mb-3 row">
        <label for="vencimiento" class="col-sm-2 col-form-label">Fecha de vencimiento</label>
        <div class="col-sm-10">
          <input type="month" class="form-control" id="vencimiento" required>
        </div>
      </div>

      <button class="btn btn-success" id="btnFinalizarCompra">Finalizar compra</button>
    </div>
  </form>
  `,
  position: 'center',
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
  grow: 'row',
  width: 1000,
  showConfirmButton: false,
  showCloseButton: true,
  
})

  const formularioFinalizarCompra = document.querySelector('#formularioFinalizarCompra');

  formularioFinalizarCompra.addEventListener('submit',compraFinalizada);

}

const estadoCarrito = ()=>{
  if(arrayCarrito.length === 0){
    alertaInformacion('No hay productos en el carrito para efectuar la compra');
  }else{
    elegirPago();
  } 
}


//Muestra el carrito como sidebar
const mostrarCarrito = () =>{
    //Mostrar carrito si esta logueado
    comprobarLogin()

    //Sumar el total del carrito
    let total = sumarTotalCarrito();
// RIGHT SIDEBAR
 Swal.fire({
    title: 'Carrito de compras',
    html:`
    <div class='table-responsive'>
      <table class="table table-sm tablaCarrito">
        <thead>
          <tr>
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

  <h3 class="mt-3">Total Compra $${Math.round(total).toFixed(2)}</h3>

  <div class ='col'>
    <button class="btn btn-primary mt-3 col-auto" id='btnComprarCarrito'>Comprar carrito</button>

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
        <td class='textNombre'>${producto.nombre}</td>
        <td>
          <input type='number' value='${producto.cantidad}' class='inputCantidad' max='${producto.stock}' min='1' data-id='${producto.codigo}'value='${producto.cantidad}'>
        </td>
        <td>$${producto.total}</td>
        <td class='btn bi bi-trash btnEliminarProdCarrito' data-id='${producto.codigo}'></td>
     </tr>
     `
  });

 
  const btnComprarCarrito=document.querySelector('#btnComprarCarrito');

  btnComprarCarrito.addEventListener('click',estadoCarrito); 

  const btnVaciarCarrito = document.querySelector('#btnVaciarCarrito');

  btnVaciarCarrito.addEventListener('click',vaciarCarrito); 

  const btnEliminarProdCarrito = document.querySelectorAll('.btnEliminarProdCarrito');

  const inputCantidad= document.querySelectorAll('.inputCantidad');

  inputCantidad.forEach(producto => {
    producto.addEventListener('change',modificarCantidadProducto);
  });
  
  btnEliminarProdCarrito.forEach(producto => {
    producto.addEventListener('click',eliminarProducto);
  });

}




/*--------------4-EventListeners-----*/
//Btn mostrar carrito
btnCarrito.addEventListener('click',mostrarCarrito)
btnCarritoFlotante.addEventListener('click',mostrarCarrito)

//Boton agr producto
botonAgregarProducto.forEach(botonAgrProd => {
    botonAgrProd.addEventListener('click',agregarCarrito)
});

/*--------------5-Ejecuciones-----*/
//Al iniciar la app se carga la cantidad en el ico de carrito
actualizarContadorCarrito();


