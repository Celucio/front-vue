<template>
    <div>
        <Banner nombre="Carlos" />
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Actualizar grado</b>
    </div>
    <div class="mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Nombre del grado</label>
                    <input type="text" v-model="data.nombreGrado" class="form-control" id="nombreGrado"
                        placeholder="Nombre del Grado" required @blur="data.nombreGradoT = true">
                    <span v-if="data.nombreGradoT && !data.nombreGrado" class="error text-danger small">{{
                        mensajesError.nombreGrado }}</span>
                </div>
                <div class="col-md-6">
                    <label for="docente" class="form-label">Docente</label>
                    <select class="form-select" v-model="data.selectedDocente" aria-label="Default select example" disabled >
                        <option :value="null" disabled>Seleccione un docente</option>
                        <option v-for="docente in docentes" :key="docente.id" :value="docente.id">{{ docente.nombre }}
                            {{ docente.apellido }}</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5">Actualizar</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/grado' }" class="btn btn-danger w-50 rounded-5">Cancelar</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import Banner from '@/components/Banner.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '../../../api/config.js';

export default {
    data() {
        const selectedDocente = ref('');
        return {
            id: null,
            data: {
                nombreGrado: '',
                selectedDocente,
                nombreGradoT: false,
            },
            mensajesError: {
                nombreGrado: 'Ingrese un grado',
            },
            docentes: [],
            url: API_URL + '/grado/',
        };
    },
    mounted() {
        this.getIdFromRoute();
        this.getDocentes();
        this.get();
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        getIdFromRoute() {
            const route = useRoute();
            this.id = route.params.id;
            this.url += this.id;
        },
        getDocentes() {
            axios.get(API_URL + '/docente').then((res) => {
                this.docentes = res.data;
            });
        },
        get() {
            axios.get(this.url).then((res) => {
                this.data.nombreGrado = res.data.nombreGrado;
                this.data.selectedDocente = res.data.persId;
                console.log(this.data);
            });
        },
        guardar() {
            axios
                .put(this.url, {
                    nombreGrado: this.data.nombreGrado,
                    persId: this.data.selectedDocente,
                })
                .then((response) => {
                    console.log(new Date() + ': Guardado correctamente');

                    Swal.fire({
                        title: 'Exito!',
                        text: 'Registro actualizado',
                        icon: 'success',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = '/admin/grado';
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error en la petición:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al procesar la solicitud.',
                        icon: 'error',
                    });
                });
        },
    },
    components: {
        Banner,
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
  