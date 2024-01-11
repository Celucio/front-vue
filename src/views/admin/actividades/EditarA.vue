<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">
        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;">
        <b>Crear Actividad Educativa</b>
    </div>
    <div class="mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-12">
                    <label class="form-label">Título de la Actividad</label>
                    <input type="text" v-model="titulo" class="form-control" placeholder="Título de la Actividad" required @blur="tituloT = true">
                    <span v-if="tituloT && !titulo" class="error text-danger small">{{mensajesError.titulo}}</span>
                </div>
                <div class="col-md-12">
                    <label class="form-label">Detalle de la Actividad</label>
                    <textarea v-model="detalleActividad" class="form-control" rows="3" placeholder="Detalle de la Actividad"
                        required @blur="detalleT = true"></textarea>
                    <span v-if="detalleT && !detalleActividad" class="error text-danger small">{{ mensajesError.detalleActividad }}</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Fecha de Inicio</label>
                    <input type="date" v-model="fechaInicio" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Fecha Fin</label>
                    <input type="date" v-model="fechaFin" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Tipo de Actividad</label>
                    <select class="form-select" v-model="selectedTipoActividad" aria-label="Default select example"
                        required>
                        <option disabled>Seleccione un tipo de actividad</option>
                        <option v-for="tipoActividad in tiposActividad" :key="tipoActividad.id" :value="tipoActividad.id">
                            {{ tipoActividad.nombreActividad }}
                        </option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Periodo de Calificaciones</label>
                    <select class="form-select" v-model="selectedPeriodoCalificaciones" aria-label="Default select example"
                        required>
                        <option disabled>Seleccione un periodo de calificaciones</option>
                        <option v-for="periodoCalificaciones in periodosCalificaciones" :key="periodoCalificaciones.id"
                            :value="periodoCalificaciones.id">
                            {{ periodoCalificaciones.nombrePeriodo }}
                        </option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Asignatura</label>
                    <select class="form-select" v-model="selectedAsignatura" aria-label="Default select example" required>
                        <option disabled>Seleccione una asignatura</option>
                        <option v-for="asignatura in asignaturas" :key="asignatura.id" :value="asignatura.id">
                            {{ asignatura.nombreMateria }} - ({{ asignatura.grado.nombreGrado }})
                        </option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Estado</label>
                    <select class="form-select" v-model="estado" aria-label="Default select example">
                        <option value="A" selected>Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>

                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5">Actualizar</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/actividades' }" class="btn btn-danger w-50 rounded-5">
                        Cancelar
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar.vue';
import Swal from 'sweetalert2';
import router from '@/router';
import { ref } from 'vue';
import { API_URL } from '../../../api/config.js';
import { validarFechaIActividad } from '../../../utilidades/validaciones.js';

export default {
    data() {
        const estado = ref("")
        return {
            titulo: '',
            tituloT: false,
            detalleActividad: '',
            detalleT: false,
            fechaInicio: '',
            fechaFin: '',
            selectedTipoActividad: null,
            selectedPeriodoCalificaciones: null,
            selectedAsignatura: null,
            estado: estado.value,
            tiposActividad: [],
            periodosCalificaciones: [],
            asignaturas: [],
            url: API_URL + '/actividades/',
            mensajesError:{
                titulo: 'Ingrese un titulo',
                detalleActividad: 'Ingrese la descripción de la actividad',
            }
        };
    },
    mounted() {
        this.getIdFromRoute();
        this.getTiposActividad();
        this.getPeriodosCalificaciones();
        this.getAsignaturas();
        this.getActividades();
        
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        validarFechaIActividad(fechaInicio) {
            return validarFechaIActividad(fechaInicio);
        },
        getTiposActividad() {
            axios.get(API_URL + '/tipoActividad').then(
                res => {
                    this.tiposActividad = res.data;
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        },
        getPeriodosCalificaciones() {
            axios.get(API_URL + '/periodoCalificaciones').then(
                res => {
                    this.periodosCalificaciones = res.data;
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        },
        getAsignaturas() {
            axios.get(API_URL + '/asignatura').then(
                res => {
                    this.asignaturas = res.data;
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        },
        getActividades() {
            axios.get(this.url).then(res => {
                this.titulo = res.data.titulo;
                this.detalleActividad = res.data.detalleActividad;
                this.fechaInicio = format(new Date(res.data.fechaInicio), 'yyyy-MM-dd');;
                this.fechaFin = format(new Date(res.data.fechaFin), 'yyyy-MM-dd');;
                this.selectedTipoActividad = res.data.tipoActId;
                this.selectedPeriodoCalificaciones = res.data.perCalId;
                this.selectedAsignatura = res.data.asignaturaId;
                this.estado = res.data.estado;
            });
        },
        getIdFromRoute() {
            const route = this.$route;
            this.id = route.params.id;
            this.url += this.id;
        },
        guardar() {
            const actividades = {
                titulo: this.titulo,
                detalleActividad: this.detalleActividad,
                fechaInicio: this.fechaInicio,
                fechaFin: this.fechaFin,
                tipoActId: this.selectedTipoActividad,
                perCalId: this.selectedPeriodoCalificaciones,
                asignaturaId: this.selectedAsignatura,
                estado: this.estado,
            };
            axios.put(this.url, actividades).then(
                res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Atividad actualizada',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    router.push({ path: '/admin/actividades' });
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
        Navbar,
    },
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
  