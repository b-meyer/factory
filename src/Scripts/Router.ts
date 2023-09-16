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
        // Maintenance
        {
            path: '/Icons',
            name: 'icons',
            component: () => import('@/Views/Pages/Icons.vue'),
        },
    ],
});