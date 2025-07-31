<template>
  <div class="flex flex-col w-full min-w-580 min-h-full p-20 shadow max-md:text-12">
    <div class="relative flex">
      <div v-for="tab in Object.values(FFLTabs)"
           :key="tab"
           class="tab"
           :class="{'active': ActiveTab == tab}"
           @click="ActiveTab = tab"
           v-text="tab" />
      <div class="absolute -top-7 right-0 flex items-center gap-10">
        <input v-model="Zeros"
               type="checkbox">
        <select v-model="ActiveSeason"
                name="ActiveSeason"
                class="w-70 md:w-80">
          <option v-for="season in seasons"
                  :key="season.SEA_Season_PK"
                  :value="season.SEA_Season_PK"
                  v-text="season.SEA_Season_PK" />
        </select>
        <select v-model="ActiveScoringPeriod"
                name="ActiveScoringPeriod"
                class="w-90 md:w-105">
          <option :value="null">
            All
          </option>
          <option v-for="scoringPeriod in scoringPeriods"
                  :key="`${scoringPeriod.SPD_ScoringPeriod_PK}|${scoringPeriod.SPD_Name}`"
                  :value="scoringPeriod.SPD_ScoringPeriod_PK"
                  v-text="scoringPeriod.SPD_Name" />
        </select>
        <select v-model="ActiveTeam"
                name="ActiveTeam"
                class="w-170 md:w-220">
          <option :value="null">
            All
          </option>
          <option v-for="team in teams"
                  :key="`${team.TEM_Team_PK}|${team.TEM_Name}`"
                  :value="team.TEM_Team_PK"
                  v-text="team.TEM_Name" />
        </select>
      </div>
    </div>
    <div class="flex-auto card rounded-l-none"
         :class="{'h-0': ActiveTab == FFLTabs.Rules}">
      <div v-show="ActiveTab == FFLTabs.Games"
           class="h-full grid-table *:grid-cols-6">
        <div>
          <div v-text="'Week'" />
          <div v-text="'Team'" />
          <div v-text="'Player'" />
          <div v-text="'Position'" />
          <div v-text="'Projected'" />
          <div v-text="'Points'" />
        </div>
        <div v-for="player in Filtered"
             :key="`${player.SPD_ScoringPeriod_FK}|${player.PYR_Player_PK}`">
          <div v-text="scoringPeriodName(player.SPD_ScoringPeriod_FK)" />
          <div v-text="teamName(player.TEM_Team_FK)" />
          <div v-text="player.PYR_Name" />
          <div v-text="positionName(player.PYP_PlayerPosition_FK)" />
          <div v-text="Math.round(player.PYR_Projected * 100) / 100" />
          <div v-text="Math.round(player.PYR_Points * 100) / 100" />
        </div>
      </div>
      <div v-show="ActiveTab == FFLTabs.Stats"
           class="h-full grid-table *:grid-cols-4">
        <div>
          <div v-text="'Team'" />
          <div v-text="'Projected'" />
          <div v-text="'Points'" />
          <div v-text="'Zeros'" />
        </div>
        <div v-for="stat in Stats"
             :key="`${stat.TEM_Team_PK}|${stat.TEM_Name}`">
          <div v-text="stat.TEM_Name" />
          <div v-text="Math.round(stat.PYR_Projected * 100) / 100" />
          <div v-text="Math.round(stat.PYR_Points * 100) / 100" />
          <div v-text="stat.PYR_Zeros" />
        </div>
      </div>
      <div v-show="ActiveTab == FFLTabs.Rules"
           class="h-full flex justify-center items-center"
           v-text="'Coming Soon&trade;'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FFLTabs } from './scripts/enums';
import { scoringPeriods, seasons, teams, positions, players } from './scripts/data';
const ActiveSeason = ref(2024);
const ActiveScoringPeriod = ref(null);
const ActiveTeam = ref(null);
const ActiveTab = ref(FFLTabs.Games);
const Zeros = ref(false);
const Stats = teams.map(team => {
   const _players = players.filter(x => x.TEM_Team_FK == team.TEM_Team_PK && x.PYP_PlayerPosition_FK != 20 && x.PYP_PlayerPosition_FK != 21 && x.SPD_ScoringPeriod_FK < 15);
   const periods = new Set(_players.map(x => x.SPD_ScoringPeriod_FK)).size;
   return {
      TEM_Team_PK: team.TEM_Team_PK,
      TEM_Name: team.TEM_Name,
      PYR_Projected: _players.reduce((a, b) => a + b.PYR_Projected, 0) / periods,
      PYR_Points: _players.reduce((a, b) => a + b.PYR_Points, 0) / periods,
      PYR_Zeros: _players.reduce((a, b) => a + (b.PYR_Points == 0 ? 1 : 0), 0),
   };
});
const Filtered = computed(() => players.filter(x =>
   (ActiveSeason.value == x.SEA_Season_FK) &&
   (ActiveScoringPeriod.value == null || ActiveScoringPeriod.value == x.SPD_ScoringPeriod_FK) &&
   (ActiveTeam.value == null || ActiveTeam.value == x.TEM_Team_FK) &&
   (!Zeros.value || x.PYR_Points == 0 && x.PYP_PlayerPosition_FK != 20 && x.PYP_PlayerPosition_FK != 21)
));
const scoringPeriodName = (id: number) => scoringPeriods.find(x => x.SPD_ScoringPeriod_PK == id)?.SPD_Name || "";
const teamName = (id: number) => teams.find(x => x.TEM_Team_PK == id)?.TEM_Name || "";
const positionName = (id: number) => positions.find(x => x.PYP_PlayerPosition_PK == id)?.PYP_Name || "";
</script>