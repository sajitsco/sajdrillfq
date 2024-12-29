import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import type { ATask } from 'src/sajer/bpms'

export const useSajerStore = defineStore('sajer', {
  state: () => ({
    connected: false,
    loggedIn: false,
    atasks: <ATask[]>[],
  }),

  actions: {
    connect() {
      api
        .get('/p/sajer')
        .then(() => {
          this.connected = true
          
          api
          .get('/s/sajer')
          .then(() => {
            this.loggedIn = true
            
          })
          .catch(() => {
            this.loggedIn = false
          })

        })
        .catch(() => {
          this.connected = false
          this.loggedIn = false
        })
    },
    login(username: string, password: string) {
      api
    .get('/p/auth/op/token', { auth: { password: password, username: username } })
    .then((res) => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data
      this.loggedIn = true
    })
    .catch((err) => {
      this.loggedIn = false
      console.log(err)
    })
    },
    getATasks() {
      api
    .get<ATask[]>('/s/bpms/atask')
    .then((res) => {
      this.atasks = res.data
    })
    .catch(() => {
      this.atasks = []
    })
    },
    async updateATasks(atask: ATask) {
      console.log("1");
      await api
    .put('/s/bpms/atask',atask)
    .then((res) => {
      console.log("2");
      console.log(res);
    })
    .catch((err) => {
      console.log("3");
      console.log(err);
    })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSajerStore, import.meta.hot))
}
