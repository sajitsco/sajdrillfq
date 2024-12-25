import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useSajerStore = defineStore('sajer', {
  state: () => ({
    connected: false,
    loggedIn: false,
  }),

  actions: {
    connect() {
      api
        .get('/p/sajer')
        .then((res) => {
          console.log(res.status)
          this.connected = true
        })
        .catch((err) => {
          console.log(err)
          this.connected = false
        })
        .finally(() => {
          console.log('finally')
        })
    },
    checkLoggedIn() {
      api
        .get('/s/sajer')
        .then((res) => {
          console.log(res.status)
          this.loggedIn = true
        })
        .catch((err) => {
          console.log(err)
          this.loggedIn = false
        })
        .finally(() => {
          console.log('finally')
        })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSajerStore, import.meta.hot))
}
