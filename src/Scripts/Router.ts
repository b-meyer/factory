import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Colors
        {
            path: '/LinuxTheme/Colors',
            component: () => import('@/Views/Pages/LinuxTheme/Colors/Colors.vue'),
        },
        // ProjectTracker
        {
            path: '/ProjectTracker',
            component: () => import('@/Views/Pages/ProjectTracker/ProjectTracker.vue'),
        },
        // Motor
        {
            path: '/motor/gear',
            component: () => import('@/Views/Pages/Motor/Gear.vue'),
        },
        {
            path: '/motor/geart',
            component: () => import('@/Views/Pages/Motor/GearT.vue'),
        },
        {
            path: '/motor/mk4',
            component: () => import('@/Views/Pages/Motor/Mk4.vue'),
        },
        {
            path: '/motor/stl',
            component: () => import('@/Views/Pages/Motor/STL.vue'),
        },
        // Maintenance
        {
            path: '/Icons',
            component: () => import('@/Views/Pages/Icons.vue'),
        },
    ],
});