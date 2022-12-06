let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

let editando = false;

const formulario = document.getElementById('formulario');
const nombreImput = document.getElementById('nombre');
const puestoImput = document.getElementById('puesto');
const btnAgregar = document.getElementById('btnAgregar')

formulario.addEventListener('submit' ,validarFormulario);

function validarFormulario (e) {
    e.preventDefault();

    if(nombreImput.value === '' || puestoImput.value === ''){
       alert('Todos los campos deven de ser llenados')
       return;
    }

    if(editando){
        editarEmpleado()
        editando = false;
    }
    else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreImput.value;
        objEmpleado.puesto = puestoImput.value;

        agregarEmpleado(objEmpleado);
        
    }
}


function agregarEmpleado(empleado) {
    let baseDatos =JSON.parse(localStorage.getItem('cliente'));
    baseDatos.push(empleado)
    localStorage.setItem('cliente' , JSON.stringify(baseDatos));
    mostrarEmpleados();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
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
