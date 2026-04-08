<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="card flex flex-auto gap-20">
      <div class="flex flex-col flex-auto max-w-300 p-40 gap-30">
        <div class="flex flex-col gap-10">
          <div class="flex gap-10 items-center justify-between">
            <label>Teeth:</label>
            <div class="max-w-75">
              <input v-model="N"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     min="2"
                     @input="Init">
            </div>
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
            <div class="max-w-75">
              <input v-model="Steps"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     min="1"
                     max="100"
                     @input="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Tooth Lines:</label>
            <div class="max-w-75">
              <input v-model="ShowTooth"
                     type="checkbox"
                     @change="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Pitch Lines:</label>
            <div class="max-w-75">
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
/// Single Involute Spur Gear Generator
/// Renders a 2D gear profile using Pixi.js, with interactive controls for teeth, pressure angle, and resolution.
/// Implements the same rolling-rack involute algorithm as GetTooth in functions.ts, but inline with
/// optional visualization of intermediate construction geometry (tooth lines, pitch circles).
import { ref, computed, onMounted } from 'vue';
import { Application, Graphics } from 'pixi.js';
import { GetDistance, GetIntersection } from '@/scripts/functions';
/// Data
const Surface = new Application(); // Pixi.js application instance
const N = ref<number>(12); // Number of teeth
const PA_Deg = ref<number>(25); // Pressure angle in degrees
const Steps = ref<number>(10); // Involute resolution (steps per tooth angle)
const A = ref<number>(0); // Addendum height (set from screen height on mount)
const ShowTooth = ref<boolean>(false); // Toggle: show rack positions at each step
const ShowPitch = ref<boolean>(false); // Toggle: show pitch/addendum/dedendum circles
/// Computed
const PA = computed(() => PA_Deg.value * Math.PI / 180); // Pressure angle in radians
const TA = computed(() => 2 * Math.PI / N.value); // Tooth angle (angular span per tooth)
const R = computed(() => A.value * N.value / 2); // Pitch radius (derived from addendum × teeth / 2)
const TW = computed(() => Math.PI * R.value / N.value); // Tooth width at pitch circle
/// Methods
const Init = () => {
   // Center stage horizontally, offset vertically so gear center is visible
   Surface.stage.position = { x: Surface.screen.width / 2, y: Surface.screen.height / 2 + R.value };
   Surface.stage.removeChildren();
   const g = new Graphics();

   // Boundary points at the addendum circle, half a tooth angle left and right
   const leftMost = [(R.value + A.value) * Math.sin(TA.value / 2), (R.value + A.value) * Math.cos(TA.value / 2)];
   const rightMost = [(R.value + A.value) * Math.sin(-TA.value / 2), (R.value + A.value) * Math.cos(-TA.value / 2)];
   // Optional pitch visualization: dedendum circle, pitch circle, addendum circle, and tooth boundary rays
   if (ShowPitch.value) {
      g.circle(0, 0, R.value - A.value); // Dedendum circle (root)
      g.circle(0, 0, R.value); // Pitch circle
      g.circle(0, 0, R.value + A.value); // Addendum circle (tip)
      g.poly([0, 0, ...leftMost], false); // Left tooth boundary ray
      g.poly([0, 0, 0, R.value + A.value], false); // Center ray
      g.poly([0, 0, ...rightMost], false); // Right tooth boundary ray
   }

   // Define the rack cutter profile (trapezoidal shape angled by pressure angle).
   // Each rack is a 4-point array: [0]=top-left, [1]=bottom-left, [2]=bottom-right, [3]=top-right.
   // The tooth[] array stores all rack positions; tooth[i][0..3] accesses corner j of rack at position i.
   const rack = [
         [-TW.value / 2 - A.value * Math.sin(PA.value), R.value + A.value],  // [0] Top-left
         [-TW.value / 2 + A.value * Math.sin(PA.value), R.value - A.value],  // [1] Bottom-left
         [TW.value / 2 - A.value * Math.sin(PA.value), R.value - A.value],   // [2] Bottom-right
         [TW.value / 2 + A.value * Math.sin(PA.value), R.value + A.value]    // [3] Top-right
      ], tooth = [rack];
   // Roll the rack along the pitch circle in both directions to generate involute curves
   for (let i = 1; i < 1000; i++) { // Attempt 1000 steps until the rack clears the addendum
      const theta = i * TA.value / Steps.value; // Angular step
      const involute = theta * R.value; // Arc length (involute unroll distance)
      const sin = Math.sin(theta), cos = Math.cos(theta);
      // Rotation matrix [cos, -sin; sin, cos] applied to rack + involute arc translation.
      // Left uses negated theta (CCW rotation); right uses positive theta (CW rotation).
      const left = rack.map(x => [
         x[0] * cos - x[1] * -sin - involute * cos,  // X: rotate CCW + translate
         x[0] * -sin + x[1] * cos - involute * -sin   // Y: rotate CCW + translate
      ]);
      const right = rack.map(x => [
         x[0] * cos - x[1] * sin + involute * cos,    // X: rotate CW + translate
         x[0] * sin + x[1] * cos + involute * sin      // Y: rotate CW + translate
      ]);
      if (GetDistance([0, 0], right[1]) > R.value + A.value) break; // Rack clears gear blank
      tooth.unshift(left); // Left positions build outward
      tooth.push(right); // Right positions build outward
   }

   // Optional: draw all rack positions to visualize the involute generation process
   if (ShowTooth.value) {
      for (let i = 0; i < tooth.length; i++) {
         g.poly(tooth[i].flat());
      }
   }

   // Left tooth profile: intersect the right edge [3]->[2] (top-right to bottom-right)
   // of successive rack positions to trace the involute curve
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

   // Root fillet: trace the dedendum curve between the involute and tooth bottom
   const cornerL = [];
   for (let i = 1; i <= last; i++) {
      if (!cornerL.length) {
         const inter = GetIntersection(rack[2], rack[1], tooth[i][3], tooth[i][2]);
         if (!inter.length) continue; // Ensure the Bottom Left corner dips below the rack
         if (GetDistance([0, 0], tooth[i][2]) > GetDistance([0, 0], tooth[i + 1][2])) continue; // Ensure ascending points
      }
      cornerL.push(tooth[i][2]);
   }
   // Undercut detection: cutter removes material below the base circle (low tooth count / high PA).
   // Traces bottom-right corners [2] of remaining rack positions to find where they cut into the involute.
   if (last + 2 < tooth.length) { // Check for undercut
      const undercut = [tooth[last + 1][2]];
      outer: for (let i = last + 2; i < tooth.length; i++) { // 'outer:' is a JS label for breaking nested loops
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

   // Top arc: addendum circle arc between adjacent teeth
   // If involute already reaches the tooth boundary ray, this is a 'short' tooth (no arc needed)
   let short = false;
   for (let i = 1; i < interL.length; i++) {
      const inter = GetIntersection([0, 0], leftMost, interL[i - 1], interL[i]);
      if (inter.length) {
         interL.splice(0, i, inter);
         short = true;
         break;
      }
   }
   const arcT = []; // Arc points along addendum circle
   outer: for (let i = -Steps.value; i <= 0 && !short; i++) { // Walk arc until it meets the involute
      const theta = i * TA.value / Steps.value / 2;
      const sin = Math.sin(theta), cos = Math.cos(theta);
      const point = [-(R.value + A.value) * sin, (R.value + A.value) * cos];
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
   interB.push([0, R.value - A.value]) // End at dedendum circle centerline

   // // Debug paths (commented out — was used for colored segment visualization)
   // // Paths
   // let arcTPath = Surface.makePath(...arcT.flat());
   // arcTPath.closed = false;
   // arcTPath.stroke = "green";
   // let interLPath = Surface.makePath(...interL.flat());
   // interLPath.closed = false;
   // interLPath.stroke = "red";
   // let cornerLPath = Surface.makePath(...cornerL.flat());
   // cornerLPath.closed = false;
   // cornerLPath.stroke = "blue";
   // let interBPath = Surface.makePath(...interB.flat());
   // interBPath.closed = false;
   // interBPath.stroke = "red";
   // let arcTPathR = Surface.makePath(...arcT.map(x => [-x[0], x[1]]).flat());
   // arcTPathR.closed = false;
   // arcTPathR.stroke = "green";
   // let interLPathR = Surface.makePath(...interL.map(x => [-x[0], x[1]]).flat());
   // interLPathR.closed = false;
   // interLPathR.stroke = "red";
   // let cornerLPathR = Surface.makePath(...cornerL.map(x => [-x[0], x[1]]).flat());
   // cornerLPathR.closed = false;
   // cornerLPathR.stroke = "blue";
   // let interBPathR = Surface.makePath(...interB.map(x => [-x[0], x[1]]).flat());
   // interBPathR.closed = false;
   // interBPathR.stroke = "red";

   // Assemble complete LEFT tooth outline. Slicing avoids duplicate points at segment boundaries.
   const outline = [
      ...arcT,                                   // Top arc (outer diameter between teeth)
      ...interL.slice(arcT.length ? 1 : 0),      // Left involute (skip first if arc connects to it)
      ...cornerL.slice(0, -1).reverse(),          // Root fillet (reversed direction)
      ...interB.slice(1),                         // Dedendum curve (skip first, already in cornerL)
   ];
   // Mirror the left outline across Y-axis for the right flank: negate X, reverse order, trim both endpoints
   outline.push(...outline.map(x => [-x[0], x[1]]).reverse().slice(1, -1));

   // Draw red dots at each outline point for visualization
   const points = new Graphics();
   outline.map(x => points.circle(x[0], x[1], 2));
   points.fill({ color: 0xFF0000 });
   Surface.stage.addChild(points);

   // Rotate the tooth outline N times to assemble the full gear
   const gear = [];
   for (let i = 0; i < N.value; i++) {
      const theta = i * TA.value;
      const sin = Math.sin(theta), cos = Math.cos(theta);
      gear.push(outline.map(x => [
         x[0] * cos - x[1] * sin,
         x[0] * sin + x[1] * cos,
      ]).flat());
   }
   g.poly(gear.flat());

   g.stroke({ width: 1, color: 0x000 });
   Surface.stage.addChild(g);
   Surface.render()
};
/// Lifecycle
onMounted(async () => {
   const viewport = document.getElementById("viewport")!;
   // Initialize Pixi.js: transparent background, antialiased, sized to viewport, manual rendering
   await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport, autoStart: false });
   viewport.appendChild(Surface.canvas);
   Surface.stage.rotation = Math.PI; // Flip 180° so Y-up matches gear coordinate system
   A.value = Surface.screen.height / 5; // Addendum sized to ~20% of viewport height
   Init();
});
</script>
