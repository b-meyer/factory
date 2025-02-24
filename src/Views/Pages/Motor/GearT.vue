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

<script lang="ts">
import { defineComponent } from 'vue';
import { Application, Graphics } from 'pixi.js';
import { GetDistance, GetGearT, GetIntersection, GetTooth, Rotate, RotateAt, Translate } from '@/Scripts/Functions';

const Surface = new Application();

//ViewModel
export default defineComponent({
  data: () => ({
    RBN: 16 as number,
    RSN: 10 as number,
    PA_Deg: 25 as number,
    Steps: 10  as number,
    Driver: false as boolean,
    ShowTooth: true as boolean,
    ShowPitch: true as boolean,
  }),
  computed: {
    // Variable Speed
    VS: function() {
      const a = 4 * this.RSN - 4 * this.RBN;
      const b = 2 * this.RBN - 6 * this.RSN;
      const c = 2 * this.RBN;
      return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    },
    Ratios: function() {
      return [
        1 / (2 * this.VS + 1),
        1 / (3 - 2 * this.VS),
        (2 - 2 * this.VS) / (3 - 2 * this.VS),
        2 * this.VS / (2 * this.VS + 1)
      ];
    },
    PA: function() {
        return this.PA_Deg * Math.PI / 180;
    },
    TPA: function() {
      // let p1 = [0.5 * this.TW, this.RBR + this.A];
      // let p2 = [0.5 * this.TW, this.RBR];
      // let p3 = Rotate([0.5 * this.TW, this.RSR], 0.5 * this.RSTA);
      // return -GetAngle(p1, p2, p3);
      return Math.atan((1 / this.Ratios[1] * this.Ratios[0] * Math.PI / (this.RSN / this.Ratios[2] * this.Ratios[0])) / (1 - 1 / this.Ratios[1] * this.Ratios[0]));
      //return (32 * Math.PI / 180);
    },
    Dist: function() {
      return Surface.screen.height / 5 * (this.Driver ? this.DSN : this.RSN);
    },
    // Receiver Big
    RBR: function() {
      return (this.Dist / (1 + this.Ratios[1] / this.Ratios[2])) / this.Ratios[2] * this.Ratios[3];
    },
    RBTA: function() {
      return 2 * Math.PI / this.RBN;
    },
    // Receiver Small
    RSR: function() {
      return (this.Dist / (1 + this.Ratios[1] / this.Ratios[2]));
    },
    RSTA: function() {
      return 2 * Math.PI / this.RSN;
    },
    // Driver Big
    DBN: function() {
      return this.RSN / this.Ratios[2] * this.Ratios[1];
    },
    DBR: function() {
      return (this.Dist / (1 + this.Ratios[1] / this.Ratios[2])) / this.Ratios[2] * this.Ratios[1];
    },
    DBTA: function() {
      return 2 * Math.PI / this.DBN;
    },
    // Driver Small
    DSN: function() {
      return this.RSN / this.Ratios[2] * this.Ratios[0];
    },
    DSR: function() {
      return (this.Dist / (1 + this.Ratios[1] / this.Ratios[2])) / this.Ratios[2] * this.Ratios[0];
    },
    DSTA: function() {
      return 2 * Math.PI / this.DSN;
    },
    // Shared
    A: function() {
      return 2 * this.RBR / this.RBN;
    },
    TW: function() {
      return Math.PI * this.RBR / this.RBN;
    },
  },
  mounted: async function() {
    const viewport = document.getElementById("viewport")!;
    await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport, autoStart: false });
    viewport.appendChild(Surface.canvas);
    Surface.stage.rotation = Math.PI;
    this.Init();
  },
  methods: {
    RBN_Input: function(){
      if (this.RBN <= this.RSN) {
        this.RSN = this.RBN - 2;
      }
      this.Init();
    },
    RSN_Input: function(){
      if (this.RBN <= this.RSN) {
        this.RBN = this.RSN + 2;
      }
      this.Init();
    },
    Init: function() {
      Surface.stage.removeChildren();
      Surface.stage.position = {x: Surface.screen.width / 2, y: Surface.screen.height / 2};
      const g = new Graphics();

      const outline = GetGearT(this.RBN, this.RSN, 2 * Surface.screen.height / 3, this.PA_Deg, this.Driver, 10);
      g.poly(outline.flat());

      g.stroke({ width: 1, color: 0x000 });
      Surface.stage.addChild(g);
      Surface.render()
    },
    _Init: function() {
      Surface.stage.removeChildren();
      const g = new Graphics();

      const BN = this.Driver ? this.DBN : this.RBN;
      const BR = this.Driver ? this.DBR : this.RBR;
      const BTA = this.Driver ? this.DBTA : this.RBTA;
      const SN = this.Driver ? this.DSN : this.RSN;
      const SR = this.Driver ? this.DSR : this.RSR;
      const STA = this.Driver ? this.DSTA : this.RSTA;

      Surface.stage.position = {x: Surface.screen.width / 2, y: Surface.screen.height + SR - 2 * this.A};
      
      if (this.ShowPitch) {
        g.circle(0, 0, SR - this.A);
        g.circle(0, 0, SR);
        g.circle(0, 0, SR + this.A);
        g.circle(0, 0, BR - this.A);
        g.circle(0, 0, BR);
        g.circle(0, 0, BR + this.A);
        g.poly([0, 0, ...[0, SR + this.A]], false);
        g.poly([0, 0, ...Rotate([0, SR + this.A], STA/2)], false);
        g.poly([0, 0, ...Rotate([0, SR + this.A], STA)], false);
        g.poly([...Rotate([0, BR - this.A], BTA/2), ...Rotate([0, BR + this.A], BTA/2)], false);
        g.poly([...[0, BR - this.A], ...[0, BR + this.A]], false);
        g.poly([...Rotate([0, BR - this.A], -BTA/2), ...Rotate([0, BR + this.A], -BTA/2)], false);
      }
      const RSTooth = GetTooth(SN, SR, 180 * this.PA / Math.PI, 10);
      g.poly(RSTooth.map(x => Rotate(x, -1.5 * STA)).flat(), false);
      g.poly(RSTooth.map(x => Rotate(x, -0.5 * STA)).flat(), false);
      g.poly(RSTooth.map(x => Rotate(x,  1.5 * STA)).flat(), false);
      const RBTooth = GetTooth(BN, BR, 180 * this.PA / Math.PI, 10);
      g.poly(RBTooth.map(x => Rotate(x, -3 * BTA)).flat(), false);
      g.poly(RBTooth.map(x => Rotate(x, -2 * BTA)).flat(), false);
      g.poly(RBTooth.map(x => Rotate(x, -1 * BTA)).flat(), false);

      // Big Rack
      // g.poly([
      //   [-0.5 * this.TW - this.A * Math.sin(this.TPA), BR + this.A],
      //   [-0.5 * this.TW + this.A * Math.sin(this.TPA), BR - this.A],
      //   [ 0.5 * this.TW - this.A * Math.sin(this.TPA), BR - this.A],
      //   [ 0.5 * this.TW + this.A * Math.sin(this.TPA), BR + this.A]
      // ].flat());    

      let rack = [
        [-0.5 * this.TW - this.A * Math.sin(this.PA),   this.A],
        [-0.5 * this.TW + this.A * Math.sin(this.PA),  -this.A],
        [ 0.5 * this.TW - this.A * Math.sin(this.TPA), -this.A],
        [ 1.5 * this.TW + this.A * Math.sin(this.TPA), BR - SR + this.A]
        //[ 0.5 * this.TW + (BR - SR + this.A) * Math.sin(this.TPA), BR - SR + this.A]
      ];
      const tooth = [];
      for (let i = -(this.Steps - 0.5) / 2 | 0; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
        const theta = i * STA / this.Steps;
        const circleP = Rotate([0,SR], theta + STA / 2);
        const involuteP = Translate(circleP, Rotate([theta * SR, 0], theta + STA / 2));
        if (this.ShowPitch) {
          g.circle(circleP[0], circleP[1], 2);
          g.circle(involuteP[0], involuteP[1], 2);
        }
        const step = rack.map(x => Translate(Rotate(x, theta + STA / 2), involuteP));
        if (GetDistance([0,0], step[1]) > SR + this.A) break; // Rack clears gear blank
        tooth.push(step);
      }
      rack = rack.map(x => Translate(x, [SR * -STA / 2, SR])); // Rack at transistion point
      tooth.unshift(rack);
      for (let i = 1; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
        const theta = -i * BTA / this.Steps;
        const circleP = Rotate([0,BR], theta);
        const involuteP = Translate(circleP, Rotate([theta * BR, 0], theta));
        if (this.ShowPitch) {
          g.circle(circleP[0], circleP[1], 2);
          g.circle(involuteP[0], involuteP[1], 2);
        }
        const step = rack.map(x => RotateAt(Translate(x, involuteP, [0, -BR]), involuteP, theta));
        if (GetDistance([0,0], step[2]) > BR + this.A) break; // Rack clears gear blank
        tooth.unshift(step);
      }

      if (this.ShowTooth) {
        for(let i = 0; i < tooth.length; i++) {
          g.poly(tooth[i].flat());
        }
      }

      // Intersection Left
      let last = 0;
      const interL = [tooth[0][3]];
      for(let i = 1; i < tooth.length; i++) {
        const prev = interL[interL.length - 1];
        let inter = GetIntersection(tooth[i-1][3], tooth[i-1][2], tooth[i][3], tooth[i][2]);
        if (!inter.length) inter = tooth[i][3]; // Fallback to Top Left
        if (GetDistance([0,0], prev) < GetDistance([0,0], inter)) break; // Ensure descending points
        interL.push(inter);
        last = i;
      }
      interL.push(tooth[last][2]);

      // Corner Left
      const cornerL = [];
      for (let i = 1; i <= last; i++) {
        if (GetDistance([0,0], tooth[i][2]) > GetDistance([0,0], tooth[i+1][2])) continue; // Ensure ascending points
        cornerL.push(tooth[i][2]);
      }
      if (last + 2 < tooth.length) { // Check for undercut
        const undercut = [tooth[last + 1][2]];
        outer:for (let i = last + 2; i < tooth.length; i++) {
          const prev = undercut[undercut.length - 1];
          const point = tooth[i][2];
          for (let j = 1; j < interL.length; j++) {
            const inter = GetIntersection(prev, point, interL[j-1], interL[j]);
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
      const leftMost = Rotate([0, BR + this.A], -BTA/2);
      for(let i = 1; i < interL.length; i++) {
        const inter = GetIntersection([0,0], leftMost, interL[i-1], interL[i]);
        if (inter.length) {
          interL.splice(0,i,inter);
          short = true;
          break;
        }
      }
      const arcT = [];
      outer:for (let i = -this.Steps; i <= 0 && !short; i++) {
        const theta = i * BTA / this.Steps / 2;
        const sin = Math.sin(theta), cos = Math.cos(theta);
        const point = [-(BR + this.A) * sin, (BR + this.A) * cos];
        if (arcT.length) {
          const prev = arcT[arcT.length - 1];
          for (let j = 1; j < interL.length; j++) {
            const inter = GetIntersection(prev, point, interL[j-1], interL[j]);
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
      const interB = [cornerL[0]];
      for(let i = 1; i < tooth.length; i++) {
        const inter = GetIntersection(tooth[i-1][2], tooth[i-1][1], tooth[i][2], tooth[i][1]);
        if (!inter.length || inter[0] < 0) continue;
        interB.push(inter);
      }
      interB.push(Rotate([0, SR - this.A], STA/2));

      // // Paths
      // g.poly(arcT.flat(), false);
      // g.poly(interL.flat(), false);
      // g.poly(cornerL.flat(), false);
      // g.poly(interB.flat(), false);

      const outline = [
        ...arcT,
        ...interL.slice(arcT.length ? 1 : 0),
        ...cornerL.slice(0,-1).reverse(),
        ...interB.slice(1),
        ...RSTooth.map(x => Rotate(x, STA / 2)).slice(1+RSTooth.length/2|0)
      ];
      g.poly(outline.flat(), false);
      //g.poly(outline.map(x => [-x[0], x[1]]).reverse().flat(), false);

      g.stroke({ width: 1, color: 0x000 });
      Surface.stage.addChild(g);
      Surface.render()
    },
  }
});
</script>
