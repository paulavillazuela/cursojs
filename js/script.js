// Saludar a quien ingreso sus datos en el form y guardar datos en localStorage

function saludar() {

    let nombreUsuario = document.getElementById("nombre").value

    if(nombreUsuario == 0){
        Swal.fire({
            title: "Ingrese dato válido",
            icon: "error",
            iconColor: "#ff0000",
            confirmButtonText:"OK",
            position: "top-center",
            
        })
    } else{
        Swal.fire({
            title: "Gracias por ser parte de esta comunidad. Bienvenidx " + nombreUsuario,
            icon: "success",
            iconColor: "#00ff00",
            confirmButtonText: "Gracias",
            position: "top-center",
        
        });
    }
}

function guardarDatos(storage){
    const usuario = {
        "nombre" : document.getElementById("nombre").value,
        "email" : document.getElementById("email").value
    }
    (storage == "localStorage") ? localStorage.setItem('usuario', JSON.stringify(usuario)) : sessionStorage.setItem('usuario', JSON.stringify(usuario));
    
}

const btningreso = document.getElementById("ingreso");

btningreso.addEventListener("click", (e)=>{
    
    e.preventDefault()
    saludar();
   (document.getElementById("checkbox").checked) ? guardarDatos("localStorage") : guardarDatos("sessionStorage");

})


//Ejecutar la compra con un alert, agregar precio y (falta generar carrito)

const suelta = document.getElementById("suelta");
const packCuatro = document.getElementById("cuatro");
const packOcho = document.getElementById("ocho");
const packDoce = document.getElementById("doce");


suelta.addEventListener("click", () => {
    const pago = document.getElementById("pagarSuelta");
    pago.innerHTML = `Para finalizar: abonar $800 <img src="./assets/carrito.png">`;
    pago.addEventListener("click",()=>{
        
    })
});

packCuatro.addEventListener("click", () => {
    const pago = document.getElementById("pagarCuatro");
    pago.innerHTML = `Para finalizar: abonar $2700 <img src="./assets/carrito.png">`;
});
packOcho.addEventListener("click", () => {
    const pago = document.getElementById("pagarOcho");
    pago.innerHTML = `Para finalizar: abonar $5900 <img src="./assets/carrito.png">`;
});
packDoce.addEventListener("click", () => {
    const pago = document.getElementById("pagarDoce");
    pago.innerHTML = `Para finalizar: abonar $9100 <img src="./assets/carrito.png">`;
});

//El usuario elige que nivel desea y se le muestran las opciones

const opcionesClases = document.getElementById("opciones");
const seleccion = document.getElementById("seleccion");
const textoSeleccion = document.getElementById("texto-seleccion")

function filtrar(array){
    return array.filter ((clase)=> clase.nivel == opcionesClases.value);
}

function crearTarjetas(array){
    seleccion.innerHTML = "";
    textoSeleccion.innerHTML = `Tus opciones de nivel ${opcionesClases.value}:`
    array.forEach((clase)=>{
        const tarjeta = `<div class="card">
                            <img src="${clase.imagen}" class="card-img" alt="">
                            <div class="card-body">
                            <h4 class="card-title">Estilo: ${clase.estilo}</h4>
                            <h4 class="card-title">Profe: ${clase.profesor}</h4>
                        </div>`;
                        seleccion.innerHTML += tarjeta;
    })
}

opcionesClases.onchange = ()=>{
    
    fetch ("./js/data.json")
    .then((rta)=>rta.json())
    .then ((data)=>{
        crearTarjetas(filtrar(data));
    })
}
