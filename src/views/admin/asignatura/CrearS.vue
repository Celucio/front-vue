<template>
    <div>
        <Navbar ></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Crear
            asignatura</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label for="docente" class="form-label">Grado</label>
                    <select class="form-select" v-model="selectedGrado" aria-label="Default select example">
                        <option value="" selected disabled>Seleccione un grado</option>
                        <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ obtenerNombreGrado(grado.nombreGrado) }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Estado</label>
                    <select class="form-select" v-model="estado" aria-label="Default select example">
                        <option value="" selected disabled>Seleccione un estado</option>
                        <option value="A" selected>Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label">Nombre de la asignatura</label>
                    <input type="text" v-model="nombreMateria" class="form-control" id="nombreMateria"
                        placeholder="Nombre de la asignatura" required @blur="nombreMateriaT = true">
                    <span v-if="nombreMateriaT && !nombreMateria" class="error text-danger small">{{
                        mensajesError.nombreMateria }}</span>
                    <span v-if="!validarCaracteresEspeciales(nombreMateria) && nombreMateria"
                        class="error text-danger small">{{ mensajesError.cEs }}</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button :disabled="!validarCaracteresEspeciales(nombreMateria)" type="submit"
                        class="btn btn-success text-white w-50 rounded-5 ">Crear</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/asignatura' }" class="btn btn-danger w-50 rounded-5 ">
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
import { ref } from 'vue'
import { API_URL } from '../../../api/config.js';
import { validarCaracteresEspeciales } from '@/utilidades/validaciones.js';
export default {
    data() {
        const estado = ref("")
        return {
            grados: [],
            selectedGrado: null,
            nombreMateria: '',
            estado: estado.value,
            idGrado: '',
            mensajesError: {
                nombreMateria: 'Ingrese una materia',
                cEs: 'No se permiten números ni caracteres especiales'
            },
            nombreMateriaT: false,
            estadoT: false,
            url: API_URL + '/asignatura',
        }
    },
    mounted() {
        this.getGrado();
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        obtenerNombreGrado(abreviatura) {
            const nombreGrados = {
                P: 'Primer Grado',
                S: 'Segundo Grado',
                T: 'Tercer Grado',
                C: 'Cuarto Grado',
                Q: 'Quinto Grado',
                X: 'Sexto Grado',
                M: 'Séptimo Grado',
            };

            return nombreGrados[abreviatura] || 'Grado Desconocido';
        },
        validarCaracteresEspeciales(cadena) {
            return validarCaracteresEspeciales(cadena);
        },
        getGrado() {
            axios.get(API_URL + '/grado').then(
                res => {
                    this.grados = res.data;
                }
            )
        },
        campoVacio(campo) {
            return !this[campo];
        },
        guardar() {
            axios.post(this.url, {
                nombreMateria: this.nombreMateria,
                estado: this.estado,
                idGrado: this.selectedGrado
            }).then(function (response) {

                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                router.push('/admin/asignatura')
               


            }).catch(error => {
                console.error('Error en la petición:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No puede haber 2 grados iguales',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
            });

        }
    },
    components: {
        Navbar
    }
}
</script>
<style>
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
}</style>