
<template>
    <Navbar  class="mn"></Navbar>
    <div class="wrapper">
        <!-- Sidebar -->
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="main-content" id="content">
            <div class="">
                <div class="">
                    <div class="row">
                        <div class="col-sm-6">
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Asignatura</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{ path: '/admin/asignatura/crear'}" class="btn btn-success float-end mt-3"
                                style="font-family: 'Montserrat';"><i class="fa-solid fa-plus"></i> <b>Crear</b></router-link>
                        </div>
                    </div>

                    <DataTable :data="datos" :columns="columnas"  />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import DataTable from '../../../components/DataTable.vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { API_URL } from '../../../api/config.js';


export default {
    components: {
        DataTable,
        Navbar,
        Sidebar,
    },
    data() {
        return {

            datos: [],
            columnas: [
                { label: 'Nombre de la materia', data: 'nombreMateria' , style: { maxWidth: '100px' }},
                {
                    label: 'Nombre del grado', 
                    data:'idGrado',
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
                    
                {
                    label: 'Estado',
                    data: 'estado',
                    render: function (data, type, row, meta) {
                        return data === 'A' ? 'Activo' : 'Inactivo';
                    },
                    style: { maxWidth: '100px' }
                },
                {
                    label: 'Acciones', data: null, render: function (data, type, row, meta) { return `<a href="/admin/asignatura/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>` },
                    style: { width: '70px' }
                }
            ]

        }
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            axios.get(API_URL+'/asignatura').then(
                res => {
                    this.datos = res.data.map(asignatura => {
                        return {
                            id: asignatura.id,
                            nombreMateria: asignatura.nombreMateria,
                            estado: asignatura.estado,
                            idGrado: `${asignatura.grado.nombreGrado}`
                        }
                    });
                }
            )
        }
    }

}

</script>

