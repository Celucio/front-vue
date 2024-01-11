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

    if (fechaIngresada.toDateString() === fechaActual.toDateString()) {
        return false;
    }
    if (fechaIngresada < fechaMinima) {
        return false;
    }
    if (fechaIngresada > fechaActual.toDateString()) {
        return false;
    }
    if (fechaIngresada.getFullYear() < 2010) {
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
    const celularRegExp = /^09\d{8}$/;

    if (!celularRegExp.test(numeroCelular)) {
        return false;
    }
    if (/^(\d)\1+$/.test(numeroCelular)) {
        return false;
    }

    return true;
}

export function validarNombre(nombre) {
    const nombreRegExp = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    if (!nombreRegExp.test(nombre)) {
        return false;
    }

    return true;
}

export function validarFormatoPeriodoLectivo(periodo) {
    const formatoRegExp = /^\d{4}-\d{4}$/;

    if (!formatoRegExp.test(periodo)) {
        return false;
    }

    const [anioInicio, anioFin] = periodo.split('-');

    if (isNaN(anioInicio) || isNaN(anioFin) || anioInicio.length !== 4 || anioFin.length !== 4) {
        return false;
    }

    if (parseInt(anioInicio) >= parseInt(anioFin) || anioInicio === anioFin) {
        return false;
    }

    return true;
}
export function validarFechaIActividad(fechaInicio) {
    const fechaInicioDate = new Date(fechaInicio);

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    return fechaInicioDate <= fechaActual;
}

export function validarCaracteresEspeciales(cadena) {
    const caracteresEspecialesRegExp = /^[a-zA-ZÀ-ÿ0-9\s]+$/;

    if (!caracteresEspecialesRegExp.test(cadena)) {
        return false;
    }

    return true;
}