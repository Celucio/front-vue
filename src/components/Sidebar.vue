<template>
  <div id="viewport">
    <!-- Sidebar  -->

    <div id="sidebar">
      <header>
        <router-link :to="{ path: '/admin' }"> <i class="fa-solid fa-home"></i> Inicio</router-link>
      </header>

      <ul class="nav" id="nav">
        <li @click="redirigir('/admin/estudiante')">
          <router-link :to="{ path: '/admin/estudiante' }">
            <i class="fa-solid fa-graduation-cap"></i> Estudiante
          </router-link>
        </li>
        <li @click="redirigir('/admin/docente')">
          <router-link :to="{ path: '/admin/docente' }">
            <i class="fa-solid fa-chalkboard-user"></i> Docente
          </router-link>
        </li>
        <li @click="redirigir('/admin/grado')">
          <router-link :to="{ path: '/admin/grado' }">
            <i class="fa-solid fa-cube"></i> Grado
          </router-link>
        </li>
        <li @click="redirigir('/admin/asignatura')">
          <router-link :to="{ path: '/admin/asignatura' }">
            <i class="fa-solid fa-book"></i> Asignaturas
          </router-link>
        </li>
        <li @click="redirigir('/admin/periodo')">
          <router-link :to="{ path: '/admin/periodo' }">
            <i class="fa-solid fa-check"></i> Periodo Lectivo
          </router-link>
        </li>
        <li @click="redirigir('/admin/periodoC')">
          <router-link :to="{ path: '/admin/periodoC' }">
            <i class="fa-solid fa-check"></i> Periodo de calificaciones
          </router-link>
        </li>
        <li @click="redirigir('/admin/tipo')">
          <router-link :to="{ path: '/admin/tipo' }">
            <i class="fa-solid fa-shapes"></i> Tipo Actividad
          </router-link>
        </li>
        <li @click="redirigir('/admin/matricula')">
          <router-link :to="{ path: '/admin/matricula' }">
            <i class="fa-solid fa-stamp"></i> Matricula
          </router-link>
        </li>
        <li @click="redirigir('/admin/actividades')">
          <router-link :to="{ path: '/admin/actividades' }">
            <i class="fa-solid fa-user-pen"></i> Actividades Educativas
          </router-link>
        </li>
        <li @click="redirigir('/admin/notas')">
          <router-link :to="{ path: '/admin/notas' }">
            <i class="fa-solid fa-marker"></i> Notas
          </router-link>
        </li>

      </ul>
      <footer>
        <router-link :to="{ path: '/admin/administradores' }">
            <i class="fa-solid fa-gear"></i> Administrador
          </router-link>
      </footer>
    </div>

  </div>
</template>
<script>

export default {
  methods:{
    redirigir(path){
      this.$router.push(path)
    } 
  },
  name: "Sidebar",

};
</script>
<style scoped>
body {
  overflow-x: hidden;
}

/* Toggle Styles */

#viewport {

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;

}

/* Sidebar Styles */

#sidebar {
  z-index: 1000;
  position: fixed;
  left: 250px;
  height: 100%;
  margin-left: -250px;
  overflow-y: auto;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  width: 22%;
  /* border-right: #b2b2b2cb 2px solid; */
}

#sidebar header {
  padding: 20px 0px 20px 35px;
  font-size: 20px;
  line-height: 52px;
  border-bottom: #b2b2b2cb 2px solid;
}



#sidebar header a {
  color: #000000;
  display: block;
  text-decoration: none;
  font-family: 'Prompt', sans-serif;
  transition: color 0.3s;
}

#sidebar header a:hover {
  color: #037aff;
}

/* #sidebar header a:hover {
  color: #1a243d;
  
} */

#sidebar .nav a {
  background: none;
  font-weight: bold;
  color: #2a2a2a;
  font-size: 14px;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

#sidebar .nav li:hover {
  max-width: 100%;
  color: #ffffff;
}

#sidebar .nav li {
  display: block;
  padding-top: 10px;
  padding-left: 30px;
  padding-bottom: 7px;
  transition: all 0.3s;
  cursor: pointer;
}

#sidebar .nav i {
  margin-right: 5px;
}

#sidebar .nav li:hover {
  background: rgb(187, 219, 255);
  border-radius: 80px;
  width: 16rem;
}


#nav {
  display: block;
}

#toggle-sidebar-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 24px;
  cursor: pointer;
}
footer{
  padding: 10px 0px 20px 35px;
  line-height: 52px;
  border-top: #b2b2b2cb 2px solid;
}

footer a{
  color: #000000;
  display: block;
  text-decoration: none;
  font-family: 'Prompt', sans-serif;
  transition: color 0.3s;
}

footer a:hover{
  color: #037aff;
}
.collapsed #sidebar {
  margin-left: -50px;
}

@media (max-width: 900px) {
  #sidebar .nav a {

    font-size: 15px;
    text-decoration: none;
    font-family: 'Prompt', sans-serif;
    ;
  }

  #sidebar .nav li[data-v-7d622f5c] {
    padding: 5px;

  }

  #sidebar .nav a {
    padding: 0px;
  }

  #sidebar header {
    padding: 10px 0px 10px 15px;
    font-size: 15px;

  }

  footer{
    padding: 10px 0px 10px 15px;
    font-size: 12px;
  }

}

@media (max-width: 860px) {
  #sidebar .nav a {

    font-size: 12px;
  }

  #sidebar .nav a {
    padding: 5px;
  }

  #sidebar header {
    padding: 5px 0px 5px 5px;
    font-size: 15px;

  }

  footer{
    padding: 5px 0px 5px 5px;
    font-size: 10px;
  }
}

@media (max-width: 566px) {
  #sidebar .nav a{
    font-size: 9px;
  }
}
</style>
