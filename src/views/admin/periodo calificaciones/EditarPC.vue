<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Actualizar
            periodo de calificaciones</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Año Lectivo</label>
                    <input type="text" v-model="data.nombrePeriodo" class="form-control" id="nombrePeriodo" placeholder="Nombre Periodo"
                        required @blur="data.nombrePeriodoT = true">
                    <span v-if="data.nombrePeriodoT && !data.nombrePeriodo" class="error text-danger small">{{ mensajesError.nombrePeriodo
                    }}</span>
                    <span v-if="!validarCaracteresEspeciales(data.nombrePeriodo) && nombrePeriodo" class="error text-danger small">{{ mensajesError.cEs }}</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Estado</label>
                    <select class="form-select" v-model="data.estado" aria-label="Default select example">
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button :disabled="!validarCaracteresEspeciales(data.nombrePeriodo)" type="submit" class="btn btn-success text-white w-50 rounded-5 ">Actualizar</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/periodoC' }" class="btn btn-danger w-50 rounded-5 ">
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
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { API_URL } from '../../../api/config.js';
import { validarCaracteresEspeciales} from '../../../utilidades/validaciones.js';
export default {
    data() {
        const estado = ref("")
        return {
            id: null,
            data:{
                nombrePeriodo: '',
                estado: estado.value,   
                nombrePeriodoT: false,
                estadoT: false,
            },
            mensajesError: {
                nombrePeriodo: 'Ingrese un periodo lectivo',
                estado: 'Ingrese un estado',
                cEs: 'No se permiten caracteres especiales',
            },
            url: API_URL+'/periodoCalificaciones/',
        }
    },
    mounted() {
        this.getIdFromRoute();
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
        get() {
            axios.get(this.url).then(res => {
               this.data.nombrePeriodo = res.data.nombrePeriodo;
               this.data.estado = res.data.estado;
            })
        },
        validarCaracteresEspeciales(cadena){
            return validarCaracteresEspeciales(cadena);
        },
        guardar() {
            axios.put(this.url, {
                nombrePeriodo: this.data.nombrePeriodo,
                estado: this.data.estado,
            }).then(function (response) {

                console.log(new Date() + ": Guardado correctamente");

                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro actualizado',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/admin/periodoC";
                    }
                });

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