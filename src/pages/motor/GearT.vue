<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="card flex flex-auto gap-20">
      <div class="flex flex-col w-275 p-40 gap-30">
        <div class="flex flex-col gap-10">
          <div class="flex gap-10 items-center justify-between">
            <label>RB Teeth:</label>
            <div class="w-75">
              <input v-model="RBN"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     step="2"
                     min="6"
                     @input="RBN_Input">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>RS Teeth:</label>
            <div class="w-75">
              <input v-model="RSN"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     step="2"
                     min="2"
                     @input="RSN_Input">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>DB Teeth:</label>
            <div class="w-75"
                 v-text="DBN.toFixed(3)" />
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>DS Teeth:</label>
            <div class="w-75"
                 v-text="DSN.toFixed(3)" />
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>VS:</label>
            <div class="w-75"
                 v-text="VS.toFixed(3)" />
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>PA:</label>
            <div class="w-75"
                 v-text="(180 * TPA / Math.PI).toFixed(3)" />
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
            <div class="w-75">
              <input v-model="Steps"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     min="1"
                     max="100"
                     @input="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Driver:</label>
            <div class="w-75">
              <input v-model="Driver"
                     type="checkbox"
                     @change="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Tooth Lines:</label>
            <div class="w-75">
              <input v-model="ShowTooth"
                     type="checkbox"
                     @change="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Pitch Lines:</label>
            <div class="w-75">
              <input v-model="ShowPitch"
                     type="checkbox"
                     @change="Init">
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
import { ref, computed, onMounted } from 'vue';
import { Application, Graphics } from 'pixi.js';
import { GetDistance, GetIntersection, GetTooth, Rotate, RotateAt, Translate } from '@/scripts/functions';
//import { GetGearT } from '@/scripts/functions';
/// Data
const Surface = new Application();
const RBN = ref<number>(16);
const RSN = ref<number>(10);
const PA_Deg = ref<number>(25);
const Steps = ref<number>(10);
const Driver = ref<boolean>(false);
const ShowTooth = ref<boolean>(false);
const ShowPitch = ref<boolean>(false);
/// Computed
const VS = computed(() => {
   const a = 4 * RSN.value - 4 * RBN.value;
   const b = 2 * RBN.value - 6 * RSN.value;
   const c = 2 * RBN.value;
   return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
});
const Ratios = computed(() => [
   1 / (2 * VS.value + 1),
   1 / (3 - 2 * VS.value),
   (2 - 2 * VS.value) / (3 - 2 * VS.value),
   2 * VS.value / (2 * VS.value + 1)
]);
const PA = computed(() => PA_Deg.value * Math.PI / 180);
const TPA = computed(() => Math.atan((1 / Ratios.value[1] * Ratios.value[0] * Math.PI / (RSN.value / Ratios.value[2] * Ratios.value[0])) / (1 - 1 / Ratios.value[1] * Ratios.value[0])));
const Dist = computed(() => Surface.screen.height / 5 * (Driver.value ? DSN.value : RSN.value));
const RBR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2])) / Ratios.value[2] * Ratios.value[3]);
const RBTA = computed(() => 2 * Math.PI / RBN.value);
const RSR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2])));
const RSTA = computed(() => 2 * Math.PI / RSN.value);
const DBN = computed(() => RSN.value / Ratios.value[2] * Ratios.value[1]);
const DBR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2])) / Ratios.value[2] * Ratios.value[1]);
const DBTA = computed(() => 2 * Math.PI / DBN.value);
const DSN = computed(() => RSN.value / Ratios.value[2] * Ratios.value[0]);
const DSR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2])) / Ratios.value[2] * Ratios.value[0]);
const DSTA = computed(() => 2 * Math.PI / DSN.value);
const A = computed(() => 2 * RBR.value / RBN.value);
const TW = computed(() => Math.PI * RBR.value / RBN.value);
/// Methods
const RBN_Input = () => {
   if (RBN.value <= RSN.value) {
      RSN.value = RBN.value - 2;
   }
   Init();
};
const RSN_Input = () => {
   if (RBN.value <= RSN.value) {
      RBN.value = RSN.value + 2;
   }
   Init();
};
// const Init = () => {
//    Surface.stage.removeChildren();
//    Surface.stage.position = {x: Surface.screen.width / 2, y: Surface.screen.height / 2};
//    const g = new Graphics();

//    const outline = GetGearT(RBN.value, RSN.value, 2 * Surface.screen.height / 3, PA_Deg.value, Driver.value, 10);
//    g.poly(outline.flat());

//    g.stroke({ width: 1, color: 0x000 });
//    Surface.stage.addChild(g);
//    Surface.render()
// };
const Init = () => {
   Surface.stage.removeChildren();
   const g = new Graphics();

   const BN = Driver.value ? DBN.value : RBN.value;
   const BR = Driver.value ? DBR.value : RBR.value;
   const BTA = Driver.value ? DBTA.value : RBTA.value;
   const SN = Driver.value ? DSN.value : RSN.value;
   const SR = Driver.value ? DSR.value : RSR.value;
   const STA = Driver.value ? DSTA.value : RSTA.value;

   Surface.stage.position = { x: Surface.screen.width / 2, y: Surface.screen.height + SR - 2 * A.value };

   if (ShowPitch.value) {
      g.circle(0, 0, SR - A.value);
      g.circle(0, 0, SR);
      g.circle(0, 0, SR + A.value);
      g.circle(0, 0, BR - A.value);
      g.circle(0, 0, BR);
      g.circle(0, 0, BR + A.value);
      g.poly([0, 0, ...[0, SR + A.value]], false);
      g.poly([0, 0, ...Rotate([0, SR + A.value], STA / 2)], false);
      g.poly([0, 0, ...Rotate([0, SR + A.value], STA)], false);
      g.poly([...Rotate([0, BR - A.value], BTA / 2), ...Rotate([0, BR + A.value], BTA / 2)], false);
      g.poly([...[0, BR - A.value], ...[0, BR + A.value]], false);
      g.poly([...Rotate([0, BR - A.value], -BTA / 2), ...Rotate([0, BR + A.value], -BTA / 2)], false);
   }
   const RSTooth = GetTooth(SN, SR, 180 * PA.value / Math.PI, 10);
   g.poly(RSTooth.map(x => Rotate(x, -1.5 * STA)).flat(), false);
   g.poly(RSTooth.map(x => Rotate(x, -0.5 * STA)).flat(), false);
   g.poly(RSTooth.map(x => Rotate(x, 1.5 * STA)).flat(), false);
   const RBTooth = GetTooth(BN, BR, 180 * PA.value / Math.PI, 10);
   g.poly(RBTooth.map(x => Rotate(x, -3 * BTA)).flat(), false);
   g.poly(RBTooth.map(x => Rotate(x, -2 * BTA)).flat(), false);
   g.poly(RBTooth.map(x => Rotate(x, -1 * BTA)).flat(), false);

   // Big Rack
   // g.poly([
   //   [-0.5 * TW.value - A.value * Math.sin(TPA.value), BR + A.value],
   //   [-0.5 * TW.value + A.value * Math.sin(TPA.value), BR - A.value],
   //   [ 0.5 * TW.value - A.value * Math.sin(TPA.value), BR - A.value],
   //   [ 0.5 * TW.value + A.value * Math.sin(TPA.value), BR + A.value]
   // ].flat());

   let rack = [
      [-0.5 * TW.value - A.value * Math.sin(PA.value), A.value],
      [-0.5 * TW.value + A.value * Math.sin(PA.value), -A.value],
      [0.5 * TW.value - A.value * Math.sin(TPA.value), -A.value],
      [1.5 * TW.value + A.value * Math.sin(TPA.value), BR - SR + A.value]
      //[ 0.5 * TW.value + (BR - SR + A.value) * Math.sin(TPA.value), BR - SR + A.value]
   ];
   const tooth = [];
   for (let i = -(Steps.value - 0.5) / 2 | 0; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
      const theta = i * STA / Steps.value;
      const circleP = Rotate([0, SR], theta + STA / 2);
      const involuteP = Translate(circleP, Rotate([theta * SR, 0], theta + STA / 2));
      if (ShowPitch.value) {
         g.circle(circleP[0], circleP[1], 2);
         g.circle(involuteP[0], involuteP[1], 2);
      }
      const step = rack.map(x => Translate(Rotate(x, theta + STA / 2), involuteP));
      if (GetDistance([0, 0], step[1]) > SR + A.value) break; // Rack clears gear blank
      tooth.push(step);
   }
   rack = rack.map(x => Translate(x, [SR * -STA / 2, SR])); // Rack at transistion point
   tooth.unshift(rack);
   for (let i = 1; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
      const theta = -i * BTA / Steps.value;
      const circleP = Rotate([0, BR], theta);
      const involuteP = Translate(circleP, Rotate([theta * BR, 0], theta));
      if (ShowPitch.value) {
         g.circle(circleP[0], circleP[1], 2);
         g.circle(involuteP[0], involuteP[1], 2);
      }
      const step = rack.map(x => RotateAt(Translate(x, involuteP, [0, -BR]), involuteP, theta));
      if (GetDistance([0, 0], step[2]) > BR + A.value) break; // Rack clears gear blank
      tooth.unshift(step);
   }

   if (ShowTooth.value) {
      for (let i = 0; i < tooth.length; i++) {
         g.poly(tooth[i].flat());
      }
   }

   // Intersection Left
   let last = 0;
   const interL = [tooth[0][3]];
   for (let i = 1; i < tooth.length; i++) {
      const prev = interL[interL.length - 1];
      let inter = GetIntersection(tooth[i - 1][3], tooth[i - 1][2], tooth[i][3], tooth[i][2]);
      if (!inter.length) inter = tooth[i][3]; // Fallback to Top Left
      if (GetDistance([0, 0], prev) < GetDistance([0, 0], inter)) break; // Ensure descending points
      interL.push(inter);
      last = i;
   }
   interL.push(tooth[last][2]);

   // Corner Left
   const cornerL = [];
   for (let i = 1; i <= last; i++) {
      if (GetDistance([0, 0], tooth[i][2]) > GetDistance([0, 0], tooth[i + 1][2])) continue; // Ensure ascending points
      cornerL.push(tooth[i][2]);
   }
   if (last + 2 < tooth.length) { // Check for undercut
      const undercut = [tooth[last + 1][2]];
      outer: for (let i = last + 2; i < tooth.length; i++) {
         const prev = undercut[undercut.length - 1];
         const point = tooth[i][2];
         for (let j = 1; j < interL.length; j++) {
            const inter = GetIntersection(prev, point, interL[j - 1], interL[j]);
            if (inter.length) {
               interL.splice(j, interL.length - j, inter);
               cornerL.push(...undercut, inter);
               break outer;
            }
         }
         undercut.push(point);
      }
   }

   // Arc Top
   let short = false;
   const leftMost = Rotate([0, BR + A.value], -BTA / 2);
   for (let i = 1; i < interL.length; i++) {
      const inter = GetIntersection([0, 0], leftMost, interL[i - 1], interL[i]);
      if (inter.length) {
         interL.splice(0, i, inter);
         short = true;
         break;
      }
   }
   const arcT = [];
   outer: for (let i = -Steps.value; i <= 0 && !short; i++) {
      const theta = i * BTA / Steps.value / 2;
      const sin = Math.sin(theta), cos = Math.cos(theta);
      const point = [-(BR + A.value) * sin, (BR + A.value) * cos];
      if (arcT.length) {
         const prev = arcT[arcT.length - 1];
         for (let j = 1; j < interL.length; j++) {
            const inter = GetIntersection(prev, point, interL[j - 1], interL[j]);
            if (inter.length) {
               interL.splice(0, j, inter);
               arcT.push(inter);
               break outer;
            }
         }
      }
      arcT.push(point)
   }

   // Intersection Bottom
   const interB = [cornerL[0]];
   for (let i = 1; i < tooth.length; i++) {
      const inter = GetIntersection(tooth[i - 1][2], tooth[i - 1][1], tooth[i][2], tooth[i][1]);
      if (!inter.length || inter[0] < 0) continue;
      interB.push(inter);
   }
   interB.push(Rotate([0, SR - A.value], STA / 2));

   // // Paths
   // g.poly(arcT.flat(), false);
   // g.poly(interL.flat(), false);
   // g.poly(cornerL.flat(), false);
   // g.poly(interB.flat(), false);

   const outline = [
      ...arcT,
      ...interL.slice(arcT.length ? 1 : 0),
      ...cornerL.slice(0, -1).reverse(),
      ...interB.slice(1),
      ...RSTooth.map(x => Rotate(x, STA / 2)).slice(1 + RSTooth.length / 2 | 0)
   ];
   g.poly(outline.flat(), false);
   //g.poly(outline.map(x => [-x[0], x[1]]).reverse().flat(), false);

   const points = new Graphics();
   outline.map(x => points.circle(x[0], x[1], 2));
   points.fill({ color: 0xFF0000 });
   Surface.stage.addChild(points);

   g.stroke({ width: 1, color: 0x000 });
   Surface.stage.addChild(g);
   Surface.render()
};
/// Lifecycle
onMounted(async () => {
   const viewport = document.getElementById("viewport")!;
   await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport, autoStart: false });
   viewport.appendChild(Surface.canvas);
   Surface.stage.rotation = Math.PI;
   Init();
});
</script>
