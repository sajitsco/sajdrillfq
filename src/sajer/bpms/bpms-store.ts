import { defineStore, acceptHMRUpdate } from 'pinia'
import { ATaskStatus } from './entities'
import type { ATask, Task } from './entities'
import { api } from 'src/boot/axios'


export const useBPMSStore = defineStore('bpms', {
  state: () => ({
        activeTask: <ATask><unknown>null,
        atasks: <ATask[]>[],
        tasks: <Task[]>[],
  }),

  actions: {
    getTasks() {
      api
    .get<Task[]>('/s/bpms/task')
    .then((res) => {
      this.tasks = res.data
    })
    .catch(() => {
      this.atasks = []
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
      console.log(atask);
      await api
    .put('/s/bpms/atask',atask)
    .then(() => {
      this.activeTask = <ATask><unknown>null;
      this.getATasks();
    })
    .catch((err) => {
      console.log(err);
    })
    },
    async newATask(data: unknown) {
      if( this.activeTask != null){
        alert("There is an active Task")
        return;
      }
      await api
    .post<ATask>('/s/bpms/atask',data)
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
  import.meta.hot.accept(acceptHMRUpdate(useBPMSStore, import.meta.hot))
}
