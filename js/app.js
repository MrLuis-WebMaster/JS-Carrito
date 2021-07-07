const carrito = document.querySelector("#carrito");

const ListaCursos = document.querySelector("#lista-cursos");

const ContenedorCarrito = document.querySelector("#lista-carrito tBody");

const VaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];


CargarEventos();

function CargarEventos () {
    // cuando agregas un curso presionando "Agregar Carrito"
    ListaCursos.addEventListener("click", AgregarCurso);

    //elimina un curso del carrito

    carrito.addEventListener("click", eliminarCurso);

    //vaciar carritos

    VaciarCarritoBtn.addEventListener("click", ()=> {
        articulosCarrito = [];
        LimpiarHTML();
    })
};

// funciones

// add curso
function AgregarCurso (e){
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        LeerDatosCursos(cursoSeleccionado);
    }
}


//remove curso 

function eliminarCurso (e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        // eliminar del arreglo 
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        CarritoHTML();
    }


}

//lee el contenido del html y extrae la informacion del curso 

function LeerDatosCursos (curso) {
    console.log(curso);

    const InfoCurso = {
        imagen :curso.querySelector("img").src,
        precio:curso.querySelector(".precio span").textContent,
        titulo:curso.querySelector("h4").textContent,
        id:curso.querySelector("a").getAttribute("data-id"),
        cantidad:1,
    }
    // revisar si un elemento existe 

    const existe = articulosCarrito.some( curso => curso.id === InfoCurso.id);
    if (existe) {
        // actualizamos la cantidad 
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === InfoCurso.id ){
                curso.cantidad++;
                return curso;     // retorna el objeto actualizado;
            } else {
                return curso;     // retorna el objeto que no son lo duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //agrega los elementos
        articulosCarrito = [...articulosCarrito, InfoCurso];
    }



    console.log(articulosCarrito);

    CarritoHTML();
}

// muestra el carrito en el HTML

function CarritoHTML () {

    LimpiarHTML();

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src ="${imagen}" />
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>

            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a> 
            </td>
        
        `;

        ContenedorCarrito.appendChild(row);
    })
}

//limpiar el HTML

function LimpiarHTML () {
   // ContenedorCarrito.innerHTML=""; //forma lenta

    while (ContenedorCarrito.firstChild) {
        ContenedorCarrito.removeChild(ContenedorCarrito.firstChild);
    }
}