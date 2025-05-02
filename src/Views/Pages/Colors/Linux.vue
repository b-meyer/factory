<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20 m-auto">
    <div class="flex flex-auto card p-20 gap-20">
      <div class="flex flex-col gap-10">
        <div class="flex items-center justify-start gap-15">
          <div class="w-80"
               v-text="'Theme:'" />
          <select v-model="colorStore.SelectedIndex"
                  class="border-input rounded w-150 h-34 px-5">
            <option v-for="(theme, i) in colorStore.Themes"
                    :key="theme.Name"
                    :value="i"
                    v-text="theme.Name" />
          </select>
          <button class="flex items-center gap-5 px-5 h-32 btn"
                  type="button"
                  @click="colorStore.AddTheme"
                  v-text="'Add'" />
          <button class="flex items-center gap-5 px-5 h-32 btn"
                  type="button"
                  @click="colorStore.DeleteTheme"
                  v-text="'Delete'" />
        </div>
        <div class="flex items-center justify-start gap-15">
          <div class="w-80"
               v-text="'Name:'" />
          <input v-model="colorStore.Selected.Name"
                 class="border-input rounded w-150 h-34 px-10">
        </div>
        <div class="flex items-center justify-start gap-15">
          <div class="w-80"
               v-text="'Primary Hue:'" />
          <input v-model="colorStore.Selected.PrimaryHue"
                 class="border-input rounded w-150 h-34 px-10">
        </div>
        <div class="flex gap-10">
          <app-picker-hsl v-for="color in colorStore.Selected.ColorsDark"
                          :key="`${color.H}${color.S}${color.L}`"
                          :Color="color" />
        </div>
        <div class="flex gap-10">
          <app-picker-hsl v-for="color in colorStore.Selected.ColorsLight"
                          :key="`${color.H}${color.S}${color.L}`"
                          :Color="color" />
        </div>
        <div class="flex gap-10">
          <app-picker-hsl v-for="color in colorStore.Selected.ColorBackground"
                          :key="`${color.H}${color.S}${color.L}`"
                          :Color="color" />
          <app-picker-hsl v-for="color in colorStore.Selected.ColorBorder"
                          :key="`${color.H}${color.S}${color.L}`"
                          :Color="color" />
          <app-picker-hsl v-for="color in colorStore.Selected.ColorForeground"
                          :key="`${color.H}${color.S}${color.L}`"
                          :Color="color" />
          <!-- <app-picker-hsl v-for="color in colorStore.Selected.ColorHighlight" :Color="color"/> -->
        </div>
      </div>
      <div class="flex flex-col flex-auto p-8 gap-8"
           :style="{ backgroundColor: Background_L}">
        <div class="flex flex-auto gap-8">
          <div class="flex flex-col basis-1/2 rounded border-2 p-10"
               :style="{ backgroundColor: Background_D, borderColor: Border_L, color: Foreground_L}">
            <div>bmeyer@windows</div>
            <div>---------------------</div>
            <div>OS: Windows 10</div>
            <div>Host: HP ZBook Fury</div>
            <div>Kernal: 21H2</div>
            <div class="flex">
              <div v-for="color in colorStore.Selected.ColorsDark"
                   :key="`${color.H}${color.S}${color.L}`"
                   :style="{ backgroundColor: colorStore.RGB(color)}"
                   class="w-20 h-20 block">
                &nbsp;
              </div>
            </div>
            <div class="flex">
              <div v-for="color in colorStore.Selected.ColorsLight"
                   :key="`${color.H}${color.S}${color.L}`"
                   :style="{ backgroundColor: colorStore.RGB(color)}"
                   class="w-20 h-20 block">
                &nbsp;
              </div>
            </div>
          </div>
          <div class="basis-1/2 rounded border-2"
               :style="{ backgroundColor: Background_D, borderColor: Border_D}" />
        </div>
        <div class="rounded border-2 h-25"
             :style="{ backgroundColor: Background_D, borderColor: Border_L}" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import PickerHSL from './Components/PickerHSL.vue';
import { colorStore } from './Scripts/Store';
export default defineComponent({
    components: {
        'app-picker-hsl': PickerHSL,
    },
    computed: {
        ...mapStores(colorStore),
        Background_D():string {
            return this.colorStore.SelectedIndex != null ? this.colorStore.RGB(this.colorStore.Selected.ColorBackground[0]) : "#FFF";
        },
        Background_L():string {
            return this.colorStore.SelectedIndex != null ? this.colorStore.RGB(this.colorStore.Selected.ColorBackground[1]) : "#FFF";
        },
        Foreground_D():string {
            return this.colorStore.SelectedIndex != null ? this.colorStore.RGB(this.colorStore.Selected.ColorForeground[0]) : "#FFF";
        },
        Foreground_L():string {
            return this.colorStore.SelectedIndex != null ? this.colorStore.RGB(this.colorStore.Selected.ColorForeground[1]) : "#FFF";
        },
        Border_D():string {
            return this.colorStore.SelectedIndex != null ? this.colorStore.RGB(this.colorStore.Selected.ColorBorder[0]) : "#FFF";
        },
        Border_L():string {
            return this.colorStore.SelectedIndex != null ? this.colorStore.RGB(this.colorStore.Selected.ColorBorder[1]) : "#FFF";
        }
    },
});
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
</style>