<template>
  <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
  <div class="flecha-regresar" @click="regresarPagina">
        <span class="texto-flecha"><i class="fa-solid fa-arrow-left"></i> Regresar</span>
    </div>
  <div class="ps-4 pe-4">
    
    <div class="container-fluid d-flex flex-row justify-content-between pt-3">
      <span style="font-family: 'Montserrat'; font-size: 1.5rem;"><b>Actividades de {{ detalleAsignaturas.nombreMateria }}</b></span>
      <div class="d-flex justify-content-end " style="font-family: 'Montserrat';">
        <router-link :to="{ name: 'notaDoc', params: { idAsignatura: idAsignatura } }" class="pe-3">
          <button class="btn btn-success"><b>Asignar notas</b></button>
        </router-link>

        <router-link :to="{ name: 'crearDoc', params: { idAsignatura: idAsignatura } }">
          <button class="btn btn-primary"><b>Crear Actividad</b></button>
        </router-link>
      </div>


    </div>
    <div class="container-fluid">
      <ActivitiesTable :actividades="datos" />
    </div>
  </div>
</template>
    
<script>
import ActivitiesTable from '@/components/ActivitiesTable.vue';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import { API_URL } from '../../api/config';

export default {
  created() {
    // Acceder al ID de la asignatura desde la ruta
    this.idAsignatura = this.$route.params.idAsignatura;
    console.log('ID de la asignatura:', this.idAsignatura);
  },
  data() {
    return {
      asignaturas: [],
      datos: [],
      idAsignatura: null,
      detalleAsignaturas: {}
    };
  },
  mounted() {
    this.getActividades();
    this.getDetallesAsignatura();
  },
  methods: {
    async getActividades() {
      try {
        await axios.get(API_URL + `/actividades/asignatura/${this.idAsignatura}`).then(res => {
          this.datos = res.data.map(actividades => {
            return {
              id: actividades.id,
              titulo: actividades.titulo,
              detalleActividad: actividades.detalleActividad,
              fechaInicio: actividades.fechaInicio,
              tipoActId: `${actividades.tipoActividad.nombreActividad}`,
              perCalId: this.nombrePeriodo(`${actividades.periodoCalificaciones.nombrePeriodo}`),
              estado: actividades.estado,
            };
          });
        });

      } catch (error) {
        console.log(error);
      }
    },
    async getDetallesAsignatura() {
      try {
        const response = await axios.get(API_URL + `/asignatura/${this.idAsignatura}`);
        this.detalleAsignaturas = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    regresarPagina() {
      this.$router.go(-1);
    },
    nombrePeriodo(nombre){
      switch (nombre) {
        case 'P':
          return 'Primer Trimestre';
        case 'S':
          return 'Segundo Trimestre';
        case 'T':
          return 'Tercer Trimestre';
      }
    }
  },
  components: {
    ActivitiesTable,
    Navbar,
  }

};
</script>
    