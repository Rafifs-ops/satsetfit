<template>
    <div class="gizi-section mb-5">
        <h2>🔺 Tumpeng Gizi Seimbang (TGS): Panduan Harian</h2>
        <p class="text-muted">
            Panduan porsi untuk konsumsi sehari-hari, melengkapi "Isi
            Piringku".</p>
        <div class="row align-items-center mt-4">

            <div class="col-lg-6 mb-4 mb-lg-0">
                <img src="../../assets/img/tumpeng-gizi-seimbang.jpg" alt="Poster Tumpeng Gizi Seimbang"
                    class="img-fluid rounded shadow-sm gizi-image" loading="lazy" />

            </div>

            <div class="col-lg-6">

                <p>
                    TGS berdiri di atas <strong>4 Pilar Utama</strong>:

                </p>
                <ol class="custom-ol">
                    <li>Konsumsi beranekaragam pangan.</li>
                    <li>Aktivitas fisik.</li>
                    <li>Kebersihan diri (cuci tangan).</li>
                    <li>Memantau berat badan.</li>
                </ol>
                <p><strong>Struktur Tumpeng (dari bawah ke atas):</strong></p>
                <ul class="custom-ul">
                    <li>
                        <strong>Dasar (Paling Besar):</strong>
                        Makanan Pokok (Karbohidrat, 3-4 porsi).
                    </li>
                    <li>
                        <strong>Lapis Ketiga:</strong> Sayuran dan
                        Buah-buahan (Vitamin & Mineral).
                    </li>
                    <li>
                        <strong>Lapis Kedua:</strong> Lauk Pauk
                        (Protein, 2-4 porsi).
                    </li>
                    <li>
                        <strong>Puncak (Paling Kecil):</strong> Gula,
                        Garam, dan Lemak (Dibatasi).
                    </li>
                    <li>
                        <strong>Pelengkap:</strong> Minum air putih 8
                        gelas, aktivitas fisik, dan cuci tangan.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- 1. Tata Letak Kartu Utama --- */
.gizi-section {
    /* MODIFIKASI: Menggunakan gradasi dark teal */
    background-image: linear-gradient(135deg, #1b4242, #102a2a);
    color: #e0e0e0;
    /* MODIFIKASI: Warna teks default jadi terang */
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    /* Shadow disesuaikan */
    border-top: 6px solid #5c8374;
    padding: 3rem;
    line-height: 1.6;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    will-change: transform, box-shadow;
    overflow: hidden;
}

.gizi-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* --- 2. Styling Gambar --- */
.gizi-image {
    transition: transform 0.3s ease-in-out;
}

.gizi-section:hover .gizi-image {
    transform: scale(1.03);
}

/* --- 3. Tipografi --- */
.gizi-section h2 {
    color: #ffffff;
    /* MODIFIKASI: Warna judul jadi putih */
    font-weight: 600;
    border-bottom: 3px solid #9ec8b9;
    padding-bottom: 12px;
    margin-bottom: 1rem;
}

.gizi-section .text-muted {
    color: #adb5bd !important;
    /* MODIFIKASI: Dibuat lebih terang */
    font-style: italic;
    font-size: 0.95rem;
}

.gizi-section strong {
    color: #9ec8b9;
    /* MODIFIKASI: Warna 'strong' jadi light-mint */
    font-weight: 600;
}

/* --- 4. Styling Daftar (List) --- */
.custom-ol,
.custom-ul {
    list-style: none;
    padding-left: 0;
    margin-top: 1.5rem;
}

.custom-ol li,
.custom-ul li {
    position: relative;
    margin-bottom: 0.75rem;
}

/* Bullets Kustom untuk Ordered List (ol) */
.custom-ol {
    counter-reset: gizi-counter;
}

.custom-ol li {
    counter-increment: gizi-counter;
    padding-left: 2.5rem;
}

.custom-ol li::before {
    content: counter(gizi-counter);
    position: absolute;
    left: 0;
    top: 0.1em;
    width: 1.75rem;
    height: 1.75rem;
    background-color: #9ec8b9;
    color: #1b4242;
    /* Kontras di sini tetap bagus (gelap di atas terang) */
    font-weight: 600;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
}

/* Bullets Kustom untuk Unordered List (ul) */
.custom-ul li {
    padding-left: 1.75rem;
}

.custom-ul li::before {
    content: "";
    position: absolute;
    left: 0.25rem;
    top: 0.5em;
    transform: translateY(-50%);
    height: 10px;
    width: 10px;
    background-color: #5c8374;
    /* Warna ini masih terlihat baik */
    border-radius: 50%;
}

/* --- 5. Responsif --- */
@media (max-width: 767.98px) {
    .gizi-section {
        padding: 1.5rem;
    }

    .gizi-section h2 {
        font-size: 1.75rem;
    }

    .custom-ol li {
        padding-left: 2.25rem;
    }

    .custom-ul li {
        padding-left: 1.5rem;
    }
}
</style>
