let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;   //esto no lo comprendo muy bien, solo se que le estoy asignando un buleano en false 

const formulario = document.getElementById('formulario');
const nombreImput = document.getElementById('nombre');
const puestoImput = document.getElementById('puesto');       // todas estas variables les estoy asignando un valor 
const btnAgregar = document.getElementById('btnAgregar')

formulario.addEventListener('submit' ,validarFormulario);

function validarFormulario (e) {
    e.preventDefault();  // esta funcion no la comprendo todavia

    if(nombreImput.value === '' || puestoImput.value === ''){   //si el valor de nombreImput es igual a un string vacio o el valor de puestoImput es igual a un string vacio,
       alert('Todos los campos deven de ser llenados')      //nos mandara esta alerta
       return;
    }

    if(editando){
        editarEmpleado()    // esto no lo comprendo
        editando = false;
    }
    else {
        objEmpleado.id = Date.now(); // date.now no se que sea o para que sirva
        objEmpleado.nombre = nombreImput.value; // aqui agregamos los valores de los imputs al objeto 
        objEmpleado.puesto = puestoImput.value;

        agregarEmpleado(objEmpleado);
        
    }
}


function agregarEmpleado(empleado) {   // creo que empleado es una variable que se va acrear
    let baseDatos =JSON.parse(localStorage.getItem('cliente')); //con getItem traemos un string de la llave cliente que creamos en el localStorage y con el JSON.parse lo convertimos en array y todos esos datos los guardamos en la variable baseDatos
    baseDatos.push(empleado) //los valores guardados en baseDatos los agregamos a la variable empleado
    localStorage.setItem('cliente' , JSON.stringify(baseDatos));//con localStorage.setItem agregamos los datos guardados en baseDatos y el JSON.stringify lo convierte en arreglo
    mostrarEmpleados();

    formulario.reset(); //limpiamos los imputs con el .reset

    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';    // aqui solo estamos asignandoles strings vacios como nuevos valores al objEmpleado
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {

    limpiarHTML()

    const divEmpleados = document.querySelector('.div-empleados');
    let baseDatos =JSON.parse(localStorage.getItem('cliente'));
    baseDatos.forEach(empleado => {
        const {id, nombre, puesto} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - Makeup tipo  ${puesto} -`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
        

    })
}

function cargarEmpleado(empleado) {
    const {id, nombre, puesto} = empleado;
    nombreImput.value = nombre;
    puestoImput.value = puesto;
    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}


function editarEmpleado() {
    let baseDatos =JSON.parse(localStorage.getItem('cliente'));
    objEmpleado.nombre = nombreImput.value;
    objEmpleado.puesto = puestoImput.value;

    baseDatos = baseDatos.map( empleado => {
        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;
        }
        return empleado
    });
    localStorage.setItem('cliente' , JSON.stringify(baseDatos));
    limpiarHTML();
    mostrarEmpleados();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarEmpleado(id) {
    let baseDatos =JSON.parse(localStorage.getItem('cliente'));
    baseDatos = baseDatos.filter(empleado => empleado.id !== id);

    localStorage.setItem('cliente' , JSON.stringify(baseDatos));
    
    limpiarHTML();
    mostrarEmpleados();
    
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('cliente') === null) {
        localStorage.setItem('cliente', JSON.stringify([]))
    }
    
    mostrarEmpleados ();
});
