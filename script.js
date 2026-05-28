// Boton principal para registrar colaboradores
const btnEnviar = document.getElementById("btnEnviar");
// Inputs del formulario
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputCargo = document.getElementById("cargo");
const inputCorreo = document.getElementById("correo");
const inputFiltro = document.getElementById("inputFiltro");
// Elementos para mostrar errores
const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorCorreo = document.getElementById("errorCorreo");
const errorCargo = document.getElementById("errorCargo");
// Arreglo para almacenar colaboradores
let colaboradores = [];

function mostrarColaboradores(arregloPorMostrar = colaboradores) {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    // Limpiar la tabla antes de cargarla
    cuerpoTabla.innerHTML = "";

    // Recorrer el arreglo de colaboradores y crear filas
    arregloPorMostrar.forEach(colaborador => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${colaborador.nombre}</td>
            <td>${colaborador.apellido}</td>
            <td>${colaborador.cargo}</td>
            <td>${colaborador.correo}</td>
            <td>
                <button type="button" class="btn-eliminar">Eliminar</button>
            </td>
        `;
        // Obtener el botón de eliminar de la fila
        const btnEliminar = fila.querySelector(".btn-eliminar");
        // Agregar evento click al botón de eliminar
        btnEliminar.addEventListener("click", function() {
            eliminarColaborador(colaborador.id);
        });
        // Agrego la fila a la tabla
        cuerpoTabla.appendChild(fila);
    });
    
}

function eliminarColaborador(idRecibido) {
    // Filtrar el arreglo de colaboradores para eliminar el colaborador con el id recibido
    colaboradores = colaboradores.filter(colaborador => colaborador.id !== idRecibido);
    // Actualizar la tabla después de eliminar el colaborador
    filtrarColaboradores();
}

function filtrarColaboradores() {
    // Obtengo el texto escrito en el filtro
    let termino= inputFiltro.value.toLowerCase().trim();
    // Busco coincidencias en nombre, apellido, cargo o correo
    let colaboradoresFiltrados = colaboradores.filter(colaborador =>{
        return (
            colaborador.nombre.toLowerCase().includes(termino) ||
            colaborador.apellido.toLowerCase().includes(termino) ||
            colaborador.cargo.toLowerCase().includes(termino) ||
            colaborador.correo.toLowerCase().includes(termino)
        );
    });

    mostrarColaboradores(colaboradoresFiltrados);
}

function limpiarErrores() {
    // Limpiar mensajes de error
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorCorreo.textContent = "";
    errorCargo.textContent = "";
    // Quitar clases de validación anteriores
    inputNombre.classList.remove('Invalido', 'Valido');
    inputApellido.classList.remove('Invalido', 'Valido');
    inputCargo.classList.remove('Invalido', 'Valido');
    inputCorreo.classList.remove('Invalido', 'Valido');
}

function mostrarError(elementoError, elementoInput, mensaje) {
    // Mostrar mensaje debajo de el input correspondiente
    elementoError.textContent = mensaje;
    // Cambio clases para marcar el input como invalido
    elementoInput.classList.add('Invalido');
    elementoInput.classList.remove('Valido');
}

function validarCampoTexto(valor, elementoInput, elementoError, nombreCampo) {
    // Validar que el campo no este vacio
    if (valor === "") {
        mostrarError(elementoError, elementoInput, "El campo  "+ nombreCampo + " no puede estar vacío.");
        return false;
    }
    // Verificar largo minimo
    if (valor.length < 3) {
        mostrarError(elementoError, elementoInput, "Minimo 3 caracteres.");
        return false;
    }
    // Verificar largo maximo
    if (valor.length > 30) {
        mostrarError(elementoError, elementoInput, "Máximo 30 caracteres.");
        return false;
    }

    return true;
}

function validarCampos(){
    // Obtengo los valores del forulario
    let nombre = inputNombre.value.trim();
    let apellido = inputApellido.value.trim();
    let correo = inputCorreo.value.trim().toLowerCase();
    let cargo = inputCargo.value.trim();

    // Valido cada input
    let nombreValido = validarCampoTexto(nombre, inputNombre, errorNombre, "Nombre");
    let apellidoValido = validarCampoTexto(apellido, inputApellido, errorApellido, "Apellido");
    let correoValido = validarCampoTexto(correo, inputCorreo, errorCorreo, "Correo");
    let cargoValido = validarCampoTexto(cargo, inputCargo, errorCargo, "Cargo");
    // Expresion regular para permitir solo letras
    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    // Valiacion de nombres
    if (nombreValido === true && !regexLetras.test(nombre)) {
        mostrarError(errorNombre, inputNombre, "El nombre solo debe contener letras.");
        nombreValido = false;
    }
    // Validacion de apellidos
    if (apellidoValido === true && !regexLetras.test(apellido)) {
        mostrarError(errorApellido, inputApellido, "El apellido solo debe contener letras.");
        apellidoValido = false;
    }
    // Validacion de el dominio del correo
    if (correoValido === true && !correo.endsWith("@empresa.cl")) {
        mostrarError(errorCorreo, inputCorreo, "El correo debe contener '@empresa.cl'");
        correoValido = false;
    }
    // Verifico que el correo no exista repetido
    if (correoValido === true){
        let correoExistente = colaboradores.some(colaborador => colaborador.correo === correo);
        if (correoExistente) {
            mostrarError(errorCorreo, inputCorreo, "El correo ya esta registrado.");
            correoValido = false;
        }
    }
    // Retorno true solo si todos los campos son validos
    if (nombreValido === true && apellidoValido === true && correoValido === true && cargoValido === true) {
        return true;
    } else {
        return false;
    }
}

function registrar(){
    // Primero limpio errores anteriores
    limpiarErrores();
    // Valido los campos del formulario
    let formularioEsValido = validarCampos();
    // Si todo esta correcto se registra el colaborador
    if (formularioEsValido){
        let nombre = inputNombre.value.trim();
        let apellido = inputApellido.value.trim();
        let cargo = inputCargo.value.trim();
        let correo = inputCorreo.value.trim.toLowerCase();
        // Crea el nuevo colaborador
        let nuevoColaborador = {
            id: Date.now().toString(),
            nombre: nombre,
            apellido: apellido,
            cargo: cargo,
            correo: correo
        };
        // Guardo el colaborador en el array
        colaboradores.push(nuevoColaborador);
        // Limpio los inputs
        inputNombre.value = "";
        inputApellido.value = "";
        inputCargo.value = "";
        inputCorreo.value = "";
        // Limpio tambien el filtro
        inputFiltro.value = "";
        // Actualizo la tabla
        mostrarColaboradores();

    } else {
        // Mensaje de error en consola si el formulario no es valido
        console.log("Formulario no válido");
    }
}
// Evento click para el boton de registrar
btnEnviar.addEventListener("click", registrar);
// Evento filtrar automaticamente mientras se escribe
inputFiltro.addEventListener("input", filtrarColaboradores);
