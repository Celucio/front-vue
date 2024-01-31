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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Grado</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{ path: '/admin/grado/crear'}" class="btn btn-success float-end mt-3"
                                style="font-family: 'Montserrat';"><i class="fa-solid fa-plus"></i> <b>Crear</b></router-link>
                        </div>
                    </div>
                    <DataTable :data="datos" :columns="columnas" :dataKey="key"/>
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
            datos: [], // Datos de estudiantes
            columnas: [
                { 
                    label: 'Nombre grado', 
                    data: 'nombreGrado', 
                    style: { maxWidth: '50px' },
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
                { label: 'Docente', data: 'persId', style: { maxWidth: '50px' } },
                {
                    label: 'Acciones', data: null, style: { width: '70px' }, render: function (data, type, row, meta) {
                        return `<a href="/admin/grado/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>`;
                    }
                }

            ],
            key: 'defaultKey'

        };
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            axios.get(API_URL + '/grado').then(
                res => {
                    this.datos = res.data.map(grado => {
                        return {
                            ...grado,
                            persId: `${grado.persona.nombre} ${grado.persona.apellido}`,
                            
                        };
                    });
                }
            )
        }
    },
};
</script>
