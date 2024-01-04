
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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Periodo Lectivo</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{ path: '/admin/periodo/crear'}" class="btn btn-success float-end mt-3"
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
                { label: 'Nombre periodo', data: 'anioLectivo', style: { maxWidth: '50px' } },
                {   label: 'Estado',
                    data: 'estado',
                    render: function (data, type, row, meta) {
                        return data === 'A' ? 'Activo' : 'Inactivo';
                    },
                    style: { maxWidth: '50px' }
                },
                {
                    label: 'Acciones', data: null, style: { width: '70px' }, render: function (data, type, row, meta) {
                        return `<a href="/admin/periodo/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>`;
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
            axios.get(API_URL+'/periodo').then(
                res => {
                    this.datos = res.data.map(periodo => {
                        return {
                            ...periodo,
                            
                        };
                    });
                }
            )
        }
    }

}

</script>
<style>
.btn {
    font-size: 1rem !important;
    border-radius: 15px !important;

}

.btn-group,
.btn-group-vertical {
    display: inline !important;

}

.btn svg {
    margin-right: 0.5em;
    width: 20px;
    height: 20px;
    fill: #fff;
}

nav {
    font-family: 'Prompt', sans-serif;
}

#a {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}

.img {
    width: 50px;
    height: 50px;
}

.ed {
    color: #037aff;
    font-size: 1rem;
}

.sidebar {
    color: #222222;
    font-weight: bolder;
    padding: 0px;
    width: 22%;
    border-right: 2px solid #b2b2b2cb;

}

.wrapper {
    display: flex;
    box-sizing: border-box;

}

.table-responsive {
    width: 100%;
    /* Puedes ajustar este valor según tus necesidades */

}

.table td {
    max-width: 50px;
    max-height: 20px;

}


.table {
    width: 100%;
    height: 300px;
    /* Haz que la tabla ocupe el 100% del contenedor */

}

.table>thead {
    background-color: #868686;
}

.table-container {
    max-height: 500px;
    /* Ajusta la altura según tus necesidades */

}

#content {
    flex: 1;
    padding: 30px;

}

thead tr>th {
    background-color: #d3d3d3 !important;
    color: #fff;
}


.dataTables_filter {
    width: 100%;
    padding: 10px;
    background-color: #cbd7e5;
    margin-top: 10px;
}


.btn-round {
    border-radius: 50%;
}


@media (max-width: 800px) {
    .col-lg-10 {
        flex: 0 0 auto;
        width: 83.33333333% !important;
    }

    .dataTables_wrapper {
        width: 900px !important;
        overflow-x: auto;

    }

    #content {
        width: 100% !important;
        overflow: auto !important;
    }

    .table-responsive {
        width: 1200px !important;
    }
}



@media (min-width: 601px) {
    .col-lg-10 {
        flex: 0 0 auto;
        width: 100% !important;
    }
}
</style>
