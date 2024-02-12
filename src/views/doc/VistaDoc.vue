<template>
    <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
    <div class="wrapper">
        <div class="sidebar">
            <SideDocente :asignaturas="$store.state.asignaturas" ></SideDocente>
        </div>
        <div class="main-content" id="content">
        </div>
    </div>
</template>
<script>

import SideDocente from '@/components/SideDocente.vue';
import Navbar from '@/components/Navbar.vue';
import ActivitiesTable from '@/components/ActivitiesTable.vue';
export default {
    data() {
        return {
            asignaturas: [],
            datos: [],
            asigId : null,

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
        ActivitiesTable
    }
}
</script>
<style></style>
