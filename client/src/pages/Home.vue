<script setup>
import Navbar from '@/components/Navbar.vue';
import FooterComponent from '@/components/Footer.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <main>
        <Navbar />
        <RouterView />
        <FooterComponent />
    </main>
</template>