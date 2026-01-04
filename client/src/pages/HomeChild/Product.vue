<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
import NotLoginYet from '@/components/NotLoginYet.vue';

const authStore = useAuthStore();
const statusLogin = authStore.isAuthenticated; // Mendapatkan status login, output: boolean;

const products = ref([]);
onMounted(async () => {
  await fetch('http://localhost:8080/api/data/products').then(e => e.json()).then(data => products.value = data);
  // Pada saat DOM diload, maka akan menjalankan fungsi fetch (Mendapatkan data products)
})

// Fungsi ini akan otomatis menambahkan "Rp" dan memformat angkanya
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2 // Menambahkan ,00 di akhir
    }).format(number);
}
</script>

<template>
    <main>
        <div v-if="statusLogin" class="product-page-wrapper">
            <div class="container py-5">

                <div class="row mb-4">
                    <div class="col">
                        <h2 class="text-center section-title">Produk Rekomendasi Kami</h2>
                    </div>
                </div>

                <div class="row g-4 d-flex justify-content-center flex-wrap">

                    <div v-for="product in products" :key="product._id" class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 border-0 shadow-sm product-card">
                            <img :src="product.product_img" class="card-img-top" alt="Foto Produk">

                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ product.product_name }}</h5>
                                <p class="card-text product-price">{{ formatRupiah(product.product_price) }}</p>

                                <a :href="product.product_url" target="_blank" class="btn btn-custom mt-auto">Lihat
                                    Detail
                                    Produk</a>

                                <!--Triger Modal-->
                                <button type="button" class="btn btn-custom mt-2" data-bs-toggle="modal"
                                    :data-bs-target="'#modal-' + product._id">
                                    Deskripsi Produk
                                </button>
                            </div>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade" :id="'modal-' + product._id" tabindex="-1"
                            :aria-labelledby="'modalLabel-' + product._id" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" :id="'modalLabel-' + product._id">{{
                                            product.product_name }}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>{{ product.product_desc }}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div v-else>
            <NotLoginYet />
        </div>
    </main>
</template>

<style scoped>
/* Wrapper utama halaman dengan background warna paling terang */
.product-page-wrapper {
    background-color: #9EC8B9;
    min-height: 100vh;
    /* Memastikan background memenuhi layar */
    width: 100%;
}

/* Judul utama halaman */
.section-title {
    color: #092635;
    /* Dark Navy */
    font-weight: 700;
}

/* Styling kustom untuk kartu */
.product-card {
    border-radius: 12px;
    /* Membuat sudut lebih halus */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    /* Memastikan gambar mengikuti border-radius */
}

.product-card:hover {
    transform: translateY(-5px);
    /* Efek mengangkat saat di-hover */
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

/* Judul produk di dalam kartu */
.card-title {
    color: #092635;
    /* Dark Navy */
    font-weight: 600;
    margin-bottom: 0.5rem;
}

/* Harga produk */
.product-price {
    color: #5C8374;
    /* Medium Green */
    font-size: 1.15rem;
    font-weight: 700;
}

/* Tombol kustom */
.btn-custom {
    background-color: #1B4242;
    /* Dark Green */
    border-color: #1B4242;
    color: #FFFFFF;
    /* Teks putih agar kontras */
    font-weight: 500;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* Efek hover untuk tombol */
.btn-custom:hover {
    background-color: #092635;
    /* Dark Navy saat di-hover */
    border-color: #092635;
    color: #FFFFFF;
}

/* Tambahkan ini di style scoped Anda */
.modal-header {
    background-color: #1B4242;
    /* Dark Green */
    color: #FFFFFF;
    /* Teks Putih */
}

.modal-header .btn-close {
    filter: invert(1) grayscale(100) brightness(200%);
    /* Membuat 'X' menjadi putih */
}

.modal-title {
    color: #FFFFFF;
    /* Memastikan judul putih */
}
</style>