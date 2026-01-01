<template>
    <div class="hero-section">
        <div class="container">
            <div class="row align-items-center gy-5">

                <div class="col-lg-6 text-content-col">
                    <div class="hero-content">
                        <span class="sparkle sparkle-1">✨</span>
                        <span class="sparkle sparkle-2">✨</span>

                        <h1 class="display-4 fw-bold mb-3">
                            Ingin Capai Berat Badan Ideal?
                        </h1>
                        <p class="lead mb-4">
                            Mulai dengan Menghitung BMI & BMR Anda di Sini Secara Gratis
                        </p>

                        <RouterLink to="/calc" class="btn-custom-mint btn btn-lg shadow" role="button">
                            Hitung BMI & BMR Sekarang !
                        </RouterLink>
                    </div>
                </div>

                <div class="col-lg-6 text-center">
                    <img src="../../assets/img/jumbotron-img.png" alt="Telehealth Illustration"
                        class="img-fluid hero-image" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* CSS untuk bagian hero */
.hero-section {
    background-color: #0a2a3a;
    color: #ffffff;
    padding: 6rem 0;
    min-height: 90vh;
    /* Pastikan section mengambil tinggi yang cukup */
    display: flex;
    align-items: center;
    position: relative;
    /* Diperlukan untuk elemen dekoratif */
    overflow: hidden;
    /* Mencegah blur-circle meluap */
}

/* Penyesuaian perataan teks untuk seluler vs desktop */
.text-content-col {
    text-align: center;
    /* Teks rata tengah di layar kecil */
}

@media (min-width: 992px) {

    /* lg breakpoint */
    .text-content-col {
        text-align: left;
        /* Teks rata kiri di layar besar */
    }
}

.hero-content {
    position: relative;
    /* Diperlukan untuk sparkle */
    z-index: 2;
}

.hero-image {
    max-width: 100%;
    height: auto;
    /* Efek 'digital glow' hijau seperti pada gambar */
    filter: drop-shadow(0 0 20px rgba(100, 255, 150, 0.6));
}

/* Kustomisasi Tombol */
.btn.btn-custom-mint {
    background-color: #b0d3bf;
    /* Warna mint */
    color: #0a2a3a;
    /* Teks gelap agar kontras */
    border: none;
    border-radius: 50px;
    /* Bentuk pil */
    padding: 0.75rem 2.5rem;
    /* Membuatnya memanjang */
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-custom-mint:hover {
    background-color: #c1e0d0;
    transform: translateY(-2px);
    /* Efek hover sedikit terangkat */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.lead {
    opacity: 0.8;
    /* Membuat sub-teks sedikit transparan */
}

/* --- Elemen Dekoratif --- */


/* Sparkles (menggunakan emoji untuk kesederhanaan) */
.sparkle {
    position: absolute;
    font-size: 2.5rem;
    color: #e0f5a9;
    opacity: 0.7;
    animation: pulse 2s infinite;
    z-index: -1;
}

.sparkle-1 {
    top: -30px;
    left: -20px;
}

.sparkle-2 {
    top: 60%;
    left: 30%;
    font-size: 1.8rem;
    animation-delay: 0.5s;
}

/* Animasi untuk sparkle */
@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 0.7;
    }

    50% {
        transform: scale(1.1);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0.7;
    }
}

/* Penyesuaian responsif untuk perangkat seluler */
@media (max-width: 991.98px) {

    /* Di bawah lg */
    .hero-section {
        padding: 4rem 0;
    }

    .hero-image {
        margin-top: 3rem;
        /* Memberi jarak antara teks dan gambar di seluler */
    }

    .sparkle-1,
    .sparkle-2 {
        /* Pindahkan sparkle agar terlihat di seluler */
        left: 10%;
    }

    .sparkle-2 {
        left: 80%;
        top: 50%;
    }
}
</style>