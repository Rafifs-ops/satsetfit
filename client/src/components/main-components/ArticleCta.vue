<script setup>
import { onMounted, ref } from "vue";

const articles = ref([]); // Variable penampungan data artikel
onMounted(async () => {
    // Proses mendapatkan data artikel dari backend dan menyimpan data nya ke variable articles
    await fetch('http://localhost:8080/api/data/articles').then(e => e.json()).then(data => articles.value = data); // Mendapatkan data
})
</script>

<template>
    <section id="artikel">
        <div class="article-section py-5">
            <div class="container">
                <h2 class="text-center mb-5 section-title">Cek Berita untuk Informasi Lebih Lanjut</h2>

                <div class="row g-4">
                    <div v-for="article in articles" :key="article.id"
                        class="col-lg-4 col-md-6 d-flex flex-wrap align-items-stretch">
                        <div class="card h-100 w-100 article-card">
                            <img :src="article.img_thumb" class="card-img-top" :alt="article.title">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ article.title }}</h5>
                                <p class="card-text flex-grow-1">{{ article.description }}</p>
                                <a :href="article.url" class="btn btn-primary mt-auto align-self-start" target="_blank">
                                    Baca Selengkapnya
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.article-section {
    /* Warna latar belakang mint muda seperti di referensi */
    background-color: #1C1678;
}

.section-title {
    /* Judul dengan style box tumpul seperti di referensi */
    display: inline-block;
    padding: 0.75rem 1.75rem;
    background-color: #7BC9FF;
    /* Warna hijau mint */
    border-radius: 50px;
    /* Sudut sangat tumpul */
    font-weight: 600;
    color: #2c3e50;
}

.article-card {
    /* Meniru style kartu dari referensi */
    border: none;
    /* Hilangkan border default Bootstrap */
    border-radius: 20px;
    /* Sudut tumpul yang signifikan */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    /* Shadow halus */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    /* Memastikan gambar mengikuti border-radius */
    background-color: #7BC9FF;
}

.article-card:hover {
    /* Efek hover untuk interaktivitas */
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.article-card .card-img-top {
    /* Kita tidak perlu mengatur border-radius di sini karena 
    'overflow: hidden' pada .article-card sudah mengaturnya.
  */
    object-fit: cover;
    /* Memastikan gambar mengisi area tanpa distorsi */
    height: 200px;
    /* Tinggi gambar tetap */
    width: 100%;
}

.card-title {
    font-weight: 700;
    color: #333;
    margin-bottom: 0.75rem;
}

.card-text {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.6;
}

.btn-primary {
    /* Tombol kustom agar serasi */
    background-color: #A3FFD6;
    /* Warna hijau yang lebih kuat */
    border-color: #4a9d8c;
    border-radius: 50px;
    /* Tombol tumpul */
    font-weight: 500;
    padding: 0.5rem 1.25rem;
    transition: background-color 0.3s ease;
}

.btn-primary:hover {
    background-color: #3a7c6f;
    border-color: #3a7c6f;
}
</style>