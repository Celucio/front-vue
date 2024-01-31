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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Docentes</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{ path: '/admin/docente/crear'}" class="btn btn-success float-end mt-3"
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
            datos: [], // Datos de estudiantes
            columnas: [
                { label: 'Nombre', data: 'nombre', style: { maxWidth: '50px' } },
                { label: 'Apellido', data: 'apellido', style: { maxWidth: '50px' } },
                { label: 'Cédula', data: 'cedula', style: { width: '100px' } },
                { label: 'Fecha de Nacimiento', data: 'fechaNacimiento', style: { width: '100px' } },
                { label: 'Dirección', data: 'direccion', style:{ width: '150px'} },
                { label: 'Correo', data: 'correo', style: { width: '200px' } },
                { label: 'Celular', data: 'celular', style: { maxWidth: '50px' } },
                {
                    label: 'Acciones', data: null, style: { width: '70px' }, render: function (data, type, row, meta) {
                        return `<a href="/admin/docente/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>`;
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
            axios.get(API_URL + '/docente').then(
                res => {
                    this.datos = res.data.map(docente => {
                        return {
                            ...docente,
                            fechaNacimiento: this.formatFecha(docente.fechaNacimiento)
                        };
                    });
                }
            )
        },
        formatFecha(fecha) {
            if (!fecha) {
                return null;
            }

            const fechaObj = new Date(fecha);

            const dia = (fechaObj.getDate()+1).toString().padStart(2, '0');
            const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
            const anio = fechaObj.getFullYear();

            return `${dia}/${mes}/${anio}`;
        }
    },
};
</script>
