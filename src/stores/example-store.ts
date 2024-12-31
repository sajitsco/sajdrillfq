import { defineStore, acceptHMRUpdate } from 'pinia'
//import { useSampleStore } from './sample-store'

//const us = useSampleStore();

export const useExampleStore = defineStore('example', {
  state: () => ({
    example1: false,
  }),

  actions: {
    excon() {
      //us.con()
      this.example1 = true
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExampleStore, import.meta.hot))
}
