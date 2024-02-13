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
                                <div class="form-outline mb-2">
                                    <input type="password" v-model="user.contrasena" class="form-control" />
                                    <label class="form-label" for="form3Example4">Contraseña</label>
                                </div>

                                <!-- Checkbox -->
                                <div class=" pb-3">
                                    <router-link :to="{ name: 'olvidoContrasena' }">
                                        <span class="nav-link">¿Olvido su contraseña?</span>
                                    </router-link>
                                </div>
                                <div class="d-flex justify-content-start  align-items-center mb-4">
                                    <!-- Submit button -->
                                    <button type="submit" class="btn btn-success btn-block ">
                                        Iniciar Sesión
                                    </button>
                                </div>
                                <div class="divider d-flex align-items-center my-4">
                                    <p class="text-center fw-bold mx-3 mb-0 text-muted">O</p>
                                </div>
                                <!-- Register buttons -->
                                <div class="container-fluid ">
                                    <div class="row">
                                        <div class="col-12">
                                            <h5>Registrarse</h5>
                                            <span style="font-size: 12px">
                                                Para acceder a esta página debe tener una cuenta primero. Contáctese con
                                                secretaria para su matrícula
                                            </span>
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
import { API_URL } from '../api/config'
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            user: {
                cedula: '',
                contrasena: '',
                nuevaContrasena: ''
            },
            nuevaContrasena: '',
            confirmarContrasena: '',
        }
    },
    methods: {
        showSuccessMessage(message) {
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500
            });
        },
        showErrorMessage(message) {
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                text: message,
                confirmButtonColor: '#dc3545'
            });
        },
        async login() {
            try {
                const res = await axios.post(API_URL + '/login', this.user);
                const { token, usuario } = res.data;
                // Almacena el token en las cookies con un tiempo de expiración de 1 hora (en segundos)
                const primerInicioSesion = res.data.primerInicioSesion;

                Cookies.set('token', token, { expires: 3600 });

                // Almacena el token en localStorage o en una cookie (según tus necesidades)
                localStorage.setItem('token', token);

                // Almacena otros datos del usuario si es necesario
                this.$store.commit('setUsuario', usuario);

                // Realiza el redireccionamiento basado en el tipo de persona
                if (usuario && usuario.tipoPersona === 'D') {
                    this.showSuccessMessage('Inicio de sesión exitoso');
                    this.$router.push('/docente');
                } else if (usuario && usuario.tipoPersona === 'E') {
                    this.showSuccessMessage('Inicio de sesión exitoso');
                    this.$router.push('/estudiante');
                } else if (usuario && usuario.tipoPersona === 'A') {
                    this.showSuccessMessage('Inicio de sesión exitoso');
                    this.$router.push('/administrador');
                } else {
                    if (primerInicioSesion) {
                        // Si es el primer inicio de sesión, realiza el redireccionamiento a la vista de cambio de contraseña
                        this.$router.push({ name: 'cambioContrasena', params: { cedula: this.user.cedula } });
                    } else {
                        // Si no es el primer inicio de sesión, realiza el redireccionamiento
                        this.redirectUser(usuario);
                    }
                }


            } catch (error) {
                // Si hay un error en la petición, puedes mostrar un mensaje de error al usuario
                console.error('Error al iniciar sesión:', error);
                this.showErrorMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            }
        }
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

