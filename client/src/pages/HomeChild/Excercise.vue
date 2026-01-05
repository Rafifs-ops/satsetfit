<script setup>
import { ref } from 'vue';
import { exerciseVideos } from '@/composables/exerciseData';
import NotLoginYet from '@/components/NotLoginYet.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const statusLogin = authStore.isAuthenticated; // Mendapatkan status login, output: boolean
const resultSection = ref(null); // State untuk setting scroll otomatis
const videoInfo = ref(exerciseVideos); // Gunakan data yang diimport dari composables

// FUNGSI UNTUK TIMESTAMP VIDEO
function timestamp(url) {
    videoInfo.value.embedUrl = url;

    // Scroll otomatis
    if (resultSection.value) {
        resultSection.value.scrollIntoView({ behavior: 'smooth' });
    }
}
</script>

<template>
    <main>
        <div v-if="statusLogin" class="exercise-template">
            <div class="container py-5">

                <h1 class="display-4 fw-bold mb-3 text-center main-title">
                    TOP 10 Latihan untuk Bugar di Rumah!
                </h1>

                <p class="lead text-center mb-4 intro-text">
                    Video ini menyajikan 10 latihan yang dapat Anda lakukan di rumah agar bugar dengan sedikit atau
                    tanpa
                    peralatan, sebagian besar mengandalkan perabotan Anda sendiri
                    <button type="button" @click="timestamp(videoInfo.introLink1)" class="video-link fw-medium">
                        [00:06]
                    </button>.
                    Latihan-latihan ini dipilih karena komprehensif dan merupakan gerakan multi-sendi
                    <button type="button" @click="timestamp(videoInfo.introLink2)" class="video-link fw-medium">
                        [06:53]
                    </button>.
                </p>

                <div class="ratio ratio-16x9 mb-5 shadow-sm rounded overflow-hidden video-embed">
                    <iframe width="560" height="315" :src="videoInfo.embedUrl" :title="videoInfo.title"
                        :key="videoInfo.embedUrl" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen ref="resultSection"></iframe>
                </div>

                <hr class="my-4" style="color: #5C8374;">

                <h2 class="mb-4 section-title">Top 10 Latihan:</h2>
                <div class="row g-4">
                    <div class="col-md-6" v-for="(exercise, index) in videoInfo.exercises" :key="exercise.id">
                        <div class="card h-100 shadow-sm exercise-card">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">
                                    {{ index + 1 }}. <i>{{ exercise.name }}</i>
                                </h5>
                                <p class="card-text">
                                    {{ exercise.desc }}
                                    <button type="button" @click="timestamp(exercise.url)" class="video-link fw-medium">
                                        {{ exercise.time }}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-5 p-4 rounded conclusion-box">
                    <p class="mb-2">
                        Video ini juga menyertakan beberapa "honorable mentions"
                        <button type="button" @click="timestamp(videoInfo.conclusionLink1)"
                            class="video-link fw-medium">
                            [06:39]
                        </button>
                        dan menyediakan contoh rutinitas latihan seluruh tubuh menggunakan latihan-latihan ini,
                        dengan tautan ke ikhtisar lengkap dan video untuk diikuti
                        <button type="button" @click="timestamp(videoInfo.conclusionLink2)"
                            class="video-link fw-medium">
                            [07:25]
                        </button>,
                        <button type="button" @click="timestamp(videoInfo.conclusionLink3)"
                            class="video-link fw-medium">
                            [07:32]
                        </button>.
                    </p>
                </div>

                <div class="text-center mt-5">
                    <a :href="videoInfo.finalLink" target="_blank" class="btn btn-primary btn-lg watch-video-btn">
                        Buka Video di YouTube
                    </a>
                </div>

            </div>
        </div>

        <div v-else>
            <NotLoginYet />
        </div>
    </main>
</template>

<style scoped>
/* Menerapkan palet ke templat */
.exercise-template {
    background-color: #f8f9fa;
    /* var(--color-bg) */
    color: #092635;
    /* var(--color-darkest) */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.main-title,
.section-title {
    color: #1B4242;
    /* var(--color-dark) */
}

.intro-text {
    color: #343a40;
}

.video-link {
    color: #5C8374;
    /* var(--color-medium) */
    text-decoration: none;
    font-weight: 500;
    border: none;
    background-color: rgba(0, 0, 0, 0);
}

.video-link:hover {
    color: #1B4242;
    /* var(--color-dark) */
    text-decoration: underline;
}

/* Kustomisasi Video Embed */
.video-embed {
    border: 1px solid #9EC8B9;
    /* var(--color-light) */
}

/* Kustomisasi Kartu Latihan */
.exercise-card {
    border: 1px solid #9EC8B9;
    /* var(--color-light) */
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.exercise-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.exercise-card .card-title {
    color: #1B4242;
    /* var(--color-dark) */
}

.exercise-card .card-body {
    background-color: #ffffff;
}

/* Kotak Kesimpulan */
.conclusion-box {
    background-color: #9EC8B9;
    /* var(--color-light) */
    color: #092635;
    /* var(--color-darkest) */
    border: 1px solid #5C8374;
    /* var(--color-medium) */
}

.conclusion-box .video-link {
    color: #1B4242;
    /* var(--color-dark) */
    font-weight: bold;
}

/* Tombol CTA (Call to Action) */
.watch-video-btn {
    background-color: #5C8374;
    /* var(--color-medium) */
    border-color: #5C8374;
    /* var(--color-medium) */
    color: black;
    padding: 12px 24px;
    font-weight: 600;
    transition: background-color 0.2s, border-color 0.2s;
}

.watch-video-btn:hover {
    background-color: red;
    border-color: red;
}
</style>