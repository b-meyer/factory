<template>
  <header class="absolute inset-0 h-50 border-b border-gray-200 bg-gray-25 shadow-sm"
          :class="{ 'md:left-220': mainStore.SidebarVisible }">
    <i class="bi-list absolute inset-0 w-50 flex justify-center items-center text-[24px] hover:font-bold"
       @click="mainStore.SidebarVisible = !mainStore.SidebarVisible" />
    <h1 class="flex justify-center items-center h-50 text-[22px]"
        v-text="'Factory'" />
  </header>
</template>

<script lang="ts">
import { defineComponent, } from 'vue'
import { mapStores, } from 'pinia'
import { mainStore } from '@/scripts/store';
export default defineComponent({
   components: { },
   computed: {
      ...mapStores(mainStore),
   },
});
</script>