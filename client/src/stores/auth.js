import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(username, password) {
            try {
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, password: password })
                });

                // 1. Cek status HTTP (Fetch tidak otomatis error jika 400/500)
                if (!response.ok) {
                    // Ambil pesan error dari backend jika ada
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Login gagal');
                }

                // 2. Parse JSON
                const data = await response.json();

                // 3. Tampung data
                this.token = data.token;
                this.user = data.user;

                // 4 . Simpan ke LocalStorage
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));

                return true;

            } catch (error) {
                console.error("Login gagal:", error.message);
                throw error; // Lempar ulang agar bisa ditangkap di Login.vue
            }
        },
        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        async checkPremiumStatus() {
            // Jangan jalankan jika tidak ada user/token
            if (!this.user || !this.token) return;

            try {
                await fetch('http://localhost:8080/api/premium/validate-exp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: this.user.id })
                });
            } catch (error) {
                console.error("Gagal validasi premium:", error);
            }
        },
        async refreshUserData() {
            if (!this.user || !this.token) return;

            try {
                const response = await fetch('http://localhost:8080/api/auth/me', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: this.user.id })
                });

                if (response.ok) {
                    const userData = await response.json();

                    // Update state Pinia
                    this.user = userData;

                    // Update LocalStorage agar sinkron
                    localStorage.setItem('user', JSON.stringify(userData));

                    return true;
                }
            } catch (error) {
                console.error("Gagal refresh data user:", error);
            }
        }
    }
})