<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore(); // Mendapatkan beberapa variable dan function dari auth store pinia
const router = useRouter(); // Mengambil fungsi router untuk pindah halaman

// VALIDASI STATUS LOGIN
const statusLogin = authStore.isAuthenticated; // Mendapatkan data statusLogin
if (statusLogin) { // Jika status login bernilai true
  router.push({ name: "Main" }) // Mengarahkan ke Home and Main page
}
// AKHIR VALIDASI STATUS LOGIN

const username = ref(''); // Tempat penampungan data username dari form login
const password = ref(''); // Tempat penampungan data password dari form login

async function handleLogin() {
  try {
    await authStore.login(username.value, password.value); // Memproses authentikasi ke backend
    router.push({ name: "Main" }) // Mengarahkan ke Home page
  } catch (error) {
    alert("Username / password salah... Silahkan ulangi...");
  }
}
</script>

<template>
  <div class="form-wrapper">
    <div class="glass-card">
      <div class="card-body">
        <div class="text-center mb-4">
          <h1 class="card-title">Login</h1>
          <p class="card-subtitle">Get to know about your body</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username"
              placeholder="Enter your username here" required />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control text-light" id="password" v-model="password"
              placeholder="Enter your password" required />
          </div>

          <button type="submit" class="btn btn-glow w-100">Login</button>

          <div class="form-footer text-center mt-4">
            <p>
              Don't have an account ?
              <RouterLink to="/register">Register Here</RouterLink>
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
  padding: 2rem;
  background-color: #1C1678;
  /* Diganti dari var(--bg-deep-space) */
  font-family: 'Inter', sans-serif;
  /* Diganti dari var(--font-family) */
  background-image:
    linear-gradient(rgba(158, 200, 185, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(158, 200, 185, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* --- Glassmorphism Card --- */
.glass-card {
  width: 100%;
  max-width: 450px;
  background: #8576FF;
  /* Semi-transparent container */
  backdrop-filter: blur(15px);
  /* The frosted glass effect */
  border-radius: 20px;
  border: 1px solid rgba(92, 131, 116, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  color: #A3FFD6;
  /* Diganti dari var(--text-glow) */
}

.card-body {
  padding: 2.5rem;
}

/* --- Header --- */
.card-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #A3FFD6;
  /* Diganti dari var(--text-glow) */
  text-shadow: 0 0 10px rgba(158, 200, 185, 0.5);
}

.card-subtitle {
  font-size: 1rem;
  color: #A3FFD6;
  /* Diganti dari var(--text-glow) */
  opacity: 0.7;
}

/* --- Form Elements --- */
.form-label {
  font-weight: 500;
  opacity: 0.9;
}

.form-control {
  background-color: rgba(9, 38, 53, 0.7);
  /* Darker transparent input */
  border: 1px solid #5c8374;
  /* Diganti dari var(--accent-teal) */
  border-radius: 10px;
  color: #A3FFD6;
  /* Diganti dari var(--text-glow) */
  padding: 0.85rem 1rem;
  transition: all 0.3s ease;
}

.form-control::placeholder {
  color: rgba(158, 200, 185, 0.4);
}

/* --- Input Focus Effect (The Glow) --- */
.form-control:focus {
  background-color: rgba(9, 38, 53, 0.7);
  color: #A3FFD6;
  /* Diganti dari var(--text-glow) */
  border-color: #9ec8b9;
  /* Diganti dari var(--text-glow) */
  outline: none;
  box-shadow: 0 0 15px rgba(158, 200, 185, 0.4);
}

/* --- Custom Glow Button --- */
.btn-glow {
  background: #A3FFD6;
  /* Diganti dari var(--accent-teal) */
  border: none;
  border-radius: 10px;
  color: #092635;
  /* Diganti dari var(--bg-deep-space) */
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(92, 131, 116, 0.3);
}

.btn-glow:hover {
  background-color: #5c8374;
  /* Diganti dari var(--accent-teal) */
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
  color: #A3FFD6;
  /* Diganti dari var(--text-glow) */
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.form-footer a:hover {
  text-decoration: underline;
  filter: brightness(1.2);
}
</style>