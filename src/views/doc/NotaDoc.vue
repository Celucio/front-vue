<template>
    <Navbar :nombre="$store.state.usuario.nombre" class="mn"></Navbar>
    <div class="flecha-regresar" @click="regresarPagina">
            <span class="texto-flecha"><i class="fa-solid fa-arrow-left"></i> Regresar</span>
        </div>
    <div class="ps-4 pe-4">
        <div class="pt-3">
            <div class="row" style="padding-right: 0%;">
                <div class="row align-items-center " style="font-family: 'Prompt'; padding-right: 0%;">
                    <div class="col-sm-8">
                        <span style="font-family: 'Prompt'; font-size: 2rem;">Notas para la asignatura {{ detalleAsignaturas.nombreMateria }}</span>
                    </div>
                    <div class="col-sm-3" style="display: none;">
                        <label for="asignaturaSelect">Seleccionar Asignatura:</label>
                        <select v-model="selectedAsignatura" class="form-select" id="asignaturaSelect"
                            @change="getActividades">
                        </select>
                    </div>
                    <div class="col-sm-4" style="padding-right: 0%;">
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
            <div class="" style="background-color: #cbd7e5; padding: 10px; background-color: #cbd7e5; margin-top: 10px;">
                <div class="input-group w-25">

                    <input v-model="searchQuery" type="text" class="form-control" id="searchInput" placeholder="Buscar" />
                </div>
            </div>
            <table class="table ">
                <thead class="thead-light">
                    <tr>
                        <th scope="col" style="max-width: 2rem;">Nombre</th>
                        <th scope="col" style="max-width: 3rem;">Apellido</th>
                        <th scope="col" style="max-width: 4rem;">Titulo Actividad</th>
                        <th scope="col" style="max-width: 4rem;">Fecha en que se envio la tarea</th>
                        <th scope="col" class="text-center" style="max-width: 1.5rem;">
                            <div class="row text-center ">
                                <div class="col-sm-4">
                                    <span>Nota</span>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch"
                                            id="flexSwitchCheckDefault" v-model="edicionHabilitada">
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
                        <td>{{formatFecha(row.fechaInicio) }}</td>
                        <td class="text-center" style="max-width: 1.5rem;">
                            <span v-if="!edicionNotas[row.idNota] && !edicionHabilitada"
                                @click="activarEdicion(row.idNota)">{{ row.nota }}</span>
                            <input v-else type="text" style="width: 25px;" v-model="row.nota"
                                @blur="desactivarEdicion(row.idNota)" :disabled="!edicionHabilitada" placeholder="nota">


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
                    <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
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
</template>
<script>
import { API_URL } from '../../api/config.js';
import Navbar from '@/components/Navbar.vue';
import { validarNota } from '@/utilidades/validaciones.js'
import Swal from 'sweetalert2';
import axios from 'axios'
import { format } from 'date-fns';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            datos: [],
            idAsignatura: null,
            detalleAsignaturas: {},
            selectedAsignatura: null,
            selectedActividad: null,
            actividades: [],
            edicionNotas: {},
            itemsPerPage: 15,
            currentPage: 1,
            searchQuery: '',
            totalItems: 0,
            edicionHabilitada: false,
        }
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
    created() {
        this.idAsignatura = this.$route.params.idAsignatura;
        console.log('ID de la asignatura:', this.idAsignatura);
    },
    mounted() {
        this.getDetallesAsignatura();
        this.getActividades();
        this.get();
    },
    methods: {
        regresarPagina() {
            this.$router.go(-1);
        },
        async getActividades() {
            await axios.get(API_URL + `/actividades/asignatura/${this.idAsignatura}`).then(response => {
                this.actividades = response.data;
            })
                .catch(error => {
                    console.error('Error al obtener actividades:', error);
                });
        },

        async getDetallesAsignatura() {
            try {
                const response = await axios.get(API_URL + `/asignatura/${this.idAsignatura}`);
                this.detalleAsignaturas = response.data;
            } catch (error) {
                console.log(error);
            }
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
            await axios.get(API_URL + `/traeractividades/asignatura/actividad/?actividadId=${this.selectedActividad}&asignaturaId=${this.idAsignatura}`)
                .then(res => {
                    this.datos = res.data;
                })
                .catch(error => {
                    console.error('Error al obtener notas:', error);
                });
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
    }
}

</script>