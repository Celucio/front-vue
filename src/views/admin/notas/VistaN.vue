<template>
    <Navbar class="mn"></Navbar>
    <div class="wrapper">
        <!-- Sidebar -->
        <div class="sidebar">
            <Sidebar></Sidebar>
        </div>
    </div>
</template>
<script>
import DataTable from '@/components/DataTable.vue';
import { API_URL } from '../../../api/config.js';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios';

export default{
    components: {
        DataTable,
        Navbar,
        Sidebar,
    },
}
</script>