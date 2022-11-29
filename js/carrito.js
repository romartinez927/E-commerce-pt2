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
    continuarCompra.className = "continuarCompra"
    continuarCompra.innerText = "Continuar Compra"

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        
        continuarCompra.onclick = function(){continuarProcesoCompra()};
        contenedorCarritoVacio.innerText = ""

        productosEnCarrito.forEach( (producto) => {
            let contenidoDelCarrito = document.createElement("div")
            contenidoDelCarrito.className = "contenidoDelCarrito col justify-content-center text-center"
            contenidoDelCarrito.style.width = "18em"
            contenidoDelCarrito.innerHTML = `
                <div class="card">
                    <img src="${producto.img}">
                    <h4>${producto.nombre}</h3>
                    <p>$ ${producto.precio}</p>
                    <span class="restar"> - </span>
                    <p>Cantidad: ${producto.cantidad}</p> 
                    <span class="sumar"> + </span>
                    <p>Total: $${producto.cantidad * producto.precio}</p>
                    <span class="eliminarProducto"> (x) </span>
                </div>`
            
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
    totalCompra.innerHTML = `Total a pagar: $ ${total}`
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
