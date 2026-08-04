<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useToastStore } from '../stores/toast';

const authStore = useAuthStore(); // Mendapatkan beberapa variable dan function dari auth store pinia
const toastStore = useToastStore(); // Menggunakan store notifikasi toast
const router = useRouter(); // Mengambil fungsi router untuk pindah halaman

// VALIDASI STATUS LOGIN
const statusLogin = authStore.isAuthenticated; // Mendapatkan data statusLogin
if (statusLogin) { // Jika status login bernilai true
  router.push({ name: "Main" }) // Mengarahkan ke Home and Main page
}
// AKHIR VALIDASI STATUS LOGIN

const username = ref(''); // Tempat penampungan data username dari form login
const password = ref(''); // Tempat penampungan data password dari form login
const isLoading = ref(false); // State untuk loading

async function handleLogin() {
  try {
    isLoading.value = true // Mengaktifkan tampilan loading
    await authStore.login(username.value, password.value); // Memproses authentikasi ke backend
    toastStore.success(`Selamat datang kembali, ${username.value}!`, "Login Berhasil");
    router.push({ name: "Main" }) // Mengarahkan ke Home page
  } catch (error) {
    if (error.data && error.data.needVerification) {
      toastStore.info(error.message || "Email belum diverifikasi. Kode OTP telah dikirim ke email Anda.", "Verifikasi Diperlukan");
      router.push({ name: "VerifyEmail", query: { email: error.data.email } });
    } else {
      toastStore.error(error.message || "Username / password salah... Silahkan ulangi...", "Login Gagal");
    }
  } finally {
    isLoading.value = false; // Menonaktifkan tampilan loading
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

          <div class="mb-2">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password"
              placeholder="Enter your password" required />
          </div>

          <div class="text-end mb-4">
            <RouterLink to="/forgot-password" class="forgot-link">Lupa Password?</RouterLink>
          </div>

          <button v-if="isLoading" type="disabled" class="btn btn-glow w-100">
            <div class="spinner-border text-success" role="status"></div>
          </button>
          <button v-else type="submit" class="btn btn-glow w-100">Login</button>

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
  padding: 1rem;
  /* Reduced padding for small screens */
  font-family: 'Inter', sans-serif;
  background: linear-gradient(160deg, #1C1678 0%, #8576FF 50%, #A3FFD6 100%);
  background-size: cover;
}

/* --- Glassmorphism Card --- */
.glass-card {
  width: 100%;
  max-width: 450px;
  background: #1C1678;
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
}

.form-control {
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

/* --- Input Focus Effect (The Glow) --- */
.form-control:focus {
  background-color: rgba(9, 38, 53, 0.7);
  color: #9EC8B9;
  border-color: #9EC8B9;
  outline: none;
  box-shadow: 0 0 15px rgba(158, 200, 185, 0.4);
}

/* --- Custom Glow Button --- */
.btn-glow {
  background: #A3FFD6;
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

.forgot-link {
  color: #9EC8B9;
  font-size: 0.88rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.forgot-link:hover {
  color: #A3FFD6;
  text-decoration: underline;
}

/* --- 🌟 RESPONSIVE ADJUSTMENTS 🌟 --- */
@media (min-width: 768px) {
  .form-wrapper {
    padding: 2rem;
  }

  .card-body {
    padding: 2.5rem;
  }

  .card-title {
    font-size: 2.25rem;
  }
}
</style>