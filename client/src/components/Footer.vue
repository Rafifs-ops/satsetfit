<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// Data untuk Quick Links (mudah diubah)
const quickLinks = ref([
    { name: 'Main', url: '/' },
    { name: 'Calc', url: '/calc' },
    { name: 'Food', url: '/food' },
    { name: 'Excercise', url: '/excercise' },
    { name: 'Product', url: '/product' },
]);

// Data untuk Social Medias (mudah diubah)
// 'class' digunakan untuk styling CSS, dan 'letter' adalah placeholder ikon
const socialMedia = ref([
    { name: 'FitCal Health', url: '#', class: 'facebook', letter: 'f' },
    { name: '@Fitcal.Id', url: '#', class: 'instagram', letter: 'i' },
    { name: 'FitCal Indonesia', url: '#', class: 'youtube', letter: 'y' },
]);
</script>

<template>
    <footer class="footer-container">

        <div class="footer-main">

            <div class="footer-column logo-section">
                <div class="logo">
                    <img src="../assets/img/logo-fitcal.png" alt="FitCal Logo" class="logo-img">
                    <span class="logo-text">FitCal.Co</span>
                </div>
                <p class="slogan">"One Platform For All Your Wellness Needs."</p>
            </div>

            <div class="footer-column links-section">
                <h3>Quick Links</h3>
                <ul>
                    <li v-for="link in quickLinks" :key="link.name">
                        <RouterLink :to="link.url">{{ link.name }}</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="footer-column social-section">
                <h3>Social Media</h3>
                <ul>
                    <li v-for="social in socialMedia" :key="social.name">
                        <a :href="social.url" target="_blank" rel="noopener noreferrer">
                            <span :class="['social-icon', social.class]">
                                {{ social.letter }}
                            </span>
                            {{ social.name }}
                        </a>
                    </li>
                </ul>
            </div>

            <div class="footer-column location-section">
                <h3>Location</h3>
                <address>
                    Jl. Kramat Kosambi 1 no 20A,<br>
                    Rawamangun, Jakarta<br>
                    Timur 13240<br>
                    Indonesia
                </address>
                <p class="contact-info">
                    <strong>Telepon:</strong> +62 895 3831 51668<br>
                    <strong>Email:</strong> rafifebrians150206@gmail.com
                </p>
            </div>

        </div>
    </footer>
</template>

<style scoped>
/* Container Utama */
.footer-container {
    --footer-bg: #223A4A;
    /* Biru tua/teal */
    --footer-green: #9DCA83;
    /* Hijau muda */
    --text-primary: #FFFFFF;
    --text-secondary: #E0E0E0;
    /* Putih pudar/abu-abu muda */
    --text-dark: #333333;
    /* Teks gelap untuk tombol hijau */

    background-color: var(--footer-bg);
    color: var(--text-primary);
    padding: 2.5rem 2rem;
    font-family: Arial, sans-serif;
}

/* Bagian Utama (Grid 4 Kolom) */
.footer-main {
    display: grid;
    /* Grid yang sangat responsif:
    - auto-fit: Buat kolom sebanyak mungkin.
    - minmax(250px, 1fr): Setiap kolom minimal 250px, dan
      jika ada sisa ruang, bagi rata (1fr).
    Ini akan otomatis berubah dari 4, ke 3, 2, lalu 1 kolom.
  */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.footer-column h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    font-weight: 600;
}

.footer-column p,
.footer-column li,
.footer-column a,
.footer-column address {
    color: var(--text-secondary);
    text-decoration: none;
    line-height: 1.6;
    font-style: normal;
}

.footer-column a:hover {
    color: var(--text-primary);
    text-decoration: underline;
}

.footer-column ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-column li {
    margin-bottom: 0.5rem;
}

/* Styling Kolom Spesifik */

/* Kolom Logo */
.logo-section .logo {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.75rem;
}

.logo-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f0f0f0;
    /* Latar belakang placeholder */
    object-fit: cover;
}

.logo-text {
    font-size: 2rem;
    font-weight: bold;
    color: var(--text-primary);
}

.slogan {
    font-style: italic;
    font-size: 0.9rem;
}

/* Kolom Social Media */
.social-section li a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.social-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: var(--text-primary);
    font-weight: bold;
    font-size: 0.9rem;
    font-family: Arial, sans-serif;
    flex-shrink: 0;
    /* Mencegah ikon menyusut */
}

/* Warna ikon CSS (sesuai gambar) */
.social-icon.facebook {
    background-color: #4267B2;
    /* Biru Facebook */
}

.social-icon.instagram {
    background-color: #DD2A7B;
    /* Pink/Ungu Instagram */
}

.social-icon.youtube {
    background-color: #FF0000;
    /* Merah YouTube */
}

/* Kolom Lokasi */
.contact-info {
    margin-top: 1rem;
}

.contact-info strong {
    color: var(--text-primary);
}


/* Media Query untuk Mobile (penyesuaian kecil) */
@media (max-width: 768px) {
    .footer-container {
        padding: 2rem 1rem;
    }

    /* Buat form dan banner jadi full-width dan bertumpuk */
    .footer-top {
        flex-direction: column;
        align-items: stretch;
        /* Membuat banner dan form 100% width */
    }

    .update-banner {
        text-align: center;
    }

    .subscribe-form {
        flex-direction: column;
        width: 100%;
    }

    .subscribe-form input {
        min-width: 100px;
        /* Reset min-width */
        width: 100%;
        box-sizing: border-box;
        /* Pastikan padding tidak merusak layout */
    }

    .subscribe-form button {
        width: 100%;
    }

    /* Pusatkan teks ketika layout menjadi 1 kolom.
    Grid `auto-fit` sudah menangani perubahan kolom.
  */
    .footer-main {
        text-align: center;
    }

    .logo-section .logo {
        justify-content: center;
    }

    .social-section li a {
        justify-content: center;
    }
}
</style>