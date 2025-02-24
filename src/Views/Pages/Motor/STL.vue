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
                  <option v-for="gear in Shared.Gears" :value="gear" v-text="gear"></option>
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
              <div class="w-75" v-text="GearM.Ratio * Gear1.N"/>
            </div>
            <div class="flex gap-10 items-center justify-between">
              <label>R:</label>
              <div class="w-75" v-text="GearM.Ratio * Gear1.R"/>
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
      <button class="absolute top-15 right-15 flex items-center gap-5 h-30 px-10 btn-green" @click="Export">Export</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GetGear, GetGearT } from '@/Scripts/Functions';

let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera, 
    renderer: THREE.WebGLRenderer,
    orbit: OrbitControls,
    lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }),
    meshMaterial = new THREE.MeshStandardMaterial({ emissive: 0x999999 });

//ViewModel
export default defineComponent({
  data: () => ({
    Shared: {
      PA_Deg: 25,
      Depth: 12,
      Gear: '1',
      Gears: ['M', '0', '1', '2R', '2D']
    },
    GearM: {
      Ratio: 8,
    },
    Gear1: {
      N: 18,
      R: 20,
    },
    Gear2: {
      RBN: 16,
      RSN: 10,
      Dist: .75,
    },
  }),
  computed: {
    Points: function() {
      switch(this.Shared.Gear) {
        case 'M': return GetGear(this.GearM.Ratio * this.Gear1.N, this.GearM.Ratio * this.Gear1.R, this.Shared.PA_Deg, 7);
        case '0': return GetGear(this.Gear1.N / 2, this.Gear1.R / 2, this.Shared.PA_Deg, 12); 
        case '1': return GetGear(this.Gear1.N, this.Gear1.R, this.Shared.PA_Deg, 12);
        case '2D': return GetGearT(this.Gear2.RBN, this.Gear2.RSN, 2 * this.Gear1.R * this.Gear2.Dist, this.Shared.PA_Deg, true, 12);
        case '2R': return GetGearT(this.Gear2.RBN, this.Gear2.RSN, 2 * this.Gear1.R * this.Gear2.Dist, this.Shared.PA_Deg, false, 12);
        default: return [];
      }
    }
  },
  mounted: async function() {
    const viewport = document.getElementById("viewport")!;
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, viewport.clientWidth / viewport.clientHeight, 0.1, 2000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(viewport.clientWidth, viewport.clientHeight);
    renderer.setAnimationLoop(() => renderer.render(scene, camera));
    orbit = new OrbitControls(camera, renderer.domElement);
    viewport.appendChild(renderer.domElement);
    camera.position.z = Math.max(...this.Points.flat()) * 3;
    this.Init();
  },
  methods: {
    GearChange: function() {
      orbit.reset();
      camera.position.z = Math.max(...this.Points.flat()) * 3;
      this.Init();
    },
    Init: function() {
      scene.clear();
      let shape = new THREE.Shape(this.Points.map(x => new THREE.Vector2(x[0], x[1])));
      let geometry = new THREE.ExtrudeGeometry(shape, { depth: this.Shared.Depth, bevelEnabled: false });
      geometry.translate(0,0,-this.Shared.Depth / 2);
      let wireFrame = new THREE.WireframeGeometry(geometry);
      scene.add(new THREE.LineSegments(wireFrame, lineMaterial));
      scene.add(new THREE.Mesh(geometry, meshMaterial));
    },
    Export: function() {
      let shape = new THREE.Shape(this.Points.map(x => new THREE.Vector2(x[0], x[1])));
      let geometry = new THREE.ExtrudeGeometry(shape, { depth: this.Shared.Depth, bevelEnabled: false });
      let exporter = new STLExporter();
      let result = exporter.parse(new THREE.Mesh(geometry), { binary: true });
      let blob = new Blob([result], { type : 'text/plain' });
      let link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.href = URL.createObjectURL(blob);
      link.download = `Gear${this.Shared.Gear}.stl`;
      link.click();
      link.remove();
    },
  }
});
</script>
