import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null, // Menyimpan data(objek) session di state management
        isSessionChecked: false, // Penanda apakah session dari cookie sudah dicek
    }),
    getters: {
        isAuthenticated: (state) => state.user?.isLogin === true, // Status login langsung dikirim dari server (isLogin: true)
        isLogin: (state) => state.user?.isLogin === true,
    },
    actions: {
        async login(username, password) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // Cookie dari backend (Set-Cookie) otomatis disimpan di browser
                    body: JSON.stringify({ username: username, password: password })
                }); // Proses auth ke backend

                if (!response.ok) {
                    const errorData = await response.json();
                    const err = new Error(errorData.msg || 'Login gagal');
                    err.data = errorData;
                    throw err;
                }

                // 9. Di sisi frontend, ada state management untuk merequest session (cookie otomatis disimpan) dan simpan data(objek) session di state management
                await this.fetchSession();
                this.isSessionChecked = true;

                return true;
            } catch (error) {
                console.error("Login gagal:", error.message);
                throw error; // Lempar ulang agar bisa ditangkap di Login.vue
            }
        },
        async fetchSession() {
            try {
                // 5. Client (browser) menggunakan access token di cookie untuk request server untuk validasi token
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/session`, {
                    method: 'GET',
                    credentials: 'include' // Cookie otomatis dikirim
                });

                if (response.ok) {
                    // 7. Token didecode menjadi data(objek) user dengan tambahan key isLogin(boolean)
                    // 8. Objek langsung dikirim ke sisi client (frontend)
                    const data = await response.json();
                    if (data && data.isLogin) {
                        // 9. Simpan data(objek) session di state management
                        this.user = data;
                        localStorage.setItem('user', JSON.stringify(data));
                        return data;
                    }
                }

                // Jika token tidak valid / belum login
                this.user = null;
                localStorage.removeItem('user');
                return null;
            } catch (error) {
                console.error("Gagal merequest session:", error.message);
                this.user = null;
                localStorage.removeItem('user');
                return null;
            }
        },
        async logout() { // Menghapus data session di server dan state/localstorage
            try {
                await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
                    method: 'POST',
                    credentials: 'include'
                });
            } catch (error) {
                console.error("Gagal logout di server:", error);
            } finally {
                this.user = null;
                this.isSessionChecked = false;
                localStorage.removeItem('user');
                localStorage.removeItem('fitcal_input');
                localStorage.removeItem('fitcal_hasil');
            }
        },
        async checkPremiumStatus() { // Periksa masa premium user apakah sudah kadaluarsa atau belum
            if (!this.user) return; // Jangan jalankan jika tidak ada user

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/premium/validate-exp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
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
        async refreshUserData() { // Mengupdate data user terbaru dari backend via session check
            if (!this.user) return;
            return await this.fetchSession();
        }
    }
})