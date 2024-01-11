<template>
    <div>
        <div class="table-responsive" style="font-family: 'Prompt'; font-size: small; overflow-x: visible;">
            <div class="table-container">
                <DataTable :key="dataKey" :data="data" :columns="columns" class="table" :options="{
                        responsive: true,
                        autoWidth: false,
                        pageLength: 4,
                        dom: 'Bfrtip',
                        language: {
                            search: '',
                            zeroRecords: 'No se encontraron registros',
                            info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
                            infoFiltered: '(filtrado de un total de _MAX_ registros)',
                            infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
                            paginate: {
                                first: 'Primero',
                                last: 'Último',
                                next: 'Siguiente',
                                previous: 'Anterior'
                            },
                            searchPlaceholder: ' Buscar',
                            
                        },
                        buttons: botones,

                    }">
                    <div class="contenido">
                        <thead class="encabezado-tabla">
                            <tr>
                                <th v-for="(column, index) in columns" :key="index" :style="column.style">{{ column.label }}
                                </th>
                            </tr>
                        </thead>
                    </div>
                </DataTable>
            </div>
        </div>
    </div>
</template>
  
<script>
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import print from 'datatables.net-buttons/js/buttons.print';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import 'datatables.net-responsive-bs5';
import JsZip from 'jszip';
import axios from 'axios';

pdfmake.vfs = pdfFonts.pdfMake.vfs;
import 'datatables.net-responsive-bs5';

window.JSZip = JsZip;

DataTable.use(DataTableLib);
DataTable.use(pdfmake);
DataTable.use(ButtonsHtml5);


export default {
    data() {
        return {
            botones: [
                {
                    title: 'Reporte',
                    extend: 'excelHtml5',
                    text: '<i class="fa-solid fa-file-excel"></i> Excel',
                    className: 'btn btn-success'
                },
                {
                    title: 'Reporte',
                    extend: 'pdfHtml5',
                    text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                    titleAttr: 'PDF',
                    className: 'btn btn-danger'
                }
            ],
        }
    },
    components: {
        DataTable,
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        columns: {
            type: Array,
            default: () => [],
        },
        dataKey: {
            type: String,
            default: 'defaultKey',
        }
    },
};
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
    overflow: auto;
    white-space: nowrap;
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
    /* Color gris (puedes cambiarlo según tus preferencias) */
    color: #fff;
    /* Texto en color blanco para contrastar */
}



.dataTables_paginate {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Esto centrará los elementos horizontalmente */
    justify-content: center;
}

.dataTables_filter>label {
    display: flex;
    /* Esto centrará los elementos horizontalmente */
    justify-content: center;
    width: 25%;
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
        width: 100%;
        overflow-x: auto;
        /* Ajuste para pantallas más pequeñas */
    }
}



@media (min-width: 601px) {
    .col-lg-10 {
        flex: 0 0 auto;
        width: 100% !important;
    }
}
</style>