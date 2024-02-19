<template>
  <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
  <div class="flecha-regresar" @click="regresarPagina">
    <span class="texto-flecha"><i class="fa-solid fa-arrow-left"></i> Regresar</span>
  </div>


  <!-- Modal -->
  <div class="modal fade" id="crearTipoModal" tabindex="-1" aria-labelledby="crearTipoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="crearTipoModalLabel">Crear Tipo de Actividad</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Contenido del formulario -->
          <form @submit.prevent="guardar" class="row g-3 pb-4">
            <div class="col-md-12">
              <label class="form-label">Nombre Actividad</label>
              <input type="text" v-model="nombreActividad" class="form-control" placeholder="Nombre Actividad" required
                @blur="nombreActividadT = true">
              <span v-if="nombreActividadT && !nombreActividad" class="error text-danger small">{{
                mensajesError.nombreActividad }}</span>
              <span v-if="!validarCaracteresEspeciales(nombreActividad) && nombreActividad"
                class="error text-danger small">{{ mensajesError.cEsp }}</span>
            </div>
            <!-- Otros campos del formulario si es necesario -->
            <div class="col-6 d-flex justify-content-end">
              <button type="submit" :disabled="!validarCaracteresEspeciales(nombreActividad)"
                class="btn btn-success text-white w-75 rounded-5">Crear</button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-danger w-75 rounded-5" data-bs-dismiss="modal">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="ps-4 pe-4">

    <div class="container-fluid d-flex flex-row justify-content-between pt-3">
      <span style="font-family: 'Montserrat'; font-size: 1.5rem;"><b>Actividades de {{ detalleAsignaturas.nombreMateria
      }}</b></span>
      <div class="d-flex justify-content-end " style="font-family: 'Montserrat';">
        <!-- Botón para abrir el modal -->
        <div class="pe-3">
          <button type="button" class="btn btn-warning " data-bs-toggle="modal" data-bs-target="#crearTipoModal">
          <b>Crear Tipo Actividad</b>
        </button>
        </div>
        

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
import { validarCaracteresEspeciales } from '@/utilidades/validaciones.js';
import Swal from 'sweetalert2';
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
      detalleAsignaturas: {},
      nombreActividad: '',
      mensajesError: {
        nombreActividad: 'Ingrese un periodo de calificaciones',
        cEsp: 'No se permiten caracteres especiales ni números'
      },
      nombreActividadT: false,
    };
  },
  mounted() {
    this.getActividades();
    this.getDetallesAsignatura();
  },
  methods: {
    validarCaracteresEspeciales(cadena) {
      return validarCaracteresEspeciales(cadena);
    },
    async guardar() {
      await axios.post(API_URL + '/tipoActividad', {
        nombreActividad: this.nombreActividad,
      }).then(function (response) {

        console.log(new Date() + ": Guardado correctamente");

        Swal.fire({
          title: 'Exito!',
          text: 'Registro guardado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(error => {
        console.error('Error en la petición:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
          icon: 'error'
        });
      });
    },
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
    nombrePeriodo(nombre) {
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
    