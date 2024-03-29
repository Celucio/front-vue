import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth } from '../middleware/auth-guard.js';
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
import VistaAdmin from '../views/admin/administradores/VistaAdmin.vue'
import CrearAdmin from '../views/admin/administradores/CrearAdmin.vue'
import EditarAdmin from '../views/admin/administradores/EditarAdmin.vue'
import VistaEst from '../views/est/VistaEst.vue'
import VistaDoc from '../views/doc/VistaDoc.vue'
import VistaActDoc from '../views/doc/VistaActDoc.vue'
import CrearDoc from '../views/doc/CrearDoc.vue'
import EditarDoc from '../views/doc/EditarDoc.vue'
import NotaDoc from '../views/doc/NotaDoc.vue'
import CambioContrasena from '../views/login/CambioContrasena.vue'
import OlvidoContrasena from '../views/login/OlvidoContrasena.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'vista',
    component: Vista,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/estudiante',
    name: 'vistaE',
    component: VistaE,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/estudiante/editar/:id',
    name: 'editarE',
    component: EditarE,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/estudiante/crear',
    name: 'crearE',
    component: CrearE,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/docente',
    name: 'vistaD',
    component: VistaD,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/docente/crear',
    name: 'crearD',
    component: CrearD,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/docente/editar/:id',
    name: 'editarD',
    component: EditarD,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/periodo',
    name: 'vistaP',
    component: VistaP,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/periodo/crear',
    name: 'crearP',
    component: CrearP,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/periodo/editar/:id',
    name: 'editarP',
    component: EditarP,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/periodoC',
    name: 'vistaPC',
    component: VistaPC,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/periodoC/crear',
    name: 'crearPC',
    component: CrearPC,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/periodoC/editar/:id',
    name: 'editarPC',
    component: EditarPC,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/tipo',
    name: 'vistaT',
    component: VistaT,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/tipo/crear',
    name: 'crearT',
    component: CrearT,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/tipo/editar/:id',
    name: 'editarT',
    component: EditarT,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/grado',
    name: 'vistaG',
    component: VistaG,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/grado/crear',
    name: 'crearG',
    component: CrearG,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/grado/editar/:id',
    name: 'editarG',
    component: EditarG,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/asignatura',
    name: 'vistaS',
    component: VistaS,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/asignatura/crear',
    name: 'crearS',
    component: CrearS,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/asignatura/editar/:id',
    name: 'editarS',
    component: EditarS,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/matricula',
    name: 'vistaM',
    component: VistaM,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/matricula/crear',
    name: 'crearM',
    component: CrearM,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/matricula/editar/:id',
    name: 'editarM',
    component: EditarM,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/actividades',
    name: 'vistaA',
    component: VistaA,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/actividades/crear',
    name: 'crearA',
    component: CrearA,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/actividades/editar/:id',
    name: 'editarA',
    component: EditarA,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/notas',
    name: 'vistaN',
    component: VistaN,
    beforeEnter: requireAuth
  },
  {
    path: '/estudiante',
    name: 'vistaEst',
    component: VistaEst,
    beforeEnter: requireAuth
  },
  {
    path: '/docente',
    name: 'vistaDoc',
    component: VistaDoc,
    beforeEnter: requireAuth
  },
  {
    path: '/docente/actividades/:idAsignatura',
    name: 'vistaActDoc',
    component: VistaActDoc,
    beforeEnter: requireAuth
  },
  {
    path: '/docente/crear/:idAsignatura',
    name: 'crearDoc',
    component: CrearDoc,
    beforeEnter: requireAuth
  },
  {
    path: '/docente/editar/:id',
    name: 'editarDoc',
    component: EditarDoc,
    beforeEnter: requireAuth
  },
  {
    path: '/docente/nota/:idAsignatura',
    name: 'notaDoc',
    component: NotaDoc,
    beforeEnter: requireAuth
  },
  {
    path: '/cambioContrasena/:cedula',
    name: 'cambioContrasena',
    component: CambioContrasena,
  },
  {
    path: '/olvidoContrasena',
    name: 'olvidoContrasena',
    component: OlvidoContrasena,

  },
  {
    path: '/admin/administradores',
    name: 'vistaAdmin',
    component: VistaAdmin,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/administradores/crear',
    name: 'crearAdmin',
    component: CrearAdmin,
    beforeEnter: requireAuth
  },
  {
    path: '/admin/administradores/editar/:id',
    name: 'editarAdmin',
    component: EditarAdmin
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
