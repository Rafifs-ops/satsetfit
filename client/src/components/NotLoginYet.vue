<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100 p-3" :style="{ backgroundColor: '#9EC8B9' }">
        <div class="card shadow-lg p-5 text-center" :style="{ backgroundColor: '#F8F9FA', color: '#1B4242' }">
            <h1 class="mb-4 display-4">👋</h1>
            <p class="lead mb-4">Anda belum login, silakan <a href="#" class="login-link">login</a> / <a href="#"
                    class="register-link">register</a> terlebih dahulu.</p>
            <div class="d-grid gap-2 col-6 mx-auto">
                <RouterLink to="Login" class="btn btn-primary"
                    :style="{ backgroundColor: '#5C8374', borderColor: '#5C8374' }">Login</RouterLink>
                <RouterLink to="Register" class="btn btn-outline-secondary"
                    :style="{ color: '#092635', borderColor: '#092635' }">Register</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.min-vh-100 {
    min-height: 100vh;
}

.card {
    border-radius: 15px;
    max-width: 500px;
    width: 100%;
}

.login-link {
    color: #092635;
    /* Darker color for emphasis */
    text-decoration: none;
    font-weight: bold;
}

.login-link:hover {
    color: #1B4242;
    text-decoration: underline;
}

.register-link {
    color: #092635;
    /* Darker color for emphasis */
    text-decoration: none;
    font-weight: bold;
}

.register-link:hover {
    color: #1B4242;
    text-decoration: underline;
}

.btn-primary:hover {
    background-color: #1B4242 !important;
    border-color: #1B4242 !important;
}

.btn-outline-secondary:hover {
    background-color: #092635 !important;
    color: #F8F9FA !important;
}
</style>