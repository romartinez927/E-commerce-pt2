let productosEnCarrito = JSON.parse(localStorage.getItem("productosCarrito"))
const contenedorCarrito = document.getElementById("contenedorCarrito")
const montoTotalCompra = document.getElementById("montoTotal")
const contenedorCarritoVacio = document.getElementById("carritoVacio")
const formularioCompra = document.querySelector("#formularioCompra")
const carritoHeader = document.querySelector("#carritoHeader")
let continuarCompra
const continuarSeccionDos = document.querySelector(".continuarSeccionDos")
const continuarSeccionTres = document.querySelector(".continuarSeccionTres")
const terminarCompra = document.querySelector(".finalizarCompra")
const seccionTres = document.querySelector(".seccionTres")

//Función para visualizar los productos que se encuentran en el carrito
const verCarrito = () => {

    // formularioCompra.innerHTML = ""
    contenedorCarrito.innerHTML = ""

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        contenedorCarritoVacio.innerText = ""

        productosEnCarrito.forEach( (producto) => {
            let contenidoDelCarrito = document.createElement("div")
            contenidoDelCarrito.className = "contenidoDelCarrito"
            contenidoDelCarrito.innerHTML = `
                <img src="${producto.img}">
                <h3>${producto.nombre}</h3>
                <p>$ ${producto.precio}</p>
                <span class="restar"> - </span>
                <p>Cantidad: ${producto.cantidad}</p> 
                <span class="sumar"> + </span>
                <p>Total: $${producto.cantidad * producto.precio}</p>
                <span class="eliminarProducto"> (x) </span>
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
    continuarCompra = document.createElement("button")
    continuarCompra.className = "continuarCompra"
    continuarCompra.innerText = "Continuar Compra"

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
    totalCompra.innerHTML = `Total a pagar: $ ${total}`
    montoTotalCompra.append(totalCompra)
} else {
    montoTotalCompra.innerHTML = ""
}

const continuarProcesoCompra = () => {
    continuarCompra.addEventListener("click", () => {
        contenedorCarrito.style.display="none"
        montoTotalCompra.style.display="none"
        carritoHeader.style.display="none"
        document.getElementById("seccionUno").style.display="block"
    })
}

continuarProcesoCompra()

const irSeccionDos = () => {
    continuarSeccionDos.addEventListener("click", () => {
        if (document.getElementById("email").value == "" || null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingrese su e-mail',
              })
        } else {
            document.getElementById("seccionUno").style.display="none"
            document.getElementById("seccionDos").style.display="block"

            const bloque = document.querySelectorAll('.bloque')
            const opcionDeEntrega = document.querySelectorAll('.opcionDeEntrega')


            opcionDeEntrega.forEach( ( cadaOpcion , i )=>{
                opcionDeEntrega[i].addEventListener('click', ()=>{
                    bloque.forEach( ( cadaBloque , i )=>{
                        bloque[i].classList.remove('activo')
                    })
                    bloque[i].classList.add('activo')
                })
            })
        }
    })
}

irSeccionDos()

const irSeccionTres = () => {
    continuarSeccionTres.addEventListener("click", () => {
            document.getElementById("seccionDos").style.display="none"
            document.getElementById("seccionTres").style.display="block"
        
    })
}

irSeccionTres()

const finalizarCompra = () => {
    terminarCompra.addEventListener("click", () => {
        localStorage.clear()
        Swal.fire('¡Gracias por tu compra!')
        document.getElementById("seccionTres").style.display="none"
    })

}

finalizarCompra()