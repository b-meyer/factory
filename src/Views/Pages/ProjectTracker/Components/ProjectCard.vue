<template>
  <div class="card aspect-square flex flex-col justify-center items-center p-10 gap-10"
       draggable="true"
       @click="projectTrackerStore.Selected = Project.Id"
       @dragstart="DragStart"  
       @dragenter="DragEnter" 
       @dragover="DragOver"
       @dragexit="DragEnd"
       @dragleave="DragEnd"
       @drop="Drop">
    <div v-text="Project.Title" />
    <div class="flex-auto aspect-square bg-no-repeat bg-center bg-contain"
         :style="`background-image: url('${Project.Image}');`" />
    <div v-text="projectTrackerStore.Dollars(Project)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { mapStores } from 'pinia';
import { projectTrackerStore } from '../Scripts/Store';
import { Project } from '../Scripts/Model'
import { DropState } from '../Scripts/Enum';

export default defineComponent({
    props: {
        Project: {
            type: Object as PropType<Project>,
            required: true,
        },
    },
    emits: ['dropItem'],
    data: () => ({ 
        DropState: null! as DropState
    }),
    computed: {
        ...mapStores(projectTrackerStore),
    },
    methods: { 
        DragStart: function(e: DragEvent) : void {
            e.dataTransfer?.setData(this.Project.Id, '');
            (e.dataTransfer as any).effectAllowed = "move";
        },
        DragEnter: function(e: DragEvent) : void {
            e.preventDefault();
        },
        DragOver: function(e: DragEvent) : void {
            const target = e.target as Element;
            const left = target.clientWidth / 5.0;
            const right = target.clientWidth - left;
            if (this.Project.Id == e.dataTransfer?.types[0]) { // Over the currently dragged Item
                this.DropState = null!;
            } else if (e.offsetX <= left) { // Over the Top part of the target Item
                this.DropState = DropState.Left;
            } else if (e.offsetX >= right) { // Over the Bottom part of the target Item
                this.DropState = DropState.Right;
            } else { // Over the Middle of the target Item
                this.DropState = DropState.Middle;
            }
            if (this.DropState) e.preventDefault();
        },
        DragEnd: function(e: DragEvent) : void {
            this.DropState = null!;
        },
        Drop: function(e: DragEvent) : void {
            this.$emit('dropItem', this.Project.Id, e.dataTransfer?.types[0], this.DropState);
            this.DragEnd(e);
        },
    },
});
</script>