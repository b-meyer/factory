<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="card flex flex-auto gap-20">
      <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
        <div class="flex flex-col gap-10">
          <div class="flex gap-10 items-center justify-between">
            <label>Teeth:</label>
            <div class="max-w-[75px]">
              <input v-model="N"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     min="1"
                     @input="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Angle:</label>
            <div class="max-w-[75px]">
              <input v-model="PA_Deg"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     min="0"
                     max="45"
                     @input="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Steps:</label>
            <div class="max-w-[75px]">
              <input v-model="Steps"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     min="1"
                     max="100"
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
import { defineComponent } from 'vue';
import Two from 'two.js';
import { Vector } from 'two.js/src/vector';
import { Anchor } from 'two.js/src/anchor';
import { Path } from 'two.js/src/path';
import { Group } from 'two.js/src/group';

const Surface = new Two({ autostart: true, height: 0, fitted: true });

export default defineComponent({
    data: () => ({
        N: 12 as number,
        PA_Deg: 25 as number,
        Steps: 20  as number,
        A: 0 as number,
    }),
    computed: {
        PA: function() {
            return this.PA_Deg * Math.PI / 180;
        },
        TA: function() {
            return 2 * Math.PI / this.N;
        },
        R: function() {
            return this.A * this.N / 2;
        },
        TW: function() {
            return Math.PI * this.R / this.N;
        },
        Rack: function() {
            return new Path([
                new Anchor(-this.TW / 2 - this.A * Math.sin(this.PA), this.R + this.A),
                new Anchor(-this.TW / 2 + this.A * Math.sin(this.PA), this.R - this.A),
                new Anchor( this.TW / 2 - this.A * Math.sin(this.PA), this.R - this.A),
                new Anchor( this.TW / 2 + this.A * Math.sin(this.PA), this.R + this.A),
            ], false);
        },
    },
    mounted: function() {
        Surface.appendTo(document.getElementById("viewport")!);
        this.A = Surface.height / 5;
        this.Init();
    },
    methods: {
        Init: function() {
            Surface.clear();

            const tooth = new Group();
            const rack = this.Rack;
            for (let i = -this.Steps; i <= this.Steps; i++) {
                const clone = rack.clone(tooth);
                clone.rotation = i * this.TA / this.Steps;
                clone.translation = new Vector(clone.rotation * this.R).rotate(clone.rotation);
            }
            for (let i = -1; i < 2; i++) {
                tooth.clone(Surface.scene).rotation = i * this.TA;
            }

            Surface.makeCircle(0, 0, this.R - this.A);
            Surface.makeCircle(0, 0, this.R);
            Surface.makeCircle(0, 0, this.R + this.A);

            Surface.scene.noFill();
            Surface.scene.rotation = Math.PI;
            Surface.scene.translation = new Vector(Surface.width / 2, Surface.height / 2 + this.R);
        },
    }
});
</script>
