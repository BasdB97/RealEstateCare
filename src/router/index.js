import { createRouter, createWebHistory } from '@ionic/vue-router';
import Dashboard from '../pages/Dashboard.vue';
import DamageReports from '../components/DamageReports.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/DamageReports',
    component: DamageReports
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
