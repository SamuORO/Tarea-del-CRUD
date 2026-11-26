"use strict";

// Obtener los elementos del HTML
const formulario = document.getElementById("FormularioProducto");

const inputId = document.getElementById("Id");
const inputCodigo = document.getElementById("Codigo");
const inputProducto = document.getElementById("Producto");
const inputPrecio = document.getElementById("Precio");
const inputCantidad = document.getElementById("Cantidad");

const inputBuscar = document.getElementById("Buscar");

const btnGuardar = document.getElementById("btnGuardar");
const btnActualizar = document.getElementById("btnActualizar");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar");

const tablaProductos = document.getElementById("TablaProductos");


// --------------------------------------------------
// FUNCIÓN PRINCIPAL PARA ENVIAR DATOS A PHP
// --------------------------------------------------

async function EnviarDatos(accion, datos = {}) {

    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar la acción que recibirá PHP
    formData.append("Accion", accion);

    // Agregar los datos recibidos
    for (const campo in datos) {
        formData.append(campo, datos[campo]);
    }

    try {

        // Enviar los datos mediante Fetch
        const respuesta = await fetch("registrar.php", {
            method: "POST",
            body: formData
        });

        // Comprobar el estado HTTP
        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }

        // Convertir la respuesta a JSON
        const resultado = await respuesta.json();

        return resultado;

    } catch (error) {

        console.error("Error en Fetch:", error);

        Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo comunicar con el servidor."
        });

        return null;
    }
}


// --------------------------------------------------
// FUNCIÓN PARA MOSTRAR ALERTAS
// --------------------------------------------------

function MostrarAlerta(resultado) {

    if (resultado.success) {

        Swal.fire({
            icon: "success",
            title: "Correcto",
            text: resultado.message
        });

    } else {

        let mensaje = resultado.message;

        // Mostrar los errores de validación
        if (resultado.errors) {

            for (const campo in resultado.errors) {
                mensaje += "\n" + resultado.errors[campo];
            }

        }

        Swal.fire({
            icon: "error",
            title: "Error",
            text: mensaje
        });
    }
}


// --------------------------------------------------
// FUNCIÓN PARA LISTAR PRODUCTOS
// --------------------------------------------------

async function ListarProductos(termino = "") {

    const resultado = await EnviarDatos("Buscar", {
        Buscar: termino
    });

    // Si ocurrió un error, no continuar
    if (resultado === null || !resultado.success) {
        return;
    }

    // Limpiar la tabla
    tablaProductos.innerHTML = "";

    // Si no hay productos
    if (resultado.data.length === 0) {

        const fila = document.createElement("tr");
        const celda = document.createElement("td");

        celda.colSpan = 6;
        celda.textContent = "No se encontraron productos.";
        celda.className = "text-center";

        fila.appendChild(celda);
        tablaProductos.appendChild(fila);

        return;
    }

    // Recorrer los productos recibidos
    resultado.data.forEach(producto => {

        const fila = document.createElement("tr");

        // ID
        const celdaId = document.createElement("td");
        celdaId.textContent = producto.id;

        // Código
        const celdaCodigo = document.createElement("td");
        celdaCodigo.textContent = producto.codigo;

        // Nombre
        const celdaProducto = document.createElement("td");
        celdaProducto.textContent = producto.producto;

        // Precio
        const celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = "$" + Number(producto.precio).toFixed(2);

        // Cantidad
        const celdaCantidad = document.createElement("td");
        celdaCantidad.textContent = producto.cantidad;

        // Acciones
        const celdaAcciones = document.createElement("td");

        const botonEditar = document.createElement("button");

        botonEditar.type = "button";
        botonEditar.textContent = "Editar";
        botonEditar.className = "btn btn-warning btn-sm";

        // Guardar el ID del producto en el botón
        botonEditar.dataset.id = producto.id;

        // Agregar las celdas a la fila
        fila.appendChild(celdaId);
        fila.appendChild(celdaCodigo);
        fila.appendChild(celdaProducto);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaCantidad);

        celdaAcciones.appendChild(botonEditar);
        fila.appendChild(celdaAcciones);

        // Agregar la fila a la tabla
        tablaProductos.appendChild(fila);
    });
}


// --------------------------------------------------
// FUNCIÓN PARA LIMPIAR EL FORMULARIO
// --------------------------------------------------

function LimpiarFormulario() {

    formulario.reset();

    inputId.value = "";

    btnGuardar.disabled = false;
    btnActualizar.disabled = true;
}


// --------------------------------------------------
// FUNCIÓN PARA GUARDAR O MODIFICAR
// --------------------------------------------------

async function ProcesarFormulario(accion) {

    // Validar los campos del formulario
    if (!formulario.reportValidity()) {
        return;
    }

    // Obtener los datos del formulario
    const datos = {
        Codigo: inputCodigo.value.trim(),
        Producto: inputProducto.value.trim(),
        Precio: inputPrecio.value,
        Cantidad: inputCantidad.value
    };

    // Si estamos modificando, agregar el ID
    if (accion === "Modificar") {
        datos.Id = inputId.value;
    }

    // Enviar la acción a PHP
    const resultado = await EnviarDatos(accion, datos);

    if (resultado === null) {
        return;
    }

    // Mostrar el resultado
    MostrarAlerta(resultado);

    // Si la operación fue exitosa
    if (resultado.success) {

        LimpiarFormulario();

        // Actualizar la tabla
        await ListarProductos(inputBuscar.value.trim());
    }
}



 // --------------------------------------------------
 // FUNCIÓN PARA CONTROLAR LAS ACCIONES CON SWITCH
 // --------------------------------------------------

async function ControlarAccion(accion) {

    switch (accion) {

        case "Guardar":

            await ProcesarFormulario("Guardar");

            break;

        case "Modificar":

            await ProcesarFormulario("Modificar");

            break;

        default:

            Swal.fire({
                icon: "error",
                title: "Acción no válida",
                text: "La operación solicitada no existe."
            });

            break;
    }
}


// --------------------------------------------------
// EVENTO DEL BOTÓN GUARDAR
// --------------------------------------------------

btnGuardar.addEventListener("click", function () {

    ControlarAccion("Guardar");

});


// --------------------------------------------------
// EVENTO DEL BOTÓN ACTUALIZAR
// --------------------------------------------------

btnActualizar.addEventListener("click", function () {

    ControlarAccion("Modificar");

});


btnActualizar.addEventListener("click", function () {

    switch ("Modificar") {

        case "Modificar":

            ProcesarFormulario("Modificar");

            break;

        default:

            console.log("Acción no válida");

            break;
    }
});


// --------------------------------------------------
// EVENTO DEL BOTÓN BUSCAR
// --------------------------------------------------

btnBuscar.addEventListener("click", function () {

    ListarProductos(inputBuscar.value.trim());
});


// Buscar también al presionar ENTER
inputBuscar.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        ListarProductos(inputBuscar.value.trim());
    }
});


// --------------------------------------------------
// EVENTO PARA EDITAR UN PRODUCTO
// --------------------------------------------------

tablaProductos.addEventListener("click", function (event) {

    // Comprobar si se presionó un botón Editar
    if (!event.target.matches(".btn-warning")) {
        return;
    }

    const id = event.target.dataset.id;

    // Buscar todos los productos
    EnviarDatos("Buscar", {
        Buscar: ""
    }).then(resultado => {

        if (resultado === null || !resultado.success) {
            return;
        }

        // Encontrar el producto seleccionado
        const producto = resultado.data.find(
            elemento => elemento.id == id
        );

        if (!producto) {
            Swal.fire({
                icon: "error",
                title: "Producto no encontrado"
            });

            return;
        }

        // Colocar los datos en el formulario
        inputId.value = producto.id;
        inputCodigo.value = producto.codigo;
        inputProducto.value = producto.producto;
        inputPrecio.value = producto.precio;
        inputCantidad.value = producto.cantidad;

        // Cambiar el estado de los botones
        btnGuardar.disabled = true;
        btnActualizar.disabled = false;

        // Llevar la página al formulario
        formulario.scrollIntoView({
            behavior: "smooth"
        });
    });
});


// --------------------------------------------------
// EVENTO DEL BOTÓN LIMPIAR
// --------------------------------------------------

btnLimpiar.addEventListener("click", function () {

    LimpiarFormulario();
});


// --------------------------------------------------
// CARGAR LOS PRODUCTOS AL ABRIR LA PÁGINA
// --------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    ListarProductos();
});
