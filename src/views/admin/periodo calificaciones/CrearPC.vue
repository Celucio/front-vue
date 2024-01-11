<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Crear
            periodo de calificaciones</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Periodo Lectivo</label>
                    <input type="text" v-model="nombrePeriodo" class="form-control" id="nombrePeriodo" placeholder="Ejemplo: Primer Trimestre"
                        required @blur="nombrePeriodoT = true">
                    <span v-if="nombrePeriodoT && !nombrePeriodo" class="error text-danger small">{{ mensajesError.nombrePeriodo
                    }}</span>
                    <span v-if="!validarCaracteresEspeciales(nombrePeriodo) && nombrePeriodo" class="error text-danger small">{{ mensajesError.cEs }}</span>
                    
                </div>
                <div class="col-md-6">
                    <label class="form-label">Estado</label>
                    <select class="form-select" v-model="estado" aria-label="Default select example">
                        <option value="A" selected>Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button :disabled="!validarCaracteresEspeciales(nombrePeriodo)" type="submit" class="btn btn-success text-white w-50 rounded-5 ">Crear</button>
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
import router from '@/router';
import { ref } from 'vue'
import { API_URL } from '../../../api/config.js';
import { validarCaracteresEspeciales} from '../../../utilidades/validaciones.js';
export default {
    data() {
        const estado = ref("")
        return {
            nombrePeriodo: '',
            estado: estado.value,
            mensajesError: {
                nombrePeriodo: 'Ingrese un periodo de calificaciones',
                estado: 'Ingrese un estado',
                cEs: 'No se permiten caracteres especiales',
            },
            nombrePeriodoT: false,
            estadoT: false,
            url: API_URL+'/periodoCalificaciones',
        }
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        campoVacio(campo) {
            if (campo === '') {
                return false;
            } else {
                return true;
            }
        },
        validarCaracteresEspeciales(cadena){
            return validarCaracteresEspeciales(cadena);
        },  
        guardar() {
            axios.post(this.url, {
                nombrePeriodo: this.nombrePeriodo,
                estado: this.estado,
            }).then(function (response) {
                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                router.push('/admin/periodoC');

            }).catch(error => {
                console.error('Error en la petición:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al procesar la solicitud.',
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
}
</style>