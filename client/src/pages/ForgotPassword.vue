<script setup>
import { ref, onUnmounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useToastStore } from '../stores/toast';

const router = useRouter();
const toastStore = useToastStore();

const step = ref(1); // Step 1: Input Email | Step 2: Input OTP & Password Baru
const email = ref('');
const otp = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const isResending = ref(false);
const resendCooldown = ref(0);
let cooldownTimer = null;

const startCooldown = (seconds = 60) => {
    resendCooldown.value = seconds;
    if (cooldownTimer) clearInterval(cooldownTimer);
    cooldownTimer = setInterval(() => {
        if (resendCooldown.value > 0) {
            resendCooldown.value--;
        } else {
            clearInterval(cooldownTimer);
        }
    }, 1000);
};

onUnmounted(() => {
    if (cooldownTimer) clearInterval(cooldownTimer);
});

async function handleSendOtp() {
    if (!email.value) {
        toastStore.error("Masukkan alamat email Anda", "Peringatan");
        return;
    }

    try {
        isLoading.value = true;
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || "Gagal mengirim kode OTP");
        }

        toastStore.success("Kode OTP reset password telah dikirim ke email Anda", "OTP Terkirim");
        step.value = 2;
        startCooldown(60);
    } catch (error) {
        toastStore.error(error.message, "Gagal");
    } finally {
        isLoading.value = false;
    }
}

async function handleResetPassword() {
    if (!otp.value || !newPassword.value || !confirmPassword.value) {
        toastStore.error("Semua kolom wajib diisi", "Peringatan");
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        toastStore.error("Konfirmasi password tidak cocok", "Password Beda");
        return;
    }

    try {
        isLoading.value = true;
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                otp: otp.value,
                newPassword: newPassword.value
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || "Gagal mereset password");
        }

        toastStore.success("Password berhasil diubah! Silakan login dengan password baru.", "Sukses");
        router.push({ name: 'Login' });
    } catch (error) {
        toastStore.error(error.message, "Reset Gagal");
    } finally {
        isLoading.value = false;
    }
}

async function handleResendOtp() {
    if (resendCooldown.value > 0) return;

    try {
        isResending.value = true;
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, purpose: 'RESET_PASSWORD' })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || "Gagal mengirim ulang kode OTP");
        }

        toastStore.success("Kode OTP baru telah dikirim ke email Anda.", "OTP Terkirim");
        startCooldown(60);
    } catch (error) {
        toastStore.error(error.message, "Gagal Kirim Ulang");
    } finally {
        isResending.value = false;
    }
}
</script>

<template>
  <div class="form-wrapper">
    <div class="glass-card">
      <div class="card-body">
        <div class="text-center mb-4">
          <h1 class="card-title">Lupa Password</h1>
          <p class="card-subtitle">
            {{ step === 1 ? 'Masukkan email akun Anda untuk menerima kode verifikasi OTP' : 'Masukkan kode OTP dan buat password baru Anda' }}
          </p>
        </div>

        <!-- STEP 1: INPUT EMAIL -->
        <form v-if="step === 1" @submit.prevent="handleSendOtp">
          <div class="mb-4">
            <label for="email" class="form-label">Email Terdaftar</label>
            <input type="email" class="form-control" id="email" v-model="email"
              placeholder="Masukkan email Anda..." required />
          </div>

          <button v-if="isLoading" type="disabled" class="btn btn-glow w-100">
            <div class="spinner-border text-success" role="status"></div>
          </button>
          <button v-else type="submit" class="btn btn-glow w-100">Kirim Kode OTP</button>

          <div class="form-footer text-center mt-4">
            <p>
              Ingat password?
              <RouterLink to="/login">Kembali ke Login</RouterLink>
            </p>
          </div>
        </form>

        <!-- STEP 2: INPUT OTP & PASSWORD BARU -->
        <form v-else @submit.prevent="handleResetPassword">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" :value="email" disabled />
          </div>

          <div class="mb-3">
            <label for="otp" class="form-label">Kode OTP 6 Angka</label>
            <input type="text" maxlength="6" class="form-control otp-input text-center" id="otp" v-model="otp"
              placeholder="••••••" required autocomplete="one-time-code" />
          </div>

          <div class="mb-3">
            <label for="newPassword" class="form-label">Password Baru</label>
            <input type="password" class="form-control" id="newPassword" v-model="newPassword"
              placeholder="Masukkan password baru..." required />
          </div>

          <div class="mb-4">
            <label for="confirmPassword" class="form-label">Konfirmasi Password Baru</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
              placeholder="Ulangi password baru..." required />
          </div>

          <button v-if="isLoading" type="disabled" class="btn btn-glow w-100 mb-3">
            <div class="spinner-border text-success" role="status"></div>
          </button>
          <button v-else type="submit" class="btn btn-glow w-100 mb-3">Reset Password</button>

          <button type="button" 
                  @click="handleResendOtp" 
                  :disabled="isResending || resendCooldown > 0"
                  class="btn btn-outline-glow w-100">
            <span v-if="isResending">Mengirim Ulang...</span>
            <span v-else-if="resendCooldown > 0">Kirim Ulang OTP ({{ resendCooldown }}s)</span>
            <span v-else>Kirim Ulang Kode OTP</span>
          </button>

          <div class="form-footer text-center mt-4">
            <p>
              <a href="#" @click.prevent="step = 1">Ganti Email</a> | 
              <RouterLink to="/login">Kembali ke Login</RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #1C1678;
  font-family: 'Inter', sans-serif;
  background-image:
    linear-gradient(rgba(158, 200, 185, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(158, 200, 185, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.glass-card {
  width: 100%;
  max-width: 450px;
  background: #8576FF;
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(92, 131, 116, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  color: #A3FFD6;
}

.card-body {
  padding: 2.5rem;
}

.card-title {
  font-size: 2rem;
  font-weight: 700;
  color: #A3FFD6;
  text-shadow: 0 0 10px rgba(158, 200, 185, 0.5);
}

.card-subtitle {
  font-size: 0.95rem;
  color: #A3FFD6;
  opacity: 0.8;
}

.form-label {
  font-weight: 500;
  opacity: 0.9;
}

.form-control {
  background-color: rgba(9, 38, 53, 0.7);
  border: 1px solid #5c8374;
  border-radius: 10px;
  color: #A3FFD6;
  padding: 0.85rem 1rem;
  transition: all 0.3s ease;
  width: 100%;
}

.otp-input {
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  font-weight: 700;
}

.form-control::placeholder {
  color: rgba(158, 200, 185, 0.4);
  letter-spacing: normal;
}

.form-control:focus {
  background-color: rgba(9, 38, 53, 0.7);
  color: #A3FFD6;
  border-color: #9ec8b9;
  outline: none;
  box-shadow: 0 0 15px rgba(158, 200, 185, 0.4);
}

.form-control:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-glow {
  background: #A3FFD6;
  border: none;
  border-radius: 10px;
  color: #092635;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(92, 131, 116, 0.3);
}

.btn-glow:hover {
  background-color: #5c8374;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(92, 131, 116, 0.5);
}

.btn-outline-glow {
  background: transparent;
  border: 1.5px solid #A3FFD6;
  border-radius: 10px;
  color: #A3FFD6;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem;
  transition: all 0.3s ease;
}

.btn-outline-glow:hover:not(:disabled) {
  background-color: rgba(163, 255, 214, 0.15);
  color: #fff;
  border-color: #fff;
  transform: translateY(-2px);
}

.btn-outline-glow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-footer p {
  color: rgba(158, 200, 185, 0.75);
  margin-bottom: 0;
}

.form-footer a {
  color: #A3FFD6;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.form-footer a:hover {
  text-decoration: underline;
  filter: brightness(1.2);
}
</style>
