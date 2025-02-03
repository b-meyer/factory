<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="card flex flex-auto gap-20">
      <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
        <div class="flex flex-col gap-10">
          <div class="flex gap-10 items-center justify-between">
            <label>Teeth:</label>
            <div class="max-w-[75px]">
              <input v-model="N"
                     type="number"
                     class="border-input rounded h-32 w-full px-10"
                     min="2"
                     @input="Init">
            </div>
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
            <div class="max-w-[75px]">
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
            <div class="max-w-[75px]">
              <input v-model="ShowTooth"
                     type="checkbox"
                     @change="Init">
            </div>
          </div>
          <div class="flex gap-10 items-center justify-between">
            <label>Pitch Lines:</label>
            <div class="max-w-[75px]">
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

<script lang="ts">
import { defineComponent } from 'vue';
import { Application, Graphics } from 'pixi.js';
import { GetDistance, GetIntersection } from '@/Scripts/Functions';

const Surface = new Application();

//ViewModel
export default defineComponent({
  data: () => ({
      N: 12 as number,
      PA_Deg: 25 as number,
      Steps: 10  as number,
      A: 0 as number,
      ShowTooth: false as boolean,
      ShowPitch: false as boolean,
  }),
  computed: {
      PA: function() {
          return this.PA_Deg * Math.PI / 180;
      },
      TA: function() {
          return 2 * Math.PI / this.N;
      },
      R: function() {
          return this.A * this.N / 2;
      },
      TW: function() {
          return Math.PI * this.R / this.N;
      },
  },
  mounted: async function() {
    const viewport = document.getElementById("viewport")!;
    await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport, autoStart: false });
    viewport.appendChild(Surface.canvas);
    Surface.stage.rotation = Math.PI;
    this.A = Surface.screen.height / 5;
    this.Init();
  },
  methods: {
    Init: function() {
      Surface.stage.position = {x: Surface.screen.width / 2, y: Surface.screen.height / 2 + this.R};
      Surface.stage.removeChildren();
      const g = new Graphics();

      let leftMost = [(this.R+this.A)*Math.sin(this.TA/2),(this.R+this.A)*Math.cos(this.TA/2)];
      let rightMost = [(this.R+this.A)*Math.sin(-this.TA/2),(this.R+this.A)*Math.cos(-this.TA/2)];
      if (this.ShowPitch) {
        g.circle(0, 0, this.R - this.A);
        g.circle(0, 0, this.R);
        g.circle(0, 0, this.R + this.A);
        g.poly([0, 0, ...leftMost], false);
        g.poly([0, 0, 0, this.R+this.A], false);
        g.poly([0, 0, ...rightMost], false);
      }
        
      // Generate all racks for tooth
      let rack = [
        [-this.TW / 2 - this.A * Math.sin(this.PA), this.R + this.A],
        [-this.TW / 2 + this.A * Math.sin(this.PA), this.R - this.A],
        [ this.TW / 2 - this.A * Math.sin(this.PA), this.R - this.A],
        [ this.TW / 2 + this.A * Math.sin(this.PA), this.R + this.A]
      ], tooth = [rack];
      for (let i = 1; i < 1000; i++) { // Attempt 1000 steps until the rack clears
        let theta = i * this.TA / this.Steps;
        //let theta = i * (Math.PI * 3 / 180); // 3 degree step
        let involute = theta * this.R;
        let sin = Math.sin(theta), cos = Math.cos(theta);    
        let left = rack.map(x => [ // Rotate Left
          x[0] *  cos - x[1] * -sin - involute *  cos,
          x[0] * -sin + x[1] *  cos - involute * -sin
        ]);
        let right = rack.map(x => [  // Rotate Right
          x[0] * cos - x[1] * sin + involute * cos,
          x[0] * sin + x[1] * cos + involute * sin
        ]);          
        if (GetDistance([0,0], right[1]) > this.R + this.A) break; // Rack clears gear blank
        tooth.unshift(left);
        tooth.push(right);
      } 
      
      if (this.ShowTooth) {
        for(let i = 0; i < tooth.length; i++) {
          g.poly(tooth[i].flat());
        }
      }

      // Intersection Left
      let last = 0, interL = [tooth[0][3]];
      for(let i = 1; i < tooth.length; i++) {
        let prev = interL[interL.length - 1];
        let inter = GetIntersection(tooth[i-1][3], tooth[i-1][2], tooth[i][3], tooth[i][2]);
        if (!inter.length) inter = tooth[i][3]; // Fallback to Top Left
        if (GetDistance([0,0], prev) < GetDistance([0,0], inter)) break; // Ensure descending points
        interL.push(inter);
        last = i;
      }
      interL.push(tooth[last][2]);

      // Corner Left
      let cornerL = [];
      for (let i = 1; i <= last; i++) {
        if (!cornerL.length) {
          let inter = GetIntersection(rack[2], rack[1], tooth[i][3], tooth[i][2]); 
          if (!inter.length) continue; // Ensure the Bottom Left corner dips below the rack
          if (GetDistance([0,0], tooth[i][2]) > GetDistance([0,0], tooth[i+1][2])) continue; // Ensure ascending points
        }
        cornerL.push(tooth[i][2]);
      }
      if (last + 2 < tooth.length) { // Check for undercut
        let undercut = [tooth[last + 1][2]];
        outer:for (let i = last + 2; i < tooth.length; i++) {
          let prev = undercut[undercut.length - 1];
          let point = tooth[i][2];
          for (let j = 1; j < interL.length; j++) {
            let inter = GetIntersection(prev, point, interL[j-1], interL[j]);
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
      for(let i = 1; i < interL.length; i++) {
        let inter = GetIntersection([0,0], leftMost, interL[i-1], interL[i]);
        if (inter.length) {
          interL.splice(0,i,inter);
          short = true;
          break;
        }
      }
      let arcT = [];
      outer:for (let i = -this.Steps; i <= 0 && !short; i++) {
        let theta = i * this.TA / this.Steps / 2;
        let sin = Math.sin(theta), cos = Math.cos(theta); 
        let point = [-(this.R + this.A) * sin, (this.R + this.A) * cos];
        if (arcT.length) {
          let prev = arcT[arcT.length - 1];
          for (let j = 1; j < interL.length; j++) {
            let inter = GetIntersection(prev, point, interL[j-1], interL[j]);
            if (inter.length) {
              interL.splice(0,j,inter);
              arcT.push(inter);
              break outer;
            }
          }
        }
        arcT.push(point)
      }

      // Intersection Bottom
      let interB = [cornerL[0]];
      for(let i = 1; i < tooth.length; i++) {
        let inter = GetIntersection(tooth[i-1][2], tooth[i-1][1], tooth[i][2], tooth[i][1]);
        if (!inter.length || inter[0] < 0) continue;
        interB.push(inter);
      }
      interB.push([0, this.R - this.A])

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

      let outline = [
        ...arcT,
        ...interL.slice(arcT.length ? 1 : 0),
        ...cornerL.slice(0,-1).reverse(),
        ...interB.slice(1),
      ];
      outline.push(...outline.map(x => [-x[0], x[1]]).reverse().slice(1,-1));

      let points = new Graphics();
      outline.map(x => points.circle(x[0], x[1], 2));
      points.fill({ color: 0xFF0000 });
      Surface.stage.addChild(points);

      let gear = [];
      for(let i = 0; i < this.N; i++) {
        let theta = i * this.TA;
        let sin = Math.sin(theta), cos = Math.cos(theta);
        gear.push(outline.map(x => [
          x[0] * cos - x[1] * sin,
          x[0] * sin + x[1] * cos,
        ]).flat());
      }
      g.poly(gear.flat());
      
      g.stroke({ width: 1, color: 0x000 });
      Surface.stage.addChild(g);
      Surface.render()
    },
  }
});
</script>
