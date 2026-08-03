import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Main from '@/pages/HomeChild/Main.vue'
import Calc from '@/pages/HomeChild/Calc.vue'
import Food from '@/pages/HomeChild/Food.vue'
import Excercise from '@/pages/HomeChild/Excercise.vue'
import Product from '@/pages/HomeChild/Product.vue'
import VerifyEmail from '@/pages/VerifyEmail.vue'
import ForgotPassword from '@/pages/ForgotPassword.vue'

// Middleware untuk halaman yang membutuhkan login (seperti pages di folder HomeChild)
const requireAuth = async (to, from, next) => {
  const authStore = useAuthStore()

  // Jika session belum pernah dicek dari server cookie, lakukan pengecekan sekarang
  if (!authStore.isSessionChecked) {
    await authStore.fetchSession()
    authStore.isSessionChecked = true
  }

  // Status login langsung dikirim dari server (isLogin: true)
  if (!authStore.user || !authStore.user.isLogin) {
    return next({ name: 'Login' })
  }

  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "", // Default Child Component (Public)
          name: "Main",
          component: Main,
        },
        {
          path: "calc",
          name: "Calc",
          component: Calc,
          beforeEnter: requireAuth,
        },
        {
          path: "food",
          name: "Food",
          component: Food,
          beforeEnter: requireAuth,
        },
        {
          path: "excercise",
          name: "Excercise",
          component: Excercise,
          beforeEnter: requireAuth,
        },
        {
          path: "product",
          name: "Product",
          component: Product,
          beforeEnter: requireAuth,
        },
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/verify-email",
      name: "VerifyEmail",
      component: VerifyEmail
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword
    },
  ]
})

export default router
