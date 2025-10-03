<template>
  <div class="grid max-[550px]:grid-cols-1 max-[820px]:grid-cols-2 max-[1090px]:grid-cols-3 max-[1360px]:grid-cols-4 max-[1630px]:grid-cols-5 grid-cols-6 gap-20 p-15 justify-center items-center">
    <div class="relative flex-auto max-sm:hidden col-span-full bg-white">
      <div class="absolute inset-0 pl-15 flex items-center pointer-events-none">
        <i class="bi-search text-[16px]" />
      </div>
      <input v-model="Search"
             class="border-input rounded h-32 w-full pl-40 pr-10"
             placeholder="Search...">
    </div>
    <div v-for="name in Names"
         :key="name"
         class="card w-250 h-350 m-auto flex flex-col justify-center items-center gap-10">
      <img src="/src/images/NoPic.png"
           class="rounded-[50%] w-150 h-200">
      <span v-text="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
/// Data
const Search = ref<string>("");
const Names = ["Dolph", "Duff", "Jaws", "Foreman", "Snoop", "Gil", "Vixen", "Yasso", "Dugo", "Ringo", "Cedar", "Pug", "Bean", "Gene", "Peel", "Rusty", "Guppy", "Snap", "Sparrow", "Devo", "Pat"];
</script>