<template>
  <div class="flex flex-col w-full min-h-full p-20 shadow pointer-coarse:text-12"
       :class="[ ActiveTab == FFLTabs.Games ? 'min-w-575' : 'min-w-400' ]">
    <div class="relative flex">
      <div v-for="tab in Object.values(FFLTabs)"
           :key="tab"
           class="tab"
           :class="{'active': ActiveTab == tab}"
           @click="ActiveTab = tab"
           v-text="tab" />
      <div class="absolute -top-7 right-0 flex items-center gap-10">
        <input v-model="Zeros"
               :class="{ 'hidden': ActiveTab != FFLTabs.Games }"
               type="checkbox">
        <select v-model="ActiveTeam"
                name="ActiveTeam"
                class="pointer-coarse:w-160 w-220"
                :class="{ 'hidden': ActiveTab == FFLTabs.Points || ActiveTab == FFLTabs.Rules }">
          <option :value="null">
            All
          </option>
          <option v-for="team in teams"
                  :key="`${team.TEM_Team_PK}|${team.TEM_Name}`"
                  :value="team.TEM_Team_PK"
                  v-text="team.TEM_Name" />
        </select>
        <select v-model="ActiveScoringPeriod"
                name="ActiveScoringPeriod"
                class="pointer-coarse:w-90 w-105"
                :class="{ 'hidden': ActiveTab == FFLTabs.Rules }">
          <option :value="null">
            All
          </option>
          <option v-for="scoringPeriod in scoringPeriods"
                  :key="`${scoringPeriod.SPD_ScoringPeriod_PK}|${scoringPeriod.SPD_Name}`"
                  :value="scoringPeriod.SPD_ScoringPeriod_PK"
                  v-text="scoringPeriod.SPD_Name" />
        </select>
        <select v-model="ActiveSeason"
                name="ActiveSeason"
                class="pointer-coarse:w-70 w-80">
          <option v-for="season in seasons"
                  :key="season.SEA_Season_PK"
                  :value="season.SEA_Season_PK"
                  v-text="season.SEA_Season_PK" />
        </select>
      </div>
    </div>
    <div class="flex-auto card rounded-l-none overflow-x-auto"
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
        <div v-for="player in Games"
             :key="`${player.SPD_ScoringPeriod_FK}|${player.PYR_Player_PK}`">
          <div v-text="scoringPeriodName(player.SPD_ScoringPeriod_FK)" />
          <div v-text="teamName(player.TEM_Team_FK)" />
          <div v-text="player.PYR_Name" />
          <div v-text="positionName(player.PYP_PlayerPosition_FK)" />
          <div v-text="Math.round(player.PYR_Projected * 100) / 100" />
          <div v-text="Math.round(player.PYR_Points * 100) / 100" />
        </div>
      </div>
      <div v-show="ActiveTab == FFLTabs.Points"
           class="h-full min-w-1200 grid-table *:grid-cols-12">
        <div>
          <div v-text="'Team'" />
          <div v-text="'QB'" />
          <div v-text="'RB'" />
          <div v-text="'WR'" />
          <div v-text="'TE'" />
          <div v-text="'Flex'" />
          <div v-text="'LB'" />
          <div v-text="'DL'" />
          <div v-text="'DB'" />
          <div v-text="'K'" />
          <div v-text="'Total'" />
          <div v-text="'Zeros'" />
        </div>
        <div v-for="stat in TeamTotals"
             :key="`${stat.TEM_Team_PK}|${stat.TEM_Name}`">
          <div v-text="stat.TEM_Name" />
          <div v-text="stat.QB" />
          <div v-text="stat.RB" />
          <div v-text="stat.WR" />
          <div v-text="stat.TE" />
          <div v-text="stat.Flex" />
          <div v-text="stat.LB" />
          <div v-text="stat.DL" />
          <div v-text="stat.DB" />
          <div v-text="stat.K" />
          <div v-text="stat.PYR_Points" />
          <div v-text="stat.PYR_Zeros" />
        </div>
        <div>
          <div v-text="'Total'" />
          <div v-text="LeaugeTotals.QB" />
          <div v-text="LeaugeTotals.RB" />
          <div v-text="LeaugeTotals.WR" />
          <div v-text="LeaugeTotals.TE" />
          <div v-text="LeaugeTotals.Flex" />
          <div v-text="LeaugeTotals.LB" />
          <div v-text="LeaugeTotals.DL" />
          <div v-text="LeaugeTotals.DB" />
          <div v-text="LeaugeTotals.K" />
          <div v-text="LeaugeTotals.PYR_Points" />
          <div v-text="LeaugeTotals.PYR_Zeros" />
        </div>
      </div>
      <!-- <div v-show="ActiveTab == FFLTabs.Stats"
           class="h-full grid-table *:grid-cols-9">
        <div>
          <div v-text="'Position'" />
          <div v-text="'Projected'" />
          <div v-text="'Points'" />
          <div v-text="'Passing'" />
          <div v-text="'Passing TD'" />
          <div v-text="'Rushing'" />
          <div v-text="'Rushing TD'" />
          <div v-text="'Receiving'" />
          <div v-text="'Receiving TD'" />
        </div>
        <div v-for="stat in Stats"
             :key="`${stat.PYP_PlayerPosition_PK}|${stat.PYP_Name}`">
          <div v-text="stat.PYP_Name" />
          <div v-text="stat.PYR_Projected" />
          <div v-text="stat.PYR_Points" />
          <div v-text="stat.PYR_PassingYards" />
          <div v-text="stat.PYR_PassingTouchdowns" />
          <div v-text="stat.PYR_RushingYards" />
          <div v-text="stat.PYR_RushingTouchdowns" />
          <div v-text="stat.PYR_ReceivingYards" />
          <div v-text="stat.PYR_ReceivingTouchdowns" />
        </div>
      </div> -->
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
/// Data
const ActiveSeason = ref(2024);
const ActiveScoringPeriod = ref(null);
const ActiveTeam = ref(null);
const ActiveTab = ref(FFLTabs.Games);
const Zeros = ref(false);
const starters = positions.filter(x => x.PYP_PlayerPosition_PK != 20 && x.PYP_PlayerPosition_PK != 21);
/// Computed
const Games = computed(() => players.filter(x =>
   (ActiveSeason.value == x.SEA_Season_FK) &&
   (ActiveScoringPeriod.value == null || ActiveScoringPeriod.value == x.SPD_ScoringPeriod_FK) &&
   (ActiveTeam.value == null || ActiveTeam.value == x.TEM_Team_FK) &&
   (!Zeros.value || x.PYR_Points == 0 && x.PYP_PlayerPosition_FK != 20 && x.PYP_PlayerPosition_FK != 21)
));
const LeaugeTotals = computed(() => {
   const _players = players.filter(x =>
      ActiveSeason.value == x.SEA_Season_FK &&
      ((ActiveScoringPeriod.value == null && x.SPD_ScoringPeriod_FK < 15) || ActiveScoringPeriod.value == x.SPD_ScoringPeriod_FK) &&
      x.PYP_PlayerPosition_FK != 20 && x.PYP_PlayerPosition_FK != 21);
   const grouped = _players.groupBy(x => x.PYP_PlayerPosition_FK) as any;
   const divisor = new Set(_players.map(x => x.SPD_ScoringPeriod_FK)).size * teams.length;
   return {
      ...starters.reduce((obj:any, item)=> { obj[item.PYP_Name] = `${grouped[item.PYP_PlayerPosition_PK].avg((x:any) => x.PYR_Points)} (${grouped[item.PYP_PlayerPosition_PK].avg((x:any) => x.PYR_Projected)})`; return obj; },{}),
      PYR_Points: `${_players.avg(x => x.PYR_Points, divisor)} (${_players.avg(x => x.PYR_Projected, divisor)})`,
      PYR_Zeros: _players.avg(x => x.PYR_Points == 0 ? 1 : 0, teams.length),
   };
});
const TeamTotals = computed(() => teams.map(team => {
   const _players = players.filter(x =>
      x.TEM_Team_FK == team.TEM_Team_PK &&
      ActiveSeason.value == x.SEA_Season_FK &&
      ((ActiveScoringPeriod.value == null && x.SPD_ScoringPeriod_FK < 15) || ActiveScoringPeriod.value == x.SPD_ScoringPeriod_FK) &&
      x.PYP_PlayerPosition_FK != 20 && x.PYP_PlayerPosition_FK != 21);
   const grouped = _players.groupBy(x => x.PYP_PlayerPosition_FK) as any;
   const divisor = new Set(_players.map(x => x.SPD_ScoringPeriod_FK)).size;
   return {
      TEM_Team_PK: team.TEM_Team_PK,
      TEM_Name: team.TEM_Name,
      ...starters.reduce((obj:any, item)=> { obj[item.PYP_Name] = `${grouped[item.PYP_PlayerPosition_PK].avg((x:any) => x.PYR_Points)} (${grouped[item.PYP_PlayerPosition_PK].avg((x:any) => x.PYR_Projected)})`; return obj; },{}),
      PYR_Points: `${_players.avg(x => x.PYR_Points, divisor)} (${_players.avg(x => x.PYR_Projected, divisor)})`,
      PYR_Zeros: _players.sum(x => x.PYR_Points == 0 ? 1 : 0),
   };
}));
// const Stats = computed(() => positions.map(position => {
//    const leauge = players.filter(x =>
//       x.PYP_PlayerPosition_FK == position.PYP_PlayerPosition_PK &&
//       (ActiveSeason.value == x.SEA_Season_FK) &&
//       ((ActiveScoringPeriod.value == null && x.SPD_ScoringPeriod_FK < 15) || ActiveScoringPeriod.value == x.SPD_ScoringPeriod_FK)
//    );
//    const stats = {
//       PYP_PlayerPosition_PK: position.PYP_PlayerPosition_PK,
//       PYP_Name: position.PYP_Name,
//       PYR_Projected: `${leauge.avg(x => x.PYR_Projected)}`,
//       PYR_Points: `${leauge.avg(x => x.PYR_Points)}`,
//       PYR_PassingYards: `${leauge.avg(x => x.PYR_PassingYards)}`,
//       PYR_PassingTouchdowns: `${leauge.avg(x => x.PYR_PassingTouchdowns)}`,
//       PYR_RushingYards: `${leauge.avg(x => x.PYR_RushingYards)}`,
//       PYR_RushingTouchdowns: `${leauge.avg(x => x.PYR_RushingTouchdowns)}`,
//       PYR_ReceivingYards: `${leauge.avg(x => x.PYR_ReceivingYards)}`,
//       PYR_ReceivingTouchdowns: `${leauge.avg(x => x.PYR_ReceivingTouchdowns)}`,
//    };
//    if (ActiveTeam.value == null) return stats;
//    const _players = leauge.filter(x => ActiveTeam.value == x.TEM_Team_FK);
//    stats.PYR_Projected = `${_players.avg(x => x.PYR_Projected)} (${stats.PYR_Projected})`;
//    stats.PYR_Points = `${_players.avg(x => x.PYR_Points)} (${stats.PYR_Points})`;
//    stats.PYR_PassingYards = `${_players.avg(x => x.PYR_PassingYards)} (${stats.PYR_PassingYards})`;
//    stats.PYR_PassingTouchdowns = `${_players.avg(x => x.PYR_PassingTouchdowns)} (${stats.PYR_PassingTouchdowns})`;
//    stats.PYR_RushingYards = `${_players.avg(x => x.PYR_RushingYards)} (${stats.PYR_RushingYards})`;
//    stats.PYR_RushingTouchdowns = `${_players.avg(x => x.PYR_RushingTouchdowns)} (${stats.PYR_RushingTouchdowns})`;
//    stats.PYR_ReceivingYards = `${_players.avg(x => x.PYR_ReceivingYards)} (${stats.PYR_ReceivingYards})`;
//    stats.PYR_ReceivingTouchdowns = `${_players.avg(x => x.PYR_ReceivingTouchdowns)} (${stats.PYR_ReceivingTouchdowns})`;
//    return stats;
// }));
/// Methods
const scoringPeriodName = (id: number) => scoringPeriods.find(x => x.SPD_ScoringPeriod_PK == id)?.SPD_Name || "";
const teamName = (id: number) => teams.find(x => x.TEM_Team_PK == id)?.TEM_Name || "";
const positionName = (id: number) => positions.find(x => x.PYP_PlayerPosition_PK == id)?.PYP_Name || "";
</script>