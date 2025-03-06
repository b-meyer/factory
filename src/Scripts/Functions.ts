import { RemovableRef, StorageSerializers, useLocalStorage, UseStorageOptions } from '@vueuse/core';

export const GetGroup = (regex: RegExp, value: string, index?: number): string | undefined => regex.exec(value || "")?.[index || 1];
export const UseLS = <T>(id: string, defaultValue: T, options: UseStorageOptions<T> = { serializer: StorageSerializers.object }): RemovableRef<T> => useLocalStorage(id, defaultValue, options);


export const Translate = (a: number[], ...b: number[][]) => [a[0] + b.reduce((x:number, y:number[]) => x + y[0], 0), a[1] + b.reduce((x:number, y:number[]) => x + y[1], 0)];
export const Rotate = (x: number[], theta: number) => {
  const sin = Math.sin(theta), cos = Math.cos(theta);    
  return [x[0] * cos - x[1] * sin, x[0] * sin + x[1] * cos];
}
export const RotateAt = (x: number[], center: number[], theta: number) => {
  const sin = Math.sin(theta), cos = Math.cos(theta);    
  return [(x[0] - center[0]) * cos - (x[1] - center[1]) * sin + center[0], (x[0] - center[0]) * sin + (x[1] - center[1]) * cos + center[1]];
}
export const GetIntersection = (a: number[], b: number[], c: number[], d: number[]) => {
    const cmp = [c[0] - a[0], c[1] - a[1]]; // Difference between c and a
    const r = [b[0] - a[0], b[1] - a[1]]; // Difference between b and a
    const s = [d[0] - c[0], d[1] - c[1]]; // Difference between d and c
    const cmpxr = cmp[0] * r[1] - cmp[1] * r[0];
    const cmpxs = cmp[0] * s[1] - cmp[1] * s[0];
    if (cmpxr == 0) return []; // Lines are collinear
    const rxs = r[0] * s[1] - r[1] * s[0];
    if (rxs == 0) return []; // Lines are parallel
    const rxsr = 1 / rxs;
    const t = cmpxs * rxsr;
    const u = cmpxr * rxsr;
    if (t < 0 || t > 1 || u < 0 || u > 1) return []; // Segments do not overlap
    //if (t < 0.001 || t > 1.001 || u < 0.001 || u > 1.001) return []; // Segments do not overlap
    return [a[0] + t * r[0], a[1] + t * r[1]]; // Intersection!
}
export const GetDistance = (a: number[], b: number[]) => Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
//export const GetAngle = (a: number[], b: number[], c: number[]) => Math.atan((a[0] - b[0])/(a[1] - b[1])) - Math.atan((c[0] - b[0])/(c[1] - b[1]));
export const GetAngle = (a: number[], b: number[], c: number[]) => {
  const v = [a[0] - b[0], a[1] - b[1]];
  const w = [a[0] - c[0], a[1] - c[1]];
  return Math.acos((v[0] * w[0] + v[1] * w[1])/(GetDistance([0,0], v) * GetDistance([0,0], w)))
  //Math.atan((a[0] - b[0])/(a[1] - b[1])) - Math.atan((c[0] - b[0])/(c[1] - b[1]));
}
export const GetTooth = (N: number, R: number, PA_Deg: number, Steps: number) => {
    // Gear Constants
    const A = 2 * R / N;
    const TA = 2 * Math.PI / N;
    const TW = Math.PI * R / N;
    const PA = PA_Deg * Math.PI / 180;

    // Generate all racks for tooth
    const rack = [
      [-TW / 2 - A * Math.sin(PA), R + A],
      [-TW / 2 + A * Math.sin(PA), R - A],
      [ TW / 2 - A * Math.sin(PA), R - A],
      [ TW / 2 + A * Math.sin(PA), R + A]
    ], tooth = [rack];
    for (let i = 1; i < 1000; i++) { // Attempt 1000 steps until the rack clears
      const theta = i * TA / Steps;
      //let theta = i * (Math.PI * 3 / 180); // 3 degree step
      const involute = theta * R;
      const sin = Math.sin(theta), cos = Math.cos(theta);    
      const left = rack.map(x => [ // Rotate Left
        x[0] *  cos - x[1] * -sin - involute *  cos,
        x[0] * -sin + x[1] *  cos - involute * -sin
      ]);
      const right = rack.map(x => [  // Rotate Right
        x[0] * cos - x[1] * sin + involute * cos,
        x[0] * sin + x[1] * cos + involute * sin
      ]);          
      if (GetDistance([0,0], right[1]) > R + A) break; // Rack clears gear blank
      tooth.unshift(left);
      tooth.push(right);
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
      if (!cornerL.length) {
        const inter = GetIntersection(rack[2], rack[1], tooth[i][3], tooth[i][2]); 
        if (!inter.length) continue; // Ensure the Bottom Left corner dips below the rack
        if (GetDistance([0,0], tooth[i][2]) > GetDistance([0,0], tooth[i+1][2])) continue; // Ensure ascending points
      }
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
    const leftMost = Rotate([0, R+A], TA/2);
    for(let i = 1; i < interL.length; i++) {
      const inter = GetIntersection([0,0], leftMost, interL[i-1], interL[i]);
      if (inter.length) {
        interL.splice(0,i,inter);
        short = true;
        break;
      }
    }
    const arcT = [];
    outer:for (let i = -Steps; i <= 0 && !short; i++) {
      const theta = i * TA / Steps / 2;
      const sin = Math.sin(theta), cos = Math.cos(theta); 
      const point = [-(R + A) * sin, (R + A) * cos];
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
    interB.push([0, R - A])

    // Get Outline
    const outline = [
      ...arcT,
      ...interL.slice(arcT.length ? 1 : 0),
      ...cornerL.slice(0,-1).reverse(),
      ...interB.slice(1),
    ];
    outline.push(...outline.map(x => [-x[0], x[1]]).reverse().slice(1));
    return outline;
};
export const GetTranInfo = (RBN: number, RSN: number, Dist: number)  => {
  // Variable Speed
  const a = 4 * RSN - 4 * RBN;
  const b = 2 * RBN - 6 * RSN;
  const c = 2 * RBN;
  const VS = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
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
  const DBR= (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[1];
  const DBTA = 2 * Math.PI / DBN;
  // Driver Small
  const DSN = RSN / Ratios[2] * Ratios[0];
  const DSR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[0];
  const DSTA = 2 * Math.PI / DSN;
  // Shared
  const TPA = Math.atan((1 / Ratios[1] * Ratios[0] * Math.PI / (RSN / Ratios[2] * Ratios[0])) / (1 - 1 / Ratios[1] * Ratios[0]));
  const A = 2 * RBR / RBN;
  const TW = Math.PI * RBR / RBN;
  return { VS, RBN, RBR, RBTA, RSN, RSR, RSTA, DBN, DBR, DBTA, DSN, DSR, DSTA, TPA, A, TW };
};
export const GetTranTooth = (RBN: number, RSN: number, Dist: number, PA_Deg: number, Driver: boolean, Steps: number)  => {
  // Tooth Info
  const { RBR, RBTA, RSR, RSTA, DBR, DBTA, DSN, DSR, DSTA, TPA, A, TW } = GetTranInfo(RBN, RSN, Dist);
  const PA = PA_Deg * Math.PI / 180;

  // Driver Switch
  const BR = Driver ? DBR : RBR;
  const BTA = Driver ? DBTA : RBTA;
  const SN = Driver ? DSN : RSN;
  const SR = Driver ? DSR : RSR;
  const STA = Driver ? DSTA : RSTA;  

  // Generate Racks
  let rack = [
    [-0.5 * TW - A * Math.sin(PA),   A],
    [-0.5 * TW + A * Math.sin(PA),  -A],
    [ 0.5 * TW - A * Math.sin(TPA), -A],
    [ 1.5 * TW + A * Math.sin(TPA), BR - SR + A]
    //[ 0.5 * TW + (BR - SR + A) * Math.sin(TPA), BR - SR + A]
  ];
  const tooth = [];
  for (let i = -(Steps - 0.5) / 2 | 0; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
    const theta = i * STA / Steps;
    const circleP = Rotate([0,SR], theta + STA / 2);
    const involuteP = Translate(circleP, Rotate([theta * SR, 0], theta + STA / 2));
    const step = rack.map(x => Translate(Rotate(x, theta + STA / 2), involuteP));
    if (GetDistance([0,0], step[1]) > SR + A) break; // Rack clears gear blank
    tooth.push(step);
  }
  rack = rack.map(x => Translate(x, [SR * -STA / 2, SR])); // Rack at transistion point
  tooth.unshift(rack);
  for (let i = 1; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
    const theta = -i * BTA / Steps;
    const circleP = Rotate([0,BR], theta);
    const involuteP = Translate(circleP, Rotate([theta * BR, 0], theta));
    const step = rack.map(x => RotateAt(Translate(x, involuteP, [0, -BR]), involuteP, theta));
    if (GetDistance([0,0], step[2]) > BR + A) break; // Rack clears gear blank
    tooth.unshift(step);
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
  const leftMost = Rotate([0, BR + A], -BTA/2);
  for(let i = 1; i < interL.length; i++) {
    const inter = GetIntersection([0,0], leftMost, interL[i-1], interL[i]);
    if (inter.length) {
      interL.splice(0,i,inter);
      short = true;
      break;
    }
  }
  const arcT = [];
  outer:for (let i = -Steps; i <= 0 && !short; i++) {
    const theta = i * BTA / Steps / 2;
    const sin = Math.sin(theta), cos = Math.cos(theta);
    const point = [-(BR + A) * sin, (BR + A) * cos];
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
  interB.push(Rotate([0, SR - A], STA/2));

  // Get Outline
  const RSTooth = GetTooth(SN, SR, 180 * PA / Math.PI, 10);
  return [
    ...arcT,
    ...interL.slice(arcT.length ? 1 : 0),
    ...cornerL.slice(0,-1).reverse(),
    ...interB.slice(1),
    ...RSTooth.map(x => Rotate(x, STA / 2)).slice(1+RSTooth.length/2|0)
  ];
};
export const GetGear = (N: number, R: number, PA_Deg: number, Steps: number) => {
  const outline = GetTooth(N, R, PA_Deg, Steps).slice(0, -1);
  const TA = 2 * Math.PI / N;
  const gear = [];
  for(let i = 0; i < N; i++) {
    gear.push(...outline.map(x => Rotate(x, i * TA)));
  }
  return gear;
};
export const GetGearT = (RBN: number, RSN: number, Dist: number, PA_Deg: number, Driver: boolean, Steps: number) => {
  // Variable Speed
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
  const DBR= (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[1];
  const DBTA = 2 * Math.PI / DBN;
  // Driver Small
  const DSN = RSN / Ratios[2] * Ratios[0];
  const DSR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[0];
  const DSTA = 2 * Math.PI / DSN;

  // Driver Switch
  const BN = Driver ? DBN : RBN;
  const BR = Driver ? DBR : RBR;
  const BTA = Driver ? DBTA : RBTA;
  const SN = Driver ? DSN : RSN;
  const SR = Driver ? DSR : RSR;
  const STA = Driver ? DSTA : RSTA;  
  VS = Driver ? VS : .5;

  const outlineB = GetTooth(BN, BR, PA_Deg, Steps).slice(0, -1);
  const outlineS = GetTooth(SN, SR, PA_Deg, Steps).slice(0, -1);
  const outlineT = GetTranTooth(RBN, RSN, Dist, PA_Deg, Driver, Steps).slice(0, -1);
  const gear = [...outlineT];
  for(let i = 1; i < Math.round(SN * VS) - 1; i++) {
    gear.push(...outlineS.map(x => Rotate(x, (i + .5) * STA)));
  }
  gear.push(...outlineT.map(x => Rotate([-x[0], x[1]], 2 * Math.PI * VS)).reverse())
  for(let i = 1; i < Math.round(BN - BN * VS); i++) {
    gear.push(...outlineB.map(x => Rotate(x, 2 * Math.PI * VS + i * BTA)));
  }
  return Driver ? gear : gear.map(x => Rotate(x, Math.PI));
  //return Driver ? gear.map(x => Rotate(x, -2 * Math.PI * VS)) : gear.map(x => Rotate(x, Math.PI));
};