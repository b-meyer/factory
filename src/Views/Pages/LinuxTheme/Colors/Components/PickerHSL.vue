<template>
  <div class="flex flex-col gap-5">
    <div class="h-124 w-124"
         :style="{ backgroundColor: backgroundColor}" />
    <div class="flex items-center justify-between gap-5">
      <input v-if="Color.Primary"
             v-model="colorStore.Selected.PrimaryHue"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="359"
             type="number"
             disabled>
      <input v-else
             v-model="Color.H"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="359"
             type="number">
      <input v-model="Color.S"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="100"
             type="number">
      <input v-model="Color.L"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="100"
             type="number">
    </div>
    <div class="flex items-center justify-center gap-5">
      <input v-model="Color.Primary"
             class="w-34"
             type="checkbox">
      <div class="text-center flex-auto"
           v-text="backgroundColor" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    computed: {
        ...mapStores(colorStore),
        backgroundColor() {
            return this.colorStore.RGB(this.Color);
        }
    },
    methods: {},
});
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>