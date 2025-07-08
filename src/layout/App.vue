<template>
  <app-sidebar v-if="mainStore.SidebarVisible" />
  <app-header />
  <main class="absolute inset-0 top-50 bg-gray-50 overflow-auto"
        :class="{ 'md:left-220': mainStore.SidebarVisible }">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { mainStore } from '@/scripts/store';
import AppHeader from "./Header.vue";
import AppSidebar from "./Sidebar.vue";
import "@/Assets/tailwind.css"; 

export default defineComponent({
   components: {
      'app-header': AppHeader,
      'app-sidebar': AppSidebar,
   },
   computed: {
      ...mapStores(mainStore),
   },
})
</script>