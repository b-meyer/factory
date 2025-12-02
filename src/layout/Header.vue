<template>
  <header class="absolute inset-0 h-50 border-b border-gray-200 bg-gray-25 shadow-sm"
          :class="{ 'md:left-220': mainStore.SidebarVisible }">
    <i class="bi-list absolute inset-0 w-50 flex justify-center items-center text-24 hover:font-bold"
       @click="mainStore.SidebarVisible = !mainStore.SidebarVisible" />
    <h1 class="flex justify-center items-center h-50 text-22"
        v-text="'Factory'" />
  </header>
</template>

<script setup lang="ts">
import { useMainStore } from '@/scripts/store';
const mainStore = useMainStore();
</script>