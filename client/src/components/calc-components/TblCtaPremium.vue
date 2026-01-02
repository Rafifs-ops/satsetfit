<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// ----- KONFIGURASI UI MODAL -----
// State untuk mengontrol tampilan modal
const showPremiumModal = ref(false);
const isLoading = ref(false); // State untuk loading

// Fungsi untuk menampilkan modal saat tombol CTA diklik
function openPremiumModal() {
    showPremiumModal.value = true;
}

// Fungsi untuk menutup modal
function closePremiumModal() {
    showPremiumModal.value = false;
}
// ----- AKHIR KONFIGURASI UI MODAL -----

// ----- PAYMENT GATEWAY ----
// Fungsi untuk menangani proses upgrade
async function handleUpgrade() {
    isLoading.value = true;
    try {
        // 1. Panggil backend untuk membuat transaksi
        const response = await fetch('http://localhost:8080/api/create-transaction/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: authStore.user.username,
                email: authStore.user.email,
            })
        });

        if (!response.ok) {
            throw new Error('Gagal membuat transaksi');
        }

        const transactionData = await response.json();
        const transactionToken = transactionData.token;

        // 2. Panggil Midtrans Snap
        window.snap.pay(transactionToken, {
            onSuccess: async (result) => {
                /* Pembayaran berhasil! */
                console.log('Payment Success:', result);
                alert('Pembayaran berhasil! Akun Anda telah di-upgrade.');

                // 3. Update status user di Firestore
                const id = authStore.user.id;

                await fetch('http://localhost:8080/api/premium/upgrade-prem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(id)
                });


                isLoading.value = false;
                closePremiumModal();
                window.location.reload(); // Muat ulang halaman untuk refresh status premium
            },
            onPending: (result) => {
                /* Pembayaran pending */
                console.log('Payment Pending:', result);
                alert('Menunggu pembayaran Anda...');
                isLoading.value = false;
            },
            onError: (result) => {
                /* Pembayaran gagal */
                console.error('Payment Error:', result);
                alert('Pembayaran gagal. Silakan coba lagi.');
                isLoading.value = false;
            },
            onClose: () => {
                /* Popup ditutup tanpa transaksi */
                alert('Anda menutup popup pembayaran.');
                isLoading.value = false;
            }
        });

    } catch (error) {
        console.error('Error upgrading to premium:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
        isLoading.value = false;
    }
}
// ----- AKHIR PAYMENT GATEWAY ----
</script>

<template>
    <main>
        <div class="fixed-button-container">
            <button class="btn btn-success btn-lg shadow-sm mb-2" @click="openPremiumModal">
                Simpan Hasil
            </button>
            <button class="btn btn-success btn-lg shadow-sm" @click="openPremiumModal">
                Chatbot AI <i class="bi bi-robot"></i>
            </button>
        </div>

        <div v-if="showPremiumModal" class="premium-modal-backdrop" @click.self="closePremiumModal">
            <div class="premium-modal-content">
                <button type="button" class="btn-close premium-modal-close" aria-label="Close"
                    @click="closePremiumModal"></button>
                <div class="premium-modal-body text-center">
                    <i class="bi bi-star-fill premium-icon"></i>
                    <h4 class="premium-text mt-3">Akses Premium</h4>
                    <i class="premium-text">Rp 50.000,00 per Bulan</i>
                    <p class="premium-subtext">Dapatkan akses premium untuk simpan hasil dan berbicara dengan chatbot AI
                    </p>

                    <button class="btn premium-cta-button mt-4" @click="handleUpgrade" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <span v-if="isLoading"> Memproses...</span>
                        <span v-else>Upgrade Sekarang</span>
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* CSS Anda yang sudah ada tetap di sini */
.fixed-button-container {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
}

.premium-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1040;
}

.premium-modal-content {
    background-color: #F8F8F8;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    position: relative;
    max-width: 400px;
    width: 90%;
}

.premium-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1B4242;
}

.premium-icon {
    font-size: 3.5rem;
    color: #092635;
}

.premium-text {
    color: #092635;
    font-weight: 600;
}

.premium-subtext {
    color: #1B4242;
    font-size: 1rem;
}

.premium-cta-button {
    background-color: #5C8374;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: background-color 0.2s ease;
}

.premium-cta-button:hover {
    background-color: #1B4242;
    color: white;
}

/* Style untuk tombol saat loading */
.premium-cta-button:disabled {
    background-color: #5C8374;
    opacity: 0.7;
    cursor: not-allowed;
}
</style>