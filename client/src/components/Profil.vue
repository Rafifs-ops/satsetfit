<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Proses pengambilan statusPremium
const isPremium = computed(() => authStore.user?.isPremium === true);
</script>

<template>
    <div class="profile-dropdown dropdown">

        <button class="btn dropdown-toggle" type="button" id="profileMenuButton" data-bs-toggle="dropdown"
            aria-expanded="false">
            <i class="bi bi-person-circle"></i>
        </button>

        <div class="dropdown-menu dropdown-menu-md-end p-3" aria-labelledby="profileMenuButton">
            <div class="profile-item">
                <strong>ID User</strong>
                <span>{{ authStore.user.id }}</span>
            </div>
            <div class="profile-item">
                <strong>Username</strong>
                <span>{{ authStore.user.username }}</span>
            </div>
            <div class="profile-item">
                <strong>Email</strong>
                <span>{{ authStore.user.email }}</span>
            </div>
            <div class="profile-item">
                <strong>Jenis Kelamin</strong>
                <span>{{ authStore.user.jenis_kelamin }}</span>
            </div>
            <div class="profile-item">
                <strong>Status</strong>
                <span v-if="isPremium">Premium</span>
                <span v-else>Not Premium</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Style ini di-scope, artinya hanya akan berlaku untuk komponen ini.
  Kita menargetkan kelas Bootstrap secara langsung di dalam scope kita.
*/

/* --- Tombol Utama --- */
.dropdown-toggle {
    background-color: #1B4242;
    /* Dark Teal */
    color: #9EC8B9;
    /* Light Mint */
    border: 1px solid #5C8374;
    /* Muted Green */
    font-weight: 500;
}

/* State Hover & Focus pada Tombol */
.dropdown-toggle:hover,
.dropdown-toggle:focus {
    background-color: #5C8374;
    /* Muted Green */
    color: #092635;
    /* Very Dark Blue */
    border-color: #9EC8B9;
}

/* Bootstrap menggunakan pseudo-element ::after untuk panah dropdown.
  Kita perlu :deep() untuk menimpa warnanya di dalam style scoped.
*/
:deep(.dropdown-toggle::after) {
    border-top-color: #9EC8B9;
}

:deep(.dropdown-toggle:hover::after),
:deep(.dropdown-toggle:focus::after) {
    border-top-color: #092635;
}


/* --- Menu Dropdown (yang "ngambang") --- */
.dropdown-menu {
    background-color: #092635;
    /* Very Dark Blue (Background paling gelap) */
    border: 1px solid #1B4242;
    /* Dark Teal */
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    /* Shadow agar terlihat ngambang */

    /* Ukuran dan responsivitas */
    min-width: 280px;
    max-width: 90vw;
    /* Agar tidak meluber di layar HP */
}

/* --- Item di dalam Menu --- */
.profile-item {
    margin-bottom: 1rem;
    overflow-wrap: break-word;
    /* Memastikan email/username panjang tidak merusak layout */
}

.profile-item:last-child {
    margin-bottom: 0;
}

/* Label (ID, Username, dll) */
.profile-item strong {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #5C8374;
    /* Muted Green */
    margin-bottom: 2px;
}

/* Nilai (fitcal_user, email, dll) */
.profile-item span {
    color: #9EC8B9;
    /* Light Mint */
    font-size: 0.95rem;
}
</style>