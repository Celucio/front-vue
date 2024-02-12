<template>
    <Navbar class="mn"></Navbar>
    <div class="wrapper">
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
        <div class="main-content" id="content">
            <div class="">
                <div class="">
                    <div class="row mb-1" style="padding-right: 0%;">
                        <div class="row" style="font-family: 'Prompt'; padding-right: 0%;">
                            <div class="col-sm-3">
                                <h1 style="font-size: 2rem;">Notas</h1>
                            </div>
                            <div class="col-sm-3">
                                <label for="gradoSelect">Seleccionar Grado:</label>
                                <select v-model="selectedGrado" class="form-select" id="gradoSelect"
                                    @change="limpiarFiltrosYObtenerAsignaturas">
                                    <option disabled>Seleccione un grado</option>
                                    <option v-for="grado in grados" :key="grado.id" :value="grado.id">
                                        {{ obtenerNombreGrado(grado.nombreGrado) }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label for="asignaturaSelect">Seleccionar Asignatura:</label>
                                <select v-model="selectedAsignatura" class="form-select" id="asignaturaSelect"
                                    @change="getActividades">
                                    <option disabled>Seleccione una asignatura</option>
                                    <option v-for="asignatura in asignaturas" :key="asignatura.id" :value="asignatura.id">
                                        {{ asignatura.nombreMateria }}
                                    </option>
                                </select>
                            </div>

                            <div class="col-sm-3" style="padding-right: 0%;">
                                <label for="actividadSelect">Seleccionar Actividad:</label>
                                <select v-model="selectedActividad" class="form-select" id="actividadSelect" @change="get">
                                    <option value="" selected disabled>Seleccione una actividad</option>
                                    <option v-for="actividad in actividades" :key="actividad.id" :value="actividad.id">
                                        {{ actividad.titulo }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""
                        style="background-color: #cbd7e5; padding: 10px; background-color: #cbd7e5; margin-top: 10px;">
                        <div class="input-group w-25">

                            <input v-model="searchQuery" type="text" class="form-control" id="searchInput"
                                placeholder="Buscar" />
                        </div>
                    </div>
                    <table class="table ">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col" style="max-width: 2rem;">Nombre</th>
                                <th scope="col" style="max-width: 3rem;">Apellido</th>
                                <th scope="col" style="max-width: 4rem;">Titulo Actividad</th>
                                <th scope="col" style="max-width: 10rem;">Asignatura</th>
                                <th scope="col" class="text-center" style="max-width: 1.5rem;">
                                    <div class="row text-center ">
                                        <div class="col-sm-4">
                                            <span>Nota</span>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="edicionHabilitada">
                                            </div>
                                        </div>
                                    </div>


                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in paginatedAndFilteredData" :key="index">
                                <td>{{ row.nombre }}</td>
                                <td>{{ row.apellido }}</td>
                                <td>{{ row.tituloActividad }}</td>
                                <td>{{ row.nombreAsignatura }}</td>
                                <td class="text-center" style="max-width: 1.5rem;">
                                    <span v-if="!edicionNotas[row.idNota] && !edicionHabilitada"
                                        @click="activarEdicion(row.idNota)">{{ row.nota }}</span>
                                    <input v-else type="text" style="width: 25px;" v-model="row.nota"
                                        @blur="desactivarEdicion(row.idNota)" :disabled="!edicionHabilitada"
                                        placeholder="nota">


                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example" class="d-flex justify-content-center ">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
                                    <span aria-hidden="true">Anterior</span>
                                </a>
                            </li>
                            <li class="page-item" v-for="page in totalPages" :key="page"
                                :class="{ active: currentPage === page }">
                                <a class="page-link" @click="changePage(page)">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
                                    <span aria-hidden="true">Siguiente</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { API_URL } from '../../../api/config.js';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { validarNota } from '@/utilidades/validaciones.js'
import Swal from 'sweetalert2';
import axios from 'axios'

export default {
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            selectedAsignatura: null,
            selectedActividad: null,
            selectedGrado: null,
            grados: [],
            asignaturas: [],
            actividades: [],
            datos: [],
            edicionNotas: {},
            itemsPerPage: 15,
            currentPage: 1,
            searchQuery: '',
            totalItems: 0,
            edicionHabilitada: false,

        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.datos.length / this.itemsPerPage);
        },
        paginatedData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.datos.slice(startIndex, endIndex);
        },
        filteredData() {
            const lowerCaseQuery = this.searchQuery.toLowerCase();
            return this.datos.filter(row =>
                Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(lowerCaseQuery)
                )
            );
        },

        paginatedAndFilteredData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredData.slice(startIndex, endIndex);
        },
    },
    mounted() {
        this.getGrados();
        this.get();
    },
    methods: {
        async getActividades() {
            await axios.get(API_URL + `/actividades/asignatura/${this.selectedAsignatura}`).then(response => {
                this.actividades = response.data;
            })
                .catch(error => {
                    console.error('Error al obtener actividades:', error);
                });
        },
        limpiarFiltros() {
            this.selectedAsignatura = null;
            this.selectedActividad = null;
        },
        limpiarFiltrosYObtenerAsignaturas() {
            this.limpiarFiltros();
            this.getAsignaturas();
        },
        obtenerNombreGrado(abreviatura) {
            const nombreGrados = {
                P: 'Primer Grado',
                S: 'Segundo Grado',
                T: 'Tercer Grado',
                C: 'Cuarto Grado',
                Q: 'Quinto Grado',
                X: 'Sexto Grado',
                M: 'Séptimo Grado',
            };

            return nombreGrados[abreviatura] || 'Grado Desconocido';
        },
        async getAsignaturas() {
            await axios.get(API_URL + `/asignatura/grado/${this.selectedGrado}`).then(response => {
                this.asignaturas = response.data;
            })
                .catch(error => {
                    console.error('Error al obtener asignaturas:', error);
                });
        },
        async getGrados() {
            await axios.get(API_URL + `/grado`).then(response => {
                this.grados = response.data;
            })
                .catch(error => {
                    console.error('Error al obtener grados:', error);
                });
        },
        activarEdicion(idNota) {
            this.edicionNotas[idNota] = true;
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        desactivarEdicion(idNota) {
            this.edicionNotas[idNota] = false;
            const nuevaNota = this.datos.find(row => row.idNota === idNota).nota;
            if (!validarNota(nuevaNota)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error: El valor de la nota debe ser un número entre 0 y 20',
                    showConfirmButton: false,
                    timer: 2000
                });
                return;
            }
            axios.put(API_URL + `/notas/${idNota}`, { valor_nota: parseFloat(nuevaNota) })
                .then(res => {
                    const indice = this.datos.findIndex(row => row.idNota === idNota);
                    if (indice !== -1) {
                        this.datos[indice].nota = parseFloat(nuevaNota);
                    }
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al asignar la nota',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        },
        async get() {
            await axios.get(API_URL + `/traernotas/?actividadId=${this.selectedActividad}&asignaturaId=${this.selectedAsignatura}&gradoId=${this.selectedGrado}`)
                .then(res => {
                    this.datos = res.data;
                })
                .catch(error => {
                    console.error('Error al obtener notas:', error);
                });
        }
    },
};
</script>
<style>
table {
    font-family: 'Prompt';
    font-size: 13px;
}
</style>
