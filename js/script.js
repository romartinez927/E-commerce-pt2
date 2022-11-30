//JS de la página Index

const contenedorProductos = document.getElementById("contenedorCardsProductos")
const cantidadCarrito = document.getElementById("cantidadCarrito")
const contenedorCategoriasProductos = document.querySelector("#contenedorCategoriasProductos")
const categoriaBotones = document.querySelectorAll(".categoriaBtn")
const tituloPrincipal = document.querySelector(".tituloPrincipal")
const buscador = document.querySelector("#buscador")
const buscadorBtn = document.querySelector("#buscador-btn")
const resultado = document.querySelector("#resultado")


fetch("js/productos.json")
    .then(response => response.json())
    .then(productos => funcionQueContieneTodoMiCodigo(productos))

function funcionQueContieneTodoMiCodigo(arrayDeProductosOriginal) {


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
        comprar.className = "btnComprar btn btn-light"
        comprar.innerText = "Comprar"

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
        saveLocal()
        })
        })  

}


cargarProductos(arrayDeProductosOriginal)


const filtrar = () => {
    resultado.innerHTML = ""

    const texto = buscador.value.toLowerCase()
    for (let producto of arrayDeProductosOriginal) {
        const {nombre, precio, img} = producto
        let name = nombre.toLowerCase()
        if (name.indexOf(texto) !== -1) {
            // tituloPrincipal.innerText = `Resultados de "${buscador.value}"`
            resultado.innerHTML += `
                        <div class="col pt-3" style="width: 18rem;">
                            <div class="card">
                                <img src=${img} class="card-img-top" alt="...">
                                <div class="card-body">
                                    <p>${nombre}</p>
                                    <p class="card-text">$${precio}</p>
                                    <button class="btnComprar btn btn-light">Comprar</button>
                                </div>
                            </div>
                        </div>`
            contenedorProductos.innerHTML = ""
        } 
    }

    if (resultado.innerHTML === "") {
        resultado.innerHTML += `<p>Producto no encontrado</p>`
        tituloPrincipal.innerText = ""
    }
}

buscadorBtn.addEventListener("click", filtrar)
buscador.addEventListener("keyup", filtrar)

categoriaBotones.forEach(boton => {
    boton.addEventListener("click", (e) => {

        if (e.currentTarget.id != "todos") {
            const productoCategoria = arrayDeProductosOriginal.find(producto => producto.categoria === e.currentTarget.id)
            
            const primeraLetraMayuscula = (cadena) => {
                const primerCaracter = cadena.charAt(0).toUpperCase();
                const restoDeLaCadena = cadena.substring(1, cadena.length);
                return primerCaracter.concat(restoDeLaCadena);
              }

            let rdo = primeraLetraMayuscula(productoCategoria.categoria)

            tituloPrincipal.innerText = rdo;
            const productosBoton = arrayDeProductosOriginal.filter(producto => producto.categoria === e.currentTarget.id)
            cargarProductos(productosBoton)
        } else {
            cargarProductos(arrayDeProductosOriginal)
            tituloPrincipal.innerText = "Todos los productos"
        }

    })
})

// Contador de productos en carrito
const carritoCounter = () => {
    const carritoLenght = carrito.length
    localStorage.setItem("numeritoCarrito", JSON.stringify(carritoLenght))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("numeritoCarrito"))
}

carritoCounter()

// Guardar datos en Local Storage
const saveLocal = () => {
    localStorage.setItem("productosCarrito", JSON.stringify(carrito))
}


}

