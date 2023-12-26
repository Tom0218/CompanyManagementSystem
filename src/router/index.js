import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'logIn',
      component: LogIn
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },

    {
      path: '/SignIn',
      name: 'SignIn',
      component: () => import('../views/SignIn.vue')
    },

    {
      path: '/Attendance',
      name: 'Attendance',
      component: () => import('../views/Attendance.vue')
    },

    {
      path: '/Payroll',
      name: 'Payroll',
      component: () => import('../views/Payroll.vue')
    },

    {
      path: '/Staff',
      name: 'Staff',
      component: () => import('../views/Staff.vue')
    },
  ]
})

export default router
