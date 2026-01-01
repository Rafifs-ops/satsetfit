<script setup>
import { ref } from "vue";

// Data untuk "10 Pesan Gizi Seimbang"
const pesanGizi = ref([
    "<strong>Syukuri dan nikmati</strong> anekaragam makanan.",
    "<strong>Banyak makan sayuran</strong> dan cukup buah-buahan.",
    "Biasakan mengonsumsi <strong>lauk pauk berprotein tinggi</strong>.",
    "Biasakan mengonsumsi <strong>anekaragam makanan pokok</strong>.",
    "<strong>Batasi konsumsi</strong> pangan manis, asin dan berlemak (G4-G1-L5).",
    "Biasakan <strong>Sarapan</strong>.",
    "Biasakan <strong>minum air putih</strong> yang cukup dan aman.",
    "Biasakan <strong>membaca label</strong> pada kemasan pangan.",
    "<strong>Cuci tangan pakai sabun</strong> dengan air bersih mengalir.",
    "Lakukan <strong>aktivitas fisik</strong> cukup & pertahankan berat badan normal.",
]);
</script>

<template>
    <div class="gizi-section p-4 p-md-5 mb-5 container-fluid">
        <h2 class="text-center mb-4 display-5 fw-bold gradient-text">📜 10 Pesan Umum Gizi Seimbang</h2>
        <p class="text-center sub-heading mb-5 lead">
            Inti dari konten Pedoman Gizi Seimbang untuk diterapkan sehari-hari.
        </p>
        <div class="row align-items-center justify-content-center">
            <div class="col-lg-5 mb-4 mb-lg-0">
                <div class="image-container p-3 rounded-3 shadow-lg">
                    <img src="../../assets/img/10-pesan-gizi-seimbang.jpg" alt="Poster 10 Pesan Gizi Seimbang"
                        class="img-fluid rounded-3 poster-glow" />
                </div>
            </div>
            <div class="col-lg-7">
                <TransitionGroup name="list-fade" tag="div" class="list-group modern-list">
                    <div v-for="(pesan, index) in pesanGizi" :key="pesan" :style="{ '--i': index }"
                        class="list-group-item list-group-item-action d-flex align-items-start border-0 mb-3 p-3 rounded-3 shadow-sm">
                        <span class="badge rounded-pill me-3 flex-shrink-0">{{ index + 1 }}</span>
                        <span v-html="pesan"></span>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gizi-section {
    /* MENGGUNAKAN: #1b4242 (dark-teal), #092635 (dark-blue) */
    background: linear-gradient(135deg, #1b4242 0%, #092635 100%);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    border-top: none;
    position: relative;
    overflow: hidden;
    animation: fadeIn 1s ease-out;
    color: #f8f9fa;
    /* MENGGUNAKAN: #f8f9fa (text-light) */
}

/* Efek garis bercahaya di sekitar section */
.gizi-section::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    /* MENGGUNAKAN: #9ec8b9 (accent), #5c8374 (secondary-accent) */
    background: linear-gradient(45deg, #9ec8b9, #5c8374, #9ec8b9);
    z-index: -1;
    border-radius: 20px;
    filter: blur(8px);
    opacity: 0.6;
}

.gizi-section:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    /* PENINGKATAN: Optimasi transisi hover */
    will-change: transform, box-shadow;
}

.gradient-text {
    color: #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (accent) */
    font-weight: 700;
    font-size: 2.5rem;
    letter-spacing: 2px;
    text-shadow: 0 0 15px #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (light-mint) */
    /* MENGGUNAKAN: #5c8374 (secondary-accent) */
    border-bottom: 3px solid #5c8374;
    padding-bottom: 15px;
    position: relative;
    animation: textGlow 1.5s infinite alternate;
}

.gizi-section h2 {
    font-weight: 700;
    margin-bottom: 1.5rem;
}

.gizi-section p.sub-heading {
    color: #9ec8b9;
    opacity: 0.8;
}

.image-container {
    /* PERBAIKAN: */
    background-color: rgba(27, 66, 66, 0.5);
    border: 1px solid #5c8374;
    box-shadow: 0 0 25px rgba(92, 131, 116, 0.6);
    transition: all 0.3s ease-in-out;
}

.image-container:hover {
    /* PERBAIKAN: */
    box-shadow: 0 0 35px rgba(158, 200, 185, 0.8);
    transform: scale(1.02);
}

.poster-glow {
    /* PERBAIKAN: */
    box-shadow: 0 0 15px rgba(158, 200, 185, 0.4);
    transition: all 0.3s ease-in-out;
}

.poster-glow:hover {
    /* PERBAIKAN: */
    box-shadow: 0 0 25px rgba(158, 200, 185, 0.6);
}

.modern-list .list-group-item {
    /* PERBAIKAN: */
    background-color: rgba(27, 66, 66, 0.3);
    border: 1px solid rgba(92, 131, 116, 0.4);
    /* CLEANUP: Menghapus `!important`
      Selector `.modern-list .list-group-item` sudah cukup spesifik
      untuk meng-override Bootstrap tanpa perlu `!important`.
    */
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(5px);
}

.modern-list .list-group-item:hover {
    background-color: rgba(27, 66, 66, 0.5);
    border-color: #9ec8b9;
    transform: translateY(-5px);
    /* PERBAIKAN: */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(158, 200, 185, 0.3);
    /* PENINGKATAN: Optimasi transisi hover */
    will-change: transform, box-shadow, background-color;
}

.modern-list .list-group-item .badge {
    /* CLEANUP: Menghapus `!important` */
    background-color: #5c8374;
    color: #f8f9fa;
    font-size: 1.1rem;
    padding: 0.6em 0.9em;
    font-weight: 700;
    min-width: 2.5em;
    text-align: center;
    border: 1px solid #9ec8b9;
    /* PERBAIKAN: */
    box-shadow: 0 0 8px rgba(158, 200, 185, 0.5);
}

/* Warna teks dasar (Sudah benar) */
.modern-list .list-group-item span {
    color: #f8f9fa;
    line-height: 1.6;
}

/* Target tag <strong> dari v-html (Sudah benar) */
.modern-list .list-group-item :deep(strong) {
    color: #9ec8b9;
    font-weight: 600;
}

/* ================================================= */
/* PENINGKATAN: Animasi untuk <TransitionGroup>
/* ================================================= */
.list-fade-enter-active {
    /* Definisi transisi: semua properti, durasi 0.4s
      akan memiliki delay berdasarkan custom property '--i' (index)
      yang kita set di template.
    */
    transition: all 0.4s ease-out;
    transition-delay: calc(var(--i) * 50ms);
    /* Ini kuncinya! 50ms per item */
}

.list-fade-enter-from {
    /* Kondisi awal sebelum animasi: transparan dan sedikit bergeser */
    opacity: 0;
    transform: translateX(30px);
    will-change: opacity, transform;
}

@keyframes textGlow {
    from {
        /* MENGGUNAKAN: #9ec8b9 (light-mint), #9ec8b9 (accent) */
        text-shadow: 0 0 10px #9ec8b9, 0 0 20px #9ec8b9;
    }

    to {
        /* MENGGUNAKAN: #9ec8b9 (light-mint), #9ec8b9 (accent) */
        text-shadow: 0 0 20px #9ec8b9, 0 0 30px #9ec8b9, 0 0 40px #9ec8b9;
    }
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
    .gizi-section {
        /* CLEANUP: Menghapus `!important` */
        padding: 2rem;
    }

    .gradient-text {
        font-size: 2.5rem;
    }

    .gizi-section p.sub-heading {
        font-size: 1rem;
    }

    .modern-list .list-group-item {
        /* CLEANUP: Menghapus `!important` */
        padding: 0.75rem;
    }

    .modern-list .list-group-item .badge {
        font-size: 0.9rem;
        padding: 0.5em 0.7em;
    }
}
</style>