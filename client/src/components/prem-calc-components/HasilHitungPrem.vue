<script setup>
import { defineProps, ref, toRefs, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps(["hasilHitung"]); // Menerima data hasil perhitungan dari komponen induk(PremCalc.vue)
const { hasilHitung } = toRefs(props) // Menjaga reaktivitas data/variabel saat menggunakan destruk

// Cek apakah perhitungan sudah dilakukan ? output = Boolean
const hasCalculated = computed(() => hasilHitung.value.tdde > 0 && hasilHitung.value.bmi > 0 && hasilHitung.value.bmr > 0);

const authStore = useAuthStore();
const userId = authStore.user.id;

const loading = ref(false); // State default untuk loading

async function simpanHasil() {
    try {
        loading.value = true // Menampilkan tampilan loading
        const newResult = {
            id: userId,
            bmi: hasilHitung.value.bmi, // Gunakan .value untuk mengakses data dari toRefs
            bmr: hasilHitung.value.bmr,
            tdde: hasilHitung.value.tdde,
            date: new Date()
        };

        // Menambahkan objek/nilai baru ke array 'historyResults'
        await fetch('http://localhost:8080/api/save/calc-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResult)
        });

        await authStore.refreshUserData();

        alert("Hasil Kalkuator berhasil disimpan....")
        window.location.reload(); // Muat ulang halaman untuk refresh untuk update atau tambah history baru

    } catch (error) {
        console.error('Error saat menambahkan field: ', error);
    } finally {
        loading.value = false // Menghilangkan tampilan loading
    }
}
</script>

<template>
    <div v-if="hasCalculated">
        <h2 class="section-title text-center mb-4">Hasil Perhitungan</h2>
        <div class="row g-4">

            <div class="col-md-4">
                <div class="card result-card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-center">
                        <h5 class="result-title">BMI</h5>
                        <p class="result-value display-5 fw-bold">{{ hasilHitung.bmi }}</p>
                        <span class="badge result-badge-normal align-self-center">
                            kg/m²
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card result-card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-center">
                        <h5 class="result-title">BMR</h5>
                        <p class="result-value display-5 fw-bold">{{ hasilHitung.bmr }}</p>
                        <span class="badge result-badge-info align-self-center">
                            kkal/hari
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card result-card h-100">
                    <div class="card-body text-center d-flex flex-column justify-content-center">
                        <h5 class="result-title">TDEE</h5>
                        <p class="result-value display-5 fw-bold">{{ hasilHitung.tdde }}</p>
                        <span class="badge result-badge-info align-self-center">
                            kkal/hari
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!--Tampilan tombol jika sedang tidak loading (user belum klik tombol)-->
        <button v-if="!loading" type="button" class="btn btn-success mt-3" @click="simpanHasil">Simpan Hasil</button>

        <!--Tampilan loading jika user klik tombol simpan hasil-->
        <button v-if="loading" class="btn btn-success mt-3" type="button" disabled>
            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
        </button>
    </div>

    <div v-else>
        <p class="mb-0 text-center fw-bold">Silakan isi data diri Anda di atas dan klik "Hitung" untuk melihat hasil
            perhitungan.</p>
    </div>
</template>

<style scoped>
.section-title {
    color: #1B4242;
    /* Dark Teal */
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #9EC8B9;
    /* Light Mint */
    display: inline-block;
}

.card {
    border-radius: 1rem;
    /* Sudut lebih bulat */
    overflow: hidden;
    /* Memastikan header mengikuti border-radius */
}

.result-card {
    background-color: #fafdfc;
    border: 1px solid #d6e0db;
    border-radius: 0.75rem;
    transition: all 0.3s ease;
}

.result-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(9, 38, 53, 0.05);
}

.result-title {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: #1B4242;
    /* Dark Teal */
}

.result-value {
    color: #5C8374;
    /* Medium Green */
    margin-bottom: 0.75rem;
}

/* Badge Kustom untuk Hasil */
.result-badge-normal,
.result-badge-info {
    font-size: 0.9rem;
    padding: 0.5em 1em;
    font-weight: 500;
    border-radius: 50px;
    /* Bentuk pil */
    color: #ffffff;
}

.result-badge-normal {
    background-color: #5C8374;
    /* Medium Green */
}

.result-badge-info {
    background-color: #1B4242;
    /* Dark Teal */
}
</style>