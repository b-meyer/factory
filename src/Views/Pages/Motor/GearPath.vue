<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="card flex flex-auto gap-20">
      <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
        <div class="flex flex-col gap-10">
          <div class="flex gap-10 items-center justify-between">
            <label>Teeth:</label>
            <div class="max-w-[75px]">
              <input v-model="Teeth"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     @input="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Angle:</label>
            <div class="max-w-[75px]">
              <input v-model="Angle"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     @input="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Steps:</label>
            <div class="max-w-[75px]">
              <input v-model="Steps"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     @input="Init">
            </div>
          </div>
        </div>
      </div>
      <div id="viewport"
           class="flex flex-auto" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Two from 'two.js';
import { Vector } from 'two.js/src/vector';
//import { Group } from 'two.js/src/group';

const Surface = new Two({ autostart: true, height: 0, fitted: true });

//ViewModel
export default defineComponent({
    components: { },
      data: () => reactive({
            Surface: {} as Two,
            Start: Date.now(),
            Teeth: 12 as number,
            Angle: 25 as number,
            Steps: 7  as number
        }),
        computed: {
        },
    mounted: function() {
        const viewport = document.getElementById("viewport")!;
        Surface.appendTo(viewport);
        Surface.scene.rotation = Math.PI;
        Surface.scene.translation = new Vector(Surface.width / 2, 3 * Surface.height / 2);
        this.Init();
    },
    beforeUnmount() {
    },
        methods: {
            Init: function() {
                Surface.clear();
                
                Surface.scene.noFill();
            },
        }
});
</script>
