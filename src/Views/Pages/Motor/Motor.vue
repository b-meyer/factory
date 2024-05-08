<template>
    <div class="flex flex-col w-full min-h-full gap-20 p-20">
        <div class="card flex flex-auto gap-20">
            <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
                <div class="flex flex-col gap-10">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">General</h2>
                        <i class="bi-caret-down-fill"></i>
                    </div>
                    <div class="flex flex-col gap-10">
                        <div class="flex gap-10 items-center justify-between">
                            <label>Total Arm Radius:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="TotalR" @input="Init"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">Crank</h2>
                        <i class="bi-caret-down-fill"></i>
                    </div>
                    <div class="flex flex-col gap-10">
                        <div class="flex gap-10 items-center justify-between">
                            <label>Magnets:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Crank.Arms" @input="Init"/>
                            </div>
                        </div>
                        <div class="flex gap-10 items-center justify-between">
                            <label>Arm Length:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Crank.ArmLength" @input="Init"/>
                            </div>
                        </div>
                        <div class="flex gap-10 items-center justify-between">
                            <label>Magnet Gap:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Crank.ArmBuffer" @input="Init"/>
                            </div>
                        </div>
                        <div class="flex gap-10 items-center justify-between">
                            <label>Outer Radius:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Crank.TotalR" @input="Init"/>
                            </div>
                        </div>
                        <div class="flex gap-10 items-center justify-between">
                            <label>Pitch Radius:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Crank.PitchR" @input="Init"/>
                            </div>
                        </div>
                        <div class="flex gap-10 items-center justify-between">
                            <label>Pin Radius:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Crank.PinR" @input="Init"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">Rotor</h2>
                        <i class="bi-caret-down-fill"></i>
                    </div>
                    <div class="flex flex-col gap-10">
                        <div class="flex gap-10 items-center justify-between">
                            <label>Magnets:</label>
                            <div class="max-w-[75px]">
                                <input type="number" class="border-input rounded h-32 w-full px-10" v-model="Rotor.Arms" @input="Init"/>
                            </div>
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
        this.surface = new Two({ fitted: true, autostart: true });
        this.surface.appendTo(viewport);
        this.surface.scene.rotation = Math.PI;
        this.surface.scene.translation = new Vector(this.surface.width / 2, this.surface.height / 2);
        this.Init();
        this.surface.bind('update', this.Redraw);
        //window.addEventListener('resize', this.Init)
    },
    beforeDestroy() {
        //window.removeEventListener('resize', this.Init)
    },
      data: () => reactive({
            surface: {} as Two,
            Arms: [] as Group[],
            RotorG: {} as Group,
            Start: Date.now(),
            SPR: 15,
            TotalR: 210,
            Crank: {
                Arms: 23,
                ArmLength: 60,
                ArmBuffer: 6,
                TotalR: 28,
                PitchR: 24,
                PinR: 3,
            },
            Rotor: {
                Arms: 8,
            },
            // Gears: {
            //     VS: {
            //         Scale: 0.75,
            //         DAT: 20,
            //         DBT: 12,
            //         RAT: 12,
            //         RBT: 8,
            //     }
            // },
        }),
        computed: {
            MainR: function () {
                return this.Gear1R * this.Rotor.Arms;
            },
            Gear1R: function () {
                return this.TotalR / (2.5  + this.Rotor.Arms); // TotalR = 6x + 1x + 2(0.75x)
            },
            Angle: function () {
                return 2 * Math.PI / this.Crank.Arms;
            },
            Scale: function () {
                return .4 * Math.min(this.surface.width, this.surface.height) / this.TotalR;
            },
        },
        methods: {
            Init: function() {
                this.Arms = [];
                this.surface.clear();
                
                let totalR = this.Scale * this.TotalR;
                let mainR = this.Scale * this.MainR;
                let gear1R = this.Scale * this.Gear1R;
                let gear2R = this.Scale * this.Gear1R * 0.75;
                let crankTotalR = this.Scale * this.Crank.TotalR;
                let crankPitchR = this.Scale * this.Crank.PitchR;
                let crankPinR = this.Scale * this.Crank.PinR
                let crankArmLength = this.Scale * this.Crank.ArmLength;
                let crankArmBuffer = this.Scale * this.Crank.ArmBuffer;
                let rotorPitchR = totalR - crankPitchR - crankArmLength - crankArmBuffer;

                // Body
                this.surface.makeCircle(0, 0, totalR + 20); // Body

                // Gear/Crank
                this.surface.makeCircle(0, 0, mainR); // Main Gear
                for (let i = 0; i < this.Crank.Arms; i++) { 
                    let stack = this.surface.makeGroup(); 
                    stack.rotation = i * this.Angle;
                    stack.add(this.surface.makeCircle(0, mainR + gear1R, gear1R)); // Gear 1a
                    stack.add(this.surface.makeCircle(0, mainR + gear1R, gear2R)); // Gear 1b
                    stack.add(this.surface.makeCircle(0, totalR, gear2R)); // Gear 2
                    stack.add(this.surface.makeCircle(0, totalR, crankTotalR)); // Crank Body
                    stack.add(this.surface.makeLine(0, totalR + crankPitchR - crankArmLength, 0, totalR - crankPitchR - crankArmLength)); // Head Path
                    let arm = this.surface.makeGroup(
                        this.surface.makeCircle(0, totalR, crankPinR), // Crank Pin
                        this.surface.makeCircle(0, totalR - crankArmLength, crankPinR), // Crank Pin
                        this.surface.makeLine(0, totalR, 0, totalR - crankArmLength) // Crank Arm
                    );
                    stack.add(arm);
                    this.Arms.push(arm);
                }

                // Rotor
                let rotor = this.surface.makeGroup();
                rotor.add(this.surface.makeCircle(0, 0, rotorPitchR - crankPinR)); // Rotor Body
                for (let i = 0; i < this.Rotor.Arms; i++) { // Rotor Arms
                    let stack = this.surface.makeGroup(); 
                    stack.rotation = 2 * Math.PI * i / this.Rotor.Arms;
                    stack.add(this.surface.makeCircle(0, rotorPitchR, crankPinR));
                    stack.add(this.surface.makeLine(0, 0, 0, rotorPitchR));
                    rotor.add(stack);
                }
                this.RotorG = rotor;

                this.surface.scene.noFill();
            },
            Redraw: function () {
                let rotation = (Date.now() - this.Start) / (1000 * this.SPR);
                let totalR = this.Scale * this.TotalR;
                let crankPitchR = this.Scale * this.Crank.PitchR;
                let crankArmLength = this.Scale * this.Crank.ArmLength;
                for(let i = 0; i < this.Arms.length; i++) {
                    let armRotation = this.Rotor.Arms * (rotation - i / this.Crank.Arms);
                    armRotation = armRotation - Math.floor(armRotation);
                    armRotation = armRotation <= 0.75 ? armRotation / 1.5 : 0.5 + 0.5 * (armRotation - 0.75) / 0.25;
                    let crank = new Vector(crankPitchR).rotate(Math.PI / 2 + armRotation * 2 * Math.PI);
                    let theta = Math.asin(crank.x / crankArmLength);
                    this.Arms[i].rotation = theta;
                    this.Arms[i].translation = new Vector((totalR - crankArmLength) * Math.sin(theta), totalR * (1 - Math.cos(theta)) - crank.y);
                }
                this.RotorG.rotation = rotation * 2 * Math.PI;
            }
        }
});
</script>
