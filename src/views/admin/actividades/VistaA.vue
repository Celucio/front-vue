<template>
    <Navbar class="mn"></Navbar>
    <div class="wrapper">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="main-content" id="content">
            <div class="">
                <div class="">
                    <div class="row">
                        <div class="col-sm-6">
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Actividades Educativas</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{path:'/admin/actividades/crear'}" class="btn btn-success float-end mt-3"
                                style="font-family: 'Montserrat';"><i class="fa-solid fa-plus"></i> <b>Crear</b></router-link>
                        </div>
                    </div>
                    <DataTable :data="datos" :columns="columnas" :dataKey="key" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import DataTable from '@/components/DataTable.vue';
import { API_URL } from '../../../api/config.js';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios'

export default {
    data() {
        return {
            datos: [],
            columnas: [
                { label: 'Título', data: 'titulo', style: { maxWidth: '100px' } },
                { label: 'Detalle', data: 'detalleActividad', style: { maxWidth: '100px' } },
                { label: 'Fecha Inicio', data: 'fechaInicio', style: { maxWidth: '50px' } },
                { label: 'Fecha Fin', data: 'fechaFin', style: { maxWidth: '50px' } },
                { label: 'Tipo de actividad', data: 'tipoActId', style: { maxWidth: '70px' } },
                { label: 'Periodo de calificaciones', data: 'perCalId', style: { maxWidth: '70px' } },
                { label: 'Asignatura', data: 'asignaturaId', style: { maxWidth: '100px' } },
                {   label: 'Estado',
                    data: 'estado',
                    render: function (data, type, row, meta) {
                        return data === 'A' ? 'Activo' : 'Inactivo';
                    },
                    style: { maxWidth: '50px' }
                },
                {
                    label: 'Acciones', data: null, style: { width: '70px' }, render: function (data, type, row, meta) {
                        return `<a href="/admin/matricula/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>`;
                    }
                }

            ],
            key: 'defaultKey',

        };
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            axios.get(API_URL + '/actividades').then(
                res => {
                    this.datos = res.data.map(actividades => {
                        return {
                            titulo: actividades.titulo,
                            detalleActividad: actividades.detalleActividad,
                            fechaInicio: this.formatFecha(actividades.fechaInicio),
                            fechaFin: this.formatFecha(actividades.fechaFin),
                            tipoActId: `${actividades.tipoActividad.nombreActividad}`,
                            perCalId: `${actividades.periodoCalificaciones.nombrePeriodo}`,
                            asignaturaId: `${actividades.asignatura.nombreMateria}`,
                            estado: actividades.estado,
                        };
                    });
                }
            )
        },
        formatFecha(fecha) {
            const fechaFormateada = new Date(fecha).toLocaleDateString();
            return fechaFormateada;
        }
    },
    components: {
        DataTable,
        Navbar,
        Sidebar
    },
};
</script>
