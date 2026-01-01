import { defineStore } from 'pinia'
import axios from 'axios'

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
                // Panggil API Backend yang kita buat di Tahap 2
                const res = await axios.post('http://localhost:8080/api/auth/login', { username, password })

                this.token = res.data.token
                this.user = res.data.user // isi: objek

                // Simpan ke LocalStorage agar tidak hilang saat refresh
                localStorage.setItem('token', this.token)
                localStorage.setItem('user', JSON.stringify(this.user))

                return true
            } catch (error) {
                console.error("Login gagal", error)
                throw error
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