import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null, // Menyimpan token
        user: JSON.parse(localStorage.getItem('user')) || null, // Menyimpan data user, isi: objek
    }),
    getters: {
        isAuthenticated: (state) => !!state.token, // Fungsi untuk memeriksa apakah user sudah login atau belum
    },
    actions: {
        async login(username, password) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, password: password })
                }); // Proses auth ke backend

                // 1. Cek status HTTP (Fetch tidak otomatis error jika 400/500)
                if (!response.ok) {
                    // Ambil pesan error dari backend jika ada
                    const errorData = await response.json();
                    console.log(errorData.msg || 'Login gagal');
                }

                // 2. Parse JSON
                const data = await response.json(); // Mendapatkan data dari backend

                // 3. Tampung data
                this.token = data.token;
                this.user = data.user; // isi: objek

                // 4 . Simpan ke LocalStorage
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user)); // isi: objek

                return true;

            } catch (error) {
                console.error("Login gagal:", error.message);
                throw error; // Lempar ulang agar bisa ditangkap di Login.vue
            }
        },
        logout() { // Menghapus data token dan user di localstorage
            this.token = null
            this.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('fitcal_input')
            localStorage.removeItem('fitcal_hasil')
        },
        async checkPremiumStatus() { // Periksa masa premium user apakah sudah kadaluarsa atau belum
            if (!this.user || !this.token) return; // Jangan jalankan jika tidak ada user/token

            try {
                await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/premium/validate-exp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: this.user.id })
                });

                const data = await response.json();
                // Jika server bilang expired, update data user di frontend
                if (data.status === 'expired') {
                    console.log("Premium berakhir, memperbarui data user...");
                    await this.refreshUserData();
                }
            } catch (error) {
                console.error("Gagal validasi premium:", error);
            }
        },
        async refreshUserData() { // Mengupdate data user terbaru dari backend
            if (!this.user || !this.token) return; // Jangan jalankan jika tidak ada user/token

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                    body: JSON.stringify({ id: this.user.id })
                });

                if (response.ok) {
                    const userData = await response.json();
                    this.user = userData; // Update state Pinia
                    localStorage.setItem('user', JSON.stringify(userData)); // Update LocalStorage agar sinkron
                    return true;
                }
            } catch (error) {
                console.error("Gagal refresh data user:", error);
            }
        }
    }
})