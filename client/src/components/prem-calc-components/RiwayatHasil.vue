<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

// KONFIGURASI TAMPILAN UI MODAL
const showPremiumModal = ref(false); // State untuk mengontrol tampilan modal
function openPremiumModal() { // Fungsi untuk menampilkan modal saat tombol CTA diklik
    showPremiumModal.value = true;
}
function closePremiumModal() {  // Fungsi untuk menutup modal
    showPremiumModal.value = false;
}
// AKHIR KONFIGURASI TAMPILAN UI MODAL

const authStore = useAuthStore();

const savedResults = computed(() => { // Mendapatkan array historyResults dari database
    // Gunakan Optional Chaining (?.) agar tidak error jika user.value masih null/undefined
    return authStore.user?.historyResults || false;
});
</script>

<template>
    <main>
        <button class="btn btn-success btn-lg shadow-sm mb-2" @click="openPremiumModal">
            History <i class="bi bi-clock-history"></i>
        </button>

        <div v-if="showPremiumModal" class="premium-modal-backdrop" @click.self="closePremiumModal">
            <div class="premium-modal-content">
                <button type="button" class="btn-close premium-modal-close" aria-label="Close"
                    @click="closePremiumModal"></button>

                <div class="history-modal-body">
                    <h4 class="modal-title mb-4">Riwayat Hasil Kalkulator</h4>

                    <div v-if="savedResults" class="results-list-container">
                        <div v-for="result in savedResults" :key="result.id" class="result-card">
                            <div class="result-date">{{ result.date }}</div>
                            <div class="result-stats">
                                <span><strong>BMI:</strong> {{ result.bmi }}</span>
                                <span><strong>BMR:</strong> {{ result.bmr }} kkal</span>
                                <span><strong>TDEE:</strong> {{ result.tdde }} kkal</span>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <p class="text-center text-muted mt-3">Belum ada hasil yang disimpan.</p>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Style modal lama masih berlaku */
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
    max-width: 500px;
    /* Sedikit lebih lebar untuk data */
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

/* --- STYLE BARU UNTUK RIWAYAT --- 
Style .premium-icon, .premium-text, .premium-subtext, .premium-cta-button 
sudah tidak terpakai karena elemennya telah dihapus.
*/

.history-modal-body {
    width: 100%;
}

.modal-title {
    color: #092635;
    /* Dark Navy */
    font-weight: 600;
    text-align: center;
}

.results-list-container {
    max-height: 60vh;
    /* Batasi tinggi jika daftar terlalu panjang */
    overflow-y: auto;
    padding-right: 0.5rem;
    /* Ruang untuk scrollbar */
}

.result-card {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.result-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.result-date {
    font-weight: 600;
    color: #1B4242;
    /* Dark Teal */
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
}

.result-stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    /* Agar rapi di layar kecil */
    gap: 0.5rem;
    color: #092635;
    /* Dark Navy */
}

.result-stats span {
    font-size: 0.95rem;
}

.text-muted {
    color: #6c757d;
}

/* Style untuk scrollbar (opsional, tapi membuat lebih rapi) */
.results-list-container::-webkit-scrollbar {
    width: 8px;
}

.results-list-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.results-list-container::-webkit-scrollbar-thumb {
    background: #5C8374;
    /* Medium Green */
    border-radius: 10px;
}

.results-list-container::-webkit-scrollbar-thumb:hover {
    background: #1B4242;
    /* Dark Teal */
}
</style>