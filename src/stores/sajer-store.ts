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
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSajerStore, import.meta.hot))
}
