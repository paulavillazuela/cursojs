// Datos a usar
function Clase(estilo,profesor,nivel){
        this.estilo = estilo;
        this.profesor = profesor;
        this.nivel = nivel;
}

const clases = [
    {estilo:"Heels", profesor: "Melany Diaz", nivel:"Intermedio"},
    {estilo:"Reggaeton", profesor:"Florencia Martinez", nivel:"Principiante"},
    {estilo:"Hip Hop", profesor:"Paula Villazula", nivel:"Principiante"},
    {estilo:"Reggaeton", profesor:"Florencia Stranges", nivel:"Intermedio"},
    {estilo:"Contemporáneo", profesor:"Barbara Huesca", nivel:"Avanzado"},
    {estilo:"Street", profesor:"Ornella Luna", nivel:"Intermedio"},
    {estilo:"Salsa fusion", profesor:"Florencia Radvanski", nivel:"Principiante"},
    {estilo:"Hip Hop", profesor: "Agustina Caumont", nivel:"Avanzado"},
    {estilo:"Dancehall", profesor:"Lourdes Moreno", nivel:"Intermedio"}
]


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

btningreso.addEventListener("click", ()=>{

    saludar();
   (document.getElementById("checkbox").checked) ? guardarDatos("localStorage") : guardarDatos("sessionStorage");

})


//Ejecutar la compra con un alert, agregar precio y (falta mostrar carrito)

const suelta = document.getElementById("suelta");
const packCuatro = document.getElementById("cuatro");
const packOcho = document.getElementById("ocho");
const packDoce = document.getElementById("doce");


suelta.addEventListener("click", () => {
    const pago = document.getElementById("pagarSuelta");
    pago.innerHTML = "Para finalizar: abonar $800";
});
packCuatro.addEventListener("click", () => {
    const pago = document.getElementById("pagarCuatro");
    pago.innerHTML = "Para finalizar: abonar $2700";
});
packOcho.addEventListener("click", () => {
    const pago = document.getElementById("pagarOcho");
    pago.innerHTML = "Para finalizar: abonar $5900";
});
packDoce.addEventListener("click", () => {
    const pago = document.getElementById("pagarDoce");
    pago.innerHTML = "Para finalizar: abonar $9100";
});

//El usuario elige que nivel desea y se le muestran las opciones

let opcionesClases = document.getElementById("opciones");


opcionesClases.onchange = ()=>{
    const seleccion = document.getElementById("seleccion");
    const filtrado = clases.filter ((clase)=> clase.nivel == opcionesClases.value);
    seleccion.innerHTML = `Clases de nivel ${opcionesClases.value}: <br><br> ${JSON.stringify(filtrado)}`;
    seleccion.className = "cardClases"; 
}





