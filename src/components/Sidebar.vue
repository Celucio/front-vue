<template>
  <div id="viewport">
    <!-- Sidebar  -->

    <div id="sidebar">
      <header>
        <router-link :to="{ path:'/admin'}"><i class="fa-solid fa-house"></i> Home</router-link>
      </header>

      <ul class="nav" id="nav">
        <li>
          <router-link :to="{ path:'/admin/estudiante'}">
            <i class="zmdi zmdi-view-dashboard"></i> Estudiante
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/docente'}">
            <i class="zmdi zmdi-link"></i> Docente
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/asignatura'}">
            <i class="zmdi zmdi-widgets"></i> Asignaturas
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/grado'}">
            <i class="zmdi zmdi-calendar"></i> Grado
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/matricula'}">
            <i class="zmdi zmdi-info-outline"></i> Matricula
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:''}">
            <i class="zmdi zmdi-settings"></i> Notas
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/periodo'}">
            <i class="zmdi zmdi-comment-more"></i> Periodo
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/periodoC'}">
            <i class="zmdi zmdi-info-outline"></i> Periodo de calificaciones
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/actividades'}">
            <i class="zmdi zmdi-settings"></i> Actividades Educativas
          </router-link>
        </li>
        <li>
          <router-link :to="{ path:'/admin/tipo'}">
            <i class="zmdi zmdi-comment-more"></i> Tipo Actividad
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  name: "Sidebar",

};
</script>
<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/material-design-icons@3.0.1/iconfont/material-icons.css');
@import '@fortawesome/fontawesome-free/css/all.css';

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

#sidebar header a:hover{
  color:#037aff;
}

/* #sidebar header a:hover {
  color: #1a243d;
  
} */

#sidebar .nav a {
  background: none;
  font-weight: bold;
  color: #7c7c7c;
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
  padding-bottom: 8px;
  transition: all 0.3s;
}

#sidebar .nav li:hover {
  background: rgb(187, 219, 255);
  border-radius: 80px;
  width: 17rem;
  cursor: pointer;
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
}
</style>
