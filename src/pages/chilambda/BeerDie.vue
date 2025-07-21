<template>
  <div class="flex w-full min-h-full gap-20 p-20 m-auto">
    <div class="flex flex-auto shadow">
      <div class="flex flex-col card shadow-none rounded-r-none border-r-0 p-20 gap-5">
        <div v-for="category in Object.values(BeerDieSeasons)"
             :key="category"
             class="px-10"
             :class="{'rounded border-input': ActiveSeason == category}"
             @click="ActiveSeason = category"
             v-text="category" />
      </div>
      <div class="flex flex-col flex-auto min-w-650">
        <div class="flex">
          <div v-for="category in Object.values(BeerDieTabs)"
               :key="category"
               class="tab"
               :class="{'active': ActiveTab == category}"
               @click="ActiveTab = category"
               v-text="category" />
        </div>
        <div class="flex-auto card shadow-none rounded-l-none">
          <div v-if="ActiveTab == BeerDieTabs.Bracket"
               class="h-full flex justify-center items-center"
               v-text="'Coming Soon&trade;'" />
          <div v-if="ActiveTab == BeerDieTabs.Games"
               class="h-full flex flex-col *:grid *:grid-cols-6 *:border-b **:border-gray-400 *:w-full *:text-center -mb-1">
            <div class="*:not-last:border-r !border-b-black">
              <div v-text="'Date'" />
              <div v-text="'Player'" />
              <div v-text="'Win'" />
              <div v-text="'Points'" />
              <div v-text="'Sinks'" />
              <div v-text="'Double Body'" />
            </div>
            <div v-for="(game, i) in Games"
                 :key="i"
                 class="*:not-last:border-r">
              <div v-text="game.date" />
              <div v-text="game.player" />
              <div v-text="game.win ? 'Yes' : 'No'" />
              <div v-text="game.points" />
              <div v-text="game.sinks" />
              <div v-text="game.doublebody" />
            </div>
          </div>
          <div v-if="ActiveTab == BeerDieTabs.Stats"
               class="h-full flex flex-col *:grid *:grid-cols-5 *:border-b **:border-gray-400 *:w-full *:text-center">
            <div class="*:not-last:border-r !border-b-black">
              <div v-text="'Player'" />
              <div v-text="'Win Loss'" />
              <div v-text="'Points'" />
              <div v-text="'Sinks'" />
              <div v-text="'Double Body'" />
            </div>
            <div v-for="(stat, i) in Stats"
                 :key="i"
                 class="*:not-last:border-r">
              <div v-text="stat.player" />
              <div v-text="stat.winloss" />
              <div v-text="stat.points" />
              <div v-text="stat.sinks" />
              <div v-text="stat.doublebody" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { BeerDieTabs, BeerDieSeasons, BeerDiePlayers } from './scripts/enums';
const ActiveSeason = ref(BeerDieSeasons.Summer2025);
const ActiveTab = ref(BeerDieTabs.Games);
const Games = [
   { date: '06/14/25', player: BeerDiePlayers.Vixson, win: true, points: 6, sinks: 0, doublebody: 0 },
   { date: '06/14/25', player: BeerDiePlayers.Yasso, win: true, points: 2, sinks: 1, doublebody: 0 },
   { date: '06/14/25', player: BeerDiePlayers.Gil,  win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '06/14/25', player: BeerDiePlayers.Snoop, win: false, points: 4, sinks: 0, doublebody: 0 },
   { date: '06/14/25', player: BeerDiePlayers.Vixson, win: true, points: 3, sinks: 1, doublebody: 0 },
   { date: '06/14/25', player: BeerDiePlayers.Yasso, win: true, points: 4, sinks: 0, doublebody: 0 },
   { date: '06/14/25', player: BeerDiePlayers.Gil,  win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '06/14/25', player: BeerDiePlayers.Snoop, win: false, points: 1, sinks: 1, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Rusty, win: true, points: 4, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Peel, win: true, points: 5, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Bean,  win: false, points: 2, sinks: 1, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Gene, win: false, points: 5, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Bean,  win: true, points: 3, sinks: 0, doublebody: 1 },
   { date: '06/22/25', player: BeerDiePlayers.Gene, win: true, points: 4, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Rusty, win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Peel, win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Bean,  win: true, points: 3, sinks: 1, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Gene, win: true, points: 4, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Rusty, win: false, points: 3, sinks: 0, doublebody: 0 },
   { date: '06/22/25', player: BeerDiePlayers.Peel, win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Duff,  win: true, points: 6, sinks: 6, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Dolph, win: true, points: 3, sinks: 5, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Foreman, win: false, points: 3, sinks: 0, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Jaws, win: false, points: 4, sinks: 0, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Dugo,  win: true, points: 6, sinks: 1, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Pug, win: false, points: 4, sinks: 2, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Cedar, win: false, points: 5, sinks: 2, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Dugo,  win: true, points: 3, sinks: 0, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Pug, win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Cedar, win: false, points: 1, sinks: 0, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Duff,  win: true, points: 1, sinks: 1, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Dolph, win: true, points: 6, sinks: 0, doublebody: 0 },
   { date: '06/27/25', player: BeerDiePlayers.Jaws, win: false, points: 5, sinks: 0, doublebody: 0 },
   { date: '07/20/25', player: BeerDiePlayers.Bean,  win: true, points: 2, sinks: 4, doublebody: 0 },
   { date: '07/20/25', player: BeerDiePlayers.Gene, win: true, points: 7, sinks: 0, doublebody: 0 },
   { date: '07/20/25', player: BeerDiePlayers.Duff, win: false, points: 4, sinks: 7, doublebody: 1 },
   { date: '07/20/25', player: BeerDiePlayers.Dolph, win: false, points: 3, sinks: 1, doublebody: 0 },
   { date: '07/20/25', player: BeerDiePlayers.Bean,  win: true, points: 6, sinks: 1, doublebody: 0 },
   { date: '07/20/25', player: BeerDiePlayers.Gene, win: true, points: 4, sinks: 1, doublebody: 0 },
   { date: '07/20/25', player: BeerDiePlayers.Duff, win: false, points: 6, sinks: 3, doublebody: 0 },
   { date: '07/20/25', player: BeerDiePlayers.Dolph, win: false, points: 2, sinks: 2, doublebody: 0 },
];
const Stats = computed(() => Object.values(BeerDiePlayers).map(p => {
   const games = Games.filter(x => x.player == p), total = games.length;
   const wins = games.filter(x => x.win).length;
   const points = games.reduce((a,b) => a + b.points, 0);
   const sinks = games.reduce((a,b) => a + b.sinks, 0);
   const doublebody = games.reduce((a,b) => a + b.doublebody, 0);
   return {
      player: p,
      winloss: `${wins}/${total} (${Math.round(total ? 100*wins/total : 0)}%)`,
      points: `${points} (${Math.round((total ? points/total : 0) * 100 | 0) / 100})`,
      sinks: `${sinks} (${Math.round((total ? sinks/total : 0) * 100 | 0) / 100})`,
      doublebody: `${doublebody} (${Math.round((total ? doublebody/total : 0) * 100 | 0) / 100})`
   };
}));
</script>