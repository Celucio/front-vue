<!-- Nuevo componente, por ejemplo, ActivitiesTable.vue -->
<template>
    <div class="activities-table" style="font-family: 'Prompt'; font-size: small; overflow-x:visible;">
        <div class="table-responsive">
            <div class="" style="background-color: #cbd7e5; padding: 10px; background-color: #cbd7e5; margin-top: 10px;">
                <div class="input-group w-25">

                    <input v-model="searchQuery" type="text" class="form-control" id="searchInput" placeholder="Buscar" />
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th >Título</th>
                        <th>Detalle</th>
                        <th style="max-width: 4rem;">Fecha Inicio</th>
                        <th style="max-width: 4rem;">Tipo Actividad</th>
                        <th style="max-width: 4rem;">Periodo de calificaciones</th>
                        <th style="max-width: 2rem;">Estado</th>
                        <th style="max-width: 2rem;">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(actividad, index) in paginatedAndFilteredActivities" :key="actividad.id">
                        <td>{{ actividad.titulo }}</td>
                        <td>{{ actividad.detalleActividad }}</td>
                        <td>{{ formatFecha(actividad.fechaInicio) }}</td>
                        <td>{{ actividad.tipoActId }}</td>
                        <td>{{ actividad.perCalId }}</td>
                        <td>{{ actividad.estado === 'A' ? 'Activo' : 'Inactivo' }}</td>
                        <td>
                            <router-link :to="{ name: 'editarDoc', params: { id: actividad.id } }">
                                <button class="btn btn-warning"><i class="fa-solid fa-edit"></i></button>
                            </router-link>
                        </td>
                        <!-- Agrega más celdas según sea necesario -->
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example" class="d-flex justify-content-center ">
                <ul class="pagination">
                    <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                        <a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
                            <span aria-hidden="true">Anterior</span>
                        </a>
                    </li>
                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ 'active': currentPage === page }">
                        <a class="page-link" @click="changePage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
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
export default {
    data() {
        return {
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 3,
        };
    },
    props: {
        actividades: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.actividades.length / this.itemsPerPage);
        },
        paginatedActivities() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.actividades.slice(startIndex, endIndex);
        },
        paginatedAndFilteredActivities() {
            const lowerCaseQuery = this.searchQuery.toLowerCase();

            return this.actividades.filter(actividad =>
                Object.values(actividad).some(value =>
                    value && value.toString().toLowerCase().includes(lowerCaseQuery)
                )
            ).slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        },
    },
    methods: {
        formatFecha(fecha) {
            if (!fecha) {
                return null;
            }

            const fechaObj = new Date(fecha);

            const dia = (fechaObj.getDate() + 1).toString().padStart(2, '0');
            const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
            const anio = fechaObj.getFullYear();

            return `${dia}/${mes}/${anio}`;
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    },
};
</script>
  
<style scoped>
.activities-table {
    margin-top: 20px;
}

.table-responsive {
    overflow-x: visible;
}

.table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.table td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

.table th {
    background-color: #f2f2f2;
}
</style>
  