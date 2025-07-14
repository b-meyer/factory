<template>
   <div class="flex flex-col w-full min-h-full gap-20 p-20 m-auto">
      <div class="flex flex-col flex-auto card p-20 gap-10">
         <div ref="panel" class="flex flex-auto justify-end items-end pb-10 pr-10 h-0"
            :style="{ backgroundColor: BgColor, color: TextColor }" v-text="BgColor" />
         <div v-if="width" ref="picker" class="relative flex flex-auto h-0" @mousemove="UpdatePos"
            @mousedown="UpdatePos" @touchstart="UpdatePos" @touchmove="UpdatePos">
            <div v-for="i in width" v-once :key="i" class="w-1 h-full"
               :style="{ backgroundImage: Grad(1 + 9 * i / (width - 1)) }" />
            <div class="absolute rounded-full bg-blue-500 w-14 h-14"
               :style="{ top: `calc(${100 * pos.y}% - 7px)`, left: `calc(${100 * pos.x}% - 7px)` }" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef } from 'vue';
/// Data
const panel = useTemplateRef<HTMLElement>('panel');
const picker = useTemplateRef<HTMLElement>('picker');
const width = ref(0);
const band = 3;
const pos = reactive({ x: 0.5, y: 0.5 });
/// Computed
const Color = computed(() => hsl(1 + 9 * pos.x));
const TextColor = computed(() => Color.value.l < 40 ? '#FFF' : '#000');
const BgColor = computed(() => {
   const { h, s, l } = Color.value;
   const offset = 2 * band * pos.y - band;
   return `hsl(${h + offset}, ${s}%, ${l}%)`;
});
/// Methods
const Grad = (d: number) => {
   const { h, s, l } = hsl(d);
   return `linear-gradient(in hsl, hsl(${h - band}, ${s}%, ${l}%), hsl(${h + band}, ${s}%, ${l}%))`;
};
const hsl = (d: number) => {
   /*
        https://skintone.google/get-started
        https://www.wolframalpha.com/input?i=best+fit+5deg+%5B30%2C30%2C40%2C40%2C36%2C32.4%2C23.8%2C17.7%2C26.3%2C26.7%5D
        https://www.wolframalpha.com/input?i=best+fit+5deg+%5B50%2C50%2C70.9%2C53.3%2C44.8%2C30.1%2C32%2C29.7%2C16%2C12.3%5D
        https://www.wolframalpha.com/input?i=best+fit+5deg+%5B92.9%2C90.6%2C89.2%2C82.4%2C71.6%2C48.2%2C38.6%2C29%2C19.6%2C14.3%5D
        https://www.wolframalpha.com/input?i=best+fit+5deg+%5B96%2C92%2C89.2%2C82.4%2C71.6%2C48.2%2C38.6%2C29%2C18%2C11%5D
    */
   const h = -0.0243718 * d * d * d * d * d + 0.702815 * d * d * d * d - 7.21916 * d * d * d + 31.1709 * d * d - 51.8919 * d + 57.1600;
   const s = -0.0146026 * d * d * d * d * d + 0.337949 * d * d * d * d - 2.41284 * d * d * d + 3.50408 * d * d + 11.9240 * d + 34.6400;
   //const l = -0.0205128*d*d*d*d*d + 0.566317*d*d*d*d - 5.44452*d*d*d + 20.7642*d*d - 34.0953*d + 111.033;
   const l = -0.0200513 * d * d * d * d * d + 0.553741 * d * d * d * d - 5.36345 * d * d * d + 20.9327 * d * d - 36.8210 * d + 116.640;
   return { h, s, l };
};
const UpdatePos = (e: TouchEvent | MouseEvent) => {
   let page;
   const touch = e as TouchEvent, mouse = e as MouseEvent;
   if (touch?.touches) page = touch?.touches[0]; // Any touch event
   else if (mouse?.buttons == 1 || mouse?.type == "mousedown") page = mouse; // Mouse Move + Left Click OR Mouse Down
   else return; // Dont update
   const rect = picker.value!.getBoundingClientRect(); // Control bounding dimensions
   pos.x = Math.min(1, Math.max(0, (page.pageX - rect.left) / rect.width)); // Set marker y pos
   pos.y = Math.min(1, Math.max(0, (page.pageY - rect.top) / rect.height)); // Set marker x pos
   e.stopPropagation(); // Only throw one event
   e.preventDefault(); // Only throw one event
};
/// Lifecycle
onMounted(() => width.value = panel.value?.offsetWidth || 0);
</script>