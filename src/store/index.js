import { createStore } from 'vuex'
import axios from 'axios';
import { API_URL } from '../api/config.js';

export default createStore({
  state: {
    usuario: null,
    asignaturas: [],
    asignaturaSeleccionada: null,
    actividadesAsignatura: [],
  },
  getters: {
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    setAsignaturas(state, asignaturas) {
      state.asignaturas = asignaturas;
    },
    setAsignaturaSeleccionada(state, asignaturaId) {
      state.asignaturaSeleccionada = asignaturaId;
    },
    setActividadesAsignatura(state, actividades) {
      state.actividadesAsignatura = actividades;
    },
  },
  actions: {
    async cargarActividadesAsignatura({ commit }, asignaturaId) {
      try {
        const res = await axios.get(API_URL + `/actividades/asignatura/${asignaturaId}`);
        const actividades = res.data;

        commit('setActividadesAsignatura', actividades);
      } catch (error) {
        console.error('Error al cargar actividades de la asignatura:', error);
      }
    },
    async login({ commit }, credenciales) {
      try {
        const res = await axios.post(API_URL + '/login', credenciales);
        const { token, usuario } = res.data;

        // Almacena el token en localStorage o en una cookie (según tus necesidades)
        localStorage.setItem('token', token);

        // Almacena los datos del usuario en Vuex
        commit('setUsuario', usuario);

        // Realiza el redireccionamiento basado en el tipo de persona (si es necesario)
        if (usuario && usuario.tipoPersona === 'D') {
          this.cargarAsignaturas(usuario.id);
          this.$router.push('/docente');
        } else if (usuario && usuario.tipoPersona === 'E') {
          // En este punto, puedes cargar las asignaturas del estudiante
          this.cargarAsignaturas(usuario.id);
          this.$router.push('/estudiante');
        } else if (usuario && usuario.tipoPersona === 'A') {
          this.$router.push('/admin');
        } else {
          this.$router.push('/otra-vista');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async cargarAsignaturas({ commit }, userId) {
      try {
        // Realiza la llamada a la API para cargar las asignaturas del estudiante
        const res = await axios.get(API_URL + `/persona/asignaturas/${userId}`);
        const asignaturas = res.data;

        // Hacer algo con las asignaturas, por ejemplo, almacenarlas en el estado de Vuex
        commit('setAsignaturas', asignaturas);
      } catch (error) {
        console.error('Error al cargar asignaturas:', error);
      }
    },
    async seleccionarAsignatura({ commit }, asignaturaId) {
      try {
        // Realiza la llamada a la API para cargar los detalles de la asignatura
        const res = await axios.get(API_URL + `/asignatura/${asignaturaId}`);
        const asignatura = res.data;

        // Hacer algo con la asignatura, por ejemplo, almacenarla en el estado de Vuex
        commit('setAsignaturaSeleccionada', asignatura);
      } catch (error) {
        console.error('Error al cargar asignatura seleccionada:', error);
      }
    }
  },
  modules: {
  }
})
