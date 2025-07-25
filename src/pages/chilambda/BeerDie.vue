<template>
  <div class="flex w-full min-h-full p-20 shadow max-md:text-12">
    <div class="flex flex-col min-w-fit card shadow-none rounded-r-none border-r-0 p-20 gap-5">
      <div v-for="category in Object.values(BeerDieSeasons)"
           :key="category"
           class="flex w-110 md:w-125 h-26 md:h-30 items-center justify-center"
           :class="{'rounded border-input': ActiveSeason == category}"
           @click="ActiveSeason = category"
           v-text="category" />
    </div>
    <div class="flex flex-col flex-auto w-0">
      <div class="flex">
        <div v-for="category in Object.values(BeerDieTabs)"
             :key="category"
             class="tab first:rounded-tl-none"
             :class="{'active': ActiveTab == category}"
             @click="ActiveTab = category"
             v-text="category" />
      </div>
      <div class="flex-auto card shadow-none rounded-l-none overflow-x-auto *:min-w-450">
        <div v-if="ActiveTab == BeerDieTabs.Bracket"
             class="h-full flex p-20 gap-60 overflow-x-auto">
          <div class="flex flex-col gap-30">
            <div>Winners</div>
            <div class="flex gap-38">
              <div class="flex flex-col gap-5 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10 *:even:mb-5">
                <div :class="{'text-gray-400': (Bracket[0].TeamAScore ?? 0) < (Bracket[0].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[0].TeamA!)" />
                  <div v-text="Bracket[0].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[0].TeamAScore ?? 0) > (Bracket[0].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[0].TeamB!)" />
                  <div v-text="Bracket[0].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[1].TeamAScore ?? 0) < (Bracket[1].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[1].TeamA!)" />
                  <div v-text="Bracket[1].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[1].TeamAScore ?? 0) > (Bracket[1].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[1].TeamB!)" />
                  <div v-text="Bracket[1].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[2].TeamAScore ?? 0) < (Bracket[2].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[2].TeamA!)" />
                  <div v-text="Bracket[2].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[2].TeamAScore ?? 0) > (Bracket[2].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[2].TeamB!)" />
                  <div v-text="Bracket[2].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[3].TeamAScore ?? 0) < (Bracket[3].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[3].TeamA!)" />
                  <div v-text="Bracket[3].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[3].TeamAScore ?? 0) > (Bracket[3].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[3].TeamB!)" />
                  <div v-text="Bracket[3].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
              </div>
              <div class="flex flex-col gap-41 md:gap-45 pt-16 md:pt-18 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
                <div :class="{'text-gray-400': (Bracket[4].TeamAScore ?? 0) < (Bracket[4].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[4].TeamA!)" />
                  <div v-text="Bracket[4].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[4].TeamAScore ?? 0) > (Bracket[4].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[4].TeamB!)" />
                  <div v-text="Bracket[4].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[5].TeamAScore ?? 0) < (Bracket[5].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[5].TeamA!)" />
                  <div v-text="Bracket[5].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[5].TeamAScore ?? 0) > (Bracket[5].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[5].TeamB!)" />
                  <div v-text="Bracket[5].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
              </div>
              <div class="flex flex-col gap-108 md:gap-120 pt-50 md:pt-56 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
                <div :class="{'text-gray-400': (Bracket[8].TeamAScore ?? 0) < (Bracket[8].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[8].TeamA!)" />
                  <div v-text="Bracket[8].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[8].TeamAScore ?? 0) > (Bracket[8].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[8].TeamB!)" />
                  <div v-text="Bracket[8].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
              </div>
              <div class="flex flex-col pt-117 md:pt-131 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
                <div>
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-135 md:h-151 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[12].TeamA!)" />
                </div>
              </div>
            </div>
            <div>Losers</div>
            <div class="flex gap-38">
              <div class="flex flex-col gap-5 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10 *:even:mb-5">
                <div :class="{'text-gray-400': (Bracket[6].TeamAScore ?? 0) < (Bracket[6].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[6].TeamA!)" />
                  <div v-text="Bracket[6].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[6].TeamAScore ?? 0) > (Bracket[6].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[6].TeamB!)" />
                  <div v-text="Bracket[6].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[7].TeamAScore ?? 0) < (Bracket[7].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[7].TeamA!)" />
                  <div v-text="Bracket[7].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[7].TeamAScore ?? 0) > (Bracket[7].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[7].TeamB!)" />
                  <div v-text="Bracket[7].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
              </div>
              <div class="flex flex-col gap-41 md:gap-45 pt-16 md:pt-18 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
                <div :class="{'text-gray-400': (Bracket[9].TeamAScore ?? 0) < (Bracket[9].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[9].TeamA!)" />
                  <div v-text="Bracket[9].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[9].TeamAScore ?? 0) > (Bracket[9].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[9].TeamB!)" />
                  <div v-text="Bracket[9].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[10].TeamAScore ?? 0) < (Bracket[10].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[10].TeamA!)" />
                  <div v-text="Bracket[10].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[10].TeamAScore ?? 0) > (Bracket[10].TeamBScore ?? 0) }">
                  <div v-text="TeamName(Bracket[10].TeamB!)" />
                  <div v-text="Bracket[10].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
              </div>
              <div class="flex flex-col gap-108 md:gap-120 pt-50 md:pt-56 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
                <div :class="{'text-gray-400': (Bracket[11].TeamAScore ?? 0) < (Bracket[11].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[11].TeamA!)" />
                  <div v-text="Bracket[11].TeamAScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
                <div :class="{'text-gray-400': (Bracket[11].TeamAScore ?? 0) > (Bracket[11].TeamBScore ?? 0) }">
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[11].TeamB!)" />
                  <div v-text="Bracket[11].TeamBScore ?? ''" />
                  <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
                </div>
              </div>
              <div class="flex flex-col pt-117 md:pt-131 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
                <div>
                  <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                  <div class="absolute h-135 md:h-151 w-1 -left-20 bg-gray-300" />
                  <div v-text="TeamName(Bracket[12].TeamA!)" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-10 *:w-120 *:md:w-150">
            <div>Results</div>
            <div>1.</div>
            <div>2.</div>
            <div>3.</div>
            <div>4.</div>
            <div>5.</div>
            <div>5.</div>
            <div>6.</div>
            <div>6.</div>
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
             class="h-full flex flex-col *:grid *:grid-cols-5 *:border-b **:border-gray-400 *:w-full *:text-center -mb-1">
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { BeerDieTabs, BeerDieSeasons, BeerDiePlayers } from './scripts/enums';
const ActiveSeason = ref(BeerDieSeasons.Summer2025);
const ActiveTab = ref(BeerDieTabs.Bracket);
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
      winloss: `${wins}/${total} (${Math.round(total ? 100 * wins / total : 0)}%)`,
      points: `${points} (${Math.round((total ? points / total : 0) * 100 | 0) / 100})`,
      sinks: `${sinks} (${Math.round((total ? sinks / total : 0) * 100 | 0) / 100})`,
      doublebody: `${doublebody} (${Math.round((total ? doublebody / total : 0) * 100 | 0) / 100})`
   };
}));
const TeamName = (team: number) => team != null ? `${Teams[team][0]} / ${Teams[team][1]}` : '';
</script>