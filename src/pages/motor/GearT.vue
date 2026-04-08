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
            <div class="max-w-75">
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
/// Variable-Speed Compound Gear Train Visualizer
/// Renders two intermeshing gear sections (big/small) that produce variable rotational speed.
/// The gear has asymmetric tooth profiles at the transition zone between sections.
/// Implements the same algorithm as GetTranTooth/GetGearT in functions.ts, but inline with
/// construction geometry visualization and interactive parameter controls.
import { ref, computed, onMounted } from 'vue';
import { Application, Graphics } from 'pixi.js';
import { GetDistance, GetIntersection, GetTooth, Rotate, RotateAt, Translate } from '@/scripts/functions';
//import { GetGearT } from '@/scripts/functions';
/// Data
const Surface = new Application(); // Pixi.js application instance
const RBN = ref<number>(16); // Receiver Big gear tooth count (user input)
const RSN = ref<number>(10); // Receiver Small gear tooth count (user input)
const PA_Deg = ref<number>(25); // Pressure angle in degrees
const Steps = ref<number>(10); // Involute resolution (steps per tooth angle)
const Driver = ref<boolean>(false); // Toggle: show driver gear vs receiver gear
const ShowTooth = ref<boolean>(false); // Toggle: show rack positions at each step
const ShowPitch = ref<boolean>(false); // Toggle: show pitch/addendum/dedendum circles

/// Computed — Variable Speed and Gear Geometry
// VS (Variable Speed): fraction of rotation using the slow (small-tooth) speed profile
// Solved via quadratic formula from the tooth count relationship
const VS = computed(() => {
   const a = 4 * RSN.value - 4 * RBN.value;
   const b = 2 * RBN.value - 6 * RSN.value;
   const c = 2 * RBN.value;
   return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
});
// 4 kinematic ratios that govern how gear sizes relate to each other
const Ratios = computed(() => [
   1 / (2 * VS.value + 1),            // [0] Driver small scaling
   1 / (3 - 2 * VS.value),            // [1] Driver big scaling
   (2 - 2 * VS.value) / (3 - 2 * VS.value), // [2] Receiver base scaling
   2 * VS.value / (2 * VS.value + 1)  // [3] Receiver big scaling
]);
const PA = computed(() => PA_Deg.value * Math.PI / 180); // Pressure angle in radians
const TPA = computed(() => Math.atan((1 / Ratios.value[1] * Ratios.value[0] * Math.PI / (RSN.value / Ratios.value[2] * Ratios.value[0])) / (1 - 1 / Ratios.value[1] * Ratios.value[0]))); // Transverse pressure angle (for the transition tooth)
const Dist = computed(() => Surface.screen.height / 5 * (Driver.value ? DSN.value : RSN.value)); // Center distance scaled to viewport
// Receiver Big gear geometry
const RBR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2])) / Ratios.value[2] * Ratios.value[3]); // Pitch radius
const RBTA = computed(() => 2 * Math.PI / RBN.value); // Tooth angle
// Receiver Small gear geometry
const RSR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2]))); // Pitch radius
const RSTA = computed(() => 2 * Math.PI / RSN.value); // Tooth angle
// Driver Big gear geometry (calculated from receiver via ratios)
const DBN = computed(() => RSN.value / Ratios.value[2] * Ratios.value[1]); // Tooth count (non-integer)
const DBR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2])) / Ratios.value[2] * Ratios.value[1]); // Pitch radius
const DBTA = computed(() => 2 * Math.PI / DBN.value); // Tooth angle
// Driver Small gear geometry
const DSN = computed(() => RSN.value / Ratios.value[2] * Ratios.value[0]); // Tooth count
const DSR = computed(() => (Dist.value / (1 + Ratios.value[1] / Ratios.value[2])) / Ratios.value[2] * Ratios.value[0]); // Pitch radius
const DSTA = computed(() => 2 * Math.PI / DSN.value); // Tooth angle
// Shared tooth dimensions (based on the big gear for uniform height)
const A = computed(() => 2 * RBR.value / RBN.value); // Addendum
const TW = computed(() => Math.PI * RBR.value / RBN.value); // Tooth width
/// Methods
// Input handlers enforce RBN > RSN constraint (big teeth must exceed small teeth)
const RBN_Input = () => {
   if (RBN.value <= RSN.value) {
      RSN.value = RBN.value - 2; // Auto-reduce small to maintain constraint
   }
   Init();
};
const RSN_Input = () => {
   if (RBN.value <= RSN.value) {
      RBN.value = RSN.value + 2; // Auto-increase big to maintain constraint
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

   // Select active gear pair based on Driver toggle
   const BN = Driver.value ? DBN.value : RBN.value;  // Big tooth count
   const BR = Driver.value ? DBR.value : RBR.value;  // Big pitch radius
   const BTA = Driver.value ? DBTA.value : RBTA.value; // Big tooth angle
   const SN = Driver.value ? DSN.value : RSN.value;  // Small tooth count
   const SR = Driver.value ? DSR.value : RSR.value;  // Small pitch radius
   const STA = Driver.value ? DSTA.value : RSTA.value; // Small tooth angle

   // Position stage so the small gear section is near the bottom of the viewport
   Surface.stage.position = { x: Surface.screen.width / 2, y: Surface.screen.height + SR - 2 * A.value };

   // Optional: draw pitch/addendum/dedendum circles for both big and small gear sections
   if (ShowPitch.value) {
      // Small gear circles
      g.circle(0, 0, SR - A.value);  // Dedendum
      g.circle(0, 0, SR);            // Pitch
      g.circle(0, 0, SR + A.value);  // Addendum
      // Big gear circles
      g.circle(0, 0, BR - A.value);  // Dedendum
      g.circle(0, 0, BR);            // Pitch
      g.circle(0, 0, BR + A.value);  // Addendum
      // Small gear tooth boundary rays
      g.poly([0, 0, ...[0, SR + A.value]], false);
      g.poly([0, 0, ...Rotate([0, SR + A.value], STA / 2)], false);
      g.poly([0, 0, ...Rotate([0, SR + A.value], STA)], false);
      // Big gear tooth boundary rays
      g.poly([...Rotate([0, BR - A.value], BTA / 2), ...Rotate([0, BR + A.value], BTA / 2)], false);
      g.poly([...[0, BR - A.value], ...[0, BR + A.value]], false);
      g.poly([...Rotate([0, BR - A.value], -BTA / 2), ...Rotate([0, BR + A.value], -BTA / 2)], false);
   }
   // Draw reference small teeth (3 positions) and big teeth (3 positions) for context
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

   // Asymmetric rack: left flank uses standard PA, right flank uses transverse PA (TPA)
   // This creates the transition tooth between the big and small gear sections
   let rack = [
      [-0.5 * TW.value - A.value * Math.sin(PA.value), A.value],          // Top-left (standard PA)
      [-0.5 * TW.value + A.value * Math.sin(PA.value), -A.value],          // Bottom-left
      [0.5 * TW.value - A.value * Math.sin(TPA.value), -A.value],          // Bottom-right (transverse PA)
      [1.5 * TW.value + A.value * Math.sin(TPA.value), BR - SR + A.value]  // Top-right (extends to big radius)
      //[ 0.5 * TW.value + (BR - SR + A.value) * Math.sin(TPA.value), BR - SR + A.value]
   ];
   // Phase 1: Roll rack along the small gear's pitch circle (generates the small-tooth flank)
   const tooth = []; // Stores all rack positions; each is a 4-point array [0]=TL, [1]=BL, [2]=BR, [3]=TR
   for (let i = -(Steps.value - 0.5) / 2 | 0; i <= 1000; i++) { // '| 0' truncates to integer; start offset centers the rack
      const theta = i * STA / Steps.value;
      const circleP = Rotate([0, SR], theta + STA / 2); // Point on small pitch circle
      const involuteP = Translate(circleP, Rotate([theta * SR, 0], theta + STA / 2)); // Involute offset
      if (ShowPitch.value) {
         g.circle(circleP[0], circleP[1], 2);
         g.circle(involuteP[0], involuteP[1], 2);
      }
      const step = rack.map(x => Translate(Rotate(x, theta + STA / 2), involuteP)); // Rotate rack by angle, translate to involute position
      if (GetDistance([0, 0], step[1]) > SR + A.value) break; // Rack's bottom-left [1] clears gear blank
      tooth.push(step);
   }
   // Phase 2: Transition rack to big gear's pitch circle and roll in the opposite direction.
   // Move rack to the transition point: offset by half a small tooth arc length in X, and by the small pitch radius in Y.
   rack = rack.map(x => Translate(x, [SR * -STA / 2, SR]));
   tooth.unshift(rack);
   for (let i = 1; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
      const theta = -i * BTA / Steps.value;
      const circleP = Rotate([0, BR], theta); // Point on big pitch circle
      const involuteP = Translate(circleP, Rotate([theta * BR, 0], theta)); // Involute offset
      if (ShowPitch.value) {
         g.circle(circleP[0], circleP[1], 2);
         g.circle(involuteP[0], involuteP[1], 2);
      }
      // Translate rack by involute offset and center on big pitch circle, then rotate around involute point
      const step = rack.map(x => RotateAt(Translate(x, involuteP, [0, -BR]), involuteP, theta));
      if (GetDistance([0, 0], step[2]) > BR + A.value) break; // Rack's bottom-right [2] clears gear blank
      tooth.unshift(step);
   }

   if (ShowTooth.value) {
      for (let i = 0; i < tooth.length; i++) {
         g.poly(tooth[i].flat());
      }
   }

   // Left involute profile: intersect the right edge [3]->[2] of successive rack positions (same algorithm as GetTooth)
   let last = 0;
   const interL = [tooth[0][3]]; // Start from outermost rack's top-right corner [3]
   for (let i = 1; i < tooth.length; i++) {
      const prev = interL[interL.length - 1];
      let inter = GetIntersection(tooth[i - 1][3], tooth[i - 1][2], tooth[i][3], tooth[i][2]); // Intersect right edges of adjacent racks
      if (!inter.length) inter = tooth[i][3]; // Fallback to Top Left
      if (GetDistance([0, 0], prev) < GetDistance([0, 0], inter)) break; // Stop when points move outward
      interL.push(inter);
      last = i;
   }
   interL.push(tooth[last][2]); // Close with last rack's bottom-right corner

   // Root fillet: trace dedendum curve between the involute and the tooth bottom
   const cornerL = [];
   for (let i = 1; i <= last; i++) {
      if (GetDistance([0, 0], tooth[i][2]) > GetDistance([0, 0], tooth[i + 1][2])) continue; // Ensure ascending points
      cornerL.push(tooth[i][2]);
   }
   // Undercut: traces remaining bottom-right corners [2] and finds where they intersect the involute
   if (last + 2 < tooth.length) {
      const undercut = [tooth[last + 1][2]];
      outer: for (let i = last + 2; i < tooth.length; i++) { // 'outer:' label for breaking nested loops
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

   // Top arc: addendum circle arc connecting to the next tooth on the big-gear side
   let short = false;
   const leftMost = Rotate([0, BR + A.value], -BTA / 2); // Boundary ray at half big-tooth angle
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

   // Bottom (dedendum) curve: intersect bottom edges [2]->[1] of adjacent rack positions
   const interB = [cornerL[0]];
   for (let i = 1; i < tooth.length; i++) {
      const inter = GetIntersection(tooth[i - 1][2], tooth[i - 1][1], tooth[i][2], tooth[i][1]); // Intersect bottom edges
      if (!inter.length || inter[0] < 0) continue;
      interB.push(inter);
   }
   interB.push(Rotate([0, SR - A.value], STA / 2)); // End at small gear dedendum

   // // Paths
   // g.poly(arcT.flat(), false);
   // g.poly(interL.flat(), false);
   // g.poly(cornerL.flat(), false);
   // g.poly(interB.flat(), false);

   // Assemble transition tooth outline (asymmetric — not mirrored).
   // Slicing avoids duplicate points at segment boundaries.
   const outline = [
      ...arcT,                                   // Top arc (big gear side)
      ...interL.slice(arcT.length ? 1 : 0),      // Left involute (skip first if arc connects)
      ...cornerL.slice(0, -1).reverse(),          // Root fillet (reversed direction)
      ...interB.slice(1),                         // Dedendum curve (skip first, already in cornerL)
      // Right half of standard small tooth, rotated to align. '| 0' truncates midpoint index to integer.
      ...RSTooth.map(x => Rotate(x, STA / 2)).slice(1 + RSTooth.length / 2 | 0)
   ];
   g.poly(outline.flat(), false);
   //g.poly(outline.map(x => [-x[0], x[1]]).reverse().flat(), false);

   // Draw red dots at each outline vertex for visualization
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
   // Initialize Pixi.js: transparent, antialiased, sized to viewport, manual rendering
   await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport, autoStart: false });
   viewport.appendChild(Surface.canvas);
   Surface.stage.rotation = Math.PI; // Flip 180° so Y-up matches gear coordinates
   Init();
});
</script>
