<template>
    <div>
        <Banner nombre="Carlos" />
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Actualizar
            periodo lectivo</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3 pb-4">
                <div class="col-md-6">
                    <label class="form-label">Año Lectivo</label>
                    <input type="text" v-model="data.anioLectivo" class="form-control" id="anioLectivo" placeholder="Año Lectivo"
                        required @blur="data.anioLectivoT = true">
                    <span v-if="data.anioLectivoT && !data.anioLectivo" class="error text-danger small">{{ mensajesError.anioLectivo
                    }}</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Estado</label>
                    <select class="form-select" v-model="data.estado" aria-label="Default select example">
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5 ">Actualizar</button>
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
import Banner from '@/components/Banner.vue';
import axios from 'axios'
import Swal from 'sweetalert2';
import { ref } from 'vue';
import router from '@/router';
import { API_URL } from '../../../api/config.js';
export default {
    data() {
        const estado = ref("")
        return {
            id: null,
            data:{
                anioLectivo: '',
                estado: estado.value,   
                anioLectivoT: false,
                estadoT: false,
            },
            mensajesError: {
                anioLectivo: 'Ingrese un periodo lectivo',
                estado: 'Ingrese un estado',
            },
            url: API_URL+'/periodo/',
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
            const route = this.$route;
            this.id = route.params.id;
            this.url += this.id;
        },
        get() {
            axios.get(this.url).then(res => {
               this.data.anioLectivo = res.data.anioLectivo;
               this.data.estado = res.data.estado;
            })
        },
        guardar() {
            const periodo ={
                anioLectivo: this.data.anioLectivo,
                estado: this.data.estado,
            }
            axios.put(this.url, periodo).then(
                res => {
                    Swal.fire({
                    title: 'Exito!',
                    text: 'Registro actualizado',
                    showConfirmButton: false,
                    timer: 1500,
                    icon: 'success'
                });
                router.push('/admin/periodo');
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