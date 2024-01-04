<template>
    <div>
        <Banner nombre="Carlos" />
    </div>
    <div class="flecha-regresar" @click="regresarPagina">
        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;">
        <b>Editar asignatura</b>
    </div>
    <div class="mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Nombre de la Materia</label>
                    <input type="text" v-model="nombreMateria" class="form-control" id="nombreMateria"
                        placeholder="Nombre Materia" required @blur="nombreMateriaT = true">
                    <span v-if="nombreMateriaT && !nombreMateria" class="error text-danger small">{{
                        mensajesError.nombreMateria }}</span>
                </div>
                <div class="col-md-6">
                    <label for="docente" class="form-label">Grado</label>
                    <select class="form-select" v-model="selectedGrado" aria-label="Default select example">
                        <option disabled>Seleccione un grado</option>
                        <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{ grado.nombreGrado }}</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label class="form-label">Estado</label>
                    <select class="form-select" v-model="estado" aria-label="Default select example">
                        <option disabled>Seleccione un estado</option>
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5">Actualizar</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/asignatura' }" class="btn btn-danger w-50 rounded-5">
                        Cancelar
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';
import { API_URL } from '../../../api/config.js';

export default {
    data() {
        return {
            grados: [],
            selectedGrado: null,
            nombreMateria: '',
            estado: '',
            idGrado: '',
            mensajesError: {
                nombreMateria: 'Ingrese una materia',
            },
            nombreMateriaT: false,
            url: API_URL + '/asignatura/',
        };
    },
    mounted() {
        this.getIdFromRoute();
        this.getGrado();
        this.get();
    },
    methods: {
        getGrado() {
            axios.get(API_URL + '/grado').then(
                res => {
                    this.grados = res.data;
                }
            )
        },

        getIdFromRoute() {
            const route = this.$route;
            this.id = route.params.id;
            this.url += this.id;
        },
        get() {
            axios.get(this.url).then(res => {
                this.nombreMateria = res.data.nombreMateria;
                this.selectedGrado = res.data.idGrado;
                this.estado = res.data.estado;
            });
        },
        guardar() {
            axios.put(this.url, {
                nombreMateria: this.nombreMateria,
                estado: this.estado,
                idGrado: this.selectedGrado
            }).then(res => {

                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro actualizado',
                    icon: 'success'
                })
                router.push('/admin/asignatura')


            }).catch(error => {
                console.error('Error en la petición:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al procesar la solicitud.',
                    icon: 'error'
                });
            });

        }
    },
    components: {
        Banner
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
