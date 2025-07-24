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
               class="flex flex-col p-20 gap-30">
            <div>Winners</div>
            <div class="flex gap-20">
              <div class="flex flex-col gap-5">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[0].TeamA!)" />
                  <div v-text="Bracket[0].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[0].TeamB!)" />
                  <div v-text="Bracket[0].TeamBScore ?? ''" />
                </div>
                <div />
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[1].TeamA!)" />
                  <div v-text="Bracket[1].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[1].TeamB!)" />
                  <div v-text="Bracket[1].TeamBScore ?? ''" />
                </div>
                <div />
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[2].TeamA!)" />
                  <div v-text="Bracket[2].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[2].TeamB!)" />
                  <div v-text="Bracket[2].TeamBScore ?? ''" />
                </div>
                <div />
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[3].TeamA!)" />
                  <div v-text="Bracket[3].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[3].TeamB!)" />
                  <div v-text="Bracket[3].TeamBScore ?? ''" />
                </div>
              </div>
              <div class="flex flex-col gap-45 pt-15">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[4].TeamA!)" />
                  <div v-text="Bracket[4].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[4].TeamB!)" />
                  <div v-text="Bracket[4].TeamBScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[5].TeamA!)" />
                  <div v-text="Bracket[5].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[5].TeamB!)" />
                  <div v-text="Bracket[5].TeamBScore ?? ''" />
                </div>
              </div>
              <div class="flex flex-col gap-120 pt-52">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[8].TeamA!)" />
                  <div v-text="Bracket[8].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[8].TeamB!)" />
                  <div v-text="Bracket[8].TeamBScore ?? ''" />
                </div>
              </div>
              <div class="flex flex-col pt-127">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[12].TeamA!)" />
                  <div v-text="Bracket[12].TeamAScore ?? ''" />
                </div>
              </div>
            </div>
            <div>Losers</div>
            <div class="flex gap-20">
              <div class="flex flex-col gap-5">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[6].TeamA!)" />
                  <div v-text="Bracket[6].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[6].TeamB!)" />
                  <div v-text="Bracket[6].TeamBScore ?? ''" />
                </div>
                <div />
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[7].TeamA!)" />
                  <div v-text="Bracket[7].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[7].TeamB!)" />
                  <div v-text="Bracket[7].TeamBScore ?? ''" />
                </div>
              </div>
              <div class="flex flex-col gap-45 pt-15">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[9].TeamA!)" />
                  <div v-text="Bracket[9].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[9].TeamB!)" />
                  <div v-text="Bracket[9].TeamBScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[10].TeamA!)" />
                  <div v-text="Bracket[10].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[10].TeamB!)" />
                  <div v-text="Bracket[10].TeamBScore ?? ''" />
                </div>
              </div>
              <div class="flex flex-col gap-120 pt-52">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[11].TeamA!)" />
                  <div v-text="Bracket[11].TeamAScore ?? ''" />
                </div>
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[11].TeamB!)" />
                  <div v-text="Bracket[11].TeamBScore ?? ''" />
                </div>
              </div>
              <div class="flex flex-col pt-127">
                <div class="flex w-180 h-30 border-input items-center justify-between rounded py-2 px-10">
                  <div v-text="Team(Bracket[12].TeamA!)" />
                  <div v-text="Bracket[12].TeamAScore ?? ''" />
                </div>
              </div>
            </div>
          </div>
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
              <div v-text="typeof game.win == 'boolean' ? game.win ? 'Yes' : 'No' : ''" />
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
          <div v-if="ActiveTab == BeerDieTabs.Rules"
               class="p-20"
               v-text="'1. Don\'t be a bitch'" />
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
const Teams = [
   [BeerDiePlayers.Dolph, BeerDiePlayers.Duff],
   [BeerDiePlayers.Jaws, BeerDiePlayers.Foreman],
   [BeerDiePlayers.Bean, BeerDiePlayers.Gene],
   [BeerDiePlayers.Rusty, BeerDiePlayers.Peel],
   [BeerDiePlayers.Vixson, BeerDiePlayers.Yasso],
   [BeerDiePlayers.Snoop, BeerDiePlayers.Gil],
   [BeerDiePlayers.Dugo, BeerDiePlayers.Ringo],
   [BeerDiePlayers.Cedar, BeerDiePlayers.Pug],
];
const Bracket = [
   { TeamA: 0, TeamAScore: 2, TeamB: 1, TeamBScore: 0 },
   { TeamA: 2, TeamAScore: 2, TeamB: 3, TeamBScore: 1 },
   { TeamA: 4, TeamAScore: 2, TeamB: 5, TeamBScore: 0 },
   { TeamA: 6, TeamAScore: 2, TeamB: 7, TeamBScore: 0 },
   { TeamA: 0, TeamAScore: 0, TeamB: 2, TeamBScore: 2 },
   { TeamA: 4, TeamAScore: null, TeamB: 6, TeamBScore: null },
   { TeamA: 1, TeamAScore: null, TeamB: 3, TeamBScore: null },
   { TeamA: 5, TeamAScore: null, TeamB: 7, TeamBScore: null },
   { TeamA: 2, TeamAScore: null, TeamB: null, TeamBScore: null },
   { TeamA: null, TeamAScore: null, TeamB: null, TeamBScore: null },
   { TeamA: 0, TeamAScore: null, TeamB: null, TeamBScore: null },
   { TeamA: null, TeamAScore: null, TeamB: null, TeamBScore: null },
   { TeamA: null, TeamAScore: null, TeamB: null, TeamBScore: null },
];
const Games = [
   { date: 'Round 1', player: null, win: null, points: null, sinks: null, doublebody: null },
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
   { date: 'Round 2', player: null, win: null, points: null, sinks: null, doublebody: null },
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
   const points = games.reduce((a,b) => a + b.points!, 0);
   const sinks = games.reduce((a,b) => a + b.sinks!, 0);
   const doublebody = games.reduce((a,b) => a + b.doublebody!, 0);
   return {
      player: p,
      winloss: `${wins}/${total} (${Math.round(total ? 100*wins/total : 0)}%)`,
      points: `${points} (${Math.round((total ? points/total : 0) * 100 | 0) / 100})`,
      sinks: `${sinks} (${Math.round((total ? sinks/total : 0) * 100 | 0) / 100})`,
      doublebody: `${doublebody} (${Math.round((total ? doublebody/total : 0) * 100 | 0) / 100})`
   };
}));
const Team = (team: number) => team != null ? `${Teams[team][0]} / ${Teams[team][1]}` : '';
</script>