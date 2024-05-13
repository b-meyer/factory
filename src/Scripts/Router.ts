import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        // Colors
        {
            path: '/LinuxTheme/Colors',
            name: 'LinuxTheme-Colors',
            component: () => import('@/Views/Pages/LinuxTheme/Colors/Colors.vue'),
        },
        // ProjectTracker
        {
            path: '/ProjectTracker',
            name: 'ProjectTracker',
            component: () => import('@/Views/Pages/ProjectTracker/ProjectTracker.vue'),
        },
        // Motor
        {
            path: '/motor/gearOutline',
            name: 'motor-gearoutline',
            component: () => import('@/Views/Pages/Motor/GearPath.vue'),
        },
        {
            path: '/motor/involute',
            name: 'motor-involute',
            component: () => import('@/Views/Pages/Motor/Involute.vue'),
        },
        {
            path: '/motor/mk4',
            name: 'motor-mk4',
            component: () => import('@/Views/Pages/Motor/Mk4.vue'),
        },
        // Maintenance
        {
            path: '/Icons',
            name: 'icons',
            component: () => import('@/Views/Pages/Icons.vue'),
        },
    ],
});