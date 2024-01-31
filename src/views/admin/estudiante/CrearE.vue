<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Crear
            Estudiante</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Nombre</label>
                    <input type="text" v-model="nombre" class="form-control" id="nombre" placeholder="Nombre" required
                        @blur="nombreT = true">
                    <span v-if="nombreT && !nombre" class="error text-danger small">{{ mensajesError.nombre }}</span>
                    <span v-if="!validarCaracteresEspeciales(nombre) && nombre" class="text-danger small">No se permite el
                        ingreso de
                        caracteres especiales ni números.</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Apellido</label>
                    <input type="text" v-model="apellido" class="form-control" id="apellido" placeholder="Apellido" required
                        @blur="apellidoT = true">
                    <span v-if="apellidoT && !apellido" class="text-danger small">{{ mensajesError.apellido }}</span>
                    <span v-if="!validarCaracteresEspeciales(apellido) && apellido" class="text-danger small">No se permite
                        el
                        ingreso de
                        caracteres especiales ni números.</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Cédula</label>
                    <input type="text" v-model="cedula" class="form-control" id="cedula" placeholder="Cédula" required
                        @blur="cedulaT = true">
                    <span v-if="cedulaT && !cedula" class="text-danger small">{{ mensajesError.cedula }}</span>
                    <span v-if="!validarCedulaEcuatoriana(cedula) && cedula" class="text-danger small">La cédula ingresada
                        no es
                        ecuatoriana.</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Fecha Nacimiento</label>
                    <input type="date" v-model="fechaNacimiento" class="form-control " id="fechaNacimiento"
                        placeholder="fechaNacimiento" required :min="minFechaNacimiento" :max="maxFechaNacimiento"
                        @blur="fechaNacimientoT = true">
                    <span v-if="fechaNacimientoT && !fechaNacimiento" class="error text-danger small">
                        {{ mensajesError.fechaNacimiento }}
                    </span>
                    <span v-if="validarFechaNacimiento(fechaNacimiento) && fechaNacimiento" class="text-danger small">La
                        fecha de
                        nacimiento debe ser menor a 5 años a la fecha actual.</span>


                </div>
                <div class="col-12">
                    <label class="form-label">Dirección</label>
                    <textarea class="form-control" v-model="direccion" id="direccion" rows="3" placeholder="Dirección"
                        required @blur="direccionT = true"></textarea>
                    <span v-if="direccionT && !direccion" class="text-danger small">{{ mensajesError.direccion }}</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Correo</label>
                    <input type="text" v-model="correo" class="form-control" id="correo" placeholder="Correo" required
                        @blur="correoT = true">
                    <span v-if="correoT && !correo" class="text-danger small">{{ mensajesError.correo }}</span>
                    <span v-if="!validarCorreoElectronico(correo) && correo" class="text-danger small">El correo ingresado
                        no es
                        válido.</span>
                </div>
                <div class="col-md-6 pb-3">
                    <label class="form-label">Celular</label>
                    <input type="text" v-model="celular" class="form-control" id="correo" placeholder="Celular" required
                        @blur="celularT = true">
                    <span v-if="celularT && !celular" class="text-danger small ">{{ mensajesError.celular }}</span>
                    <span v-if="!validarNumeroCelular(celular) && celular" class="text-danger small">El número de celular
                        ingresado
                        no es válido.</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button
                        :disabled="validarFechaNacimiento(fechaNacimiento) || !validarCorreoElectronico(correo) || !validarNumeroCelular(celular) || !validarCedulaEcuatoriana(cedula) || !validarCaracteresEspeciales(nombre) || !validarCaracteresEspeciales(apellido)"
                        type="submit" class="btn btn-success text-white w-50 rounded-5 ">Crear</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/estudiante' }" class="btn btn-danger w-50 rounded-5 ">
                        Cancelar
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script>

import Navbar from '@/components/Navbar.vue';
import axios from 'axios'
import Swal from 'sweetalert2';
import router from '@/router';
import { API_URL } from '../../../api/config.js';
import { validarCedulaEcuatoriana, validarFechaNacimiento, validarCorreoElectronico, validarNumeroCelular, validarCaracteresEspeciales } from '../../../utilidades/validaciones.js'
export default {
    data() {
        return {
            nombre: '',
            nombreT: false,
            apellido: '',
            apellidoT: false,
            cedula: '',
            cedulaT: false,
            fechaNacimiento: '',
            fechaNacimientoT: false,
            direccion: '',
            direccionT: false,
            correo: '',
            correoT: false,
            celular: '',
            celularT: false,
            url: API_URL + '/estudiante',
            minFechaNacimiento: '2010-01-01',
            maxFechaNacimiento: '2017-12-31',
            mensajesError: {
                nombre: 'Por favor, ingresa un nombre.',
                apellido: 'Por favor, ingresa un apellido.',
                cedula: 'Por favor, ingresa una cedula.',
                fechaNacimiento: 'Por favor, ingresa la fecha de nacimiento.',
                direccion: 'Por favor, ingresa una dirección.',
                correo: 'Por favor, ingresa un correo.',
                celular: 'Por favor, ingresa un celular.',
            },

        }
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        validarNumeroCelular(celular) {
            return validarNumeroCelular(celular);
        },
        validarCorreoElectronico(correoElectronico) {
            return validarCorreoElectronico(correoElectronico);
        },
        validarFechaNacimiento(fechaNacimiento) {
            this.fechaTocada = true;
            return validarFechaNacimiento(fechaNacimiento);
        },
        validarCedulaEcuatoriana(cedula) {
            return validarCedulaEcuatoriana(cedula);
        },
        validarCaracteresEspeciales(texto) {
            return validarCaracteresEspeciales(texto);
        },
        guardar() {
            axios.post(this.url, {
                nombre: this.nombre,
                apellido: this.apellido,
                cedula: this.cedula,
                fechaNacimiento: this.fechaNacimiento,
                direccion: this.direccion,
                correo: this.correo,
                celular: this.celular
            }).then(res => {
                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/admin/estudiante');

            }).catch(error => {
                if (error.response && error.response.status === 500 && error.response.data.error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'La cédula ingresada ya existe en el sistema',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    console.error('Error en la petición:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al procesar la solicitud.',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });

        }
    },
    components: {
        Navbar
    }
}
</script>
<style scoped>
.flecha-regresar {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: 'Prompt';
    font-size: 15px;
    padding-left: 3%;
    padding-top: 1%;
}

.texto-flecha {
    color: #007bff;
}
</style>

