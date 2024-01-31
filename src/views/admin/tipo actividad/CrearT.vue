<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Crear
            tipo de actividad</b>
    </div>
    <div class="mt-3">
        <div class="col-md-4 offset-md-4">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-12">
                    <label class="form-label">Nombre Actividad</label>
                    <input type="text" v-model="nombreActividad" class="form-control" id="nombrePeriodo" placeholder="Nombre Actividad"
                        required @blur="nombreActividadT = true">
                    <span v-if="nombreActividadT && !nombreActividad" class="error text-danger small">{{ mensajesError.nombreActividad
                    }}</span>
                    <span v-if="!validarCaracteresEspeciales(nombreActividad) && nombreActividad" class="error text-danger small">{{ mensajesError.cEsp }}</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" :disabled="!validarCaracteresEspeciales(nombreActividad)" class="btn btn-success text-white w-75 rounded-5 ">Crear</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/tipo' }" class="btn btn-danger w-75 rounded-5 ">
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
import { validarCaracteresEspeciales} from '@/utilidades/validaciones.js';
export default{
    data(){
        return{
            nombreActividad: '',
            mensajesError: {
                nombreActividad: 'Ingrese un periodo de calificaciones', 
                cEsp: 'No se permiten caracteres especiales ni números'
            },
            nombreActividadT: false,
            url: API_URL+'/tipoActividad',
        }
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        validarCaracteresEspeciales(cadena){
            return validarCaracteresEspeciales(cadena);
        },
        guardar() {
            axios.post(this.url, {
                nombreActividad: this.nombreActividad,
            }).then(function (response) {

                console.log(new Date() + ": Guardado correctamente");

                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                    router.push('/admin/tipo');


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