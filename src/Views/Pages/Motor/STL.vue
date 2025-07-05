<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20">
    <div class="relative card flex flex-auto gap-20">
      <div class="flex flex-col flex-auto max-w-[300px] p-40 gap-30">
        <div class="flex flex-col gap-10">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              Shared
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>Gear:</label>
              <div class="w-75">
                <select v-model="Shared.Gear"
                        class="border-input rounded h-32 w-full px-10"
                        @change="GearChange">
                  <option v-for="gear in Shared.Gears"
                          :key="gear"
                          :value="gear"
                          v-text="gear" />
                </select>
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>PA:</label>
              <div class="w-75">
                <input v-model="Shared.PA_Deg"
                       type="number"
                       min="0"
                       max="45"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Depth:</label>
              <div class="w-75">
                <input v-model="Shared.Depth"
                       type="number"
                       min="0"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              Gear M
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>N:</label>
              <div class="w-75"
                   v-text="GearM.Ratio * Gear1.N" />
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>R:</label>
              <div class="w-75"
                   v-text="GearM.Ratio * Gear1.R" />
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Ratio:</label>
              <div class="w-75">
                <input v-model="GearM.Ratio"
                       type="number"
                       min="1"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              Gear 1
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>N:</label>
              <div class="w-75">
                <input v-model="Gear1.N"
                       type="number"
                       min="0"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>R:</label>
              <div class="w-75">
                <input v-model="Gear1.R"
                       type="number"
                       min="0"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900 sm:text-2xl sm:truncate">
              Gear 2
            </h2>
            <i class="bi-caret-down-fill" />
          </div>
          <div class="flex flex-col gap-10">
            <div class="flex gap-10 items-center justify-between">
              <label>RBN:</label>
              <div class="w-75">
                <input v-model="Gear2.RBN"
                       type="number"
                       min="6"
                       step="2"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>RSB:</label>
              <div class="w-75">
                <input v-model="Gear2.RSN"
                       type="number"
                       min="4"
                       step="2"
                       class="border-input rounded h-32 w-full px-10"
                       @input="Init">
              </div>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>Dist:</label>
              <div class="w-75">
                <input v-model="Gear2.Dist"
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
      <button class="absolute top-15 right-15 flex items-center gap-5 h-30 px-10 btn-green"
              @click="Export">
        Export
      </button>
      <div class="absolute bottom-15 right-15">
        <div v-if="Shared.Gear == '0'"
             class="flex flex-col gap-5">
          <div class="flex gap-5">
            <div class="w-100">
              0 Pitch D+
            </div>
            <div v-text="((Gear1.R / 2 + GearA) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              0 Pitch D
            </div>
            <div v-text="((Gear1.R / 2) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              0 Pitch D-
            </div>
            <div v-text="((Gear1.R / 2 - GearA) * 2).toFixed(2)" />
          </div>
        </div>
        <div v-else-if="Shared.Gear == '1'"
             class="flex flex-col gap-5">
          <div class="flex gap-5">
            <div class="w-100">
              1 Pitch D+
            </div>
            <div v-text="((Gear1.R + GearA) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              1 Pitch D
            </div>
            <div v-text="((Gear1.R) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              1 Pitch D-
            </div>
            <div v-text="((Gear1.R - GearA) * 2).toFixed(2)" />
          </div>
        </div>
        <div v-else-if="Shared.Gear == 'M'"
             class="flex flex-col gap-5">
          <div class="flex gap-5">
            <div class="w-100">
              M Pitch D+
            </div>
            <div v-text="((Gear1.R * GearM.Ratio + GearA) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              M Pitch D
            </div>
            <div v-text="((Gear1.R * GearM.Ratio) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              M Pitch D-
            </div>
            <div v-text="((Gear1.R * GearM.Ratio - GearA) * 2).toFixed(2)" />
          </div>
        </div>
        <div v-else-if="Shared.Gear == '2D'"
             class="flex flex-col gap-5">
          <div class="flex gap-5">
            <div class="w-100">
              DBR Pitch D+
            </div>
            <div v-text="((TGearInfo.DBR + TGearInfo.A) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              DBR Pitch D
            </div>
            <div v-text="((TGearInfo.DBR) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              DBR Pitch D-
            </div>
            <div v-text="((TGearInfo.DBR - TGearInfo.A) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              DSR Pitch D+
            </div>
            <div v-text="((TGearInfo.DSR + TGearInfo.A) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              DSR Pitch D
            </div>
            <div v-text="((TGearInfo.DSR) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              DSR Pitch D-
            </div>
            <div v-text="((TGearInfo.DSR - TGearInfo.A) * 2).toFixed(2)" />
          </div>
        </div>
        <div v-else-if="Shared.Gear == '2R'"
             class="flex flex-col gap-5">
          <div class="flex gap-5">
            <div class="w-100">
              RBR Pitch D+
            </div>
            <div v-text="((TGearInfo.RBR + TGearInfo.A) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              RBR Pitch D
            </div>
            <div v-text="((TGearInfo.RBR) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              RBR Pitch D-
            </div>
            <div v-text="((TGearInfo.RBR - TGearInfo.A) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              RSR Pitch D+
            </div>
            <div v-text="((TGearInfo.RSR + TGearInfo.A) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              RSR Pitch D
            </div>
            <div v-text="((TGearInfo.RSR) * 2).toFixed(2)" />
          </div>
          <div class="flex gap-5">
            <div class="w-100">
              RSR Pitch D-
            </div>
            <div v-text="((TGearInfo.RSR - TGearInfo.A) * 2).toFixed(2)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GetGear, GetGearT, GetTranInfo } from '@/Scripts/Functions';

let scene: THREE.Scene,
   camera: THREE.PerspectiveCamera, 
   renderer: THREE.WebGLRenderer,
   orbit: OrbitControls;
const Shared = reactive({
   PA_Deg: 25,
   Depth: 15,
   Gear: '1',
   Gears: ['M', '0', '1', '2R', '2D']
});
const GearM = reactive({
   Ratio: 8, 
});
const Gear1 = reactive({
   N: 18,
   R: 20,
});
const Gear2 = reactive({
   RBN: 16,
   RSN: 10,
   Dist: .75,
});
const GearA = computed(() => 2 * Gear1.R / Gear1.N);
const TGearInfo = computed(() => GetTranInfo(Gear2.RBN, Gear2.RSN, 2 * Gear1.R * Gear2.Dist));
const Points = computed(() => {
   switch(Shared.Gear) {
   case 'M': return GetGear(GearM.Ratio * Gear1.N, GearM.Ratio * Gear1.R, Shared.PA_Deg, 7);
   case '0': return GetGear(Gear1.N / 2, Gear1.R / 2, Shared.PA_Deg, 12); 
   case '1': return GetGear(Gear1.N, Gear1.R, Shared.PA_Deg, 12);
   case '2D': return GetGearT(Gear2.RBN, Gear2.RSN, 2 * Gear1.R * Gear2.Dist, Shared.PA_Deg, true, 12);
   case '2R': return GetGearT(Gear2.RBN, Gear2.RSN, 2 * Gear1.R * Gear2.Dist, Shared.PA_Deg, false, 12);
   default: return [];
   };
});
const Max = computed(() => Math.max(...Points.value.flat()));
const geometry = computed(() => {
   const shape = new THREE.Shape(Points.value.map(x => new THREE.Vector2(x[0], x[1])));
   const geometry = new THREE.ExtrudeGeometry(shape, { depth: Shared.Depth, bevelEnabled: false, steps: 1});
   geometry.translate(0,0,-Shared.Depth / 2);
   // const pos = geometry.getAttribute( 'position' );
   // const npos = geometry.getAttribute( 'normal' );
   // for( let i=0; i<pos.count; i++ ) {
   //     const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i); // get the position
   //     const nx = npos.getX(i), ny = npos.getY(i), nz = npos.getZ(i);	// get the normal vector
   //     const theta = 2 * Math.abs(z) / Shared.Depth * (Math.PI / 12) * (Shared.Depth / Max.value);
   //     const cos = Math.cos(theta), sin = Math.sin(theta);
   //     pos.setXYZ(i, x*cos-y*sin, x*sin+y*cos, z);
   //     npos.setXYZ(i, nx*cos-ny*sin, nx*sin+ny*cos, nz);
   // }
   // pos.needsUpdate = true;
   // npos.needsUpdate = true;
   return geometry;
});
onMounted(async () => {
   const viewport = document.getElementById("viewport")!;
   scene = new THREE.Scene()
   camera = new THREE.PerspectiveCamera(50, viewport.clientWidth / viewport.clientHeight, 0.1, 2000);
   renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
   renderer.setSize(viewport.clientWidth, viewport.clientHeight);
   renderer.setAnimationLoop(() => renderer.render(scene, camera));
   orbit = new OrbitControls(camera, renderer.domElement);
   viewport.appendChild(renderer.domElement);
   camera.position.z = Max.value * 3;
   Init();
});
onUnmounted(() => {
   orbit.dispose();
   renderer.dispose();
});
function GearChange() {
   orbit.reset();
   camera.position.z = Math.max(...Points.value.flat()) * 3;
   Init();
};
function Init() {
   scene.clear();
   const wireFrame = new THREE.WireframeGeometry(geometry.value);
   const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
   const meshMaterial = new THREE.MeshStandardMaterial({ emissive: 0x999999 });
   scene.add(new THREE.LineSegments(wireFrame, lineMaterial));
   scene.add(new THREE.Mesh(geometry.value, meshMaterial));
};
function Export() {
   const exporter = new STLExporter();
   const result = exporter.parse(new THREE.Mesh(geometry.value), { binary: true });
   const blob = new Blob([result], { type : 'text/plain' });
   const link = document.createElement('a');
   link.style.display = 'none';
   document.body.appendChild(link);
   link.href = URL.createObjectURL(blob);
   link.download = `Gear${Shared.Gear}.stl`;
   link.click();
   link.remove();
};
</script>
