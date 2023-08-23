<template>
    <app-sidebar v-if="mainStore.SidebarVisible"/>
    <app-header :class="{ 'md:left-220': mainStore.SidebarVisible }" />
    <main class="absolute inset-0 top-50 bg-gray-50 overflow-auto" :class="{ 'md:left-220': mainStore.SidebarVisible }">
        <router-view />
    </main>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { mapStores } from 'pinia';
    import { mainStore } from '@/Scripts/Store';
    import AppHeader from "@/Views/Layout/AppHeader.vue";
    import AppSidebar from "@/Views/Layout/AppSidebar.vue";

    /* CSS */
    import "@/Assets/styles/tailwinds.base.css"; /* Tailwinds Base */
    import "@/Assets/styles/tailwinds.utilities.css"; /* Tailwinds Utilities */

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