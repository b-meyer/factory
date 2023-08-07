<template>
    <div class="flex flex-col gap-5">
        <div class="h-124 w-124" :style="{ backgroundColor: backgroundColor}"/>
        <div class="flex items-center justify-between gap-5">
            <input v-if="Color.Primary" class="border-input rounded w-34 h-34 px-5 text-center" min="0" max="359" type="number" disabled v-model="colorStore.Selected.PrimaryHue"/>
            <input v-else class="border-input rounded w-34 h-34 px-5 text-center" min="0" max="359" type="number" v-model="Color.H"/>
            <input class="border-input rounded w-34 h-34 px-5 text-center" min="0" max="100" type="number" v-model="Color.S"/>
            <input class="border-input rounded w-34 h-34 px-5 text-center" min="0" max="100" type="number" v-model="Color.L"/>
        </div>
        <div class="flex items-center justify-center gap-5">
            <input class="w-34" type="checkbox" v-model="Color.Primary"/>
            <div class="text-center flex-auto" v-text="backgroundColor"/>
        </div>
    </div>
</template>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { mapStores } from 'pinia';
import { Color } from '../Scripts/Models';
import { colorStore } from '../Scripts/Store';
export default defineComponent({
    props: {
        Color: {
            type: Color,
            required: true,
        },
    },
    data: () => reactive({  }),
    computed: {
        ...mapStores(colorStore),
        backgroundColor() {
            return this.colorStore.RGB(this.Color);
        }
    },
    methods: {},
});
</script>