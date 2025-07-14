<template>
   <app-sidebar v-if="mainStore.SidebarVisible" />
   <app-header />
   <main class="absolute inset-0 top-50 bg-gray-50 overflow-auto" :class="{ 'md:left-220': mainStore.SidebarVisible }">
      <router-view />
   </main>
</template>

<script setup lang="ts">
import { useMainStore } from '@/scripts/store';
import AppHeader from "./Header.vue";
import AppSidebar from "./Sidebar.vue";
import "@/styles/main.css";
const mainStore = useMainStore();
</script>