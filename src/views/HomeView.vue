<template>
    <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div class="row gx-lg-5 align-items-center">
                <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
                    <div class=" justify-content-center align-content-center " style="padding-left: 10%;">
                        <img src="../assets/logo E blanco.png" class="img-fluid w-50">
                    </div>
                    <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
                        EduTechFusion <br />
                        <span style="color: #277ad3">Sistema Escolar</span>
                    </h1>

                </div>

                <div class="col-lg-6 mb-5 mb-lg-0 position-relative">

                    <div class="card bg-glass">
                        <div class="card-body px-4 py-5 px-md-5">
                            <form style="font-family: 'Prompt'; font-size: 15px;" @submit.prevent="login">
                                <!-- Email input -->
                                <div class="form-outline mb-4">
                                    <input type="text" v-model="user.cedula" class="form-control" />
                                    <label class="form-label">Usuario</label>
                                </div>

                                <!-- Password input -->
                                <div class="form-outline mb-4">
                                    <input type="password" v-model="user.contrasena" class="form-control" />
                                    <label class="form-label" for="form3Example4">Contraseña</label>
                                </div>

                                <!-- Checkbox -->
                                <div class="d-flex justify-content-around  align-items-center mb-4">
                                    <!-- Checkbox -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="form1Example3"
                                            checked />
                                        <label class="form-check-label" for="form1Example3"> Recordar Contraseña </label>
                                    </div>
                                    <!-- Submit button -->
                                    <button type="submit" class="btn btn-primary btn-block ">
                                        Iniciar Sesión
                                    </button>
                                </div>



                                <div class="divider d-flex align-items-center my-4">
                                    <p class="text-center fw-bold mx-3 mb-0 text-muted">O</p>
                                </div>

                                <!-- Register buttons -->
                                <div class="container-fluid ">
                                    <div class="row">
                                        <div class="col-6">
                                            <h5>Registrarse</h5>
                                            <span style="font-size: 12px">
                                                Para acceder a esta página debe tener una cuenta primero. Contáctese con
                                                secretaria para su matrícula
                                            </span>
                                        </div>
                                        <div class="col-6">
                                            <div class="d-flex justify-content-center pt-5 ps-5">
                                                <button type="submit"  class="btn btn-primary">
                                                    Contactarse
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Section: Design Block -->
</template>

<script>
import axios from 'axios'
import {API_URL} from '../api/config'
export default {
    data() {
        return {
            user: {
                cedula: '',
                contrasena: ''
            }
        }
    },
    methods: {
        async login() {
            try {
                const res = await axios.post(API_URL+'/login', this.user)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
<style>
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

