<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.isAuthenticated) {
    await authStore.checkPremiumStatus(); // Setiap kali user refresh halaman, cek apakah masa premium masih berlaku
    await authStore.refreshUserData(); // Cek data terbaru setiap kali refresh halaman
  }
});
</script>

<template>
  <RouterView />
</template>
