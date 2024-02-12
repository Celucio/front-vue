<template>
    <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
    <div class="wrapper">
        <div class="sidebar">
            <Side :asignaturas="$store.state.asignaturas" @asignaturaSeleccionada="cargarActividades"></Side>
        </div>
        <div class="main-content" id="content">
            <h2> Actividades</h2>
            <ActividadesCard :actividades="actividades"></ActividadesCard>

        </div>
        
    </div>
</template>
<script>

import Side from '@/components/Side.vue';
import Navbar from '@/components/Navbar.vue';
import ActividadesCard from '@/components/ActividadesCard.vue';
import axios from 'axios';
import { API_URL } from '../../api/config.js';
export default {
    data() {
        return {
            asignaturas: [],
            actividades: []
        }
    },
    created() {
        // Accede al estado de Vuex para obtener el id del usuario
        const userId = this.$store.state.usuario.id;

        // Utiliza el id del usuario para cargar las asignaturas
        this.$store.dispatch('cargarAsignaturas', userId);
    },
    methods: {
        async cargarActividades(idAsignatura) {
            // Setea la asignatura seleccionada en el store
            this.$store.dispatch('seleccionarAsignatura', idAsignatura);

            // Obtén la asignatura seleccionada desde el store
            console.log('ID de la asignatura seleccionada:', idAsignatura);
            const usId = this.$store.state.usuario.id;
            console.log('Estudiante ID ', usId);

            // Realiza una solicitud a la API para obtener las actividades
            try {
                const response = await axios.get(API_URL + `/traeractividades/asignatura/estudiante/?idEstudiante=${usId}&idAsignatura=${idAsignatura}`);
                this.actividades = response.data;
            } catch (error) {
                console.error('Error al cargar actividades:', error.message);
                // Maneja el error, por ejemplo, muestra un mensaje al usuario
            }
        }
    },
    components: {
        Side,
        Navbar,
        ActividadesCard
    }
}
</script>
<style></style>
