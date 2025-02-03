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
import { GetGear, GetGearT, Rotate } from '@/Scripts/Functions';
import { Application, Container, Graphics } from 'pixi.js';

const Surface = new Application();
const Rotor = new Container();
const Arms = [] as Graphics[];
const Gear1 = [] as Graphics[];
const Gear2 = [] as Graphics[];

//ViewModel
export default defineComponent({
  components: { },
    data: () => ({
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
        return .425 * Math.min(Surface.screen.width, Surface.screen.height) / this.TotalR;
      },
    },
    mounted: async function() {
      const viewport = document.getElementById("viewport")!;
      await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport });
      viewport.appendChild(Surface.canvas);
      Surface.stage.position = {x: Surface.screen.width / 2, y: Surface.screen.height / 2};
      Surface.stage.rotation = Math.PI;
      this.Init();
      Surface.ticker.add(this.Redraw);
    },
    methods: {
      Init: function() {
        Surface.stage.removeChildren();
        Arms.length = 0;
        Gear1.length = 0;
        Gear2.length = 0;
        Rotor.removeChildren();
        
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

        // Static Body
        const body = new Graphics();
        body.circle(0, 0, totalR + 4 * crankPinR); // Body
        body.stroke({ width: 1, color: 0x000 });
        Surface.stage.addChild(body);

        // Main Rotor / Gear
        const rotor = new Graphics();
        rotor.poly(GetGear(20 * this.Rotor.Arms, mainR, 25, 1).map(x => Rotate(x, Math.PI / (20 * this.Rotor.Arms))).flat()); // Gear Main        
        rotor.circle(0, 0, rotorPitchR - crankPinR); // Rotor Body
        rotor.stroke({ width: 1, color: 0x000 });
        Rotor.addChild(rotor);
        for (let i = 0; i < this.Rotor.Arms; i++) {
          const rotorArm = new Graphics();   
          rotorArm.circle(0, rotorPitchR, crankPinR); // Rotor Magnet
          rotorArm.poly([0, 0, 0, rotorPitchR], false); // Rotor Arm
          rotorArm.rotation = 2 * Math.PI * i / this.Rotor.Arms;
          rotorArm.stroke({ width: 1, color: 0x000 });
          Rotor.addChild(rotorArm);
        }
        Surface.stage.addChild(Rotor);

        // Crank Arms / Gear Train
        for (let i = 0; i < this.Crank.Arms; i++) {
          let crank = new Container();   
          crank.rotation = i * this.Angle;
          let gear1 = new Graphics();
          gear1.poly(GetGear(20, gear1R, 25, 2).flat()); // Gear 1A     
          gear1.poly(GetGearT(16, 10, 2 * gear2R, 25, true, 2).flat()); // Gear 1B      
          //gear1.circle(0, 0, gear2R); // Gear 1B
          gear1.stroke({ width: 1, color: 0x000 });
          gear1.y = mainR + gear1R;
          Gear1.push(gear1);
          crank.addChild(gear1);
          let gear2 = new Graphics();
          gear2.poly(GetGearT(16, 10, 2 * gear2R, 25, false, 2).flat()); // Gear s
          //gear2.circle(0, 0, gear2R); // Gear 2
          gear2.circle(0, 0, crankTotalR); // Crank Body
          gear2.stroke({ width: 1, color: 0x000 });
          gear2.y = totalR;
          Gear2.push(gear2);
          crank.addChild(gear2);
          let crankPath = new Graphics();
          crankPath.poly([0, crankPitchR, 0, -crankPitchR], false); // Head Path
          crankPath.stroke({ width: 1, color: 0x000 });
          crankPath.y = totalR  - crankArmLength;
          crank.addChild(crankPath);
          let crankArm = new Graphics();
          crankArm.circle(0, 0, crankPinR); // Crank Pin
          crankArm.poly([0, 0, 0, -crankArmLength], false); // Crank Arm
          crankArm.circle(0, -crankArmLength, crankPinR); // Crank Magnet
          crankArm.stroke({ width: 1, color: 0x000 });
          crankArm.y = totalR;
          Arms.push(crankArm);
          crank.addChild(crankArm);
          Surface.stage.addChild(crank);
        }
      },
      Redraw: function () {
        const rotation = (Date.now() - this.Start) / (1000 * this.SPR);
        const totalR = this.Scale * this.TotalR;
        const crankPitchR = this.Scale * this.Crank.PitchR;
        const crankArmLength = this.Scale * this.Crank.ArmLength;
        const VS = 0.710;
        for(let i = 0; i < this.Crank.Arms; i++) {
          let armRotation = this.Rotor.Arms * (rotation - i / this.Crank.Arms);
          armRotation = armRotation - Math.floor(armRotation);
          armRotation = armRotation <= VS ? armRotation / (VS * 2) : 0.5 + 0.5 * (armRotation - VS) / (1 - VS);
          let crankAngle = Math.PI + armRotation * 2 * Math.PI;
          let crankOffset = [crankPitchR * -Math.sin(crankAngle), crankPitchR * Math.cos(crankAngle)];
          Arms[i].rotation = -Math.asin(crankOffset[0] / crankArmLength);
          Arms[i].position = { x: crankOffset[0], y: crankOffset[1] + totalR };
          Gear1[i].rotation = (i * this.Angle - rotation * 2 * Math.PI) * this.Rotor.Arms;
          Gear2[i].rotation = armRotation * 2 * Math.PI;
        }
        Rotor.rotation = rotation * 2 * Math.PI;
      }
    }
});
</script>
