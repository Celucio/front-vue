
<template>
    <Navbar class="mn"></Navbar>
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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Tipo Actividad</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{ path:'/admin/tipo/crear'}" class="btn btn-success float-end mt-3"
                                style="font-family: 'Montserrat';"><i class="fa-solid fa-plus"></i> <b>Crear</b></router-link>
                        </div>
                    </div>

                    <div class="table-responsive" style="font-family: 'Prompt'; font-size: small; overflow-x:visible;">
                        <div class="table-container">
                            <DataTable :data="datos" :columns="columnas" :dataKey="key"/>
                        </div>
                    </div>
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
        Sidebar,
    },
    data() {
        return {

            datos: [],
            columnas: [
                { label: 'Nombre actividad', data: 'nombreActividad', style: { maxWidth: '50px' } },
                {
                    label: 'Acciones', data: null, style: { width: '70px' }, render: function (data, type, row, meta) {
                        return `<a href="/admin/tipo/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>`;
                    }
                }
            ],
            key: 'defaultKey'

        }
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            axios.get(API_URL+'/tipoActividad').then(
                res => {
                    this.datos = res.data.map(tipo => {
                        return {
                            ...tipo,
                            
                        };
                    });
                }
            )
        }
    }

}

</script>
