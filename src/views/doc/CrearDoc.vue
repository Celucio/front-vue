<template>
  <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
  <div class="flecha-regresar" @click="regresarPagina">
    <span class="texto-flecha"><i class="fa-solid fa-arrow-left"></i> Regresar</span>
  </div>
  <div class="text-center" style="font-family:'Prompt'; color: #037aff; font-size: 1.5rem;">
        <b>Crear Actividad de {{ detalleAsignaturas.nombreMateria }}</b>
    </div>
  <div class="mt-3">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="guardar" class="row g-3 pb-4">
        <div class="col-md-12">
          <label class="form-label">Título de la Actividad</label>
          <input type="text" v-model="titulo" class="form-control" placeholder="Título de la Actividad" required
            @blur="tituloT = true">
          <span v-if="tituloT && !titulo" class="error text-danger small">{{ mensajesError.titulo }}</span>
        </div>
        <div class="col-md-12">
          <label class="form-label">Detalle de la Actividad</label>
          <textarea v-model="detalleActividad" class="form-control" rows="3" placeholder="Detalle de la Actividad"
            required @blur="detalleT = true"></textarea>
          <span v-if="detalleT && !detalleActividad" class="error text-danger small">{{
            mensajesError.detalleActividad }}</span>
        </div>
        <div class="col-md-6">
          <label class="form-label">Fecha de Inicio</label>
          <input type="date" v-model="fechaInicio" class="form-control" required>
          <span v-if="validarFechaIActividad(fechaInicio) && fechaInicio" class="error text-danger small">No se
            permite fecha menor a la actual</span>
        </div>
        <div class="col-md-6">
          <label class="form-label">Tipo de Actividad</label>
          <select class="form-select" v-model="selectedTipoActividad" aria-label="Default select example" required>
            <option disabled>Seleccione un tipo de actividad</option>
            <option v-for="tipoActividad in tiposActividad" :key="tipoActividad.id" :value="tipoActividad.id">
              {{ tipoActividad.nombreActividad }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Periodo de Calificaciones</label>
          <select class="form-select" v-model="selectedPeriodoCalificaciones" aria-label="Default select example"
            required>
            <option disabled>Seleccione un periodo de calificaciones</option>
            <option v-for="periodoCalificaciones in periodosCalificaciones" :key="periodoCalificaciones.id"
              :value="periodoCalificaciones.id">
              {{ obtenerNombrePeriodoCalificaciones(periodoCalificaciones.nombrePeriodo) }}
            </option>
          </select>
        </div>
        <div class="col-sm-6" style="display: none;">
          <label class="form-label" for="asignaturaSelect">Seleccionar Asignatura:</label>
          <select v-model="selectedAsignatura" class="form-select" id="asignaturaSelect">
          </select>
        </div>
        <div class="col-sm-6">
          <label class="form-label">Estado</label>
          <select class="form-select" v-model="estado" aria-label="Default select example">
            <option value="A" selected>Activo</option>
            <option value="I">Inactivo</option>
          </select>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button :disabled="validarFechaIActividad(fechaInicio)" type="submit"
            class="btn btn-success text-white w-50 rounded-5">Crear</button>
        </div>
        <div class="col-6">
          <div @click="regresarPagina" class="btn btn-danger w-50 rounded-5">
            Cancelar
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import { API_URL } from '../../api/config.js';
import { validarFechaIActividad } from '../../utilidades/validaciones.js';
import { ref } from 'vue';
import router from '@/router';
import Swal from 'sweetalert2';
export default {
  data() {
    const estado = ref("")
    return {
      titulo: '',
      tituloT: false,
      detalleActividad: '',
      detalleT: false,
      fechaInicio: '',
      selectedTipoActividad: null,
      selectedPeriodoCalificaciones: null,
      selectedAsignatura: null,
      estado: estado.value,
      grados: [],
      tiposActividad: [],
      periodosCalificaciones: [],
      asignaturas: [],
      mensajesError: {
        titulo: 'Ingrese un titulo',
        detalleActividad: 'Ingrese la descripción de la actividad',
      },
      idAsignatura: null,
      detalleAsignaturas: {}
    }
  },
  created() {
    // Acceder al ID de la asignatura desde la ruta
    this.idAsignatura = this.$route.params.idAsignatura;

  },
  mounted() {
    this.getTiposActividad();
    this.getPeriodosCalificaciones();
    this.getDetallesAsignatura();
  },
  
  methods: {
    async getDetallesAsignatura() {
      try {
        const response = await axios.get(API_URL + `/asignatura/${this.idAsignatura}`);
        this.detalleAsignaturas = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    validarFechaIActividad(fechaInicio) {
      return validarFechaIActividad(fechaInicio);
    },
    obtenerNombrePeriodoCalificaciones(abreviatura) {
      const nombrePeriodos = {
        P: 'Primer Trimestre',
        S: 'Segundo Trimestre',
        T: 'Tercer Trimestre',
      };

      return nombrePeriodos[abreviatura] || 'Periodo Desconocido';
    },
    regresarPagina() {
      this.$router.go(-1);
    },
    getPeriodosCalificaciones() {
      axios.get(API_URL + '/periodoCalificaciones').then(
        res => {
          this.periodosCalificaciones = res.data;
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
    },
    getTiposActividad() {
      axios.get(API_URL + '/tipoActividad').then(
        res => {
          this.tiposActividad = res.data;
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
    },
    async guardar() {
      try {
        await axios.post(API_URL+'/actividades', {
          titulo: this.titulo,
          detalleActividad: this.detalleActividad,
          fechaInicio: this.fechaInicio,
          tipoActId: this.selectedTipoActividad,
          perCalId: this.selectedPeriodoCalificaciones,
          asignaturaId: parseInt(this.idAsignatura),
          estado: this.estado,
        })
        const asignaturaId = this.idAsignatura;
        const notasResponse = await axios.post(`${API_URL}/notas/${asignaturaId}`);
        console.log('Notas cargadas:' + notasResponse.data);
        Swal.fire({
          title: 'Exito!',
          text: 'Registro guardado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        router.go(-1);
        console.log(new Date() + ": Guardado correctamente");
      } catch (error) {
        console.error('Existe un error', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
          icon: 'error',
        });
      }

    }
  },
  components: {
    Navbar
  }
  // ... Otras configuraciones ...
};
</script>