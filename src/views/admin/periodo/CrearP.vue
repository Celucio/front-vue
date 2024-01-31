<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Crear
            periodo lectivo</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Año Lectivo</label>
                    <input type="text" v-model="anioLectivo" class="form-control" id="anioLectivo" placeholder="Año Lectivo"
                        required @blur="anioLectivoT = true">
                    <span v-if="anioLectivoT && !anioLectivo" class="error text-danger small">{{ mensajesError.anioLectivo}}</span>
                    <span v-if="!validarFormatoPeriodoLectivo(anioLectivo) && anioLectivo" class="text-danger small">Escriba correctamente el formato.</span>
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
                    <button :disabled="!validarFormatoPeriodoLectivo(anioLectivo) || !campoVacio(anioLectivo)" type="submit" class="btn btn-success text-white w-50 rounded-5 ">Crear</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/periodo' }" class="btn btn-danger w-50 rounded-5 ">
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
import { ref } from 'vue';
import router from '@/router';
import { API_URL } from '../../../api/config.js';
import { validarFormatoPeriodoLectivo } from '../../../utilidades/validaciones.js';
export default {
    data() {
        const estado = ref("")
        return {
            anioLectivo: '',
            estado: estado.value,
            mensajesError: {
                anioLectivo: 'Ingrese un periodo lectivo',
                estado: 'Ingrese un estado',
            },
            anioLectivoT: false,
            estadoT: false,
            url: API_URL+'/periodo',
        }
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        campoVacio(campo) {
            return !this[campo];
        },
        validarFormatoPeriodoLectivo(anioLectivo) {
            return validarFormatoPeriodoLectivo(anioLectivo);
        },
        guardar() {
            axios.post(this.url, {
                anioLectivo: this.anioLectivo,
                estado: this.estado,
            }).then(res =>{
                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro guardado',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                router.push('/admin/periodo');
        

            }).catch(error => {
                console.error('Error en la petición:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No pueden existir 2 periodos iguales',
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