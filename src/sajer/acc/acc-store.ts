import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import type { AccountTree } from './entities'


export const useACCStore = defineStore('acc', {
  state: () => ({
    accounts: <AccountTree><unknown>{children:[{label: "Accounts"}]},}),

  actions: {
    getAccounts() {
      api
    .get<AccountTree>('/s/acc/account')
    .then((res) => {
      this.accounts = res.data;
      this.accounts.children = res.data.children.sort((n1,n2) => n1.code - n2.code);
      for (let index = 0; index < this.accounts.children.length; index++) {
        const element = this.accounts.children[index];
        if(element){
          element.children = element.children.sort((n1,n2) => n1.code - n2.code);
        }
      }
      //console.log(res.data)
    })
    .catch(() => {
      this.accounts = <AccountTree><unknown>{children:[{label: "Accounts"}]};
    })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useACCStore, import.meta.hot))
}
