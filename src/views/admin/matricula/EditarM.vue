<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">
        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;">
        <b>Editar Matrícula</b>
    </div>
    <div class="mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Nombre del estudiante</label>
                    <select class="form-select" v-model="selectedEstudiante" aria-label="Default select example" disabled >
                        <option disabled>Seleccione un estudiante</option>
                        <option v-for="estudiante in estudiantes" :key="estudiante.id" :value="estudiante.id">
                            {{ estudiante.nombre }} {{ estudiante.apellido }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Periodo lectivo</label>
                    <select class="form-select" v-model="selectedPeriodo" aria-label="Default select example" disabled >
                        <option disabled>Seleccione un periodo</option>
                        <option v-for="periodo in periodos" :key="periodo.id" :value="periodo.id">
                            {{ periodo.anioLectivo }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Grado</label>
                    <select class="form-select" v-model="selectedGrado" aria-label="Default select example" disabled >
                        <option disabled>Seleccione un grado</option>
                        <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ grado.nombreGrado }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Estado</label>
                    <select class="form-select" v-model="estado" aria-label="Default select example">
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5">Actualizar</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/matricula' }" class="btn btn-danger w-50 rounded-5">
                        Cancelar
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';
import { ref } from 'vue';
import { API_URL } from '../../../api/config.js';

export default {
    data() {
        return {
            estudiantes: [],
            periodos: [],
            grados: [],
            selectedEstudiante: null,
            selectedPeriodo: null,
            selectedGrado: null,
            estado: '',
            url: API_URL + '/matricula/',
        };
    },
    mounted() {
        this.getIdFromRoute();
        this.getEstudiantes();
        this.getPeriodos();
        this.getGrados();
        this.getMatricula();
    },
    methods: {
        getIdFromRoute() {
            const route = this.$route;
            this.id = route.params.id;
            this.url += this.id;
        },
        getMatricula() {
            axios.get(this.url).then(res => {
                this.selectedEstudiante = res.data.idPersona;
                this.selectedPeriodo = res.data.idPeriodo;
                this.selectedGrado = res.data.idGrado;
                this.estado = res.data.estado;
            });
        },
        getEstudiantes() {
            axios.get(API_URL+'/estudiante').then(
                res => {
                    this.estudiantes = res.data;
                }
            )
        },
        getPeriodos() {
            axios.get(API_URL+'/periodo').then(
                res => {
                    this.periodos = res.data;
                }
            )
        },
        getGrados() {
            axios.get(API_URL+'/grado').then(
                res => {
                    this.grados = res.data;
                }
            )
        },
        guardar() {
            const matricula = {
                idPersona: this.selectedEstudiante,
                idPeriodo: this.selectedPeriodo,
                idGrado: this.selectedGrado,
                estado: this.estado,
            };
            axios.put(this.url, matricula).then(
                res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Matrícula actualizada',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    router.push({ path: '/admin/matricula' });
                }
            ).catch(
                err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar la matrícula',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            );
        },
    },
    components: {
        Navbar
    }
};
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
