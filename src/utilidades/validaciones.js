export function validarCedulaEcuatoriana(cedula) {
    const cedulaRegExp = /^[0-9]{10}$/;

    if (!cedulaRegExp.test(cedula)) {
        return false;
    }

    const provincia = Number(cedula.substring(0, 2));
    if (provincia < 0 || provincia > 24) {
        return false;
    }

    const tercerDigito = Number(cedula[2]);
    if (tercerDigito < 0 || tercerDigito > 5) {
        return false;
    }

    // Algoritmo de validación de dígitos verificadores
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
        let producto = coeficientes[i] * Number(cedula[i]);
        suma += (producto > 9) ? producto - 9 : producto;
    }

    const decenaSuperior = Math.ceil(suma / 10) * 10;
    const digitoVerificador = decenaSuperior - suma;

    if (digitoVerificador !== Number(cedula[9])) {
        return false;
    }

    return true;
}

export function validarFechaNacimiento(fechaNacimiento) {
    const fechaIngresada = new Date(fechaNacimiento);
    const fechaActual = new Date();
    const fechaMinima = new Date();
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 5);

    // La fecha no debe ser del día actual
    if (fechaIngresada.toDateString() === fechaActual.toDateString()) {
        return false;
    }

    // Debe permitir ingreso de fechas menores con 5 años a la fecha actual
    if (fechaIngresada < fechaMinima) {
        return false;
    }

    // No debe permitir ingreso de fechas futuras
    if (fechaIngresada > fechaActual.toDateString()) {
        return false;
    }

    // Validar que el año ingresado sea mayor o igual a 1900
    if (fechaIngresada.getFullYear() < 1900) {
        return false;
    }

    return true;
}
export function validarCorreoElectronico(correoElectronico) {
    const correoElectronicoRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoElectronicoRegExp.test(correoElectronico) || correoElectronico.length > 100) {
        return false;
    }

    return true;
}

export function validarNumeroCelular(numeroCelular) {
    const numeroCelularRegExp = /^[0-9]{10}$/;

    if (!numeroCelularRegExp.test(numeroCelular)) {
        return false;
    }
    // Verificar que el número de celular no sea una secuencia de números iguales
    if (/^(\d)\1+$/.test(numeroCelular)) {
        return false;
    }

    return true;
}

export function validarNombre(nombre) {
    const formatoValido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // expresión regular

    return formatoValido.test(nombre) 
  }
