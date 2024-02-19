<template>
  <div class="card-container">
    <div v-for="actividad in actividades" :key="actividad.id" class="card">
      <div class="row">
        <div class="col-md-6">
          <h3>{{ actividad.titulo }}</h3>
        </div>
        <div class="col-md-6 d-flex justify-content-end ps-2 pt-2">
          <p><b>Nota:</b> <b style="color: rgb(36, 80, 211);">{{ actividad.valor_nota }}</b></p>
        </div>
        <div class="col-md-8">
          <p style="font-size: 11px;">{{ actividad.detalleActividad }}</p>
        </div>
        
        <div class="col-md-4 d-flex justify-content-end ps-2">
          <p style="font-size: 11px;"><b>Periodo: {{ nombrePeriodo(actividad.nombrePeriodo) }}</b></p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    actividades: {
      type: Object,
      default: () => [],
    },
  },
  methods:{
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
  }
};
</script>
  
<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* o space-between */
}

.card {
  flex: 0 0 calc(48% - 20px); /* Ajusta el 20px según tus necesidades de margen */
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>
  