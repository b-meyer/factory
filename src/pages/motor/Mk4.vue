<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="card flex flex-auto gap-20">
      <div class="flex flex-col flex-auto max-w-300 px-40 py-20">
        <div class="flex flex-col gap-8">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              General
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-8">
            <div class="flex gap-8 items-center justify-between">
              <label>Total Arm Radius:</label>
              <div class="max-w-75">
                <input v-model="TotalR"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Magnet Length:</label>
              <div class="max-w-75">
                <input v-model="Magnets.Width"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Magnet Depth:</label>
              <div class="max-w-75">
                <input v-model="Magnets.Depth"
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
          <div class="flex flex-col gap-8">
            <div class="flex gap-8 items-center justify-between">
              <label>Magnets:</label>
              <div class="max-w-75">
                <input v-model="Crank.Arms"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Arm Length:</label>
              <div class="max-w-75">
                <input v-model="Crank.ArmLength"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Arm Width:</label>
              <div class="max-w-75">
                <input v-model="Crank.ArmWidth"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Outer Radius:</label>
              <div class="max-w-75">
                <input v-model="Crank.TotalR"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Pitch Radius:</label>
              <div class="max-w-75">
                <input v-model="Crank.PitchR"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Pin Radius:</label>
              <div class="max-w-75">
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
          <div class="flex flex-col gap-8">
            <div class="flex gap-8 items-center justify-between">
              <label>Magnets:</label>
              <div class="max-w-75">
                <input v-model="Rotor.Arms"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Magnet Gap:</label>
              <div class="max-w-75">
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
          <div class="flex flex-col gap-8">
            <div class="flex gap-8 items-center justify-between">
              <label>GearM N:</label>
              <div class="w-75"
                   v-text="Gears.N * Rotor.Arms" />
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>GearM R:</label>
              <div class="w-75"
                   v-text="MainR" />
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Gear1 N:</label>
              <div class="max-w-75">
                <input v-model="Gears.N"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Gear1 R:</label>
              <div class="w-75"
                   v-text="Gear1R" />
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Gear2 RBN:</label>
              <div class="max-w-75">
                <input v-model="Gears.RBN"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>Gear2 RSN:</label>
              <div class="max-w-75">
                <input v-model="Gears.RSN"
                       type="number"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-8 items-center justify-between">
              <label>PA:</label>
              <div class="max-w-75">
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

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { GetGear, GetGearT, Rotate } from '@/scripts/functions';
import { Application, Container, Graphics } from 'pixi.js';
/// Data
const Surface = new Application();
const Rotor_C = new Container();
const GearM_C = new Container();
const Arms_C = [] as Container[];
const Gear1_C = [] as Container[];
const Gear2_C = [] as Container[];
const Heads_C = [] as Container[];
const Start = Date.now();
const SPR = 15 as number;
const TotalR = ref<number>(210);
const Crank = reactive({
   Arms: 23,
   ArmLength: 60,
   ArmWidth: 10,
   TotalR: 28,
   PitchR: 23,
   PinR: 2,
});
const Rotor = reactive({
   Arms: 8,
   Gap: 3,
});
const Gears = reactive({
   N: 18,
   RBN: 16,
   RSN: 10,
   PA_Deg: 25,
});
const Magnets = reactive({
   Width: 10,
   Depth: 3,
   Angle: Math.PI / 4,
});
/// Computed
const MainR = computed(() => Gear1R.value * Rotor.Arms);
const Gear1R = computed(() => TotalR.value / (2.5 + Rotor.Arms)); // TotalR = 6x + 1x + 2(0.75x)
const Angle = computed(() => 2 * Math.PI / Crank.Arms);
const Scale = computed(() => .425 * Math.min(Surface.screen.width, Surface.screen.height) / TotalR.value);
const VS = computed(() => {
   const a = 4 * Gears.RSN - 4 * Gears.RBN;
   const b = 2 * Gears.RBN - 6 * Gears.RSN;
   const c = 2 * Gears.RBN;
   return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
});
/// Mehtods
const Init = () => {
   Surface.stage.removeChildren();
   GearM_C.removeChildren();
   Rotor_C.removeChildren();
   Arms_C.length = 0;
   Gear1_C.length = 0;
   Gear2_C.length = 0;
   Heads_C.length = 0;

   const fill = 'hsl(215 8% 97.5%)';
   const totalR = Scale.value * TotalR.value;
   const mainR = Scale.value * MainR.value;
   const gear1R = Scale.value * Gear1R.value;
   const gear2R = Scale.value * Gear1R.value * 0.75;
   const crankTotalR = Scale.value * Crank.TotalR;
   const crankPitchR = Scale.value * Crank.PitchR;
   const crankPinR = Scale.value * Crank.PinR
   const crankArmLength = Scale.value * Crank.ArmLength;
   const crankArmWidth = Scale.value * Crank.ArmWidth;
   const magnetWidth = Scale.value * Magnets.Width;
   const magnetDepth = Scale.value * Magnets.Depth;
   const magnetWidthSin = magnetWidth * Math.sin(Magnets.Angle) / 2;
   const magnetWidthCos = magnetWidth * Math.cos(Magnets.Angle) / 2;
   const magnetDepthSin = magnetDepth * Math.sin(Magnets.Angle) / 2;
   const magnetDepthCos = magnetDepth * Math.cos(Magnets.Angle) / 2;
   const rotorGap = Scale.value * Rotor.Gap;
   const rotorGapSin = (magnetDepth + rotorGap) * Math.sin(Magnets.Angle);
   const rotorGapCos = (magnetDepth + rotorGap) * Math.cos(Magnets.Angle);
   const rotorPitchR = totalR - crankPitchR - crankArmLength - crankArmWidth / 2 - magnetWidthCos - magnetDepthSin - 2 * Scale.value;

   // Static Body
   const body = new Graphics();
   body.circle(0, 0, totalR + crankTotalR); // Body
   body.stroke({ width: 1, color: 0x000 });
   Surface.stage.addChild(body);

   // Main Gear
   const gear = new Graphics();
   gear.poly(GetGear(Gears.N * Rotor.Arms, mainR, Gears.PA_Deg, 5).map(x => Rotate(x, Math.PI / (Gears.N * Rotor.Arms))).flat()); // Gear Main
   gear.stroke({ width: 1, color: 0x000 });
   GearM_C.addChild(gear);
   Surface.stage.addChild(GearM_C);

   // Crank Arms / Gear Train
   for (let i = 0; i < Crank.Arms; i++) {
      const crank = new Container();
      crank.rotation = i * Angle.value;
      const gear1a = new Graphics();
      gear1a.poly(GetGear(Gears.N, gear1R, Gears.PA_Deg, 5).flat()); // Gear 1A
      gear1a.stroke({ width: 1, color: 0x000 });
      gear1a.y = mainR + gear1R;
      Gear1_C.push(gear1a);
      crank.addChild(gear1a);
      const gear1b = new Graphics();
      gear1b.poly(GetGearT(Gears.RBN, Gears.RSN, 2 * gear2R, Gears.PA_Deg, true, 2).flat()); // Gear 1B
      gear1b.fill(fill).stroke({ width: 1, color: 0x000 });
      gear1b.y = mainR + gear1R;
      Gear1_C.push(gear1b);
      crank.addChild(gear1b);
      const gear2 = new Graphics();
      gear2.poly(GetGearT(Gears.RBN, Gears.RSN, 2 * gear2R, Gears.PA_Deg, false, 2).flat()); // Gear 2
      gear2.fill(fill).stroke({ width: 1, color: 0x000 });
      gear2.y = totalR;
      Gear2_C.push(gear2);
      crank.addChild(gear2);
      const crankBody = new Graphics();
      crankBody.circle(0, 0, crankTotalR); // Crank Body
      crankBody.stroke({ width: 1, color: 0x000 });
      crankBody.y = totalR;
      crank.addChild(crankBody);
      const crankRail = new Graphics();
      crankRail.poly([
         -crankPinR, crankPitchR + 2 * crankPinR,
         -crankPinR, -crankPitchR - crankArmWidth / 2 - 3 * Scale.value - 2 * (magnetWidthCos + magnetDepthSin),
         crankPinR, -crankPitchR - crankArmWidth / 2 - 3 * Scale.value - 2 * (magnetWidthCos + magnetDepthSin),
         crankPinR, crankPitchR + 2 * crankPinR]); // Crank Rail
      crankRail.fill(fill).stroke({ width: 1, color: 0x000 });
      crankRail.y = totalR - crankArmLength;
      crank.addChild(crankRail);
      const crankHead = new Graphics();
      crankHead.poly([
         -magnetWidthSin + magnetDepthCos, magnetWidthCos + magnetDepthSin,
         magnetWidthSin + magnetDepthCos, -magnetWidthCos + magnetDepthSin,
         magnetWidthSin - magnetDepthCos, -magnetWidthCos - magnetDepthSin,
         -magnetWidthSin - magnetDepthCos, magnetWidthCos - magnetDepthSin]); // Magnet
      crankHead.poly([
         magnetWidthSin + magnetDepthCos + 1 * Scale.value, -magnetWidthCos - magnetDepthSin - 1 * Scale.value,
         magnetWidthSin + magnetDepthCos + 1 * Scale.value, magnetWidthCos + magnetDepthSin + crankArmWidth / 2 + crankPinR * 2 + 2 * Scale.value,
         -magnetWidthSin - magnetDepthCos - 1 * Scale.value, magnetWidthCos + magnetDepthSin + crankArmWidth / 2 + crankPinR * 2 + 2 * Scale.value,
         -magnetWidthSin - magnetDepthCos - 1 * Scale.value, -magnetWidthCos - magnetDepthSin - 1 * Scale.value]); // Magnet Housing
      crankHead.poly([
         magnetWidthSin + magnetDepthCos + 1 * Scale.value, magnetWidthCos + magnetDepthSin + 1 * Scale.value,
         -magnetWidthSin - magnetDepthCos - 1 * Scale.value, magnetWidthCos + magnetDepthSin + 1 * Scale.value]); // Arm Slot
      crankHead.fill(fill).stroke({ width: 1, color: 0x000 });
      Heads_C.push(crankHead);
      crank.addChild(crankHead);
      const crankArm = new Graphics();
      crankArm.circle(0, 0, crankPinR); // Crank Pin
      crankArm.roundRect(-crankArmWidth / 2, -crankArmLength - crankArmWidth / 2, crankArmWidth, crankArmLength + crankArmWidth, crankArmWidth / 2); // Crank Arm
      crankArm.circle(0, -crankArmLength, crankPinR); // Crank Pin
      crankArm.fill(fill).stroke({ width: 1, color: 0x000 });
      crankArm.y = totalR;
      Arms_C.push(crankArm);
      crank.addChild(crankArm);
      Surface.stage.addChild(crank);
   }

   // Rotor
   for (let i = 0; i < Rotor.Arms; i++) {
      const rotorBody = new Graphics();
      rotorBody.poly([0, 0, magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
         ...Rotate([-magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos - magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms),
         ...Rotate([-magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos + magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms),
         ...Rotate([magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms)]); // Rotor Arm
      rotorBody.fill(fill);
      rotorBody.rotation = 2 * Math.PI * i / Rotor.Arms;
      Rotor_C.addChild(rotorBody);
   }
   for (let i = 0; i < Rotor.Arms; i++) {
      const rotorArm = new Graphics();
      rotorArm.poly([
         -magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos + magnetDepthSin - rotorGapSin,
         magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
         magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos - magnetDepthSin - rotorGapSin,
         -magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos - magnetDepthSin - rotorGapSin]); // Magnet
      rotorArm.poly([0, 0, magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
         ...Rotate([-magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos - magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms)], false); // Rotor Arm
      rotorArm.stroke({ width: 1, color: 0x000 });
      rotorArm.rotation = 2 * Math.PI * i / Rotor.Arms;
      Rotor_C.addChild(rotorArm);
   }
   Surface.stage.addChild(Rotor_C);
};
const Redraw = () => {
   const rotation = (Date.now() - Start) / (1000 * SPR);
   const totalR = Scale.value * TotalR.value;
   const crankPitchR = Scale.value * Crank.PitchR;
   const crankArmLength = Scale.value * Crank.ArmLength;
   const crankArmWidth = Scale.value * Crank.ArmWidth;
   const magnetWidth = Scale.value * Magnets.Width;
   const magnetDepth = Scale.value * Magnets.Depth;
   const magnetWidthCos = magnetWidth * Math.cos(Magnets.Angle) / 2;
   const magnetDepthSin = magnetDepth * Math.sin(Magnets.Angle) / 2;
   for (let i = 0; i < Crank.Arms; i++) {
      let armRotation = Rotor.Arms * (rotation - i / Crank.Arms);
      armRotation = armRotation - Math.floor(armRotation);
      armRotation = armRotation <= VS.value ? armRotation / (VS.value * 2) : 0.5 + 0.5 * (armRotation - VS.value) / (1 - VS.value);
      const crankAngle = armRotation * 2 * Math.PI;
      const crankOffset = Rotate([0, crankPitchR], Math.PI + crankAngle);
      Arms_C[i].rotation = -Math.asin(crankOffset[0] / crankArmLength);
      Arms_C[i].position = { x: crankOffset[0], y: crankOffset[1] + totalR };
      Gear1_C[2 * i].rotation = (i * Angle.value - rotation * 2 * Math.PI) * Rotor.Arms;
      Gear1_C[2 * i + 1].rotation = (i * Angle.value - rotation * 2 * Math.PI) * Rotor.Arms;
      Gear2_C[i].rotation = crankAngle;
      Heads_C[i].y = totalR + crankOffset[1] - crankArmLength * Math.cos(Arms_C[i].rotation) - crankArmWidth / 2 - magnetWidthCos - magnetDepthSin - 2 * Scale.value;
   }
   GearM_C.rotation = Rotor_C.rotation = rotation * 2 * Math.PI;
};
/// Lifecycle
onMounted(async () => {
   const viewport = document.getElementById("viewport")!;
   await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport });
   viewport.appendChild(Surface.canvas);
   Surface.stage.position = { x: Surface.screen.width / 2, y: Surface.screen.height / 2 };
   Surface.stage.rotation = Math.PI;
   Init();
   Surface.ticker.add(Redraw);
});
</script>
