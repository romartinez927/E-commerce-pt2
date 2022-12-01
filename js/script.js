//JS de la página principal

const contenedorProductos = document.querySelector("#contenedorCardsProductos")
const cantidadCarrito = document.querySelector("#cantidadCarrito")
const contenedorCategoriasProductos = document.querySelector("#contenedorCategoriasProductos")
const categoriaBotones = document.querySelectorAll(".categoriaBtn")
const tituloPrincipal = document.querySelector(".tituloPrincipal")

fetch("js/productos.json")
    .then(response => response.json())
    .then(productos => funcionContenedoraCodigo(productos))
    .catch(error())

function funcionContenedoraCodigo(productosRopa) {

    let carrito = JSON.parse(localStorage.getItem("productosCarrito")) || [] 

    //Crear cards de productos
    function cargarProductos(productosElegidos) {

        contenedorProductos.innerHTML = ""

        productosElegidos.forEach((producto) => {
            const {nombre, precio, img, id, cantidad} = producto

            let contCardProductos = document.createElement("div")
            contCardProductos.className = "col"
            contCardProductos.style.width = "18em"
            
            contenedorProductos.append(contCardProductos)
            

            let cardProductos = document.createElement("div")
            cardProductos.className = "card box"
            cardProductos.innerHTML = `
                            <img src=${img} class="card-img-top" alt="...">
                            <div class="card-body detail-box">
                                <p class="card-nombre">${nombre}</p>
                                <p class="card-text price">$${precio}</p>
                            </div>
            `
                
            contCardProductos.append(cardProductos)

            let comprar = document.createElement("button")
            comprar.className = "btnComprar"
            comprar.innerText = "Agregar al carrito"

            cardProductos.append(comprar)


            comprar.addEventListener ("click", () => { 

                const repeat = carrito.some((repeatProduct) => repeatProduct.id === id)
                if (repeat) {
                    carrito.map((prod) => {
                        prod.id === id && prod.cantidad++
                    })
                } else {
                    carrito.push({id, img, nombre, precio, cantidad})

                        
            }

            carritoCounter()
            
            guardarEnLocalStorage()
            })
            })  

    }


    cargarProductos(productosRopa)


    categoriaBotones.forEach(boton => {
        boton.addEventListener("click", (e) => {

            if (e.currentTarget.id != "todos") {
                const productoCategoria = productosRopa.find(producto => producto.categoria === e.currentTarget.id)
                
                const primeraLetraMayuscula = (cadena) => {
                    const primerCaracter = cadena.charAt(0).toUpperCase();
                    const restoDeLaCadena = cadena.substring(1, cadena.length);
                    return primerCaracter.concat(restoDeLaCadena);
                }

                let rdo = primeraLetraMayuscula(productoCategoria.categoria)

                tituloPrincipal.innerText = rdo;
                const productosBoton = productosRopa.filter(producto => producto.categoria === e.currentTarget.id)
                cargarProductos(productosBoton)
            } else {
                cargarProductos(productosRopa)
                tituloPrincipal.innerText = "Todos los productos"
            }

        })
    })


    const carritoCounter = () => {
        if(carrito && carrito.length > 0) {
            const numeroCarrito = carrito.reduce ((acc, el) => 
                acc + el.cantidad, 0)

            localStorage.setItem("numeritoCarrito", JSON.stringify(numeroCarrito))

            cantidadCarrito.innerText = JSON.parse(localStorage.getItem("numeritoCarrito"))
        }
    }
    carritoCounter()

    
    // Guardar productos del carrito en Local Storage
    const guardarEnLocalStorage = () => {
        localStorage.setItem("productosCarrito", JSON.stringify(carrito))
    }

}

function error() {
    let loading = document.createElement("div")
    loading.className = "spinner-grow d-flex justify-content-center"
    loading.role = "status"
    loading.innerHTML = `<span class="visually-hidden">Loading...</span>`

    contenedorProductos.append(loading)
}

