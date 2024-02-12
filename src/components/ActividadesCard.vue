<template>
  <div>
    <div v-for="actividad in actividades" :key="actividad.id" class="card">
      <div class="row">
        <div class="col-md-12">
          <h3>{{ actividad.titulo }}</h3>
        </div>
        <div class="col-md-6">
          <p>{{ actividad.detalleActividad }}</p>
        </div>
        <div class="col-md-6">
          <p>Nota: {{ actividad.valor_nota }}</p>
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
};
</script>
  
<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;

}
</style>
  