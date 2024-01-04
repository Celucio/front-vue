<template>
    <div>
        <Banner nombre="Carlos" />
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Crear
            grado</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Nombre grado</label>
                    <input type="text" v-model="nombreGrado" class="form-control" id="nombreGrado"
                        placeholder="Nombre Grado" required @blur="nombreGradoT = true">
                    <span v-if="nombreGradoT && !nombreGrado" class="error text-danger small">{{
                        mensajesError.nombreGrado }}</span>

                </div>
                <div class="col-md-6">
                    <label for="docente" class="form-label">Docente</label>
                    <select class="form-select" v-model="selectedDocente" aria-label="Default select example">
                        <option selected>Seleccione un docente</option>
                        <option v-for="docente in docentes" :key="docente.id" :value="docente.id">
                            {{ docente.nombre }} {{ docente.apellido }}</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5 ">Crear</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/grado' }" class="btn btn-danger w-50 rounded-5 ">
                        Cancelar
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Banner from '@/components/Banner.vue';
import axios from 'axios'
import Swal from 'sweetalert2';
import router from '@/router';
import { API_URL } from '../../../api/config.js';
export default {
    data() {
        return {
            docentes: [],
            selectedDocente: null,
            nombreGrado: '',
            persId: '',
            mensajesError: {
                nombreGrado: 'Ingrese un grado',
                persId: 'Ingrese un docente',
            },
            nombreGradoT: false,
            persIdT: false,
            url: API_URL + '/grado',
        }
    },
    mounted() {
        this.getDocentes();
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        getDocentes() {
            axios.get(API_URL + '/docente').then(
                res => {
                    this.docentes = res.data;
                    console.log(this.docentes);
                }
            )
        },
        campoVacio(campo) {
            return !this[campo];
        },
        guardar() {
            axios.post(this.url, {
                nombreGrado: this.nombreGrado,
                persId: this.selectedDocente,
            }).then(res => {
                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/admin/grado');
            }).catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'El docente ya pertenece a un grado.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
            });

        }
    },
    components: {
        Banner
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