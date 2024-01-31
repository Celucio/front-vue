<template>
    <div>
        <Navbar></Navbar>
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
                    <select class="form-select" v-model="data.selectedNombreGrado" aria-label="Default select example" disabled >
                        <option :value="null" disabled>Seleccione un grado</option>
                        <option v-for="grado in grados" :key="grado.id" :value="grado.nombreGrado">{{ obtenerNombreGrado(grado.nombreGrado) }}</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="docente" class="form-label">Docente</label>
                    <select class="form-select" v-model="data.selectedDocente" aria-label="Default select example"  >
                        <option :value="null" disabled>Seleccione un docente</option>
                        <option v-for="docente in docentes" :key="docente.id" :value="docente.id">{{ docente.nombre }}
                            {{ docente.apellido }}</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button :disabled="!validarCaracteresEspeciales(data.selectedNombreGrado)" type="submit" class="btn btn-success text-white w-50 rounded-5">Actualizar</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/grado' }" class="btn btn-danger w-50 rounded-5">Cancelar</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '../../../api/config.js';
import { validarCaracteresEspeciales } from '@/utilidades/validaciones.js';

export default {
    data() {
        const selectedDocente = ref('');
        const selectedNombreGrado = ref('');
        return {
            id: null,
            data: {
                selectedNombreGrado,
                selectedDocente,
                nombreGradoT: false,
            },
            mensajesError: {
                nombreGrado: 'Ingrese un grado',
                cEsp: 'No se permiten caracteres especiales',
            },
            docentes: [],
            grados: [],
            url: API_URL + '/grado/',
        };
    },
    mounted() {
        this.getIdFromRoute();
        this.getDocentes();
        this.getGrados();
        this.get();
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
        getGrados(){
            axios.get(API_URL + '/grado').then((res) => {
                this.grados = res.data;
            });
        },
        get() {
            axios.get(this.url).then((res) => {
                this.data.selectedNombreGrado =res.data.nombreGrado;
                this.data.selectedDocente = res.data.persId;
            });
        },
        guardar() {
            axios
                .put(this.url, {
                    nombreGrado: this.data.selectedNombreGrado,
                    persId: this.data.selectedDocente,
                })
                .then((response) => {
                    console.log(new Date() + ': Guardado correctamente');

                    Swal.fire({
                        title: 'Exito!',
                        text: 'Registro actualizado',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        this.$router.push('/admin/grado');
                    });
                })
                .catch((error) => {
                    console.error('Error en la petición:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al procesar la solicitud.',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
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
  