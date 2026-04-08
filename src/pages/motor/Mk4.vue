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
/// Mk4 Motor Assembly — Animated Crank-Rotor Mechanism
/// Renders a complete electric motor assembly with:
///   - A central main gear meshing with multiple crank arms
///   - Each crank arm has a compound variable-speed gear train
///   - Crank arms drive magnet housings (heads) in a reciprocating pattern
///   - A rotor with magnets rotates at the center
/// Uses Pixi.js Container hierarchy for scene organization and ticker-based animation.
import { ref, computed, reactive, onMounted } from 'vue';
import { GetGear, GetGearT, Rotate } from '@/scripts/functions';
import { Application, Container, Graphics } from 'pixi.js';
/// Data
const Surface = new Application(); // Pixi.js application instance
// Container hierarchy: each container can be rotated/positioned independently
const Rotor_C = new Container(); // Rotor assembly (magnets, rotates continuously)
const GearM_C = new Container(); // Main central gear (rotates with rotor)
const Arms_C = [] as Container[]; // Crank arms (one per Crank.Arms, rotate via kinematics)
const Gear1_C = [] as Container[]; // Gear 1 pairs: [gear1a, gear1b] per arm (mesh with main gear)
const Gear2_C = [] as Container[]; // Gear 2: compound receiver gear per arm (variable speed output)
const Heads_C = [] as Container[]; // Magnet housings per arm (translate vertically)
const Start = Date.now(); // Animation start timestamp
const SPR = 15 as number; // Seconds Per Rotation (animation speed)
const TotalR = ref<number>(210); // Total assembly radius (arm tip to center)
const Crank = reactive({
   Arms: 23,        // Number of crank arms around the assembly
   ArmLength: 60,   // Length of each crank arm (center to pin)
   ArmWidth: 10,    // Width of crank arm bar
   TotalR: 28,      // Crank body outer radius (housing circle)
   PitchR: 23,      // Crank pin pitch radius (offset from crank center)
   PinR: 2,         // Crank pin radius
   RailR: 1.5,      // Rail guide width
});
const Rotor = reactive({
   Arms: 8,  // Number of rotor arms (magnet pairs)
   Gap: 3,   // Gap between rotor magnets
});
const Gears = reactive({
   N: 18,       // Gear1 tooth count (per arm)
   RBN: 16,     // Compound gear receiver big tooth count
   RSN: 10,     // Compound gear receiver small tooth count
   PA_Deg: 25,  // Pressure angle in degrees
});
const Magnets = reactive({
   Width: 10,            // Magnet length
   Depth: 3,             // Magnet thickness
   Angle: Math.PI / 4,   // Magnet tilt angle (45°)
});

/// Computed
const MainR = computed(() => Gear1R.value * Rotor.Arms); // Main gear radius = gear1 radius × rotor arms
const Gear1R = computed(() => TotalR.value / (2.5 + Rotor.Arms)); // Gear1 radius derived from total assembly size
const Angle = computed(() => 2 * Math.PI / Crank.Arms); // Angular spacing between crank arms
const Scale = computed(() => .425 * Math.min(Surface.screen.width, Surface.screen.height) / TotalR.value); // Viewport scale factor
// Variable speed ratio for the compound gear train (same quadratic formula as GearT)
const VS = computed(() => {
   const a = 4 * Gears.RSN - 4 * Gears.RBN;
   const b = 2 * Gears.RBN - 6 * Gears.RSN;
   const c = 2 * Gears.RBN;
   return (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
});
/// Methods
// Builds the entire motor assembly scene from scratch
const Init = () => {
   // Clear all containers and arrays
   Surface.stage.removeChildren();
   GearM_C.removeChildren();
   Rotor_C.removeChildren();
   Arms_C.length = 0;
   Gear1_C.length = 0;
   Gear2_C.length = 0;
   Heads_C.length = 0;

   const fill = 'hsl(215 8% 97.5%)'; // Light gray fill for mechanical parts

   // Pre-calculate all scaled dimensions (model units → screen pixels)
   const totalR = Scale.value * TotalR.value;
   const mainR = Scale.value * MainR.value;
   const gear1R = Scale.value * Gear1R.value;
   const gear2R = Scale.value * Gear1R.value * 0.75; // Gear2 is 75% of Gear1 size
   const crankTotalR = Scale.value * Crank.TotalR;
   const crankPitchR = Scale.value * Crank.PitchR;
   const crankPinR = Scale.value * Crank.PinR
   const crankRailR = Scale.value * Crank.RailR
   const crankArmLength = Scale.value * Crank.ArmLength;
   const crankArmWidth = Scale.value * Crank.ArmWidth;
   // Magnet geometry: pre-compute sin/cos components for rotated rectangle vertices
   const magnetWidth = Scale.value * Magnets.Width;
   const magnetDepth = Scale.value * Magnets.Depth;
   const magnetWidthSin = magnetWidth * Math.sin(Magnets.Angle) / 2;
   const magnetWidthCos = magnetWidth * Math.cos(Magnets.Angle) / 2;
   const magnetDepthSin = magnetDepth * Math.sin(Magnets.Angle) / 2;
   const magnetDepthCos = magnetDepth * Math.cos(Magnets.Angle) / 2;
   // Rotor gap geometry
   const rotorGap = Scale.value * Rotor.Gap;
   const rotorGapSin = (magnetDepth + rotorGap) * Math.sin(Magnets.Angle);
   const rotorGapCos = (magnetDepth + rotorGap) * Math.cos(Magnets.Angle);
   // Rotor pitch radius: derived so magnets sit at the correct distance from center
   const rotorPitchR = totalR - crankPitchR - crankArmLength - crankArmWidth / 2 - magnetWidthCos - magnetDepthSin - 2 * Scale.value;

   // Static Body: outer circular housing
   const body = new Graphics();
   body.circle(0, 0, totalR + crankTotalR);
   body.stroke({ width: 1, color: 0x000 });
   Surface.stage.addChild(body);

   // Main Gear: central gear with N × RotorArms teeth (meshes with all Gear1A's simultaneously)
   const gear = new Graphics();
   // Rotate by half a tooth angle so teeth align with Gear1A meshing positions
   gear.poly(GetGear(Gears.N * Rotor.Arms, mainR, Gears.PA_Deg, 5).map(x => Rotate(x, Math.PI / (Gears.N * Rotor.Arms))).flat());
   gear.stroke({ width: 1, color: 0x000 });
   GearM_C.addChild(gear);
   Surface.stage.addChild(GearM_C);

   // Build each crank arm with its complete gear train and magnet housing
   for (let i = 0; i < Crank.Arms; i++) {
      const crank = new Container();
      crank.rotation = i * Angle.value; // Position arm at its angular slot

      // Gear 1A: standard spur gear that meshes with the main gear
      const gear1a = new Graphics();
      gear1a.poly(GetGear(Gears.N, gear1R, Gears.PA_Deg, 5).flat());
      gear1a.stroke({ width: 1, color: 0x000 });
      gear1a.y = mainR + gear1R; // Positioned at meshing distance from center
      Gear1_C.push(gear1a);
      crank.addChild(gear1a);

      // Gear 1B: compound variable-speed driver gear (shares shaft with Gear1A)
      const gear1b = new Graphics();
      gear1b.poly(GetGearT(Gears.RBN, Gears.RSN, 2 * gear2R, Gears.PA_Deg, true, 2).flat());
      gear1b.fill(fill).stroke({ width: 1, color: 0x000 });
      gear1b.y = mainR + gear1R;
      Gear1_C.push(gear1b);
      crank.addChild(gear1b);

      // Gear 2: compound variable-speed receiver gear (meshes with Gear1B, drives the crank)
      const gear2 = new Graphics();
      gear2.poly(GetGearT(Gears.RBN, Gears.RSN, 2 * gear2R, Gears.PA_Deg, false, 2).flat());
      gear2.fill(fill).stroke({ width: 1, color: 0x000 });
      gear2.y = totalR; // Positioned at the outer edge of the assembly
      Gear2_C.push(gear2);
      crank.addChild(gear2);

      // Crank body: circular housing at the outer edge
      const crankBody = new Graphics();
      crankBody.circle(0, 0, crankTotalR);
      crankBody.stroke({ width: 1, color: 0x000 });
      crankBody.y = totalR;
      crank.addChild(crankBody);

      // Crank rail: vertical guide track for the magnet housing
      const crankRail = new Graphics();
      crankRail.poly([
         -crankRailR, crankPitchR + 2 * crankRailR,
         -crankRailR, -crankPitchR - crankArmWidth / 2 - 3 * Scale.value - 2 * (magnetWidthCos + magnetDepthSin),
         crankRailR, -crankPitchR - crankArmWidth / 2 - 3 * Scale.value - 2 * (magnetWidthCos + magnetDepthSin),
         crankRailR, crankPitchR + 2 * crankRailR]);
      crankRail.fill(fill).stroke({ width: 1, color: 0x000 });
      crankRail.y = totalR - crankArmLength;
      crank.addChild(crankRail);

      // Crank head: magnet + housing assembly that slides on the rail
      const crankHead = new Graphics();
      // Magnet: rotated rectangle based on Magnets.Angle
      crankHead.poly([
         -magnetWidthSin + magnetDepthCos, magnetWidthCos + magnetDepthSin,
         magnetWidthSin + magnetDepthCos, -magnetWidthCos + magnetDepthSin,
         magnetWidthSin - magnetDepthCos, -magnetWidthCos - magnetDepthSin,
         -magnetWidthSin - magnetDepthCos, magnetWidthCos - magnetDepthSin]);
      // Magnet housing: rectangular enclosure around the magnet with clearance
      crankHead.poly([
         magnetWidthSin + magnetDepthCos + 1 * Scale.value, -magnetWidthCos - magnetDepthSin - 1 * Scale.value,
         magnetWidthSin + magnetDepthCos + 1 * Scale.value, magnetWidthCos + magnetDepthSin + crankArmWidth / 2 + crankPinR * 2 + 2 * Scale.value,
         -magnetWidthSin - magnetDepthCos - 1 * Scale.value, magnetWidthCos + magnetDepthSin + crankArmWidth / 2 + crankPinR * 2 + 2 * Scale.value,
         -magnetWidthSin - magnetDepthCos - 1 * Scale.value, -magnetWidthCos - magnetDepthSin - 1 * Scale.value]);
      // Arm slot: horizontal line where the crank arm connects
      crankHead.poly([
         magnetWidthSin + magnetDepthCos + 1 * Scale.value, magnetWidthCos + magnetDepthSin + 1 * Scale.value,
         -magnetWidthSin - magnetDepthCos - 1 * Scale.value, magnetWidthCos + magnetDepthSin + 1 * Scale.value]);
      crankHead.fill(fill).stroke({ width: 1, color: 0x000 });
      Heads_C.push(crankHead);
      crank.addChild(crankHead);

      // Crank arm: rounded rectangle bar with pins at both ends (connects crank body to head)
      const crankArm = new Graphics();
      crankArm.circle(0, 0, crankPinR); // Upper crank pin (at crank body)
      crankArm.roundRect(-crankArmWidth / 2, -crankArmLength - crankArmWidth / 2, crankArmWidth, crankArmLength + crankArmWidth, crankArmWidth / 2);
      crankArm.circle(0, -crankArmLength, crankPinR); // Lower crank pin (at head)
      crankArm.fill(fill).stroke({ width: 1, color: 0x000 });
      crankArm.y = totalR; // Positioned at the crank body center
      Arms_C.push(crankArm);
      crank.addChild(crankArm);
      Surface.stage.addChild(crank);
   }

   // Rotor assembly: magnets arranged radially, rotating as a unit
   // First pass: draw filled rotor arm bodies (wedge shapes between center and magnet position)
   for (let i = 0; i < Rotor.Arms; i++) {
      const rotorBody = new Graphics();
      // Wedge polygon from center to magnet, spanning to the next arm's magnet
      rotorBody.poly([0, 0, magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
         ...Rotate([-magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos - magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms),
         ...Rotate([-magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos + magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms),
         ...Rotate([magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms)]);
      rotorBody.fill(fill);
      rotorBody.rotation = 2 * Math.PI * i / Rotor.Arms;
      Rotor_C.addChild(rotorBody);
   }
   // Second pass: draw stroked magnet rectangles and arm outlines on top
   for (let i = 0; i < Rotor.Arms; i++) {
      const rotorArm = new Graphics();
      // Magnet: tilted rectangle at the tip of the rotor arm
      rotorArm.poly([
         -magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos + magnetDepthSin - rotorGapSin,
         magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
         magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos - magnetDepthSin - rotorGapSin,
         -magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos - magnetDepthSin - rotorGapSin]);
      // Arm outline: open polyline from center to this magnet to the next arm's magnet
      rotorArm.poly([0, 0, magnetWidthSin + magnetDepthCos - rotorGapCos, rotorPitchR - magnetWidthCos + magnetDepthSin - rotorGapSin,
         ...Rotate([-magnetWidthSin - magnetDepthCos - rotorGapCos, rotorPitchR + magnetWidthCos - magnetDepthSin - rotorGapSin], -2 * Math.PI / Rotor.Arms)], false);
      rotorArm.stroke({ width: 1, color: 0x000 });
      rotorArm.rotation = 2 * Math.PI * i / Rotor.Arms;
      Rotor_C.addChild(rotorArm);
   }
   Surface.stage.addChild(Rotor_C);
};
// Animation loop: called every frame by the Pixi.js ticker
// Updates all moving parts based on elapsed time
const Redraw = () => {
   const rotation = (Date.now() - Start) / (1000 * SPR); // Fractional rotation count since start
   const totalR = Scale.value * TotalR.value;
   const crankPitchR = Scale.value * Crank.PitchR;
   const crankArmLength = Scale.value * Crank.ArmLength;
   const crankArmWidth = Scale.value * Crank.ArmWidth;
   const magnetWidth = Scale.value * Magnets.Width;
   const magnetDepth = Scale.value * Magnets.Depth;
   const magnetWidthCos = magnetWidth * Math.cos(Magnets.Angle) / 2;
   const magnetDepthSin = magnetDepth * Math.sin(Magnets.Angle) / 2;

   // Update each crank arm's position and rotation
   for (let i = 0; i < Crank.Arms; i++) {
      // Calculate this arm's phase in the variable-speed cycle
      // Each arm is offset by i/Crank.Arms, multiplied by Rotor.Arms for the gear ratio
      let armRotation = Rotor.Arms * (rotation - i / Crank.Arms);
      armRotation = armRotation - Math.floor(armRotation); // Normalize to 0-1
      // Apply variable-speed profile (piecewise linear):
      //   For 0 → VS:       output ramps 0 → 0.5 (slow phase — small teeth engaged)
      //   For VS → 1:       output ramps 0.5 → 1.0 (fast phase — big teeth engaged)
      armRotation = armRotation <= VS.value ? armRotation / (VS.value * 2) : 0.5 + 0.5 * (armRotation - VS.value) / (1 - VS.value);
      const crankAngle = armRotation * 2 * Math.PI; // Convert to radians
      // Crank mechanism: pin traces a circle, arm pivots based on pin offset
      const crankOffset = Rotate([0, crankPitchR], Math.PI + crankAngle);
      Arms_C[i].rotation = -Math.asin(crankOffset[0] / crankArmLength); // Arm angle from inverse sine of horizontal offset
      Arms_C[i].position = { x: crankOffset[0], y: crankOffset[1] + totalR }; // Arm pivot position
      // Gear1 rotation: derived from gear ratio (main gear has Rotor.Arms × more teeth, so Gear1 spins faster)
      // [2*i] = Gear1A (spur), [2*i+1] = Gear1B (compound driver) — both share a shaft
      Gear1_C[2 * i].rotation = (i * Angle.value - rotation * 2 * Math.PI) * Rotor.Arms;
      Gear1_C[2 * i + 1].rotation = (i * Angle.value - rotation * 2 * Math.PI) * Rotor.Arms;
      Gear2_C[i].rotation = crankAngle; // Gear2 rotates with the crank output
      // Magnet head Y position: derived from arm kinematics (crank offset + arm cosine projection)
      Heads_C[i].y = totalR + crankOffset[1] - crankArmLength * Math.cos(Arms_C[i].rotation) - crankArmWidth / 2 - magnetWidthCos - magnetDepthSin - 2 * Scale.value;
   }
   // Main gear and rotor rotate together at the base rotation speed
   GearM_C.rotation = Rotor_C.rotation = rotation * 2 * Math.PI;
};
/// Lifecycle
onMounted(async () => {
   const viewport = document.getElementById("viewport")!;
   // Initialize Pixi.js with continuous rendering (autoStart defaults to true for animation)
   await Surface.init({ backgroundAlpha: 0, antialias: true, resizeTo: viewport });
   viewport.appendChild(Surface.canvas);
   Surface.stage.position = { x: Surface.screen.width / 2, y: Surface.screen.height / 2 }; // Center stage
   Surface.stage.rotation = Math.PI; // Flip 180° so Y-up matches assembly coordinates
   Init();
   Surface.ticker.add(Redraw); // Start animation loop
});
</script>
