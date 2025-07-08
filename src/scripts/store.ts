import { defineStore } from 'pinia'
import { UseLS } from './functions';

export const mainStore = defineStore('main', {
   state: () => ({
      SidebarVisible: UseLS<boolean>('device_SidebarVisible', true),
   }),
   getters: {},
   actions: {},
});