<template>
    <Navbar  class="mn"></Navbar>
    <div class="wrapper">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="main-content" id="content">
            <div class="">
                <div class="">
                    <div class="row">
                        <div class="col-sm-6">
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Matricula</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{path:'/admin/matricula/crear'}" class="btn btn-success float-end mt-3"
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
    components: {
        DataTable,
        Navbar,
        Sidebar
    },
    data() {
        return {
            datos: [],
            columnas: [
                { label: 'Nombre del estudiante', data: 'idPersona', style: { maxWidth: '50px' } },
                { label: 'Periodo lectivo', data: 'idPeriodo', style: { maxWidth: '50px' } },
                { 
                    label: 'Grado', 
                    data: 'idGrado', 
                    style: { maxWidth: '100px' },
                    render:function(data, type, row, meta){
                        switch(data){
                            case 'P':
                                return 'Primer Grado';
                            case 'S':
                                return 'Segundo Grado';
                            case 'T':
                                return 'Tercer Grado';
                            case 'C':
                                return 'Cuarto Grado';
                            case 'Q':
                                return 'Quinto Grado';
                            case 'X':
                                return 'Sexto Grado';
                            case 'M':
                                return 'Septimo Grado';
                            default:
                                return '';
                        }
                    }  
                },
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
            axios.get(API_URL + '/matricula').then(
                res => {
                    this.datos = res.data.map(matricula => {
                        return {
                            ...matricula,
                            idPersona: `${matricula.persona.nombre} ${matricula.persona.apellido}`,
                            idPeriodo: `${matricula.periodo.anioLectivo}`,
                            idGrado: `${matricula.grado.nombreGrado}`
                        };
                    });
                }
            )
        }
    },
};
</script>
