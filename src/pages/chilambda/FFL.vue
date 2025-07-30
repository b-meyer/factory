<template>
  <div class="flex flex-col w-full min-w-385 min-h-full p-20 shadow max-md:text-12">
    <div class="relative flex">
      <div v-for="tab in Object.values(FFLTabs)"
           :key="tab"
           class="tab"
           :class="{'active': ActiveTab == tab}"
           @click="ActiveTab = tab"
           v-text="tab" />
      <select v-model="ActiveSeason"
              name="ActiveSeason"
              class="absolute -top-7 right-0 w-120 md:w-150">
        <option v-for="season in Object.values(FFLSeasons)"
                :key="season"
                :value="season"
                v-text="season" />
      </select>
    </div>
    <div class="flex-auto card rounded-l-none overflow-x-auto h-0">
      <div v-if="ActiveTab == FFLTabs.Games"
           class="h-full flex justify-center items-center"
           v-text="'Coming Soon&trade;'" />
      <div v-if="ActiveTab == FFLTabs.Stats"
           class="h-full flex justify-center items-center"
           v-text="'Coming Soon&trade;'" />
      <div v-else-if="ActiveTab == FFLTabs.Rules"
           class="h-full flex justify-center items-center"
           v-text="'Coming Soon&trade;'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FFLTabs, FFLSeasons } from './scripts/enums';
const ActiveSeason = ref(FFLSeasons.Season2024);
const ActiveTab = ref(FFLTabs.Games);
</script>