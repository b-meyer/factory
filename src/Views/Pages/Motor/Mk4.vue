<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="card flex flex-auto gap-20">
      <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
        <div class="flex flex-col gap-10">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              General
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>Total Arm Radius:</label>
              <div class="max-w-[75px]">
                <input v-model="TotalR"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              Crank
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>Magnets:</label>
              <div class="max-w-[75px]">
                <input v-model="Crank.Arms"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Arm Length:</label>
              <div class="max-w-[75px]">
                <input v-model="Crank.ArmLength"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Magnet Gap:</label>
              <div class="max-w-[75px]">
                <input v-model="Crank.ArmBuffer"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Outer Radius:</label>
              <div class="max-w-[75px]">
                <input v-model="Crank.TotalR"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Pitch Radius:</label>
              <div class="max-w-[75px]">
                <input v-model="Crank.PitchR"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Pin Radius:</label>
              <div class="max-w-[75px]">
                <input v-model="Crank.PinR"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              Rotor
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>Magnets:</label>
              <div class="max-w-[75px]">
                <input v-model="Rotor.Arms"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
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
import { Group } from 'two.js/src/group';

const Surface = new Two({ fitted: true, autostart: true });

//ViewModel
export default defineComponent({
    components: { },
      data: () => ({
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
                return .425 * Math.min(Surface.width, Surface.height) / this.TotalR;
            },
        },
    mounted: function() {
        const viewport = document.getElementById("viewport")!;
        Surface.appendTo(viewport);
        Surface.scene.rotation = Math.PI;
        Surface.scene.translation = new Vector(Surface.width / 2, Surface.height / 2);
        this.Init();
        Surface.bind('update', this.Redraw);
        //window.addEventListener('resize', this.Init)
    },
    beforeUnmount() {
        //window.removeEventListener('resize', this.Init)
    },
        methods: {
            Init: function() {
                this.Arms = [];
                Surface.clear();
                
                const totalR = this.Scale * this.TotalR;
                const mainR = this.Scale * this.MainR;
                const gear1R = this.Scale * this.Gear1R;
                const gear2R = this.Scale * this.Gear1R * 0.75;
                const crankTotalR = this.Scale * this.Crank.TotalR;
                const crankPitchR = this.Scale * this.Crank.PitchR;
                const crankPinR = this.Scale * this.Crank.PinR
                const crankArmLength = this.Scale * this.Crank.ArmLength;
                const crankArmBuffer = this.Scale * this.Crank.ArmBuffer;
                const rotorPitchR = totalR - crankPitchR - crankArmLength - crankArmBuffer;

                // Body
                Surface.makeCircle(0, 0, totalR + 4 * crankPinR); // Body

                // Gear/Crank
                Surface.makeCircle(0, 0, mainR); // Main Gear
                for (let i = 0; i < this.Crank.Arms; i++) { 
                    const stack = Surface.makeGroup(); 
                    stack.rotation = i * this.Angle;
                    stack.add(Surface.makeCircle(0, mainR + gear1R, gear1R)); // Gear 1a
                    stack.add(Surface.makeCircle(0, mainR + gear1R, gear2R)); // Gear 1b
                    stack.add(Surface.makeCircle(0, totalR, gear2R)); // Gear 2
                    stack.add(Surface.makeCircle(0, totalR, crankTotalR)); // Crank Body
                    stack.add(Surface.makeLine(0, totalR + crankPitchR - crankArmLength, 0, totalR - crankPitchR - crankArmLength)); // Head Path
                    const arm = Surface.makeGroup(
                        Surface.makeCircle(0, totalR, crankPinR), // Crank Pin
                        Surface.makeCircle(0, totalR - crankArmLength, crankPinR), // Crank Pin
                        Surface.makeLine(0, totalR, 0, totalR - crankArmLength) // Crank Arm
                    );
                    stack.add(arm);
                    this.Arms.push(arm);
                }

                // Rotor
                const rotor = Surface.makeGroup();
                rotor.add(Surface.makeCircle(0, 0, rotorPitchR - crankPinR)); // Rotor Body
                for (let i = 0; i < this.Rotor.Arms; i++) { // Rotor Arms
                    const stack = Surface.makeGroup(); 
                    stack.rotation = 2 * Math.PI * i / this.Rotor.Arms;
                    stack.add(Surface.makeCircle(0, rotorPitchR, crankPinR));
                    stack.add(Surface.makeLine(0, 0, 0, rotorPitchR));
                    rotor.add(stack);
                }
                this.RotorG = rotor;

                Surface.scene.noFill();
            },
            Redraw: function () {
                const rotation = (Date.now() - this.Start) / (1000 * this.SPR);
                const totalR = this.Scale * this.TotalR;
                const crankPitchR = this.Scale * this.Crank.PitchR;
                const crankArmLength = this.Scale * this.Crank.ArmLength;
                for(let i = 0; i < this.Arms.length; i++) {
                    let armRotation = this.Rotor.Arms * (rotation - i / this.Crank.Arms);
                    armRotation = armRotation - Math.floor(armRotation);
                    armRotation = armRotation <= 0.75 ? armRotation / 1.5 : 0.5 + 0.5 * (armRotation - 0.75) / 0.25;
                    const crank = new Vector(crankPitchR).rotate(Math.PI / 2 + armRotation * 2 * Math.PI);
                    const theta = Math.asin(crank.x / crankArmLength);
                    this.Arms[i].rotation = theta;
                    this.Arms[i].translation = new Vector((totalR - crankArmLength) * Math.sin(theta), totalR * (1 - Math.cos(theta)) - crank.y);
                }
                this.RotorG.rotation = rotation * 2 * Math.PI;
            }
        }
});
</script>
