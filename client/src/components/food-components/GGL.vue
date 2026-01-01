<template>
    <div class="gizi-section mb-5 ggl-section">
        <h2 class="display-5 fw-bold text-center mb-4 section-title">
            🚫 Batasan Konsumsi: G4-G1-L5
        </h2>
        <p class="lead text-center mb-5 text-muted-futuristic">
            Anjuran pembatasan konsumsi Gula, Garam, dan Lemak per orang per hari.
        </p>
        <div class="row align-items-center mt-4">
            <div class="col-lg-6 mb-4 mb-lg-0 d-flex justify-content-center">
                <img src="../../assets/img/poster-g4-g1-l5.jpg" alt="Poster G4 G1 L5"
                    class="img-fluid rounded shadow-lg poster-glow" />
            </div>
            <div class="col-lg-6">
                <p class="text-white-futuristic mb-4">
                    Batasi konsumsi pangan manis, asin, dan berlemak agar terhindar dari
                    Penyakit Tidak Menular.
                </p>
                <ul class="list-group list-group-flush futuristic-list">
                    <li class="list-group-item futuristic-list-item">
                        <strong class="text-accent-futuristic">G4 (Gula):</strong> Tidak
                        lebih dari <strong>4 sendok makan</strong> (50 gram) per hari.
                    </li>
                    <li class="list-group-item futuristic-list-item">
                        <strong class="text-accent-futuristic">G1 (Garam):</strong> Tidak
                        lebih dari <strong>1 sendok teh</strong> (2000 mg natrium) per
                        hari.
                    </li>
                    <li class="list-group-item futuristic-list-item">
                        <strong class="text-accent-futuristic">L5 (Lemak):</strong> Tidak
                        lebih dari <strong>5 sendok makan</strong> (67 gram) per hari.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.gizi-section {
    background-color: #092635;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    border: 1px solid #1b4242;
    padding: 3rem;
    position: relative;
    overflow: hidden;
    animation: fadeIn 1s ease-out;
    color: #f8f9fa;
}

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

.gizi-section * {
    position: relative;
    z-index: 1;
}

.section-title {
    color: #9ec8b9;
    /* var(--color-light-mint) */
    text-shadow: 0 0 15px rgba(158, 200, 185, 0.5);
    letter-spacing: 2px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.text-muted-futuristic {
    color: #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (light-mint) */
    font-size: 1.1rem;
    opacity: 0.9;
    /* Sedikit penyesuaian agar tidak terlalu mencolok */
}

.text-white-futuristic {
    color: #e0e0e0;
    /* var(--color-text-light) */
    line-height: 1.8;
}

.text-accent-futuristic {
    color: #9ec8b9;
    /* var(--color-light-mint) */
    /* CLEANUP: !important dihapus */
    font-weight: 700;
}

.poster-glow {
    box-shadow: 0 0 25px rgba(92, 131, 116, 0.6);
    border: 2px solid #5c8374;
    /* var(--color-muted-green) */
    transition: all 0.3s ease-in-out;
    /* PENINGKATAN: Optimasi transisi hover */
    will-change: transform, box-shadow;
}

.poster-glow:hover {
    transform: scale(1.02);
    box-shadow: 0 0 35px rgba(92, 131, 116, 0.8);
}

.futuristic-list {
    background: rgba(27, 66, 66, 0.5);
    border-radius: 15px;
    overflow: hidden;
    padding: 15px 0;
    border: 1px solid #1b4242;
    /* var(--color-dark-teal) */
}

.futuristic-list-item {
    background-color: transparent;
    border: none;
    border-bottom: 1px dashed rgba(92, 131, 116, 0.3);
    color: #e0e0e0;
    /* var(--color-text-light) */
    padding: 15px 20px;
    transition: background-color 0.3s ease;
}

.futuristic-list-item:last-child {
    border-bottom: none;
}

.futuristic-list-item:hover {
    background-color: rgba(92, 131, 116, 0.2);
}

@media (max-width: 767.98px) {
    .gizi-section {
        /* MODIFIKASI: Mengatur padding responsif di sini
          dan menghapus '!important'
        */
        padding: 2rem;
    }

    .section-title {
        font-size: 2.5rem;
    }
}
</style>