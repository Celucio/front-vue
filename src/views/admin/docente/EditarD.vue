<template>
    <div>
        <Navbar></Navbar>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">

        <span class="texto-flecha"><span class="fa-solid fa-chevron-left"></span>Regresar</span>
    </div>
    <div class="text-center pb-3 pt-2" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;"><b>Editar
            Docente</b>
    </div>
    <div class=" mt-3">
        <div class="col-md-6 offset-md-3">
            <form @submit.prevent="guardar" class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Nombre</label>
                    <input type="text" v-model="data.nombre" class="form-control" id="nombre" name="nombre"  @blur="data.nombreT = true">
                    <span v-if="data.nombreT && !data.nombre" class="error text-danger small">{{ mensajesError.nombre }}</span>
                    <span v-if="!validarNombre(data.nombre) && data.nombre" class="text-danger small">No se permite el ingreso de
                        números.</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Apellido</label>
                    <input type="text" v-model="data.apellido" class="form-control" id="apellido" name="apellido" @blur="data.apellidoT = true">
                    <span v-if="data.apellidoT && !data.apellido" class="text-danger small">{{ mensajesError.apellido }}</span>
                    <span v-if="!validarNombre(data.apellido) && data.apellido" class="text-danger small">No se permite el ingreso de
                        números.</span>
                </div>
                <div class="col-12">
                    <label class="form-label">Dirección</label>
                    <textarea class="form-control" v-model="data.direccion" id="direccion" rows="3"
                        name="direccion" @blur="data.direccionT = true"></textarea>
                    <span v-if="data.direccionT && !data.direccion" class="text-danger small">{{ mensajesError.direccion }}</span>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Correo</label>
                    <input type="text" v-model="data.correo" class="form-control" id="correo" name="correo" @blur="data.correoT = true">
                    <span v-if="data.correoT && !data.correo" class="text-danger small">{{ mensajesError.correo }}</span>
                    <span v-if="!validarCorreoElectronico(data.correo) && data.correo" class="text-danger small">El correo ingresado
                        no es
                        valido.</span>
                </div>
                <div class="col-md-6 pb-3">
                    <label class="form-label">Celular</label>
                    <input type="text" v-model="data.celular" class="form-control" id="celular" name="celular" @blur="data.celularT=true">
                    <span v-if="data.celularT && !data.celular" class="text-danger small">{{ mensajesError.celular }}</span>
                    <span v-if="!validarNumeroCelular(data.celular) && data.celular" class="text-danger small">El celular ingresado
                        no es
                        valido.</span>
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <button type="submit" class="btn btn-success text-white w-50 rounded-5">Actualizar</button>
                </div>
                <div class="col-6">
                    <router-link :to="{ path: '/admin/docente' }" class="btn btn-danger w-50 rounded-5">
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
import Swal from 'sweetalert2'
import { validarCorreoElectronico, validarNumeroCelular, validarNombre } from '../../../utilidades/validaciones.js'
import { useRoute } from 'vue-router';
import { API_URL } from '../../../api/config.js';
export default {
    data() {
        return {
            id: null,
            data: {
                nombre: '',
                nombreT: false,
                apellido: '',
                apellidoT: false,
                direccion: '',
                direccionT: false,
                correo: '',
                correoT: false,
                celular: '',
                celularT: false,
            },
            url: API_URL+'/docente/',
            mensajesError: {
                nombre: 'Por favor, ingresa un nombre.',
                apellido: 'Por favor, ingresa un apellido.',
                cedula: 'Por favor, ingresa una cedula.',
                fechaNacimiento: 'Por favor, ingresa la fecha de nacimiento.',
                direccion: 'Por favor, ingresa una dirección.',
                correo: 'Por favor, ingresa un correo.',
                celular: 'Por favor, ingresa un celular.',
            }
        };
    },
    mounted() {
        this.getIdFromRoute();
        this.get();
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1); 
        },
        validarNombre(nombre) {
            return validarNombre(nombre);
        },
        validarNumeroCelular(celular) {
            return validarNumeroCelular(celular);
        },
        validarCorreoElectronico(correoElectronico) {
            return validarCorreoElectronico(correoElectronico);
        },
        getIdFromRoute() {
            const route = useRoute();
            this.id = route.params.id;
            this.url += this.id;
        },
        get() {
            axios.get(this.url).then(res => {
                console.log(res.data[0]);
                this.data.nombre = res.data[0].nombre;
                this.data.apellido = res.data[0].apellido;
                this.data.direccion = res.data[0].direccion
                this.data.correo = res.data[0].correo;
                this.data.celular = res.data[0].celular;
            })
        },
        guardar() {
            axios.put(this.url, {
                nombre: this.data.nombre,
                apellido: this.data.apellido,
                direccion: this.data.direccion,
                correo: this.data.correo,
                celular: this.data.celular
            }).then(function (response) {

                console.log(new Date() + ": Guardado correctamente");

                Swal.fire({
                    title: 'Exito!',
                    text: 'Registro Actualizado',
                    icon: 'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/admin/docente";
                    }
                });

            }).catch(function (error) {

                console.log(new Date() + ": Error en la petición");
                console.error(error);

            });
        }
    },
    components: {
        Navbar
    }
}
</script>
<style scoped>
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
