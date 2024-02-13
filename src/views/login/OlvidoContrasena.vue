<template>
    <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div class="row gx-lg-5 align-items-center">
                <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
                    <div class=" justify-content-center align-content-center " style="padding-left: 10%;">
                        <img src="../../assets/logo E blanco.png" class="img-fluid w-50">
                    </div>
                    <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
                        EduTechFusion <br />
                        <span style="color: #277ad3">Sistema Escolar</span>
                    </h1>

                </div>

                <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                    <div class="card bg-glass">

                        <div class="card-body px-4 py-5 px-md-5">
                            <div class="d-flex justify-content-start">
                                <h2 style="font-family: 'Montserrat';"><b>Cambio de Contraseña</b></h2>
                            </div>
                            <form style="font-family: 'Prompt'; font-size: 15px;" @submit.prevent="cambiarContrasena">
                                <div class="form-outline mb-4">
                                    <input class="form-control" type="text" v-model="cedula" required>
                                    <label class="form-label pt-1" for="nuevaContrasena">Cedula</label>

                                    <input class="form-control" type="password" id="nuevaContrasena"
                                        v-model="nuevaContrasena" required />
                                        <label class="form-label pt-1" for="nuevaContrasena">Nueva Contraseña</label>
                                </div>
                                <button class="btn btn-success" type="submit">Actualizar</button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import { API_URL } from '../../api/config';
import Swal from 'sweetalert2';
export default {
    //Obtener la cedula del usuario logueado
    data() {
        return {
            nuevaContrasena: '',
            cedula: ''
        }
    },
    methods: {
        async cambiarContrasena() {
            try {
                await axios.put(API_URL + '/cambiarcontrasenaolvido', {
                    cedula: this.cedula,
                    nuevaContrasena: this.nuevaContrasena,
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Contraseña cambiada con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.$router.push(
                    '/');
            } catch (error) {
                console.error('Error al cambiar la contraseña:', error);
                // Maneja el error según tus necesidades
            }
        },
    }

}
</script>
<style scoped>
.background-radial-gradient {
    background-color: hsl(218, 41%, 15%);
    background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);
    height: 100vh;
    /* Ajusta al 100% de la altura de la ventana gráfica */
    min-height: 600px;
    /* Altura mínima para asegurar que se vea bien en pantallas pequeñas */
}


#radius-shape-1 {
    height: 220px;
    width: 220px;
    top: -60px;
    left: -130px;
    background: radial-gradient(#001f6f, #277ad3);
    overflow: hidden;
}

#radius-shape-2 {
    border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
    bottom: -60px;
    right: -110px;
    width: 300px;
    height: 300px;
    background: radial-gradient(#09006b, #1c8cfd);
    overflow: hidden;
}

.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #277ad3;
}

.divider p {
    color: #277ad3 !important;
}

.bg-glass {
    background-color: hsla(0, 0%, 100%, 0.9) !important;
    backdrop-filter: saturate(200%) blur(25px);
}
</style>
