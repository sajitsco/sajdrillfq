import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { ATaskStatus } from 'src/sajer/bpms'
import type { ATask } from 'src/sajer/bpms'

export const useSajerStore = defineStore('sajer', {
  state: () => ({
    connected: false,
    loggedIn: false,
    activeTask: <ATask><unknown>null,
    atasks: <ATask[]>[],
  }),

  actions: {
    connect() {
      api
        .get('/p/sajer', {headers:{Authorization: ""}})
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
      this.getATasks();
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
      for (let index = 0; index < this.atasks.length; index++) {
        const element = this.atasks[index];
        if( element?.status == ATaskStatus.ACTIVE){
          this.activeTask = element;
          this.atasks.splice(index,1);
        }
      }
    })
    .catch(() => {
      this.atasks = []
    })
    },
    async updateATasks(atask: ATask) {
      await api
    .put('/s/bpms/atask',atask)
    .then((res) => {
      console.log(res);
      this.activeTask = <ATask><unknown>null;
      this.getATasks();
    })
    .catch((err) => {
      console.log(err);
    })
    },
    async newATask() {
      if( this.activeTask != null){
        alert("There is an active Task")
        return;
      }
      await api
    .post<ATask>('/s/bpms/atask')
    .then((res) => {
      console.log(res);
      this.activeTask = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSajerStore, import.meta.hot))
}
