<template>
    <div class="mt-5">
        <h3 class="section-title mb-3">Informasi Kategori BMI</h3>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Berat Badan Kurang (Underweight)
                <span class="badge category-badge">&lt; 18,5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Berat Badan Normal
                <span class="badge category-badge">18,5 – 24,9</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Berat Badan Berlebih (Overweight)
                <span class="badge category-badge">25 – 29,9</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Obesitas Tingkat 1
                <span class="badge category-badge">30 – 34,9</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Obesitas Tingkat 2
                <span class="badge category-badge">35 – 39,9</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Obesitas Tingkat 3
                <span class="badge category-badge">≥ 40</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.section-title {
    color: #1B4242;
    /* Dark Teal */
    font-weight: 600;
    padding-bottom: 0.5rem;
    border-bottom: 3px solid #9EC8B9;
    /* Light Mint */
    display: inline-block;
}

.list-group-item {
    background-color: transparent;
    /* Transparan agar warna wrapper terlihat */
    border-color: #d6e0db;
    color: #092635;
    /* Dark Navy */
    font-weight: 500;
    padding: 1rem 0.25rem;
    /* Padding vertikal, sedikit horizontal */
}

.category-badge {
    background-color: #092635;
    /* Dark Navy */
    color: #EFFFFD;
    /* Warna teks yang sangat terang */
    font-size: 0.9em;
    font-weight: 500;
    padding: 0.4em 0.8em;
    border-radius: 0.25rem;
}
</style>