import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Vista from '../views/admin/Vista.vue'
import VistaE from '../views/admin/estudiante/VistaE.vue'
import EditarE from '../views/admin/estudiante/EditarE.vue'
import CrearE from '../views/admin/estudiante/CrearE.vue'
import VistaD from '../views/admin/docente/VistaD.vue'
import CrearD from '../views/admin/docente/CrearD.vue'
import EditarD from '../views/admin/docente/EditarD.vue'
import VistaP from '../views/admin/periodo/VistaP.vue'
import CrearP from '../views/admin/periodo/CrearP.vue'
import EditarP from '../views/admin/periodo/EditarP.vue'
import VistaPC from '../views/admin/periodo calificaciones/VistaPC.vue'
import CrearPC from '../views/admin/periodo calificaciones/CrearPC.vue'
import EditarPC from '../views/admin/periodo calificaciones/EditarPC.vue'
import VistaT from '../views/admin/tipo actividad/VistaT.vue'
import CrearT from '../views/admin/tipo actividad/CrearT.vue'
import EditarT from '../views/admin/tipo actividad/EditarT.vue'
import VistaG from '../views/admin/grado/VistaG.vue'
import CrearG from '../views/admin/grado/CrearG.vue'
import EditarG from '../views/admin/grado/EditarG.vue'
import VistaS from '../views/admin/asignatura/VistaS.vue'
import CrearS from '../views/admin/asignatura/CrearS.vue'
import EditarS from '../views/admin/asignatura/EditarS.vue'
import VistaM from '../views/admin/matricula/VistaM.vue'
import CrearM from '../views/admin/matricula/CrearM.vue'
import EditarM from '../views/admin/matricula/EditarM.vue'
import VistaA from '../views/admin/actividades/VistaA.vue'
import CrearA from '../views/admin/actividades/CrearA.vue'
import EditarA from '../views/admin/actividades/EditarA.vue'
import VistaN from '../views/admin/notas/VistaN.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'vista',
    component: Vista
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
  {
    path: '/admin/docente/crear',
    name: 'crearD',
    component: CrearD
  },
  {
    path: '/admin/docente/editar/:id',
    name: 'editarD',
    component: EditarD
  },
  {
    path: '/admin/periodo',
    name: 'vistaP',
    component: VistaP
  },
  {
    path: '/admin/periodo/crear',
    name: 'crearP',
    component: CrearP
  },
  {
    path: '/admin/periodo/editar/:id',
    name: 'editarP',
    component: EditarP
  },
  {
    path: '/admin/periodoC',
    name: 'vistaPC',
    component: VistaPC
  },
  {
    path: '/admin/periodoC/crear',
    name: 'crearPC',
    component: CrearPC
  },
  {
    path: '/admin/periodoC/editar/:id',
    name: 'editarPC',
    component: EditarPC
  },
  {
    path: '/admin/tipo',
    name: 'vistaT',
    component: VistaT
  },
  {
    path: '/admin/tipo/crear',
    name: 'crearT',
    component: CrearT
  },
  {
    path: '/admin/tipo/editar/:id',
    name: 'editarT',
    component: EditarT
  },
  {
    path: '/admin/grado',
    name: 'vistaG',
    component: VistaG
  },
  {
    path: '/admin/grado/crear',
    name: 'crearG',
    component: CrearG
  },
  {
    path: '/admin/grado/editar/:id',
    name: 'editarG',
    component: EditarG
  },
  {
    path: '/admin/asignatura',
    name: 'vistaS',
    component: VistaS
  },
  {
    path: '/admin/asignatura/crear',
    name: 'crearS',
    component: CrearS
  },
  {
    path: '/admin/asignatura/editar/:id',
    name: 'editarS',
    component: EditarS
  },
  {
    path: '/admin/matricula',
    name: 'vistaM',
    component: VistaM
  },
  {
    path: '/admin/matricula/crear',
    name: 'crearM',
    component: CrearM
  },
  {
    path: '/admin/matricula/editar/:id',
    name: 'editarM',
    component: EditarM
  },
  {
    path: '/admin/actividades',
    name: 'vistaA',
    component: VistaA
  },
  {
    path: '/admin/actividades/crear',
    name: 'crearA',
    component: CrearA
  },
  {
    path: '/admin/actividades/editar/:id',
    name: 'editarA',
    component: EditarA
  },
  {
    path: '/admin/notas',
    name: 'vistaN',
    component: VistaN
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
