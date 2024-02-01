<template>
  <div id="viewport">
    <!-- Sidebar  -->

    <div id="sidebar">
      <header>
        <router-link :to="{ path: '/estudiante' }"> <i class="fa-solid fa-home"></i> Inicio</router-link>
      </header>

      <div class="dropdown-toggle pt-3" @click="toggleDropdown" :class="{ active: showDropdown }">
        <div class="d-flex flex-row align-items-center ">
          <div class="ps-4">
            <span style="font-size: 20px; font-family: 'Montserrat';">Cursos</span>
          </div>
          <div class="ps-2">
            <i class="fa-solid fa-chevron-down" :class="{ rotated: showDropdown }"></i>
          </div>
        </div>

      </div>
      <transition name="fade">
        <ul v-show="showDropdown" class="nav" id="nav">
          <li v-for="asignatura in asignaturas" :key="asignatura.id" class="pb-0">

            <router-link :to="{ path: '' + asignatura.id }" class="nav-link">
              <div class="row">
                <div class="col-sm-2">
                  <img src="../assets/check.png" alt="" width="30px" height="30px">
                </div>
                <div class="col-md-10 d-flex  align-items-center ">
                  <span>{{ asignatura.nombreMateria }}</span>
                </div>
              </div>

            </router-link>
          </li>
        </ul>
      </transition>

    </div>

  </div>
</template>
<script>
import axios from 'axios';
import { API_URL } from '../api/config.js';
export default {
  data() {
    return {
      asignaturas: [],
      showDropdown: false,
    }
  },
  mounted() {
    this.get();
  },
  methods: {
    redirigir(path) {
      this.$router.push(path)
    },
    get() {
      axios.get(API_URL + '/persona/asignaturas/2')
        .then(response => {
          this.asignaturas = response.data;
          console.log(this.asignaturas);
        })
        .catch(e => {
          console.log(e);
        });
    },
    toggleDropdown() {
      // Cambia el estado para mostrar u ocultar el dropdown
      this.showDropdown = !this.showDropdown;
    },

  },
  name: "Side",


};
</script>
<style scoped>
body {
  overflow-x: hidden;
}

.dropdown-toggle {
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.dropdown-toggle::after{
  content: none;
}


/* Agrega un estilo para la transición del icono */
.dropdown-toggle i {
  transition: transform 0.3s ease;
}

/* Rota el icono cuando el dropdown está activo */
.dropdown-toggle i.rotated {
  transform: rotate(180deg);
  content: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
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
  height: 150%;
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



#sidebar .nav li {
  display: block;
  padding-top: 10px;
  padding-left: 10px;
  cursor: pointer;
}

#sidebar .nav li :hover {
  background: rgb(187, 219, 255);
  border-radius: 80px;
}

#sidebar .nav i {
  margin-right: 5px;
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

footer {
  padding: 10px 0px 20px 35px;
  line-height: 52px;
  border-top: #b2b2b2cb 2px solid;
}

footer a {
  color: #000000;
  display: block;
  text-decoration: none;
  font-family: 'Prompt', sans-serif;
  transition: color 0.3s;
}

footer a:hover {
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

  footer {
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

  footer {
    padding: 5px 0px 5px 5px;
    font-size: 10px;
  }
}

@media (max-width: 566px) {
  #sidebar .nav a {
    font-size: 9px;
  }
}</style>
  