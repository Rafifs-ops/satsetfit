<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore(); // Mendapatkan beberapa variable dan fungsi dari auth store pinia

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await authStore.checkPremiumStatus(); // Setiap kali user refresh halaman, cek apakah masa premium masih berlaku
  }
});
</script>

<template>
  <RouterView />
</template>
