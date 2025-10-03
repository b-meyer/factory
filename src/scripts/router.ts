import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
   history: createWebHistory(),
   routes: [
      // Colors
      { path: '/Colors/Linux', component: () => import('@/pages/colors/Linux.vue') },
      { path: '/Colors/Human', component: () => import('@/pages/colors/Human.vue') },
      // Motor
      { path: '/motor/gear', component: () => import('@/pages/motor/Gear.vue') },
      { path: '/motor/geart', component: () => import('@/pages/motor/GearT.vue') },
      { path: '/motor/mk4', component: () => import('@/pages/motor/Mk4.vue') },
      { path: '/motor/stl', component: () => import('@/pages/motor/STL.vue') },
      // Chi Lambda
      { path: '/chilambda/ffl', component: () => import('@/pages/chilambda/FFL.vue') },
      { path: '/chilambda/beerdie', component: () => import('@/pages/chilambda/BeerDie.vue') },
      { path: '/chilambda/playercards', component: () => import('@/pages/chilambda/PlayerCards.vue') },
      // Maintenance
      { path: '/Icons', component: () => import('@/pages/maintenance/Icons.vue') },
   ],
});