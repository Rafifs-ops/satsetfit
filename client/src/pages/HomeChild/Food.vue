<script setup>
import { useAuthStore } from "@/stores/auth";
import HeaderFood from "@/components/food-components/HeaderFood.vue";
import OpeningPGS from "@/components/food-components/OpeningPGS.vue";
import IsiPiringku from "@/components/food-components/IsiPiringku.vue";
import GGL from "@/components/food-components/GGL.vue";
import PesanGiziSeimbang from "@/components/food-components/PesanGiziSeimbang.vue";
import TGS from "@/components/food-components/TGS.vue";
import FooterFood from "@/components/food-components/FooterFood.vue";
import NotLoginYet from "@/components/NotLoginYet.vue";

const authStore = useAuthStore();// Mendapatkan beberapa variable dan function dari auth store pinia
const statusLogin = authStore.isAuthenticated; // Mendapatkan status login, output: boolean
</script>

<template>
    <div v-if="statusLogin" class="gizi-page-wrapper">
        <HeaderFood />

        <main class="container">
            <OpeningPGS />
            <IsiPiringku />
            <GGL />
            <PesanGiziSeimbang />
            <TGS />
        </main>

        <FooterFood/>
    </div>
    <div v-else>
        <NotLoginYet />
    </div>
</template>

<style scoped>
.gizi-page-wrapper {
    background-color: #7BC9FF;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
}
</style>