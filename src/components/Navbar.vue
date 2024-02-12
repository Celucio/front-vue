<template>
    <nav class="navbar">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 ">
                    <img class="img ms-4" src="../assets/logo E.png">
                </div>
                <div class="col-md-6">
                    <span class="ms-0 ed" style="font-size: 15px;"><b>EduTechFusion</b></span>
                    <span class="ms-0 ed" style="font-size: 12px;"> Sistema Escolar</span>
                </div>
            </div>
            <ul class="nav me-4">
                <li class="nav-item me-4">
                    <span class="nav-link">Bienvenido/a <b>{{ nombre }}</b></span>
                </li>
                <li class="nav-item">
                    <a class="btn btn-danger" role="button" href="/">
                        <i class="fa-solid fa-right-to-bracket"></i><span> Salir</span>
                        
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    props: {
        nombre: {
            type: String,
            required: true,
        },
    },
    name: "Navbar"
};
</script>
<style>
.btn {
    font-size: 0.5rem !important;
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

.navbar {
    box-shadow: -1px 13px 27px -9px rgba(0, 0, 0, 0.28);
    -webkit-box-shadow: -1px 13px 27px -9px rgba(0, 0, 0, 0.28);
    -moz-box-shadow: -1px 13px 27px -9px rgba(0, 0, 0, 0.28);
}
</style>