<template>
   <div class="flex flex-col w-full min-h-full gap-20 p-20">
      <div class="card flex flex-auto gap-20">
         <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
            <div class="flex flex-col gap-10">
               <div class="flex gap-10 items-center justify-between">
                  <label>Teeth:</label>
                  <div class="max-w-[75px]">
                     <input v-model="N" type="number" class="border-input rounded h-32 w-full px-10" min="2"
                        @input="Init">
                  </div>
               </div>
               <div class="flex gap-10 items-center justify-between">
                  <label>Angle:</label>
                  <div class="max-w-[75px]">
                     <input v-model="PA_Deg" type="number" class="border-input rounded h-32 w-full px-10" min="0"
                        max="45" @input="Init">
                  </div>
               </div>
               <div class="flex gap-10 items-center justify-between">
                  <label>Steps:</label>
                  <div class="max-w-[75px]">
                     <input v-model="Steps" type="number" class="border-input rounded h-32 w-full px-10" min="1"
                        max="100" @input="Init">
                  </div>
               </div>
               <div class="flex gap-10 items-center justify-between">
                  <label>Tooth Lines:</label>
                  <div class="max-w-[75px]">
                     <input v-model="ShowTooth" type="checkbox" @change="Init">
                  </div>
               </div>
               <div class="flex gap-10 items-center justify-between">
                  <label>Pitch Lines:</label>
                  <div class="max-w-[75px]">
                     <input v-model="ShowPitch" type="checkbox" @change="Init">
                  </div>
               </div>
            </div>
         </div>
         <div id="viewport" class="flex flex-auto" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Application, Graphics } from 'pixi.js';
import { GetDistance, GetIntersection } from '@/scripts/functions';
/// Data
const Surface = new Application();
const N = ref<number>(12);
const PA_Deg = ref<number>(25);
const Steps = ref<number>(10);
const A = ref<number>(0);
const ShowTooth = ref<boolean>(false);
const ShowPitch = ref<boolean>(false);
/// Computed
const PA = computed(() => PA_Deg.value * Math.PI / 180);
const TA = computed(() => 2 * Math.PI / N.value);
const R = computed(() => A.value * N.value / 2);
const TW = computed(() => Math.PI * R.value / N.value);
/// Methods
const Init = () => {
   Surface.stage.position = { x: Surface.screen.width / 2, y: Surface.screen.height / 2 + R.value };
   Surface.stage.removeChildren();
   const g = new Graphics();

   const leftMost = [(R.value + A.value) * Math.sin(TA.value / 2), (R.value + A.value) * Math.cos(TA.value / 2)];
   const rightMost = [(R.value + A.value) * Math.sin(-TA.value / 2), (R.value + A.value) * Math.cos(-TA.value / 2)];
   if (ShowPitch.value) {
      g.circle(0, 0, R.value - A.value);
      g.circle(0, 0, R.value);
      g.circle(0, 0, R.value + A.value);
      g.poly([0, 0, ...leftMost], false);
      g.poly([0, 0, 0, R.value + A.value], false);
      g.poly([0, 0, ...rightMost], false);
   }

   // Generate all racks for tooth
   const rack = [
      [-TW.value / 2 - A.value * Math.sin(PA.value), R.value + A.value],
      [-TW.value / 2 + A.value * Math.sin(PA.value), R.value - A.value],
      [TW.value / 2 - A.value * Math.sin(PA.value), R.value - A.value],
      [TW.value / 2 + A.value * Math.sin(PA.value), R.value + A.value]
   ], tooth = [rack];
   for (let i = 1; i < 1000; i++) { // Attempt 1000 steps until the rack clears
      const theta = i * TA.value / Steps.value;
      //let theta = i * (Math.PI * 3 / 180); // 3 degree step
      const involute = theta * R.value;
      const sin = Math.sin(theta), cos = Math.cos(theta);
      const left = rack.map(x => [ // Rotate Left
         x[0] * cos - x[1] * -sin - involute * cos,
         x[0] * -sin + x[1] * cos - involute * -sin
      ]);
      const right = rack.map(x => [  // Rotate Right
         x[0] * cos - x[1] * sin + involute * cos,
         x[0] * sin + x[1] * cos + involute * sin
      ]);
      if (GetDistance([0, 0], right[1]) > R.value + A.value) break; // Rack clears gear blank
      tooth.unshift(left);
      tooth.push(right);
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
      if (!cornerL.length) {
         const inter = GetIntersection(rack[2], rack[1], tooth[i][3], tooth[i][2]);
         if (!inter.length) continue; // Ensure the Bottom Left corner dips below the rack
         if (GetDistance([0, 0], tooth[i][2]) > GetDistance([0, 0], tooth[i + 1][2])) continue; // Ensure ascending points
      }
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

   // Intersection Bottom
   const interB = [cornerL[0]];
   for (let i = 1; i < tooth.length; i++) {
      const inter = GetIntersection(tooth[i - 1][2], tooth[i - 1][1], tooth[i][2], tooth[i][1]);
      if (!inter.length || inter[0] < 0) continue;
      interB.push(inter);
   }
   interB.push([0, R.value - A.value])

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

   const outline = [
      ...arcT,
      ...interL.slice(arcT.length ? 1 : 0),
      ...cornerL.slice(0, -1).reverse(),
      ...interB.slice(1),
   ];
   outline.push(...outline.map(x => [-x[0], x[1]]).reverse().slice(1, -1));

   const points = new Graphics();
   outline.map(x => points.circle(x[0], x[1], 2));
   points.fill({ color: 0xFF0000 });
   Surface.stage.addChild(points);

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
   await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport, autoStart: false });
   viewport.appendChild(Surface.canvas);
   Surface.stage.rotation = Math.PI;
   A.value = Surface.screen.height / 5;
   Init();
});
</script>
