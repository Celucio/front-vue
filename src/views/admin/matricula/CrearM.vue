<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Generar Matricula</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Nombre del estudiante</label>
                    <select class="form-select" v-model="selectedEstudiante" aria-label="Default select example">
                        <option selected disabled>Seleccione un estudiante</option>
                        <option v-for="estudiante in estudiantes" :key="estudiante.id" :value="estudiante.id">
                            {{ estudiante.nombre }} {{ estudiante.apellido }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Periodo lectivo</label>
                    <select class="form-select" v-model="selectedPeriodo" aria-label="Default select example">
                        <option selected disabled>Seleccione un periodo</option>
                        <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">
                            {{ periodo.anioLectivo }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Grado</label>
                    <select class="form-select" v-model="selectedGrado" aria-label="Default select example">
                        <option selected disabled>Seleccione un grado</option>
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
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5 ">Crear</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/matricula' }" class="btn btn-danger w-50 rounded-5 ">
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
export default {
    data() {
        const estado = ref("")
        return {
            estudiantes: [],
            periodos: [],
            grados: [],
            selectedEstudiante: null,
            selectedPeriodo: null,
            selectedGrado: null,
            idPersona: '',
            idPeriodo: '',
            idGrado: '',
            estado: estado.value,
            mensajesError: {
                nombreGrado: 'Ingrese un grado',
                persId: 'Ingrese un docente',
            },
            nombreGradoT: false,
            persIdT: false,
            url: API_URL + '/matricula',
        }
    },
    mounted() {
        this.getEstudiantes();
        this.getPeriodos();
        this.getGrados();
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
        getEstudiantes() {
            axios.get(API_URL + '/estudiantes/disponibles').then(
                res => {
                    this.estudiantes = res.data;
                }
            )
        },
        getPeriodos() {
            axios.get(API_URL + '/periodo').then(
                res => {
                    this.periodos = res.data;
                }
            )
        },
        getGrados() {
            axios.get(API_URL + '/grado').then(
                res => {
                    this.grados = res.data;
                }
            )
        },
        guardar() {
            axios.post(this.url, {
                idPersona: this.selectedEstudiante,
                idPeriodo: this.selectedPeriodo,
                idGrado: this.selectedGrado,
                estado: this.estado,
            }).then(res => {
                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                router.push('/admin/matricula')

            }).catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Complete todos los campos',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log('Existe un error ' + error);
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
}
</style>