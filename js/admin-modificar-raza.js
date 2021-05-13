'use strict';

let razaSeleccionada;

const inputNombre = document.querySelector('#txt-nombre-raza');
const selectEspecie = document.querySelector('#txt-especie');
const btnGuardar = document.querySelector('#btn-guardar');

//Llenar tipos de servicio

let listaTiposMascotas = [];
const llenarTiposMascotas = async() => {
    listaTiposMascotas = await obtenerTiposMascotas();
    llenarSelectTipoMascotas();
};

const llenarSelectTipoMascotas = () => {
    let option = document.createElement('option');
    option.value = '';
    option.innerHTML = '-- Seleccione una opción --';
    listaTiposMascotas.forEach(tipoMascota => {
        let opcion = document.createElement('option');
        let tipo = tipoMascota.nombre;
        opcion.value = tipo;
        opcion.innerHTML = tipo;
        opcion.value = tipoMascota.nombre;
        selectEspecie.appendChild(opcion);
    });

};

llenarTiposMascotas();

inputNombre.disabled = true;

const llenarFormulario = () => {

    inputNombre.value = razaSeleccionada.nombre;
    selectEspecie.value = razaSeleccionada.especie;
};

const validar = () => {
    let error = false;
    let inputsRequeridos = document.querySelectorAll('.formulario :required');

    inputsRequeridos.forEach(input => {
        if (input.value == '') {
            error = true;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });


    if (error == false) {
        obtenerDatos();
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'Faltan campos por llenar',
            'text': 'Por favor revise los campos resaltados',
            'confirmButtonText': 'Entendido'
        });
    }
};

const obtenerDatos = () => {
    let nombre = inputNombre.value;
    let especie = selectEspecie.value;

    modificarRazasAdmin(nombre, especie);
};

if (sessionStorage.getItem('razaSeleccionada')) {
    razaSeleccionada = JSON.parse(sessionStorage.getItem('razaSeleccionada'));
    llenarFormulario();
} else {
    Swal.fire({
        'icon': 'warning',
        'title': 'Atención',
        'text': 'Debe seleccionar primero una raza'
    }).then(() => {
        window.location.href = 'admin-listar-razas.html';
    });
}


btnGuardar.addEventListener('click', validar);