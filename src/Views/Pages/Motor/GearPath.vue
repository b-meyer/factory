<template>
    <div class="flex flex-col w-full min-h-full gap-20 p-20">
        <div class="card flex flex-auto gap-20">
            <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
                <div class="flex flex-col gap-10">
                    <div class="flex gap-10 items-center justify-between">
                        <label>Teeth:</label>
                        <div class="max-w-[75px]">
                            <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Teeth" @input="Init"/>
                        </div>
                    </div>
                    <div class="flex gap-10 items-center justify-between">
                        <label>Angle:</label>
                        <div class="max-w-[75px]">
                            <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Angle" @input="Init"/>
                        </div>
                    </div>
                    <div class="flex gap-10 items-center justify-between">
                        <label>Steps:</label>
                        <div class="max-w-[75px]">
                            <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Steps" @input="Init"/>
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
import { Group } from 'two.js/src/group';

//ViewModel
export default defineComponent({
    components: { },
    mounted: function() {
        let viewport = document.getElementById("viewport")!;
        this.Surface = new Two({ fitted: true, autostart: true });
        this.Surface.appendTo(viewport);
        this.Surface.scene.rotation = Math.PI;
        this.Surface.scene.translation = new Vector(this.Surface.width / 2, 3 * this.Surface.height / 2);
        this.Init();
    },
    beforeDestroy() {
    },
      data: () => reactive({
            Surface: {} as Two,
            Start: Date.now(),
            Teeth: 12 as number,
            Angle: 25 as number,
            Steps: 7  as number
        }),
        computed: {
        },
        methods: {
            Init: function() {
                this.Surface.clear();
                
                this.Surface.scene.noFill();
            },
        }
});
</script>
