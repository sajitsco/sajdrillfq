import { defineStore, acceptHMRUpdate } from 'pinia'


export const useSampleStore = defineStore('sample', {
  state: () => ({
    sample1: false,
  }),

  actions: {
    con() {this.sample1 = true},
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSampleStore, import.meta.hot))
}
