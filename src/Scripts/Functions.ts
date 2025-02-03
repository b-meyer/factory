import { RemovableRef, StorageSerializers, useLocalStorage, UseStorageOptions } from '@vueuse/core';

export const GetGroup = (regex: RegExp, value: string, index?: number): string | undefined => regex.exec(value || "")?.[index || 1];
export const UseLS = <T>(id: string, defaultValue: T, options: UseStorageOptions<T> = { serializer: StorageSerializers.object }): RemovableRef<T> => useLocalStorage(id, defaultValue, options);


export const Translate = (a: number[], ...b: number[][]) => [a[0] + b.reduce((x:number, y:number[]) => x + y[0], 0), a[1] + b.reduce((x:number, y:number[]) => x + y[1], 0)];
export const Rotate = (x: number[], theta: number) => {
  let sin = Math.sin(theta), cos = Math.cos(theta);    
  return [x[0] * cos - x[1] * sin, x[0] * sin + x[1] * cos];
}
export const RotateAt = (x: number[], center: number[], theta: number) => {
  let sin = Math.sin(theta), cos = Math.cos(theta);    
  return [(x[0] - center[0]) * cos - (x[1] - center[1]) * sin + center[0], (x[0] - center[0]) * sin + (x[1] - center[1]) * cos + center[1]];
}
export const GetIntersection = (a: number[], b: number[], c: number[], d: number[]) => {
    let cmp = [c[0] - a[0], c[1] - a[1]]; // Difference between c and a
    let r = [b[0] - a[0], b[1] - a[1]]; // Difference between b and a
    let s = [d[0] - c[0], d[1] - c[1]]; // Difference between d and c
    let cmpxr = cmp[0] * r[1] - cmp[1] * r[0];
    let cmpxs = cmp[0] * s[1] - cmp[1] * s[0];
    if (cmpxr == 0) return []; // Lines are collinear
    let rxs = r[0] * s[1] - r[1] * s[0];
    if (rxs == 0) return []; // Lines are parallel
    let rxsr = 1 / rxs;
    let t = cmpxs * rxsr;
    let u = cmpxr * rxsr;
    if (t < 0 || t > 1 || u < 0 || u > 1) return []; // Segments do not overlap
    //if (t < 0.001 || t > 1.001 || u < 0.001 || u > 1.001) return []; // Segments do not overlap
    return [a[0] + t * r[0], a[1] + t * r[1]]; // Intersection!
}
export const GetDistance = (a: number[], b: number[]) => Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
//export const GetAngle = (a: number[], b: number[], c: number[]) => Math.atan((a[0] - b[0])/(a[1] - b[1])) - Math.atan((c[0] - b[0])/(c[1] - b[1]));
export const GetAngle = (a: number[], b: number[], c: number[]) => {
  let v = [a[0] - b[0], a[1] - b[1]];
  let w = [a[0] - c[0], a[1] - c[1]];
  return Math.acos((v[0] * w[0] + v[1] * w[1])/(GetDistance([0,0], v) * GetDistance([0,0], w)))
  //Math.atan((a[0] - b[0])/(a[1] - b[1])) - Math.atan((c[0] - b[0])/(c[1] - b[1]));
}
export const GetTooth = (N: number, R: number, PA_Deg: number, Steps: number) => {
    // Gear Constants
    let A = 2 * R / N;
    let TA = 2 * Math.PI / N;
    let TW = Math.PI * R / N;
    let PA = PA_Deg * Math.PI / 180;

    // Generate all racks for tooth
    let rack = [
      [-TW / 2 - A * Math.sin(PA), R + A],
      [-TW / 2 + A * Math.sin(PA), R - A],
      [ TW / 2 - A * Math.sin(PA), R - A],
      [ TW / 2 + A * Math.sin(PA), R + A]
    ], tooth = [rack];
    for (let i = 1; i < 1000; i++) { // Attempt 1000 steps until the rack clears
      let theta = i * TA / Steps;
      //let theta = i * (Math.PI * 3 / 180); // 3 degree step
      let involute = theta * R;
      let sin = Math.sin(theta), cos = Math.cos(theta);    
      let left = rack.map(x => [ // Rotate Left
        x[0] *  cos - x[1] * -sin - involute *  cos,
        x[0] * -sin + x[1] *  cos - involute * -sin
      ]);
      let right = rack.map(x => [  // Rotate Right
        x[0] * cos - x[1] * sin + involute * cos,
        x[0] * sin + x[1] * cos + involute * sin
      ]);          
      if (GetDistance([0,0], right[1]) > R + A) break; // Rack clears gear blank
      tooth.unshift(left);
      tooth.push(right);
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
    let leftMost = Rotate([0, R+A], TA/2);
    for(let i = 1; i < interL.length; i++) {
      let inter = GetIntersection([0,0], leftMost, interL[i-1], interL[i]);
      if (inter.length) {
        interL.splice(0,i,inter);
        short = true;
        break;
      }
    }
    let arcT = [];
    outer:for (let i = -Steps; i <= 0 && !short; i++) {
      let theta = i * TA / Steps / 2;
      let sin = Math.sin(theta), cos = Math.cos(theta); 
      let point = [-(R + A) * sin, (R + A) * cos];
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
    interB.push([0, R - A])

    // Get Outline
    let outline = [
      ...arcT,
      ...interL.slice(arcT.length ? 1 : 0),
      ...cornerL.slice(0,-1).reverse(),
      ...interB.slice(1),
    ];
    outline.push(...outline.map(x => [-x[0], x[1]]).reverse().slice(1));
    return outline;
};
export const GetTranTooth = (RBN: number, RSN: number, Dist: number, PA_Deg: number, Driver: boolean, Steps: number)  => {
  // Variable Speed
  let a = 4 * RSN - 4 * RBN;
  let b = 2 * RBN - 6 * RSN;
  let c = 2 * RBN;
  let VS = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  let Ratios = [
    1 / (2 * VS + 1),
    1 / (3 - 2 * VS),
    (2 - 2 * VS) / (3 - 2 * VS),
    2 * VS / (2 * VS + 1)
  ];
  // Receiver Big
  let RBR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[3];
  let RBTA = 2 * Math.PI / RBN;
  // Receiver Small
  let RSR = Dist / (1 + Ratios[1] / Ratios[2]);
  let RSTA = 2 * Math.PI / RSN;
  // Driver Big
  let DBN = RSN / Ratios[2] * Ratios[1];
  let DBR= (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[1];
  let DBTA = 2 * Math.PI / DBN;
  // Driver Small
  let DSN = RSN / Ratios[2] * Ratios[0];
  let DSR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[0];
  let DSTA = 2 * Math.PI / DSN;
  // Shared
  let PA = PA_Deg * Math.PI / 180;
  let TPA = Math.atan((1 / Ratios[1] * Ratios[0] * Math.PI / (RSN / Ratios[2] * Ratios[0])) / (1 - 1 / Ratios[1] * Ratios[0]));
  let A = 2 * RBR / RBN;
  let TW = Math.PI * RBR / RBN;

  // Driver Switch
  let BN = Driver ? DBN : RBN;
  let BR = Driver ? DBR : RBR;
  let BTA = Driver ? DBTA : RBTA;
  let SN = Driver ? DSN : RSN;
  let SR = Driver ? DSR : RSR;
  let STA = Driver ? DSTA : RSTA;  

  // Generate Racks
  let rack = [
    [-0.5 * TW - A * Math.sin(PA),   A],
    [-0.5 * TW + A * Math.sin(PA),  -A],
    [ 0.5 * TW - A * Math.sin(TPA), -A],
    [ 1.5 * TW + A * Math.sin(TPA), BR - SR + A]
    //[ 0.5 * TW + (BR - SR + A) * Math.sin(TPA), BR - SR + A]
  ], tooth = [];
  for (let i = -(Steps - 0.5) / 2 | 0; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
    let theta = i * STA / Steps;
    let circleP = Rotate([0,SR], theta + STA / 2);
    let involuteP = Translate(circleP, Rotate([theta * SR, 0], theta + STA / 2));
    let step = rack.map(x => Translate(Rotate(x, theta + STA / 2), involuteP));
    if (GetDistance([0,0], step[1]) > SR + A) break; // Rack clears gear blank
    tooth.push(step);
  }
  rack = rack.map(x => Translate(x, [SR * -STA / 2, SR])); // Rack at transistion point
  tooth.unshift(rack);
  for (let i = 1; i <= 1000; i++) { // Attempt 1000 steps until the rack clears
    let theta = -i * BTA / Steps;
    let circleP = Rotate([0,BR], theta);
    let involuteP = Translate(circleP, Rotate([theta * BR, 0], theta));
    let step = rack.map(x => RotateAt(Translate(x, involuteP, [0, -BR]), involuteP, theta));
    if (GetDistance([0,0], step[2]) > BR + A) break; // Rack clears gear blank
    tooth.unshift(step);
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
    if (GetDistance([0,0], tooth[i][2]) > GetDistance([0,0], tooth[i+1][2])) continue; // Ensure ascending points
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
  let leftMost = Rotate([0, BR + A], -BTA/2);
  for(let i = 1; i < interL.length; i++) {
    let inter = GetIntersection([0,0], leftMost, interL[i-1], interL[i]);
    if (inter.length) {
      interL.splice(0,i,inter);
      short = true;
      break;
    }
  }
  let arcT = [];
  outer:for (let i = -Steps; i <= 0 && !short; i++) {
    let theta = i * BTA / Steps / 2;
    let sin = Math.sin(theta), cos = Math.cos(theta);
    let point = [-(BR + A) * sin, (BR + A) * cos];
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
  interB.push(Rotate([0, SR - A], STA/2));

  // Get Outline
  let RSTooth = GetTooth(SN, SR, 180 * PA / Math.PI, 10);
  return [
    ...arcT,
    ...interL.slice(arcT.length ? 1 : 0),
    ...cornerL.slice(0,-1).reverse(),
    ...interB.slice(1),
    ...RSTooth.map(x => Rotate(x, STA / 2)).slice(1+RSTooth.length/2|0)
  ];
};
export const GetGear = (N: number, R: number, PA_Deg: number, Steps: number) => {
  let outline = GetTooth(N, R, PA_Deg, Steps).slice(0, -1);
  let TA = 2 * Math.PI / N;
  let gear = [];
  for(let i = 0; i < N; i++) {
    gear.push(...outline.map(x => Rotate(x, i * TA)));
  }
  return gear;
};
export const GetGearT = (RBN: number, RSN: number, Dist: number, PA_Deg: number, Driver: boolean, Steps: number) => {
  // Variable Speed
  let a = 4 * RSN - 4 * RBN;
  let b = 2 * RBN - 6 * RSN;
  let c = 2 * RBN;
  let VS = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  let Ratios = [
    1 / (2 * VS + 1),
    1 / (3 - 2 * VS),
    (2 - 2 * VS) / (3 - 2 * VS),
    2 * VS / (2 * VS + 1)
  ];
  // Receiver Big
  let RBR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[3];
  let RBTA = 2 * Math.PI / RBN;
  // Receiver Small
  let RSR = Dist / (1 + Ratios[1] / Ratios[2]);
  let RSTA = 2 * Math.PI / RSN;
  // Driver Big
  let DBN = RSN / Ratios[2] * Ratios[1];
  let DBR= (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[1];
  let DBTA = 2 * Math.PI / DBN;
  // Driver Small
  let DSN = RSN / Ratios[2] * Ratios[0];
  let DSR = (Dist / (1 + Ratios[1] / Ratios[2])) / Ratios[2] * Ratios[0];
  let DSTA = 2 * Math.PI / DSN;

  // Driver Switch
  let BN = Driver ? DBN : RBN;
  let BR = Driver ? DBR : RBR;
  let BTA = Driver ? DBTA : RBTA;
  let SN = Driver ? DSN : RSN;
  let SR = Driver ? DSR : RSR;
  let STA = Driver ? DSTA : RSTA;  
  VS = Driver ? VS : .5;

  let outlineB = GetTooth(BN, BR, PA_Deg, Steps).slice(0, -1);
  let outlineS = GetTooth(SN, SR, PA_Deg, Steps).slice(0, -1);
  let outlineT = GetTranTooth(RBN, RSN, Dist, PA_Deg, Driver, Steps).slice(0, -1);
  let gear = [...outlineT];
  for(let i = 1; i < Math.round(SN * VS) - 1; i++) {
    gear.push(...outlineS.map(x => Rotate(x, (i + .5) * STA)));
  }
  gear.push(...outlineT.map(x => Rotate([-x[0], x[1]], 2 * Math.PI * VS)).reverse())
  for(let i = 1; i < Math.round(BN - BN * VS); i++) {
    gear.push(...outlineB.map(x => Rotate(x, 2 * Math.PI * VS + i * BTA)));
  }
  //return Driver ? gear.map(x => Rotate(x, 2 * Math.PI * (1 - VS))) : gear;
  return Driver ? gear : gear.map(x => Rotate(x, Math.PI));
};