<template>
    <section class="about-section py-5 position-relative overflow-hidden">
        <div class="glow-blob glow-blob-1"></div>
        <div class="glow-blob glow-blob-2"></div>

        <div class="container">
            <div class="row align-items-center justify-content-center g-5">

                <div class="col-lg-6 col-md-8 d-flex justify-content-center position-relative">
                    <div class="image-container-futuristic p-3">
                        <img src="../../assets/img/ilustrasi-cta-food-removebg-preview.png"
                            alt="Futuristic Medical Technology"
                            class="img-fluid rounded-pill-custom shadow-lg animate__animated animate__fadeInLeft" />
                        <div class="holographic-overlay"></div>
                        <div class="floating-icons">
                            <i class="bi bi-heart-pulse-fill icon-1"></i>
                            <i class="bi bi-headset icon-2"></i>
                            <i class="bi bi-file-earmark-medical-fill icon-3"></i>
                            <i class="bi bi-activity icon-4"></i>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-10">
                    <div class="card card-futuristic h-100 p-4 shadow-lg animate__animated animate__fadeInRight">
                        <p class="lead display-5 fw-bold mb-4 text-light">
                            Kenali Makanan yang Baik untuk Mendukung Perjalanan Sehatmu
                        </p>
                        <p class="mb-0 text-futuristic-secondary">
                            Pilihlah makanan yang baik agar masa depan Anda terjaga dengan baik
                        </p>
                    </div>
                </div>

                <div class="col-12 text-center mb-4">
                    <RouterLink to="/food" class="btn-custom-mint btn btn-lg shadow" role="button">
                        Temukan Inspirasi Menu Sehat
                    </RouterLink>
                </div>

                <div class="col-12 text-center mt-4">
                    <div class="d-flex justify-content-center gap-2">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

.about-section {
    background-color: #0d1b2a;
    color: #e0f2f7;
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    /* Penting untuk blob agar tidak keluar */
}

/* Kontainer Gambar Futuristik */
.image-container-futuristic {
    background: linear-gradient(135deg, rgba(#64ffda, 0.1), rgba(#64ffda, 0.05));
    border: 1px solid rgba(100, 255, 218, 0.3);
    border-radius: 20px;
    padding: 1.5rem;
    position: relative;
    width: 100%;
    max-width: 550px;
    /* Batasi lebar kontainer */
    aspect-ratio: 16 / 10;
    /* Rasio aspek untuk kontainer */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 30px rgba(#64ffda, 0.2), 0 0 60px rgba(#64ffda, 0.1);
}

.image-container-futuristic img {
    border-radius: 50%;
    /* Membuat gambar melingkar / oval */
    width: 90%;
    height: 90%;
    object-fit: cover;
    filter: grayscale(0.2) brightness(1.1);
    /* Sedikit efek futuristik */
    transition: transform 0.5s ease-in-out;
}

.image-container-futuristic:hover img {
    transform: scale(1.05);
    /* Zoom sedikit saat hover */
}

/* Overlay Holografik */
.holographic-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(#64ffda, 0.1) 0%, rgba(#64ffda, 0.0) 50%, rgba(#64ffda, 0.1) 100%);
    border-radius: 20px;
    pointer-events: none;
    /* Agar tidak menghalangi interaksi */
    opacity: 0.7;
    mix-blend-mode: screen;
    /* Efek blending */
    animation: scan-line 4s infinite linear;
}

@keyframes scan-line {
    0% {
        background-position: 0% 0%;
    }

    100% {
        background-position: 100% 100%;
    }
}


/* Ikon Mengambang */
.floating-icons {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.floating-icons i {
    position: absolute;
    font-size: 2rem;
    color: #64ffda;
    opacity: 0.6;
    animation: float-icon 10s infinite ease-in-out;
}

.floating-icons .icon-1 {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
    font-size: 2.5rem;
}

.floating-icons .icon-2 {
    top: 25%;
    right: 8%;
    animation-delay: 2s;
}

.floating-icons .icon-3 {
    bottom: 15%;
    left: 15%;
    animation-delay: 4s;
    font-size: 2.2rem;
}

.floating-icons .icon-4 {
    bottom: 5%;
    right: 10%;
    animation-delay: 6s;
}

@keyframes float-icon {

    0%,
    100% {
        transform: translate(0, 0);
        opacity: 0.6;
    }

    25% {
        transform: translate(10px, -10px);
        opacity: 0.8;
    }

    50% {
        transform: translate(-10px, 10px);
        opacity: 0.6;
    }

    75% {
        transform: translate(5px, -5px);
        opacity: 0.9;
    }
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

/* Styling Kartu Teks */
.card.card-futuristic {
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(100, 255, 218, 0.3);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    /* Efek kaca buram */
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(#64ffda, 0.1);
}

.card-futuristic:hover {
    border-color: #64ffda;
    box-shadow: 0 4px 30px rgba(#64ffda, 0.3);
    transform: translateY(-5px);
}

.text-futuristic-secondary {
    color: #a7d9f7;
    line-height: 1.7;
    font-size: 0.95rem;
}

/* Dekorasi Titik-titik Bawah */
.dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #64ffda;
    border-radius: 50%;
    opacity: 0.4;
    margin: 0 5px;
    animation: dot-pulse 2s infinite ease-in-out;
}

.dot:nth-child(2) {
    animation-delay: 0.3s;
}

.dot:nth-child(3) {
    animation-delay: 0.6s;
}

@keyframes dot-pulse {

    0%,
    100% {
        transform: scale(0.8);
        opacity: 0.4;
    }

    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
}

/* Blob yang bersinar di latar belakang */
.glow-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
    z-index: 0;
    animation: blob-float 15s infinite ease-in-out;
}

.glow-blob-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(#64ffda, 0.5), transparent 70%);
    top: -100px;
    left: -150px;
}

.glow-blob-2 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(#a7d9f7, 0.4), transparent 70%);
    bottom: -100px;
    right: -100px;
    animation-delay: 7s;
    /* Untuk variasi */
}

@keyframes blob-float {

    0%,
    100% {
        transform: translate(0, 0);
    }

    33% {
        transform: translate(20px, 30px);
    }

    66% {
        transform: translate(-10px, -20px);
    }
}

/* Responsive adjustments */
@media (max-width: 767.98px) {

    /* Small devices */
    .about-section {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }

    .about-title-box {
        transform: translateY(0);
        /* Jangan terlalu naik di seluler */
        margin-bottom: 2rem !important;
    }

    .image-container-futuristic {
        padding: 1rem;
        max-width: 90%;
        /* Lebih kecil di seluler */
        margin-bottom: 2rem;
    }

    .image-container-futuristic img {
        width: 95%;
        height: 95%;
    }

    .floating-icons i {
        font-size: 1.5rem;
        /* Lebih kecil */
    }

    .glow-blob {
        filter: blur(50px);
        /* Kurangi blur di seluler */
        opacity: 0.2;
    }
}
</style>