<template>
    <aside class="absolute inset-0 w-220 z-50 flex flex-col bg-primary-700  text-gray-150">
        <div class="flex items-center justify-center h-50 bg-primary-750 relative">
            <a class="" href="/">
                <i class="text-[24px] fa-city" />
            </a>
            <div class="absolute right-0 flex items-center justify-center w-50 h-50 md:hidden" @click="mainStore.SidebarVisible = false">
                <i class="bi-x text-[35px]" />
            </div>
        </div>
        <div class="flex flex-col flex-auto">
            <div v-for="section in Menu">
                <a v-if="Array.isArray(section)" v-for="link in section" class="flex items-center gap-15 p-15 h-45 hover:bg-primary-650" :href="link.Link">
                    <i class="text-[15px]" :class="link.Icon" />
                    <div v-text="link.Text" />
                </a>
                <div v-else class="flex items-center gap-15 p-15 h-45 hover:bg-primary-650"
                    :class="{ 'bg-primary-675': Active === section.Category }"
                    @click="Select(section.Category)">
                    <i class="text-[15px]" :class="section.Icon" />
                    <div v-text="section.Category" />
                    <i class="text-[12px] ml-auto" :class=" ['bi-chevron-' + (Active == section.Category ? 'down' : 'left')]" />
                </div>
                <a v-for="link in section.Links" v-show="Active == section.Category" class="flex items-center gap-15 p-15 h-45 bg-primary-675 text-[14px] hover:bg-primary-650" :href="link.Link">
                    <div class="pl-30" v-text="link.Text" />
                </a>
            </div>
        </div>
    </aside>
    <div class="absolute inset-0 z-40 bg-gray-800 opacity-80 md:hidden" @click="mainStore.SidebarVisible = false"/>
</template>

<script lang="ts">
    import { defineComponent, reactive, } from 'vue';
    import { mapStores, } from 'pinia';
    import { mainStore } from '@/Scripts/Store'

    enum MenuCategory {
        Linux = "Linux",
    }

    export default defineComponent({
        data: () => reactive({
            Active: null! as MenuCategory,
            MenuCategory: MenuCategory,
            Menu: [
                {
                    Category: MenuCategory.Linux,
                    Icon: "fab-linux",
                    Links: [
                        { Text: 'Colors', Link: '/LinuxTheme/Colors' },
                    ]
                },
                [
                    { Icon: "bi-journals", Text: 'Wishlist', Link: '/ProjectTracker' },
                    { Icon: "bi-lightning-charge", Text: 'Icons', Link: '/Icons' },
                ]
            ]
        }),
        computed: {
            ...mapStores(mainStore),
            AppVersion: () => import.meta.env.VITE_APP_VERSION,
        },
        methods: {
            Select: function (category: any) {
                this.Active = this.Active === category ? null! : category;
            },
        }
    });
</script>
