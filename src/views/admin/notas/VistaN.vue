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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Notas</h1>
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
    components: {
        DataTable,
        Navbar,
        Sidebar
    },
    data() {
        return {
            datos: [],
            columnas: [
                { label: 'Titulo de la Actividad', data: 'actId', style:{maxWidth: '50px'}},
                { label: 'Detalle de la Actividad', data: 'detalle', style:{maxWidth: '100px'}},
                { label: 'Asignatura', data: 'asignatura', style:{maxWidth: '100px'}},
                { label: 'Nombre del estudiante', data: 'personaId', style: { maxWidth: '50px' } },
                { label: 'Nota', data: 'valor_nota', style: { maxWidth: '50px' } },
                {
                    label: 'Asignar nota', data: null, style: { width: '70px' }, render: function (data, type, row, meta) {
                        return `<a href="/admin/notas/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>`;
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
            axios.get(API_URL + '/notas').then(
                res => {
                    this.datos = res.data.map(notas => {
                        return {
                            actId: `${notas.actividades.titulo}`,
                            detalle: `${notas.actividades.detalleActividad}`,
                            asignatura: `${notas.actividades.asignatura.nombreMateria}`,
                            personaId: `${notas.persona.nombre} ${notas.persona.apellido}`,
                            valor_nota: `${notas.valor_nota}`,
                        };
                    });
                }
            )
        }
    },
};
</script>
