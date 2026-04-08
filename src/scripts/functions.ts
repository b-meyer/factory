import { RemovableRef, StorageSerializers, useLocalStorage, UseStorageOptions } from '@vueuse/core';

/// Array Prototype Extensions - adds sum, avg, groupBy to all arrays
declare global {
   interface Array<T> {
      sum(selector: (item: T) => number): number;
      avg(selector: (item: T) => number, count?: number): number;
      groupBy(selector: (item: T) => any): object;
   }
}

// Reduces array to sum of selector values
Object.defineProperty(Array.prototype, 'sum', { value(selector: (item: any) => number) {
   return this.reduce((sum: number, item: any) => sum + selector(item), 0);
}});
// Averages selector values, optionally dividing by a custom count instead of array length
Object.defineProperty(Array.prototype, 'avg', { value(selector: (item: any) => number, count?: number) {
   return Math.round(this.sum(selector) / (count || this.length) * 100) / 100;
}});
// Groups array items into an object keyed by selector result
Object.defineProperty(Array.prototype, 'groupBy', { value(selector: (item: any) => any) {
   return this.reduce((obj: any, item: any) => {(obj[selector(item)] ||= []).push(item); return obj}, {});
}});

/// Utility Functions
// Extracts a regex capture group from a string (defaults to group 1)
export const GetGroup = (regex: RegExp, value: string, index?: number): string | undefined => regex.exec(value || "")?.[index || 1];
// Typed localStorage wrapper using VueUse - serializes objects automatically
export const UseLS = <T>(id: string, defaultValue: T, options: UseStorageOptions<T> = { serializer: StorageSerializers.object }): RemovableRef<T> => useLocalStorage(id, defaultValue, options);

/// 2D Geometry Functions
// Vector addition: translates point 'a' by summing all offset vectors 'b'
export const Translate = (a: number[], ...b: number[][]) => [a[0] + b.reduce((x: number, y: number[]) => x + y[0], 0), a[1] + b.reduce((x: number, y: number[]) => x + y[1], 0)];
// 2D rotation: rotates point 'x' around the origin by angle 'theta' (radians)
export const Rotate = (x: number[], theta: number) => {
   const sin = Math.sin(theta), cos = Math.cos(theta);
   return [x[0] * cos - x[1] * sin, x[0] * sin + x[1] * cos];
}
// 2D rotation around an arbitrary center point
export const RotateAt = (x: number[], center: number[], theta: number) => {
   const sin = Math.sin(theta), cos = Math.cos(theta);
   return [(x[0] - center[0]) * cos - (x[1] - center[1]) * sin + center[0], (x[0] - center[0]) * sin + (x[1] - center[1]) * cos + center[1]];
}
// Line-segment intersection using parametric form: segments AB and CD
// Returns [x, y] of intersection point, or [] if segments don't intersect
export const GetIntersection = (a: number[], b: number[], c: number[], d: number[]) => {
   const cmp = [c[0] - a[0], c[1] - a[1]]; // Vector from A to C
   const r = [b[0] - a[0], b[1] - a[1]]; // Direction vector of segment AB
   const s = [d[0] - c[0], d[1] - c[1]]; // Direction vector of segment CD
   const cmpxr = cmp[0] * r[1] - cmp[1] * r[0]; // Cross product: (C-A) × AB
   const cmpxs = cmp[0] * s[1] - cmp[1] * s[0]; // Cross product: (C-A) × CD
   if (cmpxr == 0) return []; // Lines are collinear
   const rxs = r[0] * s[1] - r[1] * s[0]; // Cross product: AB × CD
   if (rxs == 0) return []; // Lines are parallel
   const rxsr = 1 / rxs;
   const t = cmpxs * rxsr; // Parameter along segment AB (0-1 = on segment)
   const u = cmpxr * rxsr; // Parameter along segment CD (0-1 = on segment)
   if (t < 0 || t > 1 || u < 0 || u > 1) return []; // Segments do not overlap
   //if (t < 0.001 || t > 1.001 || u < 0.001 || u > 1.001) return []; // Segments do not overlap
   return [a[0] + t * r[0], a[1] + t * r[1]]; // Intersection!
}
// Euclidean distance between two 2D points
export const GetDistance = (a: number[], b: number[]) => Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
// Angle at vertex 'a' between rays to 'b' and 'c' using dot product
export const GetAngle = (a: number[], b: number[], c: number[]) => {
   const v = [a[0] - b[0], a[1] - b[1]]; // Direction vector from b to a
   const w = [a[0] - c[0], a[1] - c[1]]; // Direction vector from c to a
   return Math.acos((v[0] * w[0] + v[1] * w[1]) / (GetDistance([0, 0], v) * GetDistance([0, 0], w))) // dot(v,w) / (|v| × |w|)
}
/// Involute Gear Tooth Generation
// Generates a single involute spur gear tooth profile by simulating a rack cutter rolling along the pitch circle.
// N = number of teeth, R = pitch radius, PA_Deg = pressure angle in degrees, Steps = resolution per tooth angle
// Returns an array of [x,y] points defining the complete tooth outline (both sides, mirrored)
export const GetTooth = (N: number, R: number, PA_Deg: number, Steps: number) => {
   // Gear Constants
   const A = 2 * R / N; // Addendum height (tooth height above pitch circle)
   const TA = 2 * Math.PI / N; // Tooth angle (angular span of one tooth)
   const TW = Math.PI * R / N; // Tooth width at pitch circle (half the circular pitch)
   const PA = PA_Deg * Math.PI / 180; // Pressure angle in radians

   // Define the rack (trapezoidal cutting tool profile)
   // Each rack is a 4-point array: [0]=top-left, [1]=bottom-left, [2]=bottom-right, [3]=top-right
   // The tooth[] array stores all rack positions; tooth[i][0..3] accesses corner j of rack at position i
   // The rack's angled sides are determined by the pressure angle
   const rack = [
         [-TW / 2 - A * Math.sin(PA), R + A],   // Top-left (addendum)
         [-TW / 2 + A * Math.sin(PA), R - A],   // Bottom-left (dedendum)
         [TW / 2 - A * Math.sin(PA), R - A],    // Bottom-right (dedendum)
         [TW / 2 + A * Math.sin(PA), R + A]     // Top-right (addendum)
      ], tooth = [rack];
   // Roll the rack along the pitch circle to generate involute curves
   // Each step rotates and translates the rack to simulate meshing contact
   for (let i = 1; i < 1000; i++) { // Attempt 1000 steps until the rack clears
      const theta = i * TA / Steps; // Rotation angle for this step
      //let theta = i * (Math.PI * 3 / 180); // 3 degree step
      const involute = theta * R; // Arc length = involute unroll distance
      const sin = Math.sin(theta), cos = Math.cos(theta);
      // Each rack point is rotated by theta and translated by the involute arc length.
      // The rotation matrix [cos, -sin; sin, cos] is applied, then offset by (involute × cos, involute × sin).
      // Left uses negated theta (counter-clockwise); right uses positive theta (clockwise).
      const left = rack.map(x => [
         x[0] * cos - x[1] * -sin - involute * cos,  // X: rotate CCW + translate left
         x[0] * -sin + x[1] * cos - involute * -sin   // Y: rotate CCW + translate left
      ]);
      const right = rack.map(x => [
         x[0] * cos - x[1] * sin + involute * cos,    // X: rotate CW + translate right
         x[0] * sin + x[1] * cos + involute * sin      // Y: rotate CW + translate right
      ]);
      if (GetDistance([0, 0], right[1]) > R + A) break; // Rack clears gear blank
      tooth.unshift(left); // Left-side positions prepended (builds outward)
      tooth.push(right); // Right-side positions appended (builds outward)
   }

   // Left tooth profile: find intersections of successive rack positions to trace the involute curve.
   // For each pair of adjacent rack positions, intersect the line from [3] (top-right) to [2] (bottom-right)
   // of one rack with the same edge of the next rack. These intersections form the involute curve.
   let last = 0;
   const interL = [tooth[0][3]]; // Start with outermost rack's top-right corner
   for (let i = 1; i < tooth.length; i++) {
      const prev = interL[interL.length - 1];
      let inter = GetIntersection(tooth[i - 1][3], tooth[i - 1][2], tooth[i][3], tooth[i][2]); // Intersect right edges of adjacent racks
      if (!inter.length) inter = tooth[i][3]; // Fallback to Top Left
      if (GetDistance([0, 0], prev) < GetDistance([0, 0], inter)) break; // Stop when points start moving outward
      interL.push(inter);
      last = i;
   }
   interL.push(tooth[last][2]); // Close with the last rack's bottom-right corner

   // Root fillet (corner): trace the dedendum curve between the left flank and the tooth bottom
   // Starts where the rack first dips below the pitch circle
   const cornerL = [];
   for (let i = 1; i <= last; i++) {
      if (!cornerL.length) {
         const inter = GetIntersection(rack[2], rack[1], tooth[i][3], tooth[i][2]);
         if (!inter.length) continue; // Ensure the Bottom Left corner dips below the rack
         if (GetDistance([0, 0], tooth[i][2]) > GetDistance([0, 0], tooth[i + 1][2])) continue; // Ensure ascending points
      }
      cornerL.push(tooth[i][2]);
   }
   // Undercut detection: when the cutter removes material below the base circle.
   // This happens with low tooth counts or high pressure angles.
   // Traces the bottom-right corners [2] of remaining rack positions and finds where they
   // intersect the involute curve, trimming both curves at that intersection.
   if (last + 2 < tooth.length) { // Check for undercut
      const undercut = [tooth[last + 1][2]]; // Start tracing from the rack after the involute ended
      outer: for (let i = last + 2; i < tooth.length; i++) { // 'outer:' is a JS label for breaking out of nested loops
         const prev = undercut[undercut.length - 1];
         const point = tooth[i][2];
         for (let j = 1; j < interL.length; j++) {
            const inter = GetIntersection(prev, point, interL[j - 1], interL[j]);
            if (inter.length) {
               interL.splice(j, interL.length - j, inter); // Trim involute where undercut intersects
               cornerL.push(...undercut, inter);
               break outer;
            }
         }
         undercut.push(point);
      }
   }

   // Top arc: the addendum circle arc connecting adjacent teeth at the gear's outer diameter
   // If the involute already reaches the tooth boundary, skip the arc ('short' tooth)
   let short = false;
   const leftMost = Rotate([0, R + A], TA / 2); // Boundary ray at half-tooth angle
   for (let i = 1; i < interL.length; i++) {
      const inter = GetIntersection([0, 0], leftMost, interL[i - 1], interL[i]);
      if (inter.length) {
         interL.splice(0, i, inter);
         short = true;
         break;
      }
   }
   const arcT = []; // Generate arc points along the addendum circle
   // Walk along the addendum circle from the previous tooth boundary toward the involute start.
   // Stop when an arc point's segment intersects the involute curve.
   outer: for (let i = -Steps; i <= 0 && !short; i++) { // 'outer:' label for breaking from nested loops
      const theta = i * TA / Steps / 2; // Half-tooth sweep (arc only spans gap between teeth)
      const sin = Math.sin(theta), cos = Math.cos(theta);
      const point = [-(R + A) * sin, (R + A) * cos];
      if (arcT.length) {
         const prev = arcT[arcT.length - 1];
         for (let j = 1; j < interL.length; j++) {
            const inter = GetIntersection(prev, point, interL[j - 1], interL[j]);
            if (inter.length) {
               interL.splice(0, j, inter); // Trim involute where arc meets it
               arcT.push(inter);
               break outer;
            }
         }
      }
      arcT.push(point)
   }

   // Bottom (dedendum) curve: intersections along the root between adjacent teeth.
   // Intersects the line from [2] (bottom-right) to [1] (bottom-left) of adjacent rack positions.
   const interB = [cornerL[0]];
   for (let i = 1; i < tooth.length; i++) {
      const inter = GetIntersection(tooth[i - 1][2], tooth[i - 1][1], tooth[i][2], tooth[i][1]); // Intersect bottom edges
      if (!inter.length || inter[0] < 0) continue;
      interB.push(inter);
   }
   interB.push([0, R - A]) // End at the dedendum circle centerline

   // Assemble the complete LEFT tooth outline: arc → involute → root fillet → dedendum.
   // Slicing avoids duplicate points at segment boundaries where curves meet.
   const outline = [
      ...arcT,                                   // Top arc (outer diameter between teeth)
      ...interL.slice(arcT.length ? 1 : 0),      // Left involute (skip first if arc connects to it)
      ...cornerL.slice(0, -1).reverse(),          // Root fillet (reversed: runs bottom-to-top → top-to-bottom)
      ...interB.slice(1),                         // Dedendum curve (skip first, already in cornerL)
   ];
   // Mirror the entire left outline across the Y-axis to create the right flank.
   // [-x[0], x[1]] flips X; .reverse() reverses winding; .slice(1) removes the shared centerline point.
   outline.push(...outline.map(x => [-x[0], x[1]]).reverse().slice(1));
   return outline;
};
/// Variable-Speed Compound Gear Transmission Parameters
// Calculates all geometric properties for a compound gear pair that produces variable rotational speed.
// RBN/RSN = receiver big/small tooth counts, Dist = center distance between gear axes.
// Returns an object with radii, tooth angles, and shared constants for all 4 gears (receiver big/small, driver big/small).
export const GetTranInfo = (RBN: number, RSN: number, Dist: number) => {
   // Solve for Variable Speed ratio using quadratic formula
   // VS determines what fraction of rotation uses the slow vs fast speed profile
   const a = 4 * RSN - 4 * RBN;
   const b = 2 * RBN - 6 * RSN;
   const c = 2 * RBN;
   const VS = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
   // 4 kinematic ratios derived from VS that govern gear sizing relationships
   const Ratios = [
      1 / (2 * VS + 1),            // Ratios[0]: Driver small scaling factor
      1 / (3 - 2 * VS),            // Ratios[1]: Driver big scaling factor
      (2 - 2 * VS) / (3 - 2 * VS), // Ratios[2]: Receiver base scaling factor
      2 * VS / (2 * VS + 1)        // Ratios[3]: Receiver big scaling factor
   ];
   // Receiver Big gear: the larger section of the receiver compound gear
   const RBR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[3]; // Pitch radius
   const RBTA = 2 * Math.PI / RBN; // Tooth angle
   // Receiver Small gear: the smaller section of the receiver compound gear
   const RSR = Dist / (1 + Ratios[1] / Ratios[2]); // Pitch radius
   const RSTA = 2 * Math.PI / RSN; // Tooth angle
   // Driver Big gear: meshes with receiver small
   const DBN = RSN / Ratios[2] * Ratios[1]; // Tooth count (non-integer for variable speed)
   const DBR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[1]; // Pitch radius
   const DBTA = 2 * Math.PI / DBN; // Tooth angle
   // Driver Small gear: meshes with receiver big
   const DSN = RSN / Ratios[2] * Ratios[0]; // Tooth count
   const DSR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[0]; // Pitch radius
   const DSTA = 2 * Math.PI / DSN; // Tooth angle
   // Shared constants
   const TPA = Math.atan((1 / Ratios[1] * Ratios[0] * Math.PI / (RSN / Ratios[2] * Ratios[0])) / (1 - 1 / Ratios[1] * Ratios[0])); // Transverse pressure angle
   const A = 2 * RBR / RBN; // Addendum (based on biggest gear for uniform tooth height)
   const TW = Math.PI * RBR / RBN; // Tooth width at pitch circle
   return { VS, RBN, RBR, RBTA, RSN, RSR, RSTA, DBN, DBR, DBTA, DSN, DSR, DSTA, TPA, A, TW };
};
/// Compound Gear Transition Tooth Generation
// Generates the tooth profile at the transition zone where the gear switches between big and small sections.
// This is the key tooth that enables variable-speed behavior - it has a different involute on each flank.
// Driver flag selects which gear pair to generate for (driver vs receiver).
export const GetTranTooth = (RBN: number, RSN: number, Dist: number, PA_Deg: number, Driver: boolean, Steps: number) => {
   // Fetch all gear dimensions from the transmission calculator
   const { RBR, RBTA, RSR, RSTA, DBR, DBTA, DSN, DSR, DSTA, TPA, A, TW } = GetTranInfo(RBN, RSN, Dist);
   const PA = PA_Deg * Math.PI / 180;

   // Select big/small gear dimensions based on driver vs receiver
   const BR = Driver ? DBR : RBR;
   const BTA = Driver ? DBTA : RBTA;
   const SN = Driver ? DSN : RSN;
   const SR = Driver ? DSR : RSR;
   const STA = Driver ? DSTA : RSTA;

   // Generate asymmetric rack: left flank uses standard PA, right flank uses transverse PA
   // This rack shape creates the transition between small and big gear sections
   let rack = [
      [-0.5 * TW - A * Math.sin(PA), A],          // Top-left (standard pressure angle)
      [-0.5 * TW + A * Math.sin(PA), -A],          // Bottom-left
      [0.5 * TW - A * Math.sin(TPA), -A],          // Bottom-right (transverse pressure angle)
      [1.5 * TW + A * Math.sin(TPA), BR - SR + A]  // Top-right (extends to big gear radius)
      //[ 0.5 * TW + (BR - SR + A) * Math.sin(TPA), BR - SR + A]
   ];
   // Phase 1: Roll rack along the small gear's pitch circle (right/small flank)
   const tooth = []; // Stores all rack positions; each is a 4-point array [0]=TL, [1]=BL, [2]=BR, [3]=TR
   for (let i = -(Steps - 0.5) / 2 | 0; i <= 1000; i++) { // '| 0' truncates to integer (like Math.floor); start offset centers the rack
      const theta = i * STA / Steps;
      const circleP = Rotate([0, SR], theta + STA / 2); // Point on small pitch circle
      const involuteP = Translate(circleP, Rotate([theta * SR, 0], theta + STA / 2)); // Involute unroll offset
      const step = rack.map(x => Translate(Rotate(x, theta + STA / 2), involuteP)); // Rotate rack by angle, translate to involute position
      if (GetDistance([0, 0], step[1]) > SR + A) break; // Rack clears gear blank
      tooth.push(step);
   }
   // Phase 2: Transition rack to big gear and roll along the big gear's pitch circle (left/big flank)
   // Move rack to the transition point: offset by half a small tooth arc length in X, and by the small pitch radius in Y
   rack = rack.map(x => Translate(x, [SR * -STA / 2, SR]));
   tooth.unshift(rack);
   for (let i = 1; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
      const theta = -i * BTA / Steps;
      const circleP = Rotate([0, BR], theta); // Point on big pitch circle
      const involuteP = Translate(circleP, Rotate([theta * BR, 0], theta)); // Involute unroll offset
      // Translate rack by involute offset and center on big pitch circle, then rotate around involute point
      const step = rack.map(x => RotateAt(Translate(x, involuteP, [0, -BR]), involuteP, theta));
      if (GetDistance([0, 0], step[2]) > BR + A) break; // Rack clears gear blank
      tooth.unshift(step);
   }

   // Left involute profile: intersect right edges [3]->[2] of successive rack positions (same algorithm as GetTooth)
   let last = 0;
   const interL = [tooth[0][3]]; // Start from outermost rack's top-right corner
   for (let i = 1; i < tooth.length; i++) {
      const prev = interL[interL.length - 1];
      let inter = GetIntersection(tooth[i - 1][3], tooth[i - 1][2], tooth[i][3], tooth[i][2]); // Intersect right edges of adjacent racks
      if (!inter.length) inter = tooth[i][3]; // Fallback to top-right corner
      if (GetDistance([0, 0], prev) < GetDistance([0, 0], inter)) break; // Stop when points move outward (away from center)
      interL.push(inter);
      last = i;
   }
   interL.push(tooth[last][2]); // Close with last rack's bottom-right corner

   // Root fillet: collect bottom-right corners [2] that form the dedendum curve
   const cornerL = [];
   for (let i = 1; i <= last; i++) {
      if (GetDistance([0, 0], tooth[i][2]) > GetDistance([0, 0], tooth[i + 1][2])) continue; // Skip points moving away from center
      cornerL.push(tooth[i][2]);
   }
   // Undercut check: traces remaining bottom-right corners and finds where they intersect the involute
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

   // Top arc: addendum circle arc between teeth on the big-gear side (same algorithm as GetTooth)
   let short = false;
   const leftMost = Rotate([0, BR + A], -BTA / 2); // Boundary ray at half big-tooth angle
   for (let i = 1; i < interL.length; i++) {
      const inter = GetIntersection([0, 0], leftMost, interL[i - 1], interL[i]);
      if (inter.length) {
         interL.splice(0, i, inter);
         short = true;
         break;
      }
   }
   const arcT = []; // Arc points along the addendum circle
   outer: for (let i = -Steps; i <= 0 && !short; i++) { // Walk arc until it meets the involute
      const theta = i * BTA / Steps / 2; // Half big-tooth sweep
      const sin = Math.sin(theta), cos = Math.cos(theta);
      const point = [-(BR + A) * sin, (BR + A) * cos];
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
      if (!inter.length || inter[0] < 0) continue; // Skip if no intersection or on wrong side
      interB.push(inter);
   }
   interB.push(Rotate([0, SR - A], STA / 2)); // End at small gear dedendum

   // Assemble transition tooth outline (no mirroring — this tooth is asymmetric).
   // The right side is completed with the right half of a standard small tooth.
   const RSTooth = GetTooth(SN, SR, 180 * PA / Math.PI, 10); // Generate a standard small tooth (PA converted back to degrees)
   return [
      ...arcT,                                   // Top arc (big gear side)
      ...interL.slice(arcT.length ? 1 : 0),      // Left involute (big gear flank)
      ...cornerL.slice(0, -1).reverse(),          // Root fillet (reversed direction)
      ...interB.slice(1),                         // Dedendum curve
      // Append the right half of a standard small tooth, rotated to align at the small gear's tooth boundary.
      // '| 0' truncates to integer; slicing from midpoint gives the right flank only.
      ...RSTooth.map(x => Rotate(x, STA / 2)).slice(1 + RSTooth.length / 2 | 0)
   ];
};

/// Full Gear Assembly
// Generates a complete spur gear by rotating a single tooth profile N times around the center
export const GetGear = (N: number, R: number, PA_Deg: number, Steps: number) => {
   const outline = GetTooth(N, R, PA_Deg, Steps).slice(0, -1); // Remove last point to avoid duplication at joints
   const TA = 2 * Math.PI / N;
   const gear = [];
   for (let i = 0; i < N; i++) {
      gear.push(...outline.map(x => Rotate(x, i * TA))); // Rotate each tooth to its position
   }
   return gear;
};
/// Full Compound (Variable-Speed) Gear Assembly
// Assembles a complete compound gear with two different-sized tooth sections.
// The gear has small teeth for 'VS' fraction of the rotation and big teeth for the rest.
// Two transition teeth (from GetTranTooth) bridge between the sections.
export const GetGearT = (RBN: number, RSN: number, Dist: number, PA_Deg: number, Driver: boolean, Steps: number) => {
   // Recalculate variable-speed parameters (same as GetTranInfo)
   const a = 4 * RSN - 4 * RBN;
   const b = 2 * RBN - 6 * RSN;
   const c = 2 * RBN;
   let VS = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
   const Ratios = [
      1 / (2 * VS + 1),
      1 / (3 - 2 * VS),
      (2 - 2 * VS) / (3 - 2 * VS),
      2 * VS / (2 * VS + 1)
   ];
   // Receiver Big
   const RBR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[3];
   const RBTA = 2 * Math.PI / RBN;
   // Receiver Small
   const RSR = Dist / (1 + Ratios[1] / Ratios[2]);
   const RSTA = 2 * Math.PI / RSN;
   // Driver Big
   const DBN = RSN / Ratios[2] * Ratios[1];
   const DBR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[1];
   const DBTA = 2 * Math.PI / DBN;
   // Driver Small
   const DSN = RSN / Ratios[2] * Ratios[0];
   const DSR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[0];
   const DSTA = 2 * Math.PI / DSN;

   // Select gear dimensions based on driver vs receiver mode
   const BN = Driver ? DBN : RBN;
   const BR = Driver ? DBR : RBR;
   const BTA = Driver ? DBTA : RBTA;
   const SN = Driver ? DSN : RSN;
   const SR = Driver ? DSR : RSR;
   const STA = Driver ? DSTA : RSTA;
   VS = Driver ? VS : .5; // Receiver always uses 50/50 split

   // Generate the three tooth types: big, small, and transition
   const outlineB = GetTooth(BN, BR, PA_Deg, Steps).slice(0, -1); // Big section tooth
   const outlineS = GetTooth(SN, SR, PA_Deg, Steps).slice(0, -1); // Small section tooth
   const outlineT = GetTranTooth(RBN, RSN, Dist, PA_Deg, Driver, Steps).slice(0, -1); // Transition tooth

   // Assemble the full compound gear: transition → small teeth → mirrored transition → big teeth.
   // The gear layout (one full rotation):
   //   [0 .. VS×2π] = small-tooth section
   //   [VS×2π .. 2π] = big-tooth section
   //   Transition teeth bridge the two sections at both boundaries.
   const gear = [...outlineT]; // Start with first transition tooth (small→big boundary)
   for (let i = 1; i < Math.round(SN * VS) - 1; i++) {
      gear.push(...outlineS.map(x => Rotate(x, (i + .5) * STA))); // Fill small-tooth section (offset by 0.5 tooth for centering)
   }
   // Second transition tooth: mirror the first across Y (negate X), rotate to the VS boundary, and reverse point order
   gear.push(...outlineT.map(x => Rotate([-x[0], x[1]], 2 * Math.PI * VS)).reverse())
   for (let i = 1; i < Math.round(BN - BN * VS); i++) {
      gear.push(...outlineB.map(x => Rotate(x, 2 * Math.PI * VS + i * BTA))); // Fill big-tooth section
   }
   return Driver ? gear : gear.map(x => Rotate(x, Math.PI)); // Receiver is rotated 180° to mesh correctly
   //return Driver ? gear.map(x => Rotate(x, -2 * Math.PI * VS)) : gear.map(x => Rotate(x, Math.PI));
};