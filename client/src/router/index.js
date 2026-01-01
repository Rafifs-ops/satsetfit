import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Main from '@/pages/HomeChild/Main.vue'
import Calc from '@/pages/HomeChild/Calc.vue'
import Food from '@/pages/HomeChild/Food.vue'
import Excercise from '@/pages/HomeChild/Excercise.vue'
import Product from '@/pages/HomeChild/Product.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "", // Default Child Component
          name: "Main",
          component: Main,
        },
        {
          path: "calc",
          name: "Calc",
          component: Calc,
        },
        {
          path: "food",
          name: "Food",
          component: Food,
        },
        {
          path: "excercise",
          name: "Excercise",
          component: Excercise,
        },
        {
          path: "product",
          name: "Product",
          component: Product,
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
  ]
})

export default router
