<template>
    <div class="flex flex-col w-full min-h-full gap-20 p-20">
        <div class="card flex flex-auto gap-20">
            <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
                <div class="flex flex-col gap-10">
                    <div class="flex gap-10 items-center justify-between">
                        <label>Teeth:</label>
                        <div class="max-w-[75px]">
                            <input type="number" class="border-input rounded h-32 w-full px-10" min="1" v-model="N" @input="Init"/>
                        </div>
                    </div>
                    <div class="flex gap-10 items-center justify-between">
                        <label>Angle:</label>
                        <div class="max-w-[75px]">
                            <input type="number" class="border-input rounded h-32 w-full px-10" min="0" max="45" v-model="PA_Deg" @input="Init"/>
                        </div>
                    </div>
                    <div class="flex gap-10 items-center justify-between">
                        <label>Steps:</label>
                        <div class="max-w-[75px]">
                            <input type="number" class="border-input rounded h-32 w-full px-10" min="1" max="45" v-model="Steps" @input="Init"/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="viewport" class="flex flex-auto"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Two from 'two.js';
import { Vector } from 'two.js/src/vector';
import { Anchor } from 'two.js/src/anchor';
import { Path } from 'two.js/src/path';
import { Group } from 'two.js/src/group';

export default defineComponent({
    mounted: function() {
        this.Surface.appendTo(document.getElementById("viewport")!);
        this.A = this.Surface.height / 5;
        this.Init();
    },
    data: () => reactive({
        Surface: new Two({ autostart: true, height: 0, fitted: true }),
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
    methods: {
        Init: function() {
            this.Surface.clear();

            let tooth = new Group();
            for (let i = -this.Steps; i <= this.Steps; i++) {
                let rack = this.Rack.clone(tooth);
                rack.rotation = i * this.TA / this.Steps;
                rack.translation = new Vector(rack.rotation * this.R).rotate(rack.rotation);
            }
            for (let i = 0; i < this.N; i++) {
                tooth.clone(this.Surface.scene as Group).rotation = i * this.TA;
            }

            this.Surface.makeCircle(0, 0, this.R - this.A);
            this.Surface.makeCircle(0, 0, this.R);
            this.Surface.makeCircle(0, 0, this.R + this.A);

            this.Surface.scene.noFill();
            this.Surface.scene.rotation = Math.PI;
            this.Surface.scene.translation = new Vector(this.Surface.width / 2, this.Surface.height / 2 + this.R);
        },
    }
});
</script>
