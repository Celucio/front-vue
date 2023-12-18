
<template>
    <Navbar class="mn"></Navbar>
    <div class="wrapper">
        <!-- Sidebar -->
        <div class="sidebar">
            <h1>Hola</h1>
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
                            <a href="/admin/estudiante/crear" class="btn btn-success float-end mt-3" style="font-family: 'Montserrat';"><i
                                    class="fa-solid fa-plus"></i> <b>Crear</b></a>
                        </div>
                    </div>

                    <div class="table-responsive" style="font-family: 'Prompt'; font-size: small; overflow-x:visible;">
                        <div class="table-container">
                            <DataTable :key="estudiantes" :data="estudiantes" :columns="columns"
                                class="table " paginator responsiveLayout="scroll" :options="{
                                    responsive: true,
                                    autoWidth: false,
                                    pageLength: 4,
                                    dom: 'Bfrtip',
                                    language: {
                                        search: '',
                                        zeroRecords: 'No se encontraron registros',
                                        info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
                                        infoFiltered: '(filtrado de un total de _MAX_ registros)',
                                        paginate: {
                                            first: 'Primero',
                                            last: 'Último',
                                            next: 'Siguiente',
                                            previous: 'Anterior'
                                        },
                                        searchPlaceholder: ' Buscar',
                                        
                                    },
                                    
                                    buttons: botones,
                                    createdRow: function (row, data, dataIndex) {
                                        var cells = row.cells;
                                        for (var i = 0; i < cells.length; i++) {
                                            cells[i].style.whiteSpace = 'nowrap';
                                            cells[i].style.overflowX = 'auto';
                                        }
                                    },
                                }
                                    ">
                                <div class="contenido">
                                    <thead class="encabezado-tabla">
                                        <tr>
                                            <th style="max-width: 100px;">Nombre</th>
                                            <th style="max-width: 100px;">Apellido</th>
                                            <th style="width: 100px;">Cédula</th>
                                            <th style="width: 100px;">Fecha de Nacimiento</th>
                                            <th style="width: 150px; ">
                                                Dirección
                                            </th>
                                            <th style="width: 200px;">Correo</th>
                                            <th style="max-width: 50px;">Celular</th>
                                            <th style="width: 70px;"></th>
                                        </tr>
                                    </thead>
                                </div>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import Buttons from 'datatables.net-buttons-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import print from 'datatables.net-buttons/js/buttons.print';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

pdfmake.vfs = pdfFonts.pdfMake.vfs;
import 'datatables.net-responsive-bs5';
import JsZip from 'jszip';
window.JSZip = JsZip;
DataTable.use(DataTableLib);
DataTable.use(pdfmake);
DataTable.use(ButtonsHtml5);

export default {
    components: {
        DataTable,
        Navbar,
        Sidebar,
    },
    data() {
        return {

            estudiantes: null,
            columns: [
                { data: 'nombre' },
                { data: 'apellido' },
                { data: 'cedula' },
                { data: 'fechaNacimiento' },
                { data: 'direccion' },
                { data: 'correo' },
                { data: 'celular' },
                {
                    data: null, render: function (data, type, row, meta) { return `<a href="/admin/estudiante/editar/${row.id}" class="btn btn-warning"><i class="fa-solid fa-edit"></i></a>` }
                }
            ],
            botones: [
                {
                    title: 'Reporte de productos',
                    extend: 'excelHtml5',
                    text: '<i class="fa-solid fa-file-excel"></i>Excel',
                    className: 'btn btn-success'
                },
                {
                    title: 'Reporte de productos',
                    extend: 'pdfHtml5',
                    text: '<i class="fa-solid fa-file-pdf"></i> PDF',
                    titleAttr: 'PDF',
                    className: 'btn btn-danger'
                },
                {
                    title: 'Reporte de productos',
                    extend: 'print',
                    text: '<i class="fa-solid fa-print"></i> Imprimir',
                    titleAttr: 'Imprimir',
                    className: 'btn btn-secondary'
                },
                {
                    title: 'Reporte de productos',
                    extend: 'copy',
                    text: '<i class="fa-solid fa-copy"></i> Copiar',
                    className: 'btn btn-light'
                }
            ],

        }
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            axios.get('http://54.196.78.164:3000/api/estudiante').then(
                res => {
                    this.estudiantes = res.data.map(estudiante => {
                        return {
                            ...estudiante,
                            fechaNacimiento: this.formatFecha(estudiante.fechaNacimiento)
                        };
                    });
                }
            )
        },
        formatFecha(fecha) {
            const fechaFormateada = new Date(fecha).toLocaleDateString();
            return fechaFormateada;
        }
    }

}

</script>
<style>
.btn {
    font-size: 1rem !important;
    border-radius: 15px !important;
    
}

.btn-group, .btn-group-vertical {
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
  background-color: #d3d3d3 !important; /* Color gris (puedes cambiarlo según tus preferencias) */
  color: #fff; /* Texto en color blanco para contrastar */
}

/*scroll*/
.table td::-webkit-scrollbar {
    width: 8px;
    height: 5px;
    margin:  5px;
}

.table td::-webkit-scrollbar-thumb {
    background-color: #868686 !important;
    border-radius: 5px !important;
    border: 1px solid #f1f2f3 !important;
    padding: 0%;
}

.table td::-webkit-scrollbar-track {
    background-color: #f1f1f1 !important;
    border-radius: 10px !important;
}



.dataTables_paginate {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Esto centrará los elementos horizontalmente */
    justify-content: center;
}

.dataTables_filter>label{
    display: flex;
    /* Esto centrará los elementos horizontalmente */
    justify-content: center;
    width: 25%;
}

.dataTables_filter{
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

    #content{ 
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
