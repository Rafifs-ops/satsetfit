<script setup>
import { computed } from 'vue';

// Menerima data hasilHitung dari parent component melalui props
const props = defineProps({
    hasilHitung: {
        type: Object,
        required: true,
        default: () => ({ bmi: 0, bmr: 0, tdde: 0 })
    }
});

// --- Computed Properties ---
// Menggunakan computed untuk memastikan nilai selalu up-to-date
// dan membersihkan kode di template.
// Math.round() digunakan untuk membulatkan kalori ke angka terdekat.
// parseFloat() untuk mengubah string (dari .toFixed()) kembali menjadi angka.

const tdee = computed(() => Math.round(parseFloat(props.hasilHitung.tdde)));

// Cek apakah perhitungan sudah dilakukan (TDEE > 0)
const hasCalculated = computed(() => tdee.value > 0);

// --- Target Kalori ---
// Dihitung berdasarkan TDEE
// (0.25kg/minggu ≈ 250 kalori/hari, 0.5kg/minggu ≈ 500 kalori/hari, 1kg/minggu ≈ 1000 kalori/hari)

const mildLoss = computed(() => tdee.value - 250);
const weightLoss = computed(() => tdee.value - 500);
const extremeLoss = computed(() => tdee.value - 1000);

const mildGain = computed(() => tdee.value + 250);
const weightGain = computed(() => tdee.value + 500);
const fastGain = computed(() => tdee.value + 1000);
</script>

<template>
    <div v-if="hasCalculated" class="hasil-container mt-3">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="target-card">
                    <h3 class="target-title">Target Menurunkan Berat Badan</h3>
                    <ul class="target-list">
                        <li class="target-item">
                            <span>Penurunan ringan (0.25 kg/minggu)</span>
                            <strong>{{ mildLoss }} <span>Kalori/hari</span></strong>
                        </li>
                        <li class="target-item">
                            <span>Penurunan (0.5 kg/minggu)</span>
                            <strong>{{ weightLoss }} <span>Kalori/hari</span></strong>
                        </li>
                        <li class="target-item extreme">
                            <span>Penurunan ekstrim (1 kg/minggu)</span>
                            <strong>{{ extremeLoss }} <span>Kalori/hari</span></strong>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="target-card">
                    <h3 class="target-title">Target Menaikkan Berat Badan</h3>
                    <ul class="target-list">
                        <li class="target-item">
                            <span>Kenaikan ringan (0.25 kg/minggu)</span>
                            <strong>{{ mildGain }} <span>Kalori/hari</span></strong>
                        </li>
                        <li class="target-item">
                            <span>Kenaikan (0.5 kg/minggu)</span>
                            <strong>{{ weightGain }} <span>Kalori/hari</span></strong>
                        </li>
                        <li class="target-item">
                            <span>Kenaikan cepat (1 kg/minggu)</span>
                            <strong>{{ fastGain }} <span>Kalori/hari</span></strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>

    <div v-else class="text-center p-3">
        <img src="../../assets/img/validasi-hasil-hitung-removebg-preview.png" alt="" class="img-fluid">
    </div>
</template>

<style scoped>
.hasil-container {
    /* Animasi sederhana agar muncul dengan mulus */
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Kartu untuk target kalori */
.target-card {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    padding: 1.5rem;
    height: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.target-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1B4242;
    /* Dark Teal */
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
    text-align: center;
}

.target-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.target-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 0;
    border-bottom: 1px solid #f4f4f4;
}

.target-item:last-child {
    border-bottom: none;
}

.target-item span {
    font-size: 0.95rem;
    color: #333;
}

.target-item strong {
    font-size: 1.1rem;
    font-weight: 600;
    color: #5C8374;
    /* Medium Green */
}

.target-item strong span {
    font-size: 0.85rem;
    font-weight: 400;
    color: #555;
    margin-left: 2px;
}

/* Memberi warna khusus untuk target ekstrim */
.target-item.extreme strong {
    color: #d9534f;
    /* Merah */
}
</style>