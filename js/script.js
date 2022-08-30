// Saludar a quien ingreso sus datos en el form y guardar datos en localStorage

function saludar() {

    let nombreUsuario = document.getElementById("nombre").value
    let emailUsuario = document.getElementById("email").value

    if ((nombreUsuario == 0) || (emailUsuario == 0)) {
        Swal.fire({
            title: "Ingrese dato válido",
            icon: "error",
            iconColor: "#ff0000",
            confirmButtonText: "OK",
            position: "top-center"
        })
    } else {
        Swal.fire({
            title: "Gracias por ser parte de esta comunidad. Bienvenidx " + nombreUsuario,
            icon: "success",
            iconColor: "#00ff00",
            confirmButtonText: "Gracias",
            position: "top-center"
        });
    }
}

function guardarDatos(storage) {
    const usuario = {
        "nombre": document.getElementById("nombre").value,
        "email": document.getElementById("email").value
    }
        (storage == "localStorage") ? localStorage.setItem('usuario', JSON.stringify(usuario)) : sessionStorage.setItem('usuario', JSON.stringify(usuario));

}

const btningreso = document.getElementById("ingreso");

btningreso.addEventListener("click", (e) => {

    e.preventDefault()
    saludar();
    (document.getElementById("checkbox").checked) ? guardarDatos("localStorage") : guardarDatos("sessionStorage");

})


//Carrito de compras

const suelta = document.getElementById("suelta");
const cuatro = document.getElementById("cuatro");
const ocho = document.getElementById("ocho");
const doce = document.getElementById("doce");

class itemsCarrito {
    constructor (id,detalle, valor){
        this.id = id;
        this.detalle = detalle;
        this.valor = valor;
    }
}
    
const carrito = []

function addCarrito(id, detalle, valor){
   const newItem = new itemsCarrito (id, detalle, valor);
   carrito.push(newItem);
}

function deleteCarrito (id){
    const itemId = carrito.findIndex((item)=>item.id === id);
    carrito.splice(itemId,1);
}

function mostrarCarrito(){
    const resumen = document.getElementById("resumen");
    resumen.innerHTML = "";
    carrito.forEach((item) => {
        resumen.innerHTML += `<div id="${item.id}" class="resumen-items">
                                <h3>Detalle: ${item.detalle}</h3>
                                <h3>Valor: ${item.valor}</h3>
                                <button class="boton-eliminar">Eliminar</button>
                            </div>`
    })

    const btnEliminar = document.getElementsByClassName("boton-eliminar");
    for (const btn of btnEliminar) {
        btn.addEventListener("click", (e)=>{
            deleteCarrito(e.target.parentNode.id);
            mostrarCarrito();
            total.innerText = "Total:";
        })
        
    }

    const btnComprar = document.getElementById("boton-comprar");
    btnComprar.addEventListener("click", ()=>{
        Swal.fire({
            title: "Gracias por su compra",
            icon: "success",
            iconColor: "#00ff00",
            position: "top-center",
        })
    })  
}

function calcularTotal(){         //--------------------------PROBLEMA---------------------/
    const total = document.getElementById("total");
    total.innerText = "Total:";
    carrito.forEach((item) => {
        total.innerText += item.valor;

    })
    
}

suelta.addEventListener("click", (e)=>{
    e.preventDefault();
    addCarrito(1, "Clase suelta", 800);
    mostrarCarrito();
    calcularTotal();
})
cuatro.addEventListener("click", (e)=>{
    e.preventDefault();
    addCarrito(2, "Pack 4 clases", 2700);
    mostrarCarrito();
    calcularTotal();
})
ocho.addEventListener("click", (e)=>{
    e.preventDefault();
    addCarrito(3, "Pack 8 clases", 5900);
    mostrarCarrito();
    calcularTotal();
})
doce.addEventListener("click", (e)=>{
    e.preventDefault();
    addCarrito(4, "Pack 12 clases", 9100);
    mostrarCarrito();
    calcularTotal();
})


//El usuario elige que nivel desea y se le muestran las opciones

const opcionesClases = document.getElementById("opciones");
const seleccion = document.getElementById("seleccion");
const textoSeleccion = document.getElementById("texto-seleccion")

function filtrar(array) {
    return array.filter((clase) => clase.nivel == opcionesClases.value);
}

function crearTarjetas(array) {
    seleccion.innerHTML = "";
    textoSeleccion.innerHTML = `Tus opciones de nivel ${opcionesClases.value}:`
    array.forEach((clase) => {
        const tarjeta = `<div class="card">
                            <img src="${clase.imagen}" class="card-img" alt="">
                            <div class="card-body">
                            <h4 class="card-title">Estilo: ${clase.estilo}</h4>
                            <h4 class="card-title">Profe: ${clase.profesor}</h4>
                        </div>`;
        seleccion.innerHTML += tarjeta;
    })
}

opcionesClases.onchange = () => {

    fetch("./js/data.json")
        .then((rta) => rta.json())
        .then((data) => {
            crearTarjetas(filtrar(data));
        })
}
