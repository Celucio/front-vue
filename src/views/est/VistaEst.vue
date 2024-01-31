<template>
    <Navbar class="mn"></Navbar>
    <div class="wrapper">
        <div class="sidebar">
            <Side></Side>
        </div>
        <div class="main-content" id="content">
            <div class="">
                <div class="">
                    <div class="row">
                        <div class="col-sm-6">
                            <h1 style="font-family: 'Prompt'; font-size: 2rem;">Bienvenido</h1><br>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Side from '@/components/Side.vue';
import Navbar from '@/components/Navbar.vue';
export default {
    components: {
        Side,
        Navbar
    }
}
</script>
<style>

</style>
