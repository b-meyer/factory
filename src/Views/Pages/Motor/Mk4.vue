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
              <label>Arm Width:</label>
              <div class="max-w-[75px]">
                <input v-model="Crank.ArmWidth"
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
            <div class="flex gap-10 items-center justify-between">
              <label>Magnet Gap:</label>
              <div class="max-w-[75px]">
                <input v-model="Rotor.Gap"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              Gears
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>GearM N:</label>
              <div class="w-75" v-text="Gears.N * Rotor.Arms"/>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>GearM R:</label>
              <div class="w-75" v-text="MainR"/>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Gear1 N:</label>
              <div class="max-w-[75px]">
                <input v-model="Gears.N"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Gear1 R:</label>
              <div class="w-75" v-text="Gear1R"/>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Gear2 RBN:</label>
              <div class="max-w-[75px]">
                <input v-model="Gears.RBN"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Gear2 RSN:</label>
              <div class="max-w-[75px]">
                <input v-model="Gears.RSN"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>PA:</label>
              <div class="max-w-[75px]">
                <input v-model="Gears.PA_Deg"
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
const GearM = new Container();
const Arms = [] as Container[];
const Gear1 = [] as Container[];
const Gear2 = [] as Container[];
const Heads = [] as Container[];

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
        ArmWidth: 8,
        TotalR: 28,
        PitchR: 24,
        PinR: 1.5875,
      },
      Rotor: {
        Arms: 8,
        Gap: 3,
      },
      Gears: {
        N: 18,
        RBN: 16,
        RSN: 10,
        PA_Deg: 25,
      },
      Magnets: {
        Width: 10,
        Depth: 3,
        Angle: Math.PI / 4,
      },
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
      VS: function() {
        let a = 4 * this.Gears.RSN - 4 * this.Gears.RBN;
        let b = 2 * this.Gears.RBN - 6 * this.Gears.RSN;
        let c = 2 * this.Gears.RBN;
        return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
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
        GearM.removeChildren();
        Rotor.removeChildren();
        Arms.length = 0;
        Gear1.length = 0;
        Gear2.length = 0;
        Heads.length = 0;
        
        const totalR = this.Scale * this.TotalR;
        const mainR = this.Scale * this.MainR;
        const gear1R = this.Scale * this.Gear1R;
        const gear2R = this.Scale * this.Gear1R * 0.75;
        const crankTotalR = this.Scale * this.Crank.TotalR;
        const crankPitchR = this.Scale * this.Crank.PitchR;
        const crankPinR = this.Scale * this.Crank.PinR
        const crankArmLength = this.Scale * this.Crank.ArmLength;
        const crankArmWidth = this.Scale * this.Crank.ArmWidth;
        const magnetWidth = this.Scale * this.Magnets.Width;
        const magnetDepth = this.Scale * this.Magnets.Depth;
        const magnetWidthSin = magnetWidth * Math.sin(this.Magnets.Angle) / 2;
        const magnetWidthCos = magnetWidth * Math.cos(this.Magnets.Angle) / 2;
        const magnetDepthSin = magnetDepth * Math.sin(this.Magnets.Angle) / 2;
        const magnetDepthCos = magnetDepth * Math.cos(this.Magnets.Angle) / 2;
        const rotorGap = this.Scale * this.Rotor.Gap;
        const rotorGapSin = (magnetDepth + rotorGap) * Math.sin(this.Magnets.Angle);
        const rotorGapCos = (magnetDepth + rotorGap) * Math.cos(this.Magnets.Angle);
        const rotorPitchR = totalR - crankPitchR - crankArmLength - crankArmWidth / 2 - magnetWidthCos - magnetDepthSin - 2 * this.Scale;

        // Static Body
        let body = new Graphics();
        body.circle(0, 0, totalR + crankTotalR); // Body
        body.stroke({ width: 1, color: 0x000 });
        Surface.stage.addChild(body);

        // Main Gear
        let gear = new Graphics();
        gear.poly(GetGear(this.Gears.N * this.Rotor.Arms, mainR, this.Gears.PA_Deg, 5).map(x => Rotate(x, Math.PI / (this.Gears.N * this.Rotor.Arms))).flat()); // Gear Main        
        gear.stroke({ width: 1, color: 0x000 });
        GearM.addChild(gear);
        Surface.stage.addChild(GearM);

        // Crank Arms / Gear Train
        for (let i = 0; i < this.Crank.Arms; i++) {
          let crank = new Container();   
          crank.rotation = i * this.Angle;
          let gear1a = new Graphics();
          gear1a.poly(GetGear(this.Gears.N, gear1R, this.Gears.PA_Deg, 5).flat()); // Gear 1A     
          gear1a.stroke({ width: 1, color: 0x000 });
          gear1a.y = mainR + gear1R;
          Gear1.push(gear1a);
          crank.addChild(gear1a);
          let gear1b = new Graphics(); 
          gear1b.poly(GetGearT(this.Gears.RBN, this.Gears.RSN, 2 * gear2R, this.Gears.PA_Deg, true, 2).flat()); // Gear 1B
          gear1b.fill().stroke({ width: 1, color: 0x000 });
          gear1b.y = mainR + gear1R;
          Gear1.push(gear1b);
          crank.addChild(gear1b);
          let gear2 = new Graphics();
          gear2.poly(GetGearT(this.Gears.RBN, this.Gears.RSN, 2 * gear2R, this.Gears.PA_Deg, false, 2).flat()); // Gear 2
          gear2.fill().stroke({ width: 1, color: 0x000 });
          gear2.y = totalR;
          Gear2.push(gear2);
          crank.addChild(gear2);
          let crankBody = new Graphics();
          crankBody.circle(0, 0, crankTotalR); // Crank Body
          crankBody.stroke({ width: 1, color: 0x000 });
          crankBody.y = totalR;
          crank.addChild(crankBody);
          let crankRail = new Graphics();
          crankRail.poly([-crankPinR,  crankPitchR + 2 * crankPinR,
                          -crankPinR, -crankPitchR - crankArmWidth / 2 - 3 * this.Scale - 2 * (magnetWidthCos + magnetDepthSin),
                           crankPinR, -crankPitchR - crankArmWidth / 2 - 3 * this.Scale - 2 * (magnetWidthCos + magnetDepthSin),
                           crankPinR,  crankPitchR + 2 * crankPinR]); // Crank Rail
          crankRail.fill().stroke({ width: 1, color: 0x000 });
          crankRail.y = totalR  - crankArmLength;
          crank.addChild(crankRail);
          let crankHead = new Graphics();
          crankHead.poly([-magnetWidthSin + magnetDepthCos,  magnetWidthCos + magnetDepthSin, 
                           magnetWidthSin + magnetDepthCos, -magnetWidthCos + magnetDepthSin, 
                           magnetWidthSin - magnetDepthCos, -magnetWidthCos - magnetDepthSin,
                          -magnetWidthSin - magnetDepthCos,  magnetWidthCos - magnetDepthSin]); // Magnet
          crankHead.poly([ magnetWidthSin + magnetDepthCos + 1 * this.Scale, -magnetWidthCos - magnetDepthSin - 1 * this.Scale, 
                           magnetWidthSin + magnetDepthCos + 1 * this.Scale,  magnetWidthCos + magnetDepthSin + crankArmWidth / 2 + crankPinR * 2 + 2 * this.Scale, 
                          -magnetWidthSin - magnetDepthCos - 1 * this.Scale,  magnetWidthCos + magnetDepthSin + crankArmWidth / 2 + crankPinR * 2 + 2 * this.Scale, 
                          -magnetWidthSin - magnetDepthCos - 1 * this.Scale, -magnetWidthCos - magnetDepthSin - 1 * this.Scale]); // Magnet Housing
          crankHead.poly([magnetWidthSin + magnetDepthCos + 1 * this.Scale,  magnetWidthCos + magnetDepthSin + 1 * this.Scale, 
                         -magnetWidthSin - magnetDepthCos - 1 * this.Scale,  magnetWidthCos + magnetDepthSin + 1 * this.Scale]); // Arm Slot
          crankHead.fill().stroke({ width: 1, color: 0x000 });
          Heads.push(crankHead);
          crank.addChild(crankHead);
          let crankArm = new Graphics();
          crankArm.circle(0, 0, crankPinR); // Crank Pin
          crankArm.roundRect(-crankArmWidth / 2, -crankArmLength - crankArmWidth / 2, crankArmWidth, crankArmLength + crankArmWidth, crankArmWidth / 2); // Crank Arm
          crankArm.circle(0, -crankArmLength, crankPinR); // Crank Pin
          crankArm.fill().stroke({ width: 1, color: 0x000 });
          crankArm.y = totalR;
          Arms.push(crankArm);
          crank.addChild(crankArm);
          Surface.stage.addChild(crank);
        }

        // Rotor
        for (let i = 0; i < this.Rotor.Arms; i++) { 
          let rotorBody = new Graphics();   
          rotorBody.poly([0, 0, magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
              ...Rotate([-magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos + magnetDepthSin - rotorGapSin], -2 * Math.PI / this.Rotor.Arms),
              ...Rotate([magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin], -2 * Math.PI / this.Rotor.Arms)]); // Rotor Arm
          rotorBody.fill();
          rotorBody.rotation = 2 * Math.PI * i / this.Rotor.Arms;
          Rotor.addChild(rotorBody);
        }        
        for (let i = 0; i < this.Rotor.Arms; i++) { 
          let rotorArm = new Graphics();   
          rotorArm.poly([-magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos + magnetDepthSin - rotorGapSin, 
                          magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin, 
                          magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos - magnetDepthSin - rotorGapSin,
                         -magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos - magnetDepthSin - rotorGapSin]); // Magnet
          rotorArm.poly([0, 0, magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
              ...Rotate([-magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos + magnetDepthSin - rotorGapSin], -2 * Math.PI / this.Rotor.Arms)], false); // Rotor Arm
          rotorArm.stroke({ width: 1, color: 0x000 });
          rotorArm.rotation = 2 * Math.PI * i / this.Rotor.Arms;
          Rotor.addChild(rotorArm);
        }
        Surface.stage.addChild(Rotor);
      },
      Redraw: function () {
        const rotation = (Date.now() - this.Start) / (1000 * this.SPR);
        const totalR = this.Scale * this.TotalR;
        const crankPitchR = this.Scale * this.Crank.PitchR;
        const crankArmLength = this.Scale * this.Crank.ArmLength;
        const crankArmWidth = this.Scale * this.Crank.ArmWidth;
        const magnetWidth = this.Scale * this.Magnets.Width;
        const magnetDepth = this.Scale * this.Magnets.Depth;
        const magnetWidthCos = magnetWidth * Math.cos(this.Magnets.Angle) / 2;
        const magnetDepthSin = magnetDepth * Math.sin(this.Magnets.Angle) / 2;
        for(let i = 0; i < this.Crank.Arms; i++) {
          let armRotation = this.Rotor.Arms * (rotation - i / this.Crank.Arms);
          armRotation = armRotation - Math.floor(armRotation);
          armRotation = armRotation <= this.VS ? armRotation / (this.VS * 2) : 0.5 + 0.5 * (armRotation - this.VS) / (1 - this.VS);
          let crankAngle = armRotation * 2 * Math.PI;
          let crankOffset = Rotate([0, crankPitchR], Math.PI + crankAngle);
          Arms[i].rotation = -Math.asin(crankOffset[0] / crankArmLength);
          Arms[i].position = { x: crankOffset[0], y: crankOffset[1] + totalR };
          Gear1[2 * i].rotation = (i * this.Angle - rotation * 2 * Math.PI) * this.Rotor.Arms;
          Gear1[2 * i + 1].rotation = (i * this.Angle - rotation * 2 * Math.PI) * this.Rotor.Arms;
          Gear2[i].rotation = crankAngle;
          Heads[i].y = totalR + crankOffset[1] - crankArmLength * Math.cos(Arms[i].rotation) - crankArmWidth / 2 - magnetWidthCos - magnetDepthSin - 2 * this.Scale;
        }
        GearM.rotation = Rotor.rotation = rotation * 2 * Math.PI;
      }
    }
});
</script>
