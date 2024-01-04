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
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Bienvenido</h1><br>
                        </div>
                    </div>
                    <div class="row" style="font-family: 'Prompt'">
                        <div class="col-sm-6" >
                            
                            <div class="d-flex flex-column justify-content-center ">
                                <div class="p-2"><router-link :to="{ path:'/admin/estudiante/'}" class="navbar-brand ms-4" ><img class="img" src="../../assets/estudiante.png"
                                    style="width: 400px; height: 400px;"></router-link></div>
                                <div class="p-2 text-center"><b>Vista Estudiante</b></div>
                                
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="d-flex flex-column justify-content-center ">
                                <div class="p-2"><router-link :to="{ path:'/admin/docente/'}" class="navbar-brand ms-4"><img class="img" src="../../assets/docente.png"
                                    style="width: 400px; height: 400px;"></router-link></div>
                                <div class="p-2 text-center "><b>Vista Docente</b></div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
export default {
    components: {
        Sidebar,
        Navbar
    }
}
</script>
