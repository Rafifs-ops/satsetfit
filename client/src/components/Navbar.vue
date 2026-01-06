<script setup>
import { RouterLink, useRouter } from 'vue-router';
import Profil from './Profil.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Mendapatkan status login, output: boolean
// Menggunakan computed agar nilai bisa berubah secara otomatis ketika ada perubahan
const statusLogin = authStore.isAuthenticated;
const router = useRouter() // Mendapatkan fungsi router untuk pindah halaman

function logout() {
    authStore.logout();
    router.push({ name: "Login" }) // Mengarahkan ke Login page
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light sticky-top" style="background-color: #1C1678;">
        <div class="container-fluid">
            <!--Logo-->
            <RouterLink class="navbar-brand" to="/"><img src="../assets/img/logo-satsetfit.png" alt="" width="50"
                    height="auto"></RouterLink>

            <!--Tbl Menu untuk responsive-->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!--Links-->
            <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div class="navbar-nav ms-0 gap-lg-5">
                    <RouterLink class="nav-link" to="/" active-class="active-link text-light">Main</RouterLink>
                    <RouterLink class="nav-link" to="/calc" active-class="active-link text-light">Calc</RouterLink>
                    <RouterLink class="nav-link" to="/food" active-class="active-link text-light">Food</RouterLink>
                    <RouterLink class="nav-link" to="/excercise" active-class="active-link text-light">Exercise
                    </RouterLink>
                    <RouterLink class="nav-link" to="/product" active-class="active-link text-light">Product
                    </RouterLink>

                    <!--Profil dan Tombol Login/Logout Responsive Ver-->
                    <div class="d-lg-none">
                        <div v-if="statusLogin">
                            <Profil />
                            <RouterLink class="btn text-light fw-bold rounded-5 mt-2"
                                style="background-color: red;" to="/login" v-on:click="logout">Logout <i
                                    class="bi bi-arrow-right-circle"></i></RouterLink>
                        </div>
                        <div v-else>
                            <RouterLink class="btn fw-bold rounded-5"
                                style="background-color: #A3FFD6;" to="/login">Login <i
                                    class="bi bi-arrow-right-circle"></i>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>

            <!--Profil dan Tombol Login/Logout-->
            <div class="d-none d-lg-flex">
                <div v-if="statusLogin" class="d-flex gap-2">
                    <Profil />
                    <RouterLink class="btn text-light fw-bold rounded-5"
                        style="background-color: red;" to="/login" v-on:click="logout">Logout <i
                            class="bi bi-arrow-right-circle"></i></RouterLink>
                </div>
                <div v-else>
                    <RouterLink class="btn fw-bold rounded-5"
                        style="background-color: #A3FFD6;" to="/login">Login <i class="bi bi-arrow-right-circle"></i>
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
a.nav-link {
    color: #7BC9FF;
}

.active-link {
    font-weight: 900;
}
</style>