import { defineStore } from 'pinia'
import { UseLS } from './functions';

export const useMainStore = defineStore('main', () => {
   const SidebarVisible = UseLS<boolean>('device_SidebarVisible', true);
   return { SidebarVisible };
});