import { defineStore } from 'pinia'
import { UseLS } from './Functions';

export const mainStore = defineStore('main', {
   state: () => ({
      SidebarVisible: UseLS<boolean>('device_SidebarVisible', true),
   }),
   getters: {},
   actions: {},
});