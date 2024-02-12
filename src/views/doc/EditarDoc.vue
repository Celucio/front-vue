<template>
   <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
    <div>
        <h1>Editar Actividad para la asignatura con ID: {{ id }}</h1>
    </div>
    <div class="flecha-regresar" @click="regresarPagina">
        <span class="texto-flecha"><i class="fa-solid fa-arrow-left"></i> Regresar</span>
    </div>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  created() {
    // Acceder al ID de la asignatura desde la ruta
    this.id = this.$route.params.id;
  },
  methods: {
    regresarPagina() {
      this.$router.go(-1);
    }
  },
  components: {
    Navbar
  }
  // ... Otras configuraciones ...
};
</script>