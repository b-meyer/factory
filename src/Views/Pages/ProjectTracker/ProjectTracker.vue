<template>
  <div class="flex flex-col w-full min-h-full gap-20 p-20 m-auto">
    <div class="flex flex-auto flex-col card p-20 mt-30 gap-20">
      <div class="absolute inset-0 h-50">
        <i v-if="Project" 
           class="bi-arrow-left-circle absolute left-20 inset-y-0 w-50 flex justify-center items-center text-[24px] hover:font-bold" 
           @click="projectTrackerStore.SelectParent" 
           @dragenter.prevent="" 
           @dragover.prevent=""
           @drop="DropParent" />
        <h1 class="flex justify-center items-center h-50 text-[22px]"
            v-text="'Project Tracker'" />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 max-w-[1200px] m-auto gap-10 p-20">
        <div v-if="Project"
             class="card col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 flex max-sm:flex-col p-20 gap-20">
          <div class="max-xs:mx-20 max-sm:mx-40 h-full aspect-square bg-no-repeat bg-center bg-contain"
               :style="`background-image: url('${Project.Image}');`" />
          <div class="flex flex-auto flex-col gap-10">
            <div class="flex flex-col gap-5">
              <label v-text="'Title'" />
              <input v-model="Project.Title"
                     class="flex-auto px-15 border-input rounded h-34 text-sm outline-none">
            </div>
            <div class="flex flex-col gap-5">
              <label v-text="'Image'" />
              <input v-model="Project.Image"
                     class="flex-auto px-15 border-input rounded h-34 text-sm outline-none">
            </div>
            <div class="flex flex-col gap-5">
              <label v-text="'Link'" />
              <input v-model="Project.Link"
                     class="flex-auto px-15 border-input rounded h-34 text-sm outline-none">
            </div>
            <div class="flex flex-col gap-5">
              <label v-text="'Price'" />
              <input v-if="!Project.Items.length"
                     v-model="Project.Price"
                     class="flex-auto px-15 border-input rounded h-34 text-sm outline-none">
              <div v-else
                   v-text="projectTrackerStore.Dollars(Project)" />
            </div>
          </div>
        </div>
        <app-projectcard v-for="project in Project?.Items || projectTrackerStore.Projects"
                         :key="project.Id"
                         :Project="project"
                         @drop-item="DropItem" />
        <div class="card aspect-square flex flex-col justify-center items-center"
             @click="projectTrackerStore.AddChild">
          <i class="k-i-plus text-[36px]" />
          <div v-text="'Add'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import ProjectCard from './Components/ProjectCard.vue';
import { projectTrackerStore } from './Scripts/Store';
import { DropState } from './Scripts/Enum';
import { Project } from './Scripts/Model';

export default defineComponent({
   components: {
      'app-projectcard': ProjectCard,
   },
   computed: {
      ...mapStores(projectTrackerStore),
      Project: function(): Project | null {
         return this.projectTrackerStore.GetProject(this.projectTrackerStore.Selected);
      },
   },
   methods: { 
      DropItem: function(target: string, payload: string, location: string) {
         const payloadList = this.projectTrackerStore.GetParent(payload)?.Items || this.projectTrackerStore.Projects;
         const targetList = this.projectTrackerStore.GetParent(target)?.Items  || this.projectTrackerStore.Projects;
         const payloadIndex: number = payloadList.findIndex(x => x.Id == payload);
         const payloadItem: Project[] = payloadList.splice(payloadIndex, 1);
         const targetIndex: number = targetList.findIndex(x => x.Id == target);
         switch(location) {
         case DropState.Left:
            targetList.splice(targetIndex, 0, ...payloadItem);
            break;
         case DropState.Right:
            targetList.splice(targetIndex + 1, 0, ...payloadItem);
            break;
         case DropState.Middle:
            targetList[targetIndex].Items?.push(...payloadItem);
            break;
         }
      },
      DropParent: function(e: DragEvent) : void {
         const payload = e.dataTransfer?.types[0];
         this.DropItem(null!, payload!, DropState.Middle);
      },
   },
});
</script>