<template>
    <nav class="navbar ">
        <div class="container-fluid">
            <a class="navbar-brand ms-4" href="#"><img class="img" src="../assets/logo E.png"><span
                    class="ms-3 ed"><b>EduTechFusion</b></span></a>
            <ul class="nav me-4">
                <li class="nav-item me-4">
                    <span class="nav-link">Bienvenido <b>{{ nombre }}</b></span>

                </li>
                <li class="nav-item">
                    <a class="btn btn-danger rounded-5 " role="button" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                                d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z" />
                        </svg>
                        <span>Salir</span>
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
};
</script>
  
<style>
/* .btn {
    border-radius: 13px !important;
    font-size: 1rem !important;
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
#a{
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
.img{
    width: 50px;
    height: 50px;
}
.ed{
    color: #037aff;
    font-size: 1rem;
} */
</style>