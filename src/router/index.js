import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import VistaG from '../views/admin/VistaG.vue'
import VistaE from '../views/admin/estudiante/VistaE.vue'
import EditarE from '../views/admin/estudiante/EditarE.vue'
import CrearE from '../views/admin/estudiante/CrearE.vue'
import VistaD from '../views/admin/docente/VistaD.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'vistaG',
    component: VistaG
  },
  {
    path: '/admin/estudiante',
    name: 'vistaE',
    component: VistaE
  },
  {
    path: '/admin/estudiante/editar/:id',
    name: 'editarE',
    component: EditarE
  },
  {
    path: '/admin/estudiante/crear',
    name: 'crearE',
    component: CrearE
  },
  {
    path: '/admin/docente',
    name: 'vistaD',
    component: VistaD
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
