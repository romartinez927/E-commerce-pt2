let productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"))
const contenedorCarrito = document.getElementById("contenedorCarrito")
const montoTotalCompra = document.getElementById("montoTotal")
const contenedorCarritoVacio = document.getElementById("carritoVacio")
const formularioCompra = document.querySelector("#formularioCompra")
const carritoHeader = document.querySelector("#carritoHeader")
const continuarSeccionDos = document.querySelector(".continuarSeccionDos")
const continuarSeccionTres = document.querySelector(".continuarSeccionTres")
const seccionTres = document.querySelector(".seccionTres")
const email = document.getElementById("email")

const volverSeccionUno = document.querySelector(".volverSeccionUno")



//Función para visualizar los productos que se encuentran en el carrito
const verCarrito = () => {

    // formularioCompra.innerHTML = ""
    contenedorCarrito.innerHTML = ""

    let continuarCompra = document.createElement("button")
    continuarCompra.className = "continuarCompra btn btn-light"
    continuarCompra.innerText = "Continuar Compra"

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        continuarCompra.onclick = function(){continuarProcesoCompra()};
        contenedorCarritoVacio.innerText = ""

        productosEnCarrito.forEach( (producto) => {
            let contenidoDelCarrito = document.createElement("div")
            contenidoDelCarrito.className = "contenidoDelCarrito col-10 p-3"
            contenidoDelCarrito.innerHTML = `
                <div class="row align-items-center">
                    <div class="col" >
                        <img src="${producto.img}" class="carrito-img">
                    </div>
                    <div class="col">
                        <div class="carrito-producto-titulo">
                            <small>Título</small>
                            <h5>${producto.nombre}</h5>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <div class="d-flex justify-content-center">
                                <i class="fa-solid fa-plus sumar p-1"></i>
                                <p class="px-2">${producto.cantidad}</p>
                                <i class="fa-solid fa-minus restar p-1"></i>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                    </div>
                    <div class="col">
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                    </div>
                    <div class="col">
                        <i class="fa-solid fa-circle-xmark eliminarProducto"></i>
                    </div>
                </div>
            `


            
            contenedorCarrito.append(contenidoDelCarrito)
        

            let restar = contenidoDelCarrito.querySelector(".restar")
    
            restar.addEventListener("click", () => {
                if (producto.cantidad > 1) {
                    producto.cantidad--
                    verCarrito()
                } else {
                    eliminarProducto(producto.id)
                    verCarrito()
                }
            })

            let sumar = contenidoDelCarrito.querySelector(".sumar")

            sumar.addEventListener("click", () => {
                producto.cantidad++
                verCarrito()
            })

            let eliminar = contenidoDelCarrito.querySelector(".eliminarProducto") 
    
            eliminar.addEventListener("click", () => {
                eliminarProducto(producto.id)
            })
    

        })    
    } else {
        contenedorCarritoVacio.innerText = "Tu carrito se encuentra vacío."
        montoTotalCompra.innerHTML = ""
        continuarCompra.innerHTML = ""
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

const continuarProcesoCompra = () => {
        contenedorCarrito.style.display="none"
        montoTotalCompra.style.display="none"
        carritoHeader.style.display="none"
        document.getElementById("seccionUno").style.display="block"
}

volverSeccionUno.addEventListener("click", () => {
    document.getElementById("seccionDos").style.display="none"
    continuarProcesoCompra()
})

continuarSeccionDos.onclick = function(){irSeccionDos()};

const irSeccionDos = () => {
        if (email.value == "" || email.value.includes("@") === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, complete sus datos',
              })
        } else {
            document.getElementById("seccionUno").style.display="none"
            document.getElementById("seccionDos").style.display="block"

            const bloque = document.querySelectorAll('.bloque')
            const opcionDeEntrega = document.querySelectorAll('.opcionPago')


            opcionDeEntrega.forEach( ( cadaOpcion , i )=>{
                opcionDeEntrega[i].addEventListener('click', ()=>{
                    bloque.forEach( ( cadaBloque , i )=>{
                        bloque[i].classList.remove('activo')
                    })
                    bloque[i].classList.add('activo')
                })
            })
        }
}


// continuarSeccionDos.onclick = function(){irSeccionDos()};

continuarSeccionTres.onclick = function(){irSeccionTres()}

const irSeccionTres = () => {
            document.getElementById("seccionDos").style.display="none"
            document.getElementById("seccionTres").style.display="block"
            localStorage.clear()
            Swal.fire('¡Compra realizada con éxito!')
}



//ESCUCHO SI SE ENVIA EL FORMULARIO
document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
}, false);
