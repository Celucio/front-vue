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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Estudiantes</h1>
                        </div>
                        <div class="col-sm-6">
                            <router-link :to="{ path: '/admin/estudiante/crear' }" class="btn btn-success float-end mt-3"
                                style="font-family: 'Montserrat';"><i class="fas fa-plus"></i>
                                <b> Crear</b></router-link>
                        </div>
                    </div>
                    <DataTable :data="datosConEdad" :columns="columnas" :dataKey="key" />
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
                { label: 'Edad', data: 'edad', style: { maxWidth: '50px' } }, // Nueva columna para la edad
                { label: 'Dirección', data: 'direccion', style: { width: '150px' } },
                { label: 'Correo', data: 'correo', style: { width: '200px' } },
                { label: 'Celular', data: 'celular', style: { maxWidth: '70px' } },
                {
                    label: 'Acciones', data: null, style: { width: '70px' }, render: function (data, type, row, meta) {
                        return `<a href="/admin/estudiante/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>`;
                    }
                }

            ],
            key: 'defaultKey',

        };
    },
    computed: {
        datosConEdad() {
            return this.datos.map(estudiante => ({
                ...estudiante,
                edad: this.calcularEdad(estudiante.fechaNacimiento)
            }));
        }
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            axios.get(API_URL + '/estudiante').then(
                res => {
                    this.datos = res.data.map(estudiante => {
                        return {
                            ...estudiante,
                            fechaNacimiento: this.formatFecha(estudiante.fechaNacimiento),
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
        },
        calcularEdad(fecha) {
            if (!fecha) {
                return 'Fecha no disponible';
            }
            const [dia, mes, anio] = fecha.split('/');

            // Crea una nueva fecha en formato 'mm/dd/yy' (mes/día/año)
            const fechaNacimiento = new Date(`${mes}/${dia}/${anio}`);

            if (isNaN(fechaNacimiento.getTime())) {
                return 'Fecha inválida';
            }

            const fechaActual = new Date();
            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            // Ajuste para considerar el día de nacimiento en el año actual
            if (
                fechaNacimiento.getMonth() > fechaActual.getMonth() ||
                (fechaNacimiento.getMonth() === fechaActual.getMonth() && fechaNacimiento.getDate() > fechaActual.getDate())
            ) {
                return edad - 1;
            }

            return edad;
        }
    }
}
</script>
