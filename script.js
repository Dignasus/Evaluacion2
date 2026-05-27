const btnEnviar = document.getElementById("btnEnviar");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputCargo = document.getElementById("cargo");
const inputCorreo = document.getElementById("correo");
const inputFiltro = document.getElementById("inputFiltro");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorCorreo = document.getElementById("errorCorreo");
const errorCargo = document.getElementById("errorCargo");

let colaboradores = [];

function mostrarColaboradores(arregloPorMostrar = colaboradores) {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = "";

    
    arregloPorMostrar.forEach(colaborador => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${colaborador.nombre}</td>
            <td>${colaborador.apellido}</td>
            <td>${colaborador.cargo}</td>
            <td>${colaborador.correo}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
    
}

function filtrarColaboradores() {
    let termino= inputFiltro.value.toLowerCase().trim();
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
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorCorreo.textContent = "";
    errorCargo.textContent = "";

    inputNombre.classList.remove('Invalido', 'Valido');
    inputApellido.classList.remove('Invalido', 'Valido');
    inputCargo.classList.remove('Invalido', 'Valido');
    inputCorreo.classList.remove('Invalido', 'Valido');
}

function mostrarError(elementoError, elementoInput, mensaje) {
    elementoError.textContent = mensaje;
    elementoInput.classList.add('Invalido');
    elementoInput.classList.remove('Valido');
}

function validarCampoTexto(valor, elementoInput, elementoError, nombreCampo) {
    if (valor === "") {
        mostrarError(elementoError, elementoInput, "El campo  "+ nombreCampo + " no puede estar vacío.");
        return false;
    }

    if (valor.length < 3) {
        mostrarError(elementoError, elementoInput, "Minimo 3 caracteres.");
        return false;
    }

    if (valor.length > 30) {
        mostrarError(elementoError, elementoInput, "Máximo 30 caracteres.");
        return false;
    }

    return true;
}

function validarCampos(){
    let nombre = inputNombre.value.trim();
    let apellido = inputApellido.value.trim();
    let correo = inputCorreo.value.trim();
    let cargo = inputCargo.value.trim();

    let nombreValido = validarCampoTexto(nombre, inputNombre, errorNombre, "Nombre");
    let apellidoValido = validarCampoTexto(apellido, inputApellido, errorApellido, "Apellido");
    let correoValido = validarCampoTexto(correo, inputCorreo, errorCorreo, "Correo");
    let cargoValido = validarCampoTexto(cargo, inputCargo, errorCargo, "Cargo");

    const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    
    if (nombreValido === true && !regexLetras.test(nombre)) {
        mostrarError(errorNombre, inputNombre, "El nombre solo debe contener letras.");
        nombreValido = false;
    }

    if (apellidoValido === true && !regexLetras.test(apellido)) {
        mostrarError(errorApellido, inputApellido, "El apellido solo debe contener letras.");
        apellidoValido = false;
    }

    if (correoValido === true && !correo.endsWith("@empresa.cl")) {
        mostrarError(errorCorreo, inputCorreo, "El correo debe contener '@empresa.cl'");
        correoValido = false;
    }

    if (correoValido === true){
        let correoExistente = colaboradores.some(colaborador => colaborador.correo === correo);
        if (correoExistente) {
            mostrarError(errorCorreo, inputCorreo, "El correo ya esta registrado.");
            correoValido = false;
        }
    }

    if (nombreValido === true && apellidoValido === true && correoValido === true && cargoValido === true) {
        return true;
    } else {
        return false;
    }
}

function registrar(){
    limpiarErrores();

    let formularioEsValido = validarCampos();

    if (formularioEsValido){
        let nombre = inputNombre.value.trim();
        let apellido = inputApellido.value.trim();
        let cargo = inputCargo.value.trim();
        let correo = inputCorreo.value.trim();

        let nuevoColaborador = {
            nombre: nombre,
            apellido: apellido,
            cargo: cargo,
            correo: correo
        };

        colaboradores.push(nuevoColaborador);

        inputNombre.value = "";
        inputApellido.value = "";
        inputCargo.value = "";
        inputCorreo.value = "";

        inputFiltro.value = "";

        mostrarColaboradores();

    } else {
        console.log("Formulario no válido");
    }
}

btnEnviar.addEventListener("click", registrar);

inputFiltro.addEventListener("input", filtrarColaboradores);
