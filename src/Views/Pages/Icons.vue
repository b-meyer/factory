<template>
  <div class="flex flex-col flex-auto m-20 card">
    <div class="flex items-center gap-20 p-20 border-gray-200 border-b">
      <h1 class="text-2xl font-medium">
        Icons
      </h1>
      <div class="relative flex-auto max-sm:hidden">
        <div class="absolute inset-0 pl-15 flex items-center pointer-events-none">
          <i class="bi-search text-[16px]" />
        </div>
        <input v-model="Search"
               class="border-input rounded h-32 w-full pl-40 pr-10"
               placeholder="Search...">
      </div>
    </div>
    <div class="grid grid-cols-9 gap-20 p-20">
      <div v-for="icon in Filtered"
           :key="icon"
           class="flex flex-col items-center justify-center">
        <i class="text-4xl p-15"
           :class="[icon]" />
        <span class="text-center"
              v-text="icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { GetGroup } from '@/Scripts/Functions';
    import { defineComponent } from 'vue';
    export default defineComponent({
        data: () => ({
            Search: '' as string,
            Icons: [] as string[],
        }),
        computed: {
            Filtered: function (): string[] {
                return !this.Search ? this.Icons : this.Icons.filter(x => this.Search.split(" ").every(s => x.toLowerCase().indexOf(s.toLowerCase()) + 1));
            },
        },
        beforeMount: function () {
            // Push CSSStyleRules into proper array
            const rules: CSSStyleRule[] = [];
            let cssRuleList: CSSRuleList;
            for (let i = 0; i < document.styleSheets.length; i++) {
                cssRuleList = document.styleSheets[i].cssRules;
                for (let j = 0; j < cssRuleList.length; j++) {
                    if (cssRuleList[j].type != 1) continue; // Check if this is actualy a CSSStyleRule
                    rules.push(cssRuleList[j] as CSSStyleRule);
                }
            }
            // Get Icon Prefixes
            const prefixes: string[] = rules 
                .map(x => GetGroup(/^i\[class\*=" (.+-)"\], i\[class\^="\1"\]$/, x.selectorText))
                .filter(x => !!x) as string[];
            //Set List of Icons
            this.Icons = rules
                .flatMap(x => x.selectorText.match(/\.([^:]+)::before/g))
                .filter(x => !!x && prefixes.some(y => x.startsWith('.' + y)))
                .map(x => GetGroup(/\.([^:]+)::before/g, x!))
                .filter(x => !!x)
                .sort() as string[];
        },
    });
</script>