<script setup>
import InfoBMI from '@/components/calc-components/InfoBMI.vue';
import HasilHitung from '@/components/calc-components/HasilHitung.vue';
import HasilHitungPrem from '@/components/prem-calc-components/HasilHitungPrem.vue';
import EstimateTdde from '@/components/calc-components/EstimateTdde.vue';
import FyiRumus from '@/components/calc-components/FyiRumus.vue';
import TblCtaPremium from '@/components/calc-components/TblCtaPremium.vue';
import RiwayatHasil from '@/components/prem-calc-components/RiwayatHasil.vue';
import Chatbot from '@/components/prem-calc-components/Chatbot.vue';
import NotLoginYet from '@/components/NotLoginYet.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useCalculator } from '@/composables/useCalculator';
import { useAuthStore } from '@/stores/auth';

// Mendapatkan data auth dan status login
const authStore = useAuthStore();
const statusLogin = authStore.isAuthenticated; // Mendapatkan status login, output: boolean;

// Proses pengambilan statusPremium
const statusPremium = authStore.user.isPremium;
const isPremium = computed(() => { return statusPremium === true });

const resultSection = ref(null); // Mendapatkan section untuk target scroll otomatis

// Validasi masa status premium
onMounted(async () => {
    await fetch('http://localhost:8080/api/premium/validate-exp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: authStore.user.id
    })
});

// Tempat penyimpanan input data dari user dan nilai default
const inputData = ref({
    jenisKelamin: localStorage.getItem("gender"),
    usia: 0,
    beratBadan: 0,
    tinggiBadan: 0,
    tingkatAktvitas: 1.2,
});

// Mengakses composable untuk mendapatkan data hasil hitung dan fungsi hitung
const { hasilHitung, hitung } = useCalculator();
function handleSubmitHitung() {
    const success = hitung(inputData.value); // Panggil logika dari composable dan mengirim argument input data

    if (!success) { // Jika fungsi hitung mengembalikan nilai false
        alert("Silahkan input data diri Anda terlebih dahulu....");
        return; // Menghentikan eksekusi program
    }

    // Scroll otomatis
    if (resultSection.value) {
        resultSection.value.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- PROSES SAVE HASIL DAN INPUT PERHITUNGAN DI LOCALSTORAGE ---

// 1. LOAD: Saat halaman baru dibuka/refresh, ambil data dari penyimpanan
onMounted(() => {
    const savedInput = localStorage.getItem('fitcal_input');
    const savedHasil = localStorage.getItem('fitcal_hasil');

    if (savedInput) {
        // Parse JSON kembali menjadi object
        inputData.value = JSON.parse(savedInput);
    }

    if (savedHasil) {
        hasilHitung.value = JSON.parse(savedHasil);
    }
});

// 2. SAVE: Setiap kali data input berubah, simpan ke penyimpanan
watch(inputData, (newVal) => {
    localStorage.setItem('fitcal_input', JSON.stringify(newVal));
}, { deep: true }); // 'deep: true' agar bisa mendeteksi perubahan di dalam object

// 3. SAVE: Setiap kali hasil hitung berubah, simpan juga
watch(hasilHitung, (newVal) => {
    localStorage.setItem('fitcal_hasil', JSON.stringify(newVal));
}, { deep: true });

// --- AKHIR PROSES SAVE HASIL DAN INPUT PERHITUNGAN DI LOCALSTORAGE ---
</script>

<template>
    <main>
        <div v-if="statusLogin">
            <div class="calculator-wrapper py-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10 col-xl-9">

                            <div class="card shadow-lg border-0">

                                <div class="card-header text-center text-white">
                                    <h1 class="my-2">Kalkulator Kesehatan</h1>
                                </div>

                                <div class="card-body p-4 p-md-5">

                                    <h2 class="section-title mb-4">Data Diri Anda</h2>
                                    <form @submit.prevent="handleSubmitHitung">
                                        <div class="row g-3 mb-3">
                                            <div class="col-md-6">
                                                <p class="form-label">Jenis Kelamin Anda</p>
                                                <h1>{{ inputData.jenisKelamin }}</h1>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="age" class="form-label">Usia (Tahun)</label>
                                                <input type="number" id="age" class="form-control form-control-lg"
                                                    placeholder="Contoh: 28" v-model.number="inputData.usia">
                                            </div>
                                        </div>

                                        <div class="row g-3 mb-4">
                                            <div class="col-md-6">
                                                <label for="weight" class="form-label">Berat Badan (kg)</label>
                                                <input type="number" id="weight" class="form-control form-control-lg"
                                                    placeholder="Contoh: 70" v-model.number="inputData.beratBadan">
                                            </div>
                                            <div class="col-md-6">
                                                <label for="height" class="form-label">Tinggi Badan (cm)</label>
                                                <input type="number" id="height" class="form-control form-control-lg"
                                                    placeholder="Contoh: 175" v-model.number="inputData.tinggiBadan">
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <label for="activity" class="form-label">Tingkat Aktivitas</label>
                                            <select id="activity" class="form-select form-select-lg"
                                                v-model.number="inputData.tingkatAktvitas">
                                                <option value="1.2">Sangat jarang/tidak berolahraga (duduk)</option>
                                                <option value="1.375">Olahraga ringan (1-3 hari/minggu)</option>
                                                <option value="1.55">Olahraga sedang (3-5 hari/minggu)</option>
                                                <option value="1.725">Olahraga berat (6-7 hari/minggu)</option>
                                                <option value="1.9">Olahraga sangat berat (atlet profesional)</option>
                                            </select>
                                        </div>

                                        <button type="submit"
                                            class="btn btn-success py-1 px-2 text-center">Hitung</button>
                                    </form>

                                    <hr class="my-4 my-md-5" ref="resultSection">

                                    <!--Hasil Pehitungan-->
                                    <!--Mengirim data/variable hasilHitung melalui props ke komponen child-->
                                    <HasilHitungPrem v-if="isPremium" :hasilHitung="hasilHitung" />
                                    <HasilHitung v-else :hasilHitung="hasilHitung" />

                                    <!--Estimate TDDE-->
                                    <EstimateTdde :hasilHitung="hasilHitung" />

                                    <!--Informasi BMI-->
                                    <InfoBMI />

                                    <!--Informasi Tambahan-->
                                    <FyiRumus />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fixed-button-container">
                    <TblCtaPremium v-if="!isPremium" />
                    <RiwayatHasil v-if="isPremium" />
                    <Chatbot v-if="isPremium" :hasilHitung="hasilHitung" :inputData="inputData" />
                </div>
            </div>
        </div>

        <div v-else>
            <NotLoginYet />
        </div>
    </main>
</template>

<style scoped>
.calculator-wrapper {
    background-color: #9EC8B9;
    /* Light Mint */
    min-height: 100vh;
    /* Menggunakan font sistem modern */
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
}

.card {
    border-radius: 1rem;
    /* Sudut lebih bulat */
    overflow: hidden;
    /* Memastikan header mengikuti border-radius */
}

.card-header {
    background-color: #092635;
    /* Dark Navy */
    border-bottom: 0;
}

.card-header h1 {
    color: #9EC8B9;
    /* Light Mint */
    font-weight: 300;
    letter-spacing: 0.5px;
}

.section-title {
    color: #1B4242;
    /* Dark Teal */
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #9EC8B9;
    /* Light Mint */
    display: inline-block;
}

.form-label {
    color: #1B4242;
    /* Dark Teal */
    font-weight: 500;
    margin-bottom: 0.25rem;
}

/* Kustomisasi fokus Bootstrap agar sesuai palet */
.form-control:focus,
.form-select:focus {
    border-color: #5C8374;
    /* Medium Green */
    box-shadow: 0 0 0 0.25rem rgba(92, 131, 116, 0.25);
    /* Medium Green Transparan */
}

.form-control-lg,
.form-select-lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.1rem;
}

.fixed-button-container {
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
}
</style>