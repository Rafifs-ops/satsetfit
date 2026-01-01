<template>
    <section class="features-section position-relative overflow-hidden">
        <div class="container py-5">

            <span class="sparkle sparkle-1">✨</span>
            <span class="sparkle sparkle-2">✨</span>

            <div class="row justify-content-center mb-5">
                <div class="col-auto position-relative">
                    <div class="features-title-box shadow">
                        <h2 class="display-5 fw-bold text-white mb-0">Excercise</h2>
                    </div>

                    <div class="cloud-shape cloud-1"></div>
                    <div class="cloud-shape cloud-2"></div>
                </div>
            </div>


            <div class="row align-items-center justify-content-center g-5">

                <div class="col-lg-7 col-md-10">
                    <div class="feature-text-card shadow-lg p-5 animate__animated animate__fadeInLeft">
                        <p class="feature-text display-6 fw-bold mb-4">
                            Jadikan Olahraga Bagian dari Gaya Hidup Sehatmu
                        </p>
                        <p class="feature-text mb-4 fw-bold">
                            Perjalanan Anda Menuju Gaya Hidup yang Lebih Baik Dimulai di Sini — Klik Mulai untuk Memulai
                            Petualangan Sehat Anda
                        </p>

                        <div class="text-center mt-5">
                            <RouterLink to="/excercise" class="btn btn-get-started btn-lg shadow" role="button">
                                Mulai Bergerak Sekarang!
                            </RouterLink>
                        </div>
                    </div>
                </div>


                <div class="col-lg-5 col-md-8 d-flex justify-content-center">
                    <div class="feature-image-wrapper p-3 shadow-lg animate__animated animate__fadeInRight">
                        <div class="feature-image-inner p-2">

                            <img src="../../assets/img/ilustrasi-cta-excercise-removebg-preview.png"
                                alt="Medical Equipment" class="img-fluid rounded-custom">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
.features-section {
    background-color: #0a2a3a;
    /* Latar belakang biru tua */
    color: #333;
    padding: 6rem 0;
    min-height: 100vh;
}

/* --- Bagian Judul --- */
.features-title-box {
    background-color: #8BC34A;
    /* Hijau muda */
    padding: 1rem 3.5rem;
    border-radius: 50px;
    position: relative;
    z-index: 10;
}

/* Efek Awan di belakang judul */
.cloud-shape {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 100px;
    /* Sangat bulat */
    filter: blur(35px);
    /* Kunci untuk efek awan */
}

.cloud-1 {
    width: 280px;
    height: 120px;
    top: 50%;
    left: -100px;
    transform: translateY(-50%);
    z-index: 5;
    /* Di belakang judul */
}

.cloud-2 {
    width: 250px;
    height: 100px;
    top: 50%;
    right: -80px;
    transform: translateY(-50%);
    z-index: 15;
    /* Di depan judul */
    opacity: 0.7;
}

/* --- Kartu Teks (Kiri) --- */
.feature-text-card {
    background-color: #e0f7fa;
    /* Biru mint sangat muda */
    border-radius: 40px;
    /* Sangat rounded */
    border: 1px solid rgba(255, 255, 255, 0.2);
    /* Efek Glassmorphism halus */
    background-clip: padding-box;
    backdrop-filter: blur(5px);
}

.feature-text {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #1a3a4a;
    /* Teks gelap agar mudah dibaca */
}

/* Tombol Get Started */
.btn.btn-get-started {
    background-color: #9CCC65;
    /* Hijau muda/abu-abu */
    color: #0a2a3a;
    border: none;
    border-radius: 50px;
    padding: 0.75rem 2.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
}

.btn.btn-get-started:hover {
    background-color: #aed581;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2) !important;
}

/* --- Wrapper Gambar (Kanan) --- */
.feature-image-wrapper {
    background-color: #4b6b5a;
    /* Hijau tua */
    border-radius: 30px;
    transition: transform 0.3s ease;
}

.feature-image-wrapper:hover {
    transform: scale(1.03);
}

.feature-image-inner {
    background-color: #81c784;
    /* Hijau lebih muda */
    border-radius: 25px;
}

.img-fluid.rounded-custom {
    border-radius: 20px;
    /* Bulat di dalam frame */
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* --- Elemen Dekoratif Sparkle --- */
.sparkle {
    position: absolute;
    font-size: 2.5rem;
    color: #e0f5a9;
    opacity: 0.7;
    animation: pulse 2s infinite;
    z-index: 1;
}

.sparkle-1 {
    top: 25%;
    left: 5%;
}

.sparkle-2 {
    bottom: 20%;
    right: 10%;
    font-size: 1.8rem;
    animation-delay: 0.5s;
}

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

/* --- Penyesuaian Responsif --- */
@media (max-width: 991.98px) {

    /* Tablet */
    .features-section {
        padding: 4rem 0;
    }

    .feature-text-card {
        text-align: center;
    }
}

@media (max-width: 767.98px) {

    /* Seluler */
    .features-title-box h2 {
        font-size: 2.5rem;
        /* Perkecil judul di seluler */
    }

    .cloud-1 {
        left: -50px;
    }

    .cloud-2 {
        right: -50px;
    }

    .feature-text-card {
        padding: 2.5rem;
    }
}
</style>