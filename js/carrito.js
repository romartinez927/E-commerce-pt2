//JS de la página del carrito de compras

let productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"))
const contenedorCarrito = document.querySelector("#contenedorCarrito")
const montoTotalCompra = document.querySelector("#montoTotal")
const contenedorCarritoVacio = document.querySelector("#carritoVacio")
const formularioCompra = document.querySelector("#formularioCompra")
const carritoHeader = document.querySelector("#carritoHeader")
const continuarSeccionDos = document.querySelector(".continuarSeccionDos")
const continuarSeccionTres = document.querySelector(".continuarSeccionTres")
const seccionTres = document.querySelector(".seccionTres")
const email = document.querySelector("#email")

const volverSeccionUno = document.querySelector(".volverSeccionUno")


//Función para visualizar los productos que se encuentran en el carrito
const verCarrito = () => {
    contenedorCarrito.innerHTML = ""

    let continuarCompra = document.createElement("button")
    continuarCompra.className = "continuarCompra btn btn-light"
    continuarCompra.innerText = "Continuar Compra"

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        contenedorCarrito.style.visibility="visible"
        continuarCompra.onclick = function(){continuarProcesoCompra()}
        contenedorCarritoVacio.style.display="none"

        productosEnCarrito.forEach( (producto) => {
            const {nombre, precio, img, id, cantidad} = producto

            let contenidoDelCarrito = document.createElement("div")
            contenidoDelCarrito.className = "contenidoDelCarrito col-12 p-3"
            contenidoDelCarrito.innerHTML = `
                <div class="row align-items-center">
                    <div class="col" >
                        <img src="${img}" class="carrito-img">
                    </div>
                    <div class="col">
                        <div class="carrito-producto-titulo">
                            <small>Título</small>
                            <h5>${nombre}</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <div class="d-flex justify-content-center">
                                <i class="fa-solid fa-minus restar pointer p-1"></i>
                                <p class="px-2">${cantidad}</p>
                                <i class="fa-solid fa-plus sumar pointer p-1"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${precio}</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${precio * cantidad}</p>
                        </div>
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-circle-xmark eliminarProducto pointer"></i>
                    </div>
                </div>
            `

            contenedorCarrito.append(contenidoDelCarrito)
        
            // Para restar la cantidad de un producto
            let restar = contenidoDelCarrito.querySelector(".restar")
    
            restar.addEventListener("click", () => {
                if (producto.cantidad > 1) {
                    producto.cantidad--
                    verCarrito()
                } else {
                    eliminarProducto(id)
                    verCarrito()
                }
            })

            // Para sumar la cantidad de un producto
            let sumar = contenidoDelCarrito.querySelector(".sumar")

            sumar.addEventListener("click", () => {
                producto.cantidad++
                verCarrito()
            })

            // Para eliminar un producto
            let eliminar = contenidoDelCarrito.querySelector(".eliminarProducto") 
    
            eliminar.addEventListener("click", () => {
                eliminarProducto(id)
            })
    

        })    
    } else {
        contenedorCarritoVacio.innerText = "Tu carrito se encuentra vacío."
        montoTotalCompra.innerHTML = ""
        continuarCompra.style.display="none"
        document.querySelector("#pasos").style.display="none"
        document.querySelector("#seccionUno").style.display="none"

    }
    

    contenedorCarrito.append(continuarCompra)
}

//Eliminar productos
const eliminarProducto = (id) => {
    const index = productosEnCarrito.findIndex((element) => element.id === id)

    productosEnCarrito.splice(index, 1)
    verCarrito()

    localStorage.setItem("productosCarrito", JSON.stringify(productosEnCarrito))
   
} 

verCarrito()

// Cálculo del precio total
if (productosEnCarrito && productosEnCarrito.length > 0) {
    const total = productosEnCarrito.reduce ((acc, el) =>
        acc + el.precio * el.cantidad, 0)

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-content"
    totalCompra.innerHTML = `Total: $ ${total}`
    montoTotalCompra.append(totalCompra)
} else {
    montoTotalCompra.innerHTML = ""
}

// Para visualizar el formulario de compra
const continuarProcesoCompra = () => {
        document.querySelector("#pasos").style.display="block"
        document.querySelector("#seccionUno").style.display="block"
        document.querySelector("#colCarrito").classList.add('col-md-4')
        document.querySelector("#colCarrito").classList.add('pt-5')
        document.querySelector("#colCarrito").classList.remove('col-12')
        document.querySelector(".continuarCompra").style.display="none"
        document.querySelector(".tituloPrincipal").style.display="none"
        document.querySelector(".contenidoDelCarrito").style.display="none"
        
        contenedorCarrito.innerHTML = ""

        let tituloContenidoCarritoDos = document.createElement("div")
        tituloContenidoCarritoDos.className = "tituloCarritoDos"
        tituloContenidoCarritoDos.innerHTML = `<h4 class="fw-bold">Tus productos</h3>`
        contenedorCarrito.append(tituloContenidoCarritoDos)

        productosEnCarrito.forEach( (producto) => {
            let contenidoDelCarritoDos = document.createElement("div")
            contenidoDelCarritoDos.className = "contenidoDelCarritoDos col-12 p-3"
            contenidoDelCarritoDos.innerHTML = `
                <div class="row align-items-center">
                    <div class="col" >
                        <img src="${producto.img}" class="carrito-img-dos">
                    </div>
                    <div class="col">
                        <div class="carrito-producto-titulo">
                            <h5>${producto.nombre}</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-cantidad">
                                <p>${producto.cantidad}</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                    </div>
                </div>
            `
            contenedorCarrito.append(contenidoDelCarritoDos)
        })
            
}

volverSeccionUno.addEventListener("click", () => {
    document.querySelector("#seccionDos").style.display="none"
    continuarProcesoCompra()
})

continuarSeccionDos.onclick = function(){irSeccionDos()};

const irSeccionDos = () => {
        if(email.value == "") {
            Swal.fire({
                icon: 'error',
                text: 'Por favor, completar todos los campos',
              })
        } else {
            document.querySelector("#seccionUno").style.display="none"
            document.querySelector("#seccionDos").style.display="block"

            document.querySelector(".pasos-tusDetalles").classList.add('disabled')
            document.querySelector(".pasos-pago").classList.remove('disabled')

            // Acorddion con opciones de pago
            const bloque = document.querySelectorAll('.bloque')
            const opcionDePago = document.querySelectorAll('.opcionPago')

            opcionDePago.forEach( ( cadaOpcion , i )=>{
                opcionDePago[i].addEventListener('click', ()=>{
                    bloque.forEach( ( cadaBloque , i )=>{
                        bloque[i].classList.remove('activo')
                    })
                    bloque[i].classList.add('activo')
                })
            })
        }
}


continuarSeccionTres.onclick = function(){irSeccionTres()}

const irSeccionTres = () => {
            document.querySelector("#seccionDos").style.display="none"
            document.querySelector("#seccionTres").style.display="block"

            document.querySelector(".pasos-pago").classList.add('disabled')
            document.querySelector(".pasos-confirmacion").classList.remove('disabled')

            // Terminar compra y vaciar localStorage
            localStorage.clear()
            Swal.fire('¡Compra realizada con éxito!')
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

//Para evitar que se envie el formulario al apretar submit
document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault()
}, false)
