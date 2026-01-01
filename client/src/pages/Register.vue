<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter(); // Mendapatkan fungsi router untuk pindah halaman
const authStore = useAuthStore();

// VALIDASI STATUS LOGIN
const statusLogin = authStore.isAuthenticated; // Mendapatkan data statusLogin
if (statusLogin) { // Jika status login bernilai true
    router.push({ name: "Main" }) // Mengarahkan ke Home page
}
// AKHIR VALIDASI STATUS LOGIN

const username = ref(''); // Tempat penampungan data username dari form Register
const email = ref(''); // Tempat penampungan data email dari form Register
const jenisKelamin = ref(''); // Tempat penampungan data jenisKelamin dari form Register
const password = ref(''); // Tempat penampungan data password dari form Register

async function register() {

    const api = 'https://localhost:8080/api/auth/register'
    const dataRegister = {
        username: username.value,
        password: password.value,
        jenis_kelamin: jenisKelamin.value,
        email: email.value,
        isPremium: false
    }

    // PROSES MENAMBAHKAN DATA KE DATABASE
    await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataRegister)
    })
    // AKHIR PROSES MENAMBAHKAN DATA KE DATABASE

    router.push({ name: "Login" }); // Mengarahkan ke Login page
}
</script>

<template>
    <div class="form-wrapper">
        <div class="glass-card">
            <div class="card-body">
                <div class="text-center mb-4">
                    <h1 class="card-title">Register</h1>
                    <p class="card-subtitle">Get to know about your body</p>
                </div>

                <form @submit.prevent="register">
                    <div class="form-grid mb-4">
                        <div>
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="username"
                                placeholder="Enter your new username..." required />
                        </div>

                        <div>
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" v-model="email"
                                placeholder="Enter your email..." required />
                        </div>

                        <div>
                            <label for="gender" class="form-label">Jenis Kelamin</label>
                            <select class="form-select" id="gender" v-model="jenisKelamin" required>
                                <option value="" disabled selected>-- Pilih Jenis Kelamin --</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div>
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password"
                                placeholder="Buat password Anda..." required />
                        </div>
                    </div>

                    <button type="submit" class="btn btn-glow w-100">Register</button>

                    <div class="form-footer text-center mt-4">
                        <p>
                            Already have a profile?
                            <RouterLink to="/login">Login Here</RouterLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

/* --- Main Wrapper --- */
.form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
    /* Reduced padding for small screens */
    font-family: 'Inter', sans-serif;
    background: linear-gradient(160deg, #092635 0%, #1B4242 50%, #5C8374 100%);
    background-size: cover;
}

/* --- Form Grid (Mobile-First) --- */
.form-grid {
    display: grid;
    grid-template-columns: 1fr;
    /* Default to 1 column for mobile */
    gap: 1.25rem;
}

/* --- Glassmorphism Card --- */
.glass-card {
    width: 100%;
    max-width: 550px;
    background: rgba(27, 66, 66, 0.6);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    border: 1px solid rgba(92, 131, 116, 0.2);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    color: #9EC8B9;
}

.card-body {
    padding: 2rem 1.5rem;
    /* Reduced padding for small screens */
}

/* --- Header --- */
.card-title {
    font-size: 1.8rem;
    /* Adjusted font size for mobile */
    font-weight: 700;
    color: #9EC8B9;
    text-shadow: 0 0 10px rgba(158, 200, 185, 0.5);
}

.card-subtitle {
    font-size: 1rem;
    color: #9EC8B9;
    opacity: 0.7;
}

/* --- Form Elements --- */
.form-label {
    font-weight: 500;
    opacity: 0.9;
    display: block;
    margin-bottom: 0.5rem;
}

.form-control,
.form-select {
    background-color: rgba(9, 38, 53, 0.7);
    border: 1px solid #5C8374;
    border-radius: 10px;
    color: #9EC8B9;
    padding: 0.85rem 1rem;
    transition: all 0.3s ease;
    width: 100%;
}

.form-control::placeholder {
    color: rgba(158, 200, 185, 0.4);
}

.form-control:focus,
.form-select:focus {
    background-color: rgba(9, 38, 53, 0.7);
    color: #9EC8B9;
    border-color: #9EC8B9;
    outline: none;
    box-shadow: 0 0 15px rgba(158, 200, 185, 0.4);
}

.form-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%239EC8B9' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 16px 12px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.form-select option {
    background-color: #092635;
    color: #9EC8B9;
}

/* --- Custom Glow Button --- */
.btn-glow {
    background: #5C8374;
    border: none;
    border-radius: 10px;
    color: #092635;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 0.85rem;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(92, 131, 116, 0.3);
}

.btn-glow:hover {
    background-color: #5C8374;
    color: #fff;
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(92, 131, 116, 0.5);
}

.btn-glow:active {
    transform: translateY(-1px);
}

/* --- Footer Link --- */
.form-footer p {
    color: rgba(158, 200, 185, 0.7);
    margin-bottom: 0;
}

.form-footer a {
    color: #9EC8B9;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
}

.form-footer a:hover {
    text-decoration: underline;
    filter: brightness(1.2);
}


/* --- 🌟 RESPONSIVE ADJUSTMENTS 🌟 --- */
/* For tablets and larger screens (768px and up) */
@media (min-width: 768px) {
    .form-wrapper {
        padding: 2rem;
        /* Restore larger padding */
    }

    .form-grid {
        grid-template-columns: 1fr 1fr;
        /* Switch to 2 columns */
    }

    .card-body {
        padding: 2.5rem;
        /* Restore larger padding */
    }

    .card-title {
        font-size: 2.25rem;
        /* Restore larger font size */
    }
}
</style>
