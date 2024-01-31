
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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Roles</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import DataTable from '@/components/DataTable.vue';
import { API_URL } from '../../../api/config.js';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios'

export default {
    components: {
        // DataTable,
        Navbar,
        Sidebar,
    },
    data() {
        return {

            // datos: [],
            // columnas: [
            // ],
            // key: 'defaultKey'

        }
    },
    mounted() {
    },
    methods: {
      
    }

}

</script>

