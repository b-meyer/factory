<template>
   <div class="flex flex-col gap-5">
      <div class="h-124 w-124" :style="{ backgroundColor: colorStore.RGB(model) }" />
      <div class="flex items-center justify-between gap-5">
         <input v-if="model.Primary" v-model="colorStore.Selected.PrimaryHue"
            class="border-input rounded w-34 h-34 text-center" min="0" max="359" type="number" disabled>
         <input v-else v-model="model.H" class="border-input rounded w-34 h-34 text-center" min="0" max="359"
            type="number">
         <input v-model="model.S" class="border-input rounded w-34 h-34 text-center" min="0" max="100" type="number">
         <input v-model="model.L" class="border-input rounded w-34 h-34 text-center" min="0" max="100" type="number">
      </div>
      <div class="flex items-center justify-center gap-5">
         <input v-model="model.Primary" class="mx-10" type="checkbox">
         <div class="text-center flex-auto" v-text="colorStore.RGB(model)" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { Color } from '../scripts/models';
import { useColorStore } from '../scripts/store';
/// Setup
const colorStore = useColorStore();
/// Data
const model = defineModel<Color>({ required: true });
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
   -webkit-appearance: none;
   margin: 0;
}
</style>