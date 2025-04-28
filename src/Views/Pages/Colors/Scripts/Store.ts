import { defineStore } from 'pinia'
import * as Models from './Models'
import { UseLS } from '@/Scripts/Functions';

export const colorStore = defineStore('color', {
    state: () => ({
        SelectedIndex: UseLS<number>('LinuxTheme_Color_SelectedIndex', null!),
        Themes: UseLS<Models.Theme[]>('LinuxTheme_Color_Themes', []),
    }),
    getters: { 
        Selected(): Models.Theme {
            return this.SelectedIndex != null ? this.Themes[this.SelectedIndex] : {} as Models.Theme;
        },
    },
    actions: { 
        AddTheme(): void { 
            this.Themes.push(Models.Theme.New());
        },
        DeleteTheme(): void { 
            this.Themes.splice(this.SelectedIndex, 1);
            this.SelectedIndex = null!;
        },
        RGB(color: Models.Color): string {
            const h = color.Primary ? this.Selected.PrimaryHue : color.H, 
                s = color.S / 100, 
                l = color.L / 100,
                a = s * Math.min(l, 1 - l),
                f = (n: any, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return '#' + [f(0), f(8), f(4)].map(x => {
                const hex = Math.round(x * 255).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');
        },
    },
});