import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/PersonalInformation',
      component: () => import('../views/PersonalInformation.vue'),
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
      path: '/AttendanceLeave',
      name: 'AttendanceLeave',
      component: () => import('../components/Attendance/AttendanceLeave.vue')
    },
    {
      path: '/LeaveApplicationReview',
      name: 'LeaveApplicationReview',
      component: () => import('../components/Attendance/LeaveApplicationReview.vue')
    },

    {
      path: '/Payroll',
      name: 'Payroll',
      component: () => import('../views/Payroll.vue')
    },
    {
      path: '/SelectFuntionPage',
      name: 'SelectFuntionPage',
      component: () => import('../views/SelectFuntionPage.vue')
    },

    {
      path: '/Staff',
      name: 'Staff',
      component: () => import('../views/Staff.vue')
    },
    {
      path: '/StaffSearch',
      name: 'StaffSearch',
      component: () => import('../components/Staff/StaffSearch.vue')
    },
    {
      path: '/StaffCreate',
      name: 'StaffCreate',
      component: () => import('../components/Staff/StaffCreate.vue')
    },
    {
      path: '/StaffUpdateActive',
      name: 'StaffUpdateActive',
      component: () => import('../components/Staff/StaffUpdateActive.vue')
    },
    {
      path: '/StaffChangePassword',
      name: 'StaffChangePassword',
      component: () => import('../components/Staff/StaffChangePassword.vue')
    },
  ]
})

export default router
