import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import * as Models from './models'
import { UseLS } from '@/scripts/functions';

export const useColorStore = defineStore('color', () => {
   /// State
   const SelectedIndex = UseLS<number>('LinuxTheme_Color_SelectedIndex', 0); // null!
   //const Themes = UseLS<Models.Theme[]>('LinuxTheme_Color_Themes', []);
   const Themes = ref<Models.Theme[]>([
      { "Name": "Blue", "PrimaryHue": 210, "ColorsDark": [{ "H": 0, "S": 10, "L": 5, "Primary": true }, { "H": 0, "S": 60, "L": 50, "Primary": false }, { "H": 60, "S": 100, "L": 60, "Primary": false }, { "H": 120, "S": 60, "L": 50, "Primary": false }, { "H": 180, "S": 60, "L": 50, "Primary": false }, { "H": 240, "S": 60, "L": 50, "Primary": false }, { "H": 300, "S": 60, "L": 50, "Primary": false }, { "H": 0, "S": 10, "L": 80, "Primary": true }], "ColorsLight": [{ "H": 0, "S": 10, "L": 20, "Primary": true }, { "H": 0, "S": 60, "L": 25, "Primary": false }, { "H": 60, "S": 60, "L": 50, "Primary": false }, { "H": 120, "S": 60, "L": 25, "Primary": false }, { "H": 180, "S": 60, "L": 25, "Primary": false }, { "H": 240, "S": 60, "L": 25, "Primary": false }, { "H": 300, "S": 60, "L": 25, "Primary": false }, { "H": 0, "S": 10, "L": 95, "Primary": true }], "ColorBackground": [{ "H": 0, "S": 25, "L": 10, "Primary": true }, { "H": 0, "S": 25, "L": 20, "Primary": true }], "ColorForeground": [{ "H": 0, "S": 25, "L": 73, "Primary": true }, { "H": 0, "S": 25, "L": 90, "Primary": true }], "ColorBorder": [{ "H": 0, "S": 25, "L": 38, "Primary": true }, { "H": 0, "S": 25, "L": 55, "Primary": true }], "ColorHighlight": [{ "H": 0, "S": 0, "L": 0, "Primary": false }, { "H": 0, "S": 0, "L": 0, "Primary": false }], "OffsetHue": 0 },
      { "Name": "Green", "PrimaryHue": 115, "ColorsDark": [{ "H": 0, "S": 5, "L": 5, "Primary": true }, { "H": 0, "S": 60, "L": 50, "Primary": false }, { "H": 60, "S": 100, "L": 60, "Primary": false }, { "H": 120, "S": 60, "L": 50, "Primary": false }, { "H": 180, "S": 60, "L": 50, "Primary": false }, { "H": 240, "S": 60, "L": 50, "Primary": false }, { "H": 300, "S": 60, "L": 50, "Primary": false }, { "H": 0, "S": 5, "L": 80, "Primary": true }], "ColorsLight": [{ "H": 0, "S": 5, "L": 20, "Primary": true }, { "H": 0, "S": 60, "L": 25, "Primary": false }, { "H": 60, "S": 60, "L": 50, "Primary": false }, { "H": 120, "S": 60, "L": 25, "Primary": false }, { "H": 180, "S": 60, "L": 25, "Primary": false }, { "H": 240, "S": 60, "L": 25, "Primary": false }, { "H": 300, "S": 60, "L": 25, "Primary": false }, { "H": 0, "S": 5, "L": 95, "Primary": true }], "ColorBackground": [{ "H": 0, "S": 15, "L": 10, "Primary": true }, { "H": 0, "S": 15, "L": 20, "Primary": true }], "ColorForeground": [{ "H": 0, "S": 15, "L": 73, "Primary": true }, { "H": 0, "S": 15, "L": 90, "Primary": true }], "ColorBorder": [{ "H": 0, "S": 15, "L": 38, "Primary": true }, { "H": 0, "S": 15, "L": 55, "Primary": true }], "ColorHighlight": [{ "H": 0, "S": 0, "L": 0, "Primary": false }, { "H": 0, "S": 0, "L": 0, "Primary": false }], "OffsetHue": -10 },
      { "Name": "Red", "PrimaryHue": 0, "OffsetHue": 10, "ColorsDark": [{ "H": 0, "S": 10, "L": 5, "Primary": true }, { "H": 0, "S": 60, "L": 50, "Primary": false }, { "H": 60, "S": 100, "L": 60, "Primary": false }, { "H": 120, "S": 60, "L": 50, "Primary": false }, { "H": 180, "S": 60, "L": 50, "Primary": false }, { "H": 240, "S": 60, "L": 50, "Primary": false }, { "H": 300, "S": 60, "L": 50, "Primary": false }, { "H": 0, "S": 10, "L": 80, "Primary": true }], "ColorsLight": [{ "H": 0, "S": 10, "L": 20, "Primary": true }, { "H": 0, "S": 60, "L": 25, "Primary": false }, { "H": 60, "S": 60, "L": 50, "Primary": false }, { "H": 120, "S": 60, "L": 25, "Primary": false }, { "H": 180, "S": 60, "L": 25, "Primary": false }, { "H": 240, "S": 60, "L": 25, "Primary": false }, { "H": 300, "S": 60, "L": 25, "Primary": false }, { "H": 0, "S": 10, "L": 95, "Primary": true }], "ColorBackground": [{ "H": 0, "S": 25, "L": 10, "Primary": true }, { "H": 0, "S": 25, "L": 20, "Primary": true }], "ColorForeground": [{ "H": 0, "S": 25, "L": 73, "Primary": true }, { "H": 0, "S": 25, "L": 90, "Primary": true }], "ColorBorder": [{ "H": 0, "S": 25, "L": 38, "Primary": true }, { "H": 0, "S": 25, "L": 55, "Primary": true }], "ColorHighlight": [{ "H": 0, "S": 0, "L": 0, "Primary": false }, { "H": 0, "S": 0, "L": 0, "Primary": false }] }
   ]);
   /// Getter
   const Selected = computed(() => SelectedIndex.value != null ? Themes.value[SelectedIndex.value] : {} as Models.Theme);
   /// Action
   const AddTheme = () => Themes.value.push(Models.Theme.New());
   const DeleteTheme = () => {
      Themes.value.splice(SelectedIndex.value, 1);
      SelectedIndex.value = null!;
   };
   const RGB = (color: Models.Color) => {
      const offset = (Selected.value.OffsetHue + 360) % 360;
      const h = color.Primary ? Selected.value.PrimaryHue : (color.H + offset);
      const s = color.S / 100;
      const l = color.L / 100;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return '#' + [f(0), f(8), f(4)].map(x => {
         const hex = Math.round(x * 255).toString(16);
         return hex.length === 1 ? '0' + hex : hex;
      }).join('');
   };
   return { SelectedIndex, Themes, Selected, AddTheme, DeleteTheme, RGB }
});