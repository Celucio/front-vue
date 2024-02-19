<template>
    <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
    <div class="wrapper">
        <div class="sidebar">
            <SideDocente :asignaturas="$store.state.asignaturas"></SideDocente>
        </div>
        <div class="main-content" id="content">
            <div class="row">
                <h1>¡Hola, {{ $store.state.usuario.nombre }}<span style='font-size:40px;'>&#128075;</span>!</h1>
            </div>
            <div class="row">
                <div class="col-md-6 pt-2">
                    <div class="card text-bg-dark h-50 ">
                        <img src="../../assets/ninos-en-la-escuela.jpg" class="card-img" alt="..."
                            style="filter: brightness(40%);">
                        <div class="card-img-overlay">
                            <h5 class="card-title"><b>Actividades</b></h5>
                            <p class="card-text">En este apartado podra crear y gestionar las actividades de sus
                                asignaturas.
                                Para comenzar seleccione una asignatura.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 pt-2">
                    <div class="card text-bg-dark h-50">
                        <img src="../../assets/R.jpg" class="card-img" alt="..." style="filter: brightness(40%);">
                        <div class="card-img-overlay">
                            <h5 class="card-title"><b>Notas</b></h5>
                            <p class="card-text">En este apartado podra visualizar las actividades asignadas a cada uno de
                                los estudiantes
                                y colocar la nota respectiva.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <Calendar />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import SideDocente from '@/components/SideDocente.vue';
import Navbar from '@/components/Navbar.vue';
import ActivitiesTable from '@/components/ActivitiesTable.vue';
import Calendar from '@/components/Calendar.vue';
export default {
    data() {
        return {
            asignaturas: [],
            datos: [],
            asigId: null,
            

        }
    },
    created() {
        // Accede al estado de Vuex para obtener el id del usuario
        const userId = this.$store.state.usuario.id;

        // Utiliza el id del usuario para cargar las asignaturas
        this.$store.dispatch('cargarAsignaturas', userId);
    },
    methods: {
        async asignaturaSeleccionada(idAsignatura) {
            this.$store.dispatch('seleccionarAsignatura', idAsignatura);
        },


    },
    components: {
        SideDocente,
        Navbar,
        ActivitiesTable,
        Calendar
    }
}
</script>
<style>
.card-img {
    max-width: 100%;
    /* La imagen no será más ancha que el contenedor */
    height: 150%;
    /* La altura se ajustará automáticamente para mantener las proporciones */
}</style>
