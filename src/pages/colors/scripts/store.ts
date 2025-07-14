import { computed } from 'vue';
import { defineStore } from 'pinia'
import * as Models from './models'
import { UseLS } from '@/scripts/functions';

export const useColorStore = defineStore('color', () => {
   /// State
   const SelectedIndex = UseLS<number>('LinuxTheme_Color_SelectedIndex', null!);
   const Themes = UseLS<Models.Theme[]>('LinuxTheme_Color_Themes', []);
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