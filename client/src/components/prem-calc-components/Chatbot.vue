<script setup>
import { ref, nextTick } from 'vue';
import { defineProps, toRefs } from 'vue';
import { marked } from 'marked';

// --- MENERIMA DATA HASIL HITUNG KALKUATOR MELALUI PROPS ---
const props = defineProps({ // Menerima data hasil perhitungan dan input data dari komponen induk
    hasilHitung: {
        type: Object,
        default: () => ({ bmi: 0, bmr: 0, tdde: 0 }) // Nilai default(cadangan) agar tidak error saat direfresh
    },
    inputData: {
        type: Object,
        default: () => ({
            jenisKelamin: localStorage.getItem("gender"),
            usia: 0,
            beratBadan: 0,
            tinggiBadan: 0,
            tingkatAktvitas: 1.2
        })
    }
});
const { hasilHitung, inputData } = toRefs(props) // Menjaga reaktivitas data/variabel saat menggunakan destruk
// --- AKHIR MENERIMA DATA HASIL HITUNG KALKUATOR MELALUI PROPS ---

// --- KONFIGURASI TAMPILAN UI MODAL ---
const showPremiumModal = ref(false); // State untuk mengontrol tampilan modal
function openPremiumModal() { // Fungsi untuk menampilkan modal saat tombol CTA diklik
    showPremiumModal.value = true;
    // Tambahkan pesan selamat datang dari AI saat modal dibuka (jika belum ada pesan)
    if (messages.value.length === 0) { // Jika array messages kosong
        messages.value.push({ // Tambahkan pesan (nilai array) berikut
            text: 'Halo! Ada yang bisa saya bantu hari ini?',
            sender: 'ai'
        });
    }
}
function closePremiumModal() { // Fungsi untuk menutup modal
    showPremiumModal.value = false;
}
// --- AKHIR KONFIGURASI TAMPILAN UI MODAL ---

// --- CHATBOT ---
const messages = ref([]); // Menyimpan semua pesan AI dan user
const newMessage = ref(''); // Text baru dari input
const chatWindow = ref(null); // State ke elemen jendela chat untuk auto-scroll

// Fungsi untuk auto-scroll ke pesan terbaru
async function scrollToBottom() {
    // Menunggu DOM diperbarui
    await nextTick();
    if (chatWindow.value) {
        chatWindow.value.scrollTop = chatWindow.value.scrollHeight;
    }
}

// Fungsi untuk mengirim pesan ke Chatbot
async function sendMessage() {

    const text = newMessage.value.trim(); // Menghapus spasi (spasi, tab, baris baru) dari awal dan akhir string, tetapi tidak akan memengaruhi spasi di dalam string
    if (text === '') return; // Jangan kirim pesan kosong

    // 1. Tambahkan pesan pengguna
    messages.value.push({
        text: text,
        role: 'user'
    });

    // 2. Kosongkan input text pesan
    newMessage.value = '';
    scrollToBottom(); // Scroll setelah pesan pengguna ditambahkan

    // 3. Tambahkan pesan loading
    messages.value.push({
        text: 'AI sedang mengetik...', // Teks loading
        role: 'ai',
        isLoading: true // Untuk menandai ini loading
    });
    await scrollToBottom(); // Scroll untuk menunjukkan loading

    // 4. Proses mengirim pesan ke gemini
    try {
        // Kofigurasi API
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/ai/chatbot`;

        // --- Siapkan History Chat (Seluruh isi chat AI dengan user) ---
        // isi historyContent adalah array(objek)
        const historyContent = messages.value  // Ambil history pesan (seluruh pesan) yang ada di array messages untuk dikirim ke AI
            .filter(msg => !msg.isLoading) // Filter pesan loading agar tidak ikut terkirim
            .map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model', // role dan parts adalah objek yang dibuat sesuai standar google AI Studio
                parts: [{ text: msg.text }] // isi properti parts adalah array(objek)
            })); // Menghasilkan array baru(historyContent) yang awalnya merupakan array message yang telah dimodifikasi sesuai kebutuhan

        // Proses memuat data untuk dikitim ke AI/Backend
        const payload = {
            query: text, // Mengirim chat
            historyContent: historyContent,
            jenisKelamin: inputData.value.jenisKelamin,
            usia: inputData.value.usia,
            beratBadan: inputData.value.beratBadan,
            tinggiBadan: inputData.value.tinggiBadan,
            tingkatAktvitas: inputData.value.tingkatAktvitas,
            bmi: hasilHitung.value.bmi,
            bmr: hasilHitung.value.bmr,
            tdde: hasilHitung.value.tdde
        };

        // Proses mengirim pesan/prompt ke AI
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // Berisi data yang dibuat
        });

        // Jika proses gagal, maka akan melempar pesan error
        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const result = await response.json(); // Menyimpan respon AI di variabel ini, output: objek

        // Hapus pesan loading
        messages.value.pop();

        // 5. Memberikan respon AI
        messages.value.push({
            text: result.result,
            role: 'ai'
        });

    } catch (error) {

        // Hapus pesan loading saat error
        messages.value.pop();
        // Tampilkan pesan error ke pengguna di dalam chat
        messages.value.push({
            text: `Maaf, terjadi kesalahan saat mencoba terhubung. Silakan coba lagi. error: ${error}`,
            role: 'ai'
        });
        scrollToBottom(); // Pastikan scroll ke pesan error
    }
}
// --- AKHIR CHATBOT ---

// --- FUNGSI UNTUK FORMAT RESPON AI ---
const renderMarkdown = (text) => {
    try {
        return marked.parse(text);
    } catch (e) {
        return text; // Fallback jika error
    }
};
// --- AKHIR FUNGSI UNTUK FORMAT RESPON AI ---
</script>

<template>
    <main>
        <button class="btn btn-lg shadow-sm mb-2" @click="openPremiumModal" style="background-color: #A3FFD6;">
            Chatbot AI <i class="bi bi-robot"></i> </button>

        <div v-if="showPremiumModal" class="premium-modal-backdrop" @click.self="closePremiumModal">
            <div class="premium-modal-content">
                <button type="button" class="btn-close premium-modal-close" aria-label="Close"
                    @click="closePremiumModal"></button>

                <div class="chat-modal-body">
                    <h4 class="modal-title">SatSetFit Chatbot AI</h4>
                    <i class="text-center mb-2">Model : Gemini 2.5 Flash</i>

                    <div class="chat-window" ref="chatWindow">
                        <div v-for="message in messages" :key="message.id"
                            :class="['chat-message', message.role === 'user' ? 'user-message' : 'ai-message', 'markdown-body']"
                            v-html="renderMarkdown(message.text)">
                        </div>
                    </div>

                    <form class="chat-input-area" @submit.prevent="sendMessage">
                        <input type="text" class="form-control" v-model="newMessage" placeholder="Ketik pesan Anda...">
                        <button type="submit" class="btn btn-primary btn-send">
                            <i class="bi bi-send-fill"></i>
                        </button>
                    </form>

                    <i class="text-center text-secondary">AI tidak bisa menggantikan saran dokter dan bisa membuat
                        kesalahan. Jadi, periksa kembali responnya</i>

                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* --- STYLE MODAL LAMA (MASIH BERLAKU) --- */
.premium-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1040;
}

.premium-modal-content {
    background-color: #F8F8F8;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    position: relative;
    max-width: 500px;
    width: 90%;
    /* Menambahkan properti ini agar konten chat tidak meluap */
    display: flex;
    flex-direction: column;
    max-height: 90vh;
}

.premium-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1B4242;
}

/* --- STYLE BARU UNTUK CHATBOT --- */
.chat-modal-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* Mencegah modal body scroll, hanya chat-window */
}

.modal-title {
    color: #092635;
    font-weight: 600;
    text-align: center;
    flex-shrink: 0;
    /* Judul tidak akan mengecil */
}

.chat-window {
    flex-grow: 1;
    /* Mengisi ruang yang tersedia */
    max-height: 60vh;
    overflow-y: auto;
    padding: 1rem;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    /* Jarak antar gelembung chat */
    margin-bottom: 1.5rem;
    /* Jarak ke area input */
}

.chat-message {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    max-width: 80%;
    line-height: 1.4;
    word-wrap: break-word;
    white-space: pre-wrap;
    /* Memastikan teks panjang pindah baris */
}

.ai-message {
    background-color: #e9ecef;
    /* Abu-abu muda untuk AI */
    color: #092635;
    align-self: flex-start;
    /* AI di kiri */
    border-bottom-left-radius: 0.25rem;
}

.user-message {
    background-color: #5ca3a3;
    /* Dark Teal untuk pengguna */
    align-self: flex-end;
    /* Pengguna di kanan */
    border-bottom-right-radius: 0.25rem;
}

.chat-input-area {
    display: flex;
    gap: 0.5rem;
    flex-shrink: 0;
    /* Area input tidak akan mengecil */
}

.chat-input-area .form-control {
    flex-grow: 1;
    border-radius: 0.5rem;
    border-color: #ccc;
}

.chat-input-area .form-control:focus {
    border-color: #1B4242;
    box-shadow: 0 0 0 0.2rem rgba(27, 66, 66, 0.25);
}

.btn-send {
    flex-shrink: 0;
    background-color: #5C8374;
    /* Medium Green */
    border-color: #5C8374;
    border-radius: 0.5rem;
}

.btn-send:hover {
    background-color: #1B4242;
    /* Dark Teal */
    border-color: #1B4242;
}


/* Style untuk scrollbar (diambil dari style lama Anda) */
.chat-window::-webkit-scrollbar {
    width: 8px;
}

.chat-window::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.chat-window::-webkit-scrollbar-thumb {
    background: #5C8374;
    border-radius: 10px;
}

.chat-window::-webkit-scrollbar-thumb:hover {
    background: #1B4242;
}

/* Tambahkan style khusus untuk konten Markdown */
.markdown-body {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #374151;
    /* Warna teks abu gelap yang nyaman */
}

/* Style untuk list agar rapi */
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
}

.markdown-body :deep(li) {
    margin-bottom: 0.25rem;
}

/* Style untuk Bold */
.markdown-body :deep(strong) {
    font-weight: 700;
    color: #111827;
    /* Hitam pekat untuk penekanan */
}

/* Style untuk Heading kecil */
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #1f2937;
}

/* Style untuk paragraf */
.markdown-body :deep(p) {
    margin-bottom: 0.75rem;
}

.markdown-body :deep(p:last-child) {
    margin-bottom: 0;
}
</style>