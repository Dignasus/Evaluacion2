const btnEnviar = document.getElementById("btnEnviar");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputCargo = document.getElementById("cargo");
const inputCorreo = document.getElementById("correo");

const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorCorreo = document.getElementById("errorCorreo");
const errorCargo = document.getElementById("errorCargo");


function limpiarErrores() {
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorCorreo.textContent = "";
    errorCargo.textContent = "";
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

        console.log("Intentando registrar:", nombre, apellido, cargo, correo);
        alert("Registro exitoso para: " + nombre + " " + apellido);
    }else{
        console.log("Formulario no válido. No se puede registrar.");
    }

    


}

btnEnviar.addEventListener("click", registrar);


