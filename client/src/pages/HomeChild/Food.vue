<script setup>
import HeaderFood from "@/components/food-components/HeaderFood.vue";
import OpeningPGS from "@/components/food-components/OpeningPGS.vue";
import IsiPiringku from "@/components/food-components/IsiPiringku.vue";
import GGL from "@/components/food-components/GGL.vue";
import PesanGiziSeimbang from "@/components/food-components/PesanGiziSeimbang.vue";
import TGS from "@/components/food-components/TGS.vue";
import FooterFood from "@/components/food-components/FooterFood.vue";
</script>

<template>
    <div class="gizi-page-wrapper">
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
</template>

<style scoped>
.gizi-page-wrapper {
    background-color: #7BC9FF;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
}
</style>