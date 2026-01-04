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

                // 5 . validasi masa premium
                await fetch('http://localhost:8080/api/premium/validate-exp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data: data.user.id })
                })

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
        }
    }
})