<template>
    <div class="gizi-section p-4 p-md-5 mb-5">
        <h2 class="futuristic-title text-center mb-4">🍽️ Isi Piringku: Sajian Sekali Makan</h2>
        <p class="sub-heading text-center mb-5">
            Panduan visual untuk setiap kali makan (sarapan, makan siang, makan malam).
        </p>
        <div class="row align-items-center mt-4">
            <div class="col-lg-6 mb-4 mb-lg-0 position-relative">
                <div class="image-frame">
                    <img src="../../assets/img/poster-isi-piringku.jpg" alt="Poster Isi Piringku"
                        class="img-fluid rounded shadow-sm futuristic-img" />
                </div>
            </div>
            <div class="col-lg-6">
                <ul class="list-group list-group-flush futuristic-list">
                    <li class="list-group-item">
                        <strong><span class="futuristic-highlight">50%</span> (Setengah Piring):</strong> Sayur &
                        Buah-buahan.
                        <ul class="mt-2 futuristic-sublist">
                            <li>Porsi sayuran harus lebih banyak dari buah.</li>
                        </ul>
                    </li>
                    <li class="list-group-item">
                        <strong><span class="futuristic-highlight">50%</span> (Setengah Piring Lainnya):</strong>
                        Makanan Pokok &
                        Lauk-Pauk.
                        <ul class="mt-2 futuristic-sublist">
                            <li>
                                Porsi makanan pokok (karbohidrat) lebih banyak dari lauk-pauk.
                            </li>
                        </ul>
                    </li>
                    <li class="list-group-item">
                        <strong>Pelengkap:</strong> Jangan lupa
                        <strong>Cuci Tangan Pakai Sabun</strong> dan minum
                        <strong>Air Putih</strong> yang cukup.
                    </li>
                </ul>
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

.futuristic-title {
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

.futuristic-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 5px;
    background-color: #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (accent) */
    border-radius: 5px;
}

/* MODIFIKASI: Mengganti selector .text-muted dan menghapus !important */
.gizi-section p.sub-heading {
    color: #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (light-mint) */
    font-size: 1.1rem;
    opacity: 0.9;
    /* Sedikit penyesuaian agar tidak terlalu mencolok */
}

.image-frame {
    /* MENGGUNAKAN: #5c8374 (secondary-accent) */
    border: 3px solid #5c8374;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    position: relative;
    padding: 5px;
    background-color: #1b4242;
    /* MENGGUNAKAN: #1b4242 (dark-teal) */
}

.image-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px dashed #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (accent) */
    border-radius: 10px;
    opacity: 0.5;
    pointer-events: none;
}

.futuristic-img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease-in-out;
}

.futuristic-img:hover {
    transform: scale(1.03);
}

.futuristic-list {
    background-color: transparent;
}

/* MODIFIKASI: Selector dibuat lebih spesifik untuk hapus !important */
.futuristic-list .list-group-item {
    border: 1px solid #5c8374;
    /* MENGGUNAKAN: #5c8374 (muted-green) */
    border-radius: 10px;
    /* CLEANUP: !important dihapus */
    margin-bottom: 12px;
    /* MENGGUNAKAN: rgba(27, 66, 66, 0.7) (dark-teal) */
    background-color: rgba(27, 66, 66, 0.7);
    color: #f8f9fa;
    /* MENGGUNAKAN: #f8f9fa (text-light) */
    padding: 15px 20px;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
    backdrop-filter: blur(5px);
}

.futuristic-list .list-group-item:hover {
    /* MENGGUNAKAN: rgba(92, 131, 116, 0.85) (muted-green) */
    background-color: rgba(92, 131, 116, 0.85);
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    /* PENINGKATAN: Optimasi transisi hover */
    will-change: background-color, transform;
}

.futuristic-list .list-group-item strong {
    color: #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (accent) */
}

.futuristic-highlight {
    background-color: #5c8374;
    /* MENGGUNAKAN: #5c8374 (muted-green) */
    color: #f8f9fa;
    /* MENGGUNAKAN: #f8f9fa (text-light) */
    padding: 4px 8px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 0.9em;
    font-weight: bold;
    /* MENGGUNAKAN: rgba(158, 200, 185, 0.5) (light-mint) */
    box-shadow: 0 0 8px rgba(158, 200, 185, 0.5);
}

.futuristic-sublist li {
    color: #9ec8b9;
    /* MENGGUNAKAN: #9ec8b9 (light-mint) */
    font-size: 0.95em;
    margin-top: 5px;
    list-style-type: '— ';
    padding-left: 10px;
}

/* Animasi */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
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

@media (max-width: 767.98px) {
    .gizi-section {
        padding: 1.5rem;
        /* CLEANUP: !important dihapus */
    }

    .futuristic-title {
        font-size: 2rem;
    }
}
</style>