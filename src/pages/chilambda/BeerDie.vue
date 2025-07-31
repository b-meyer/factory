<template>
  <div class="flex flex-col w-full min-w-385 min-h-full p-20 shadow max-md:text-12">
    <div class="relative flex">
      <div v-for="tab in Object.values(BeerDieTabs)"
           :key="tab"
           class="tab"
           :class="{'active': ActiveTab == tab}"
           @click="ActiveTab = tab"
           v-text="tab" />
      <select v-model="ActiveSeason"
              name="ActiveSeason"
              class="absolute -top-7 right-0 w-120 md:w-150">
        <option v-for="season in Object.values(BeerDieSeasons)"
                :key="season"
                :value="season"
                v-text="season" />
      </select>
    </div>
    <div class="flex-auto card rounded-l-none overflow-x-auto">
      <div v-show="ActiveTab == BeerDieTabs.Bracket"
           class="h-full flex p-20 gap-60 overflow-x-auto">
        <div class="flex flex-col gap-30">
          <div>Winners</div>
          <div class="flex gap-38">
            <div class="flex flex-col gap-5 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10 *:even:mb-5">
              <div :class="{'text-gray-400': (Bracket[0].ScoreA ?? 0) < (Bracket[0].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[0].TeamA!)" />
                <div v-text="Bracket[0].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[0].ScoreA ?? 0) > (Bracket[0].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[0].TeamB!)" />
                <div v-text="Bracket[0].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[1].ScoreA ?? 0) < (Bracket[1].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[1].TeamA!)" />
                <div v-text="Bracket[1].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[1].ScoreA ?? 0) > (Bracket[1].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[1].TeamB!)" />
                <div v-text="Bracket[1].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[2].ScoreA ?? 0) < (Bracket[2].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[2].TeamA!)" />
                <div v-text="Bracket[2].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[2].ScoreA ?? 0) > (Bracket[2].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[2].TeamB!)" />
                <div v-text="Bracket[2].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[3].ScoreA ?? 0) < (Bracket[3].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[3].TeamA!)" />
                <div v-text="Bracket[3].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[3].ScoreA ?? 0) > (Bracket[3].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[3].TeamB!)" />
                <div v-text="Bracket[3].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
            </div>
            <div class="flex flex-col gap-41 md:gap-45 pt-16 md:pt-18 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
              <div :class="{'text-gray-400': (Bracket[4].ScoreA ?? 0) < (Bracket[4].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[4].TeamA!)" />
                <div v-text="Bracket[4].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[4].ScoreA ?? 0) > (Bracket[4].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[4].TeamB!)" />
                <div v-text="Bracket[4].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[5].ScoreA ?? 0) < (Bracket[5].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[5].TeamA!)" />
                <div v-text="Bracket[5].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[5].ScoreA ?? 0) > (Bracket[5].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[5].TeamB!)" />
                <div v-text="Bracket[5].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
            </div>
            <div class="flex flex-col gap-108 md:gap-120 pt-50 md:pt-56 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
              <div :class="{'text-gray-400': (Bracket[8].ScoreA ?? 0) < (Bracket[8].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[8].TeamA!)" />
                <div v-text="Bracket[8].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[8].ScoreA ?? 0) > (Bracket[8].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[8].TeamB!)" />
                <div v-text="Bracket[8].ScoreB ?? ''" />
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
              <div :class="{'text-gray-400': (Bracket[6].ScoreA ?? 0) < (Bracket[6].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[6].TeamA!)" />
                <div v-text="Bracket[6].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[6].ScoreA ?? 0) > (Bracket[6].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[6].TeamB!)" />
                <div v-text="Bracket[6].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[7].ScoreA ?? 0) < (Bracket[7].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[7].TeamA!)" />
                <div v-text="Bracket[7].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[7].ScoreA ?? 0) > (Bracket[7].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[7].TeamB!)" />
                <div v-text="Bracket[7].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
            </div>
            <div class="flex flex-col gap-41 md:gap-45 pt-16 md:pt-18 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
              <div :class="{'text-gray-400': (Bracket[9].ScoreA ?? 0) < (Bracket[9].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[9].TeamA!)" />
                <div v-text="Bracket[9].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[9].ScoreA ?? 0) > (Bracket[9].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-32 md:h-36 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[9].TeamB!)" />
                <div v-text="Bracket[9].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[10].ScoreA ?? 0) < (Bracket[10].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[10].TeamA!)" />
                <div v-text="Bracket[10].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[10].ScoreA ?? 0) > (Bracket[10].ScoreB ?? 0) }">
                <div v-text="TeamName(Bracket[10].TeamB!)" />
                <div v-text="Bracket[10].ScoreB ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
            </div>
            <div class="flex flex-col gap-108 md:gap-120 pt-50 md:pt-56 *:relative *:flex *:w-150 *:md:w-180 *:h-26 *:md:h-30 *:border-input *:items-center *:justify-between *:rounded *:py-2 *:px-10">
              <div :class="{'text-gray-400': (Bracket[11].ScoreA ?? 0) < (Bracket[11].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[11].TeamA!)" />
                <div v-text="Bracket[11].ScoreA ?? ''" />
                <div class="absolute h-1 w-20 -right-20 bg-gray-300" />
              </div>
              <div :class="{'text-gray-400': (Bracket[11].ScoreA ?? 0) > (Bracket[11].ScoreB ?? 0) }">
                <div class="absolute h-1 w-20 -left-20 bg-gray-300" />
                <div class="absolute h-68 md:h-76 w-1 -left-20 bg-gray-300" />
                <div v-text="TeamName(Bracket[11].TeamB!)" />
                <div v-text="Bracket[11].ScoreB ?? ''" />
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
          <div>6. {{ TeamName(5) }}</div>
          <div>6. {{ TeamName(3) }}</div>
        </div>
      </div>
      <div v-show="ActiveTab == BeerDieTabs.Games"
           class="h-full grid-table *:grid-cols-6">
        <div>
          <div v-text="'Date'" />
          <div v-text="'Player'" />
          <div v-text="'Win'" />
          <div v-text="'Points'" />
          <div v-text="'Sinks'" />
          <div v-text="'Double Body'" />
        </div>
        <div v-for="(game, i) in Games"
             :key="i">
          <div v-text="game.date" />
          <div v-text="game.player" />
          <div v-text="typeof game.win == 'boolean' ? (game.win ? 'Yes' : 'No') : ''" />
          <div v-text="game.points" />
          <div v-text="game.sinks" />
          <div v-text="game.doublebody" />
        </div>
      </div>
      <div v-show="ActiveTab == BeerDieTabs.Stats"
           class="h-full grid-table *:grid-cols-5">
        <div>
          <div v-text="'Player'" />
          <div v-text="'Win Loss'" />
          <div v-text="'Points'" />
          <div v-text="'Sinks'" />
          <div v-text="'Double Body'" />
        </div>
        <div v-for="stat in Stats"
             :key="stat.player">
          <div v-text="stat.player" />
          <div v-text="stat.winloss" />
          <div v-text="stat.points" />
          <div v-text="stat.sinks" />
          <div v-text="stat.doublebody" />
        </div>
      </div>
      <div v-show="ActiveTab == BeerDieTabs.Rules"
           class="p-20"
           v-text="'1. Don\'t be a bitch'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { BeerDieTabs, BeerDieSeasons, BeerDiePlayers } from './scripts/enums';
/// Data
const ActiveSeason = ref(BeerDieSeasons.Summer2025);
const ActiveTab = ref(BeerDieTabs.Bracket);
const Teams = [
   [BeerDiePlayers.Dolph, BeerDiePlayers.Duff], // 0
   [BeerDiePlayers.Jaws, BeerDiePlayers.Foreman], // 1
   [BeerDiePlayers.Bean, BeerDiePlayers.Gene], // 2
   [BeerDiePlayers.Rusty, BeerDiePlayers.Peel], // 3
   [BeerDiePlayers.Vixson, BeerDiePlayers.Yasso], // 4
   [BeerDiePlayers.Snoop, BeerDiePlayers.Gil], // 5
   [BeerDiePlayers.Dugo, BeerDiePlayers.Ringo], // 6
   [BeerDiePlayers.Cedar, BeerDiePlayers.Pug], // 7
];
const Bracket = [
   { TeamA: 0, ScoreA: 2, TeamB: 1, ScoreB: 0 }, // Winners 1A
   { TeamA: 2, ScoreA: 2, TeamB: 3, ScoreB: 1 }, // Winners 1B
   { TeamA: 4, ScoreA: 2, TeamB: 5, ScoreB: 0 }, // Winners 1C
   { TeamA: 6, ScoreA: 2, TeamB: 7, ScoreB: 0 }, // Winners 1D
   { TeamA: 0, ScoreA: 0, TeamB: 2, ScoreB: 2 }, // Winners 2A
   { TeamA: 4, ScoreA: null, TeamB: 6, ScoreB: null },  // Winners 2B
   { TeamA: 1, ScoreA: 2, TeamB: 3, ScoreB: 1 }, // Losers 1A
   { TeamA: 5, ScoreA: 0, TeamB: 7, ScoreB: 2 },// Losers 1B
   { TeamA: 2, ScoreA: null, TeamB: null, ScoreB: null }, // Winners 3A
   { TeamA: 1, ScoreA: null, TeamB: 7, ScoreB: null }, // Losers 2A
   { TeamA: 0, ScoreA: null, TeamB: null, ScoreB: null }, // Losers 2B
   { TeamA: null, ScoreA: null, TeamB: null, ScoreB: null }, // Losers 3A
   { TeamA: null, ScoreA: null, TeamB: null, ScoreB: null }, // 1st + 3rd
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
   { date: '07/27/25', player: BeerDiePlayers.Gil,  win: false, points: 6, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Snoop, win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Pug, win: true, points: 5, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Cedar, win: true, points: 5, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Gil,  win: false, points: 2, sinks: 1, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Snoop, win: false, points: 0, sinks: 1, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Pug, win: true, points: 5, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Cedar, win: true, points: 2, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Rusty, win: true, points: 2, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Peel, win: true, points: 5, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Jaws, win: false, points: 1, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Rusty, win: false, points: 0, sinks: 1, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Peel, win: false, points: 2, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Jaws, win: true, points: 2, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Rusty, win: false, points: 1, sinks: 0, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Peel, win: false, points: 6, sinks: 2, doublebody: 0 },
   { date: '07/27/25', player: BeerDiePlayers.Jaws, win: true, points: 5, sinks: 1, doublebody: 0 },
];
/// Computed
const Stats = computed(() => Teams.flatMap(x => x).map(p => {
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
/// Methods
const TeamName = (team: number) => team != null ? `${Teams[team][0]} / ${Teams[team][1]}` : '';
</script>