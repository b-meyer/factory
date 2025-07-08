<template>
  <div class="flex flex-col gap-5">
    <div class="h-124 w-124"
         :style="{ backgroundColor: colorStore.RGB(Color)}" />
    <div class="flex items-center justify-between gap-5">
      <input v-if="Color.Primary"
             v-model="colorStore.Selected.PrimaryHue"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="359"
             type="number"
             disabled>
      <input v-else
             v-model="_Color.H"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="359"
             type="number">
      <input v-model="_Color.S"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="100"
             type="number">
      <input v-model="_Color.L"
             class="border-input rounded w-34 h-34 text-center"
             min="0"
             max="100"
             type="number">
    </div>
    <div class="flex items-center justify-center gap-5">
      <input v-model="_Color.Primary"
             class="w-34"
             type="checkbox">
      <div class="text-center flex-auto"
           v-text="colorStore.RGB(Color)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapStores } from 'pinia';
import { Color } from '../scripts/models';
import { colorStore } from '../scripts/store';
export default defineComponent({
   props: {
      Color: {
         type: Object as PropType<Color>,
         required: true,
      },
   },
   emits: ['update:Color'],
   computed: {
      ...mapStores(colorStore),
      _Color: {
         get() {
            return this.Color;
         },
         set(value: Color) {
            this.$emit('update:Color', value);
         },
      },
   },
});
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>