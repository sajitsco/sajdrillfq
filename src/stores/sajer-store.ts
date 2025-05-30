import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'
import { useACCStore } from 'src/sajer/acc/acc-store'
import { useBPMSStore } from 'src/sajer/bpms/bpms-store'

const uBPMS = useBPMSStore()
const uACC = useACCStore()

interface IJWT {
  exp: number
  iat: number
  iss: string
  roles: string
  sub: string
}

export const useSajerStore = defineStore('sajer', {
  state: () => ({
    connected: false,
    loggedIn: false,
    roles: '',
  }),

  actions: {
    connect() {
      api
        .get('/p/sajer', { headers: { Authorization: '' } })
        .then(() => {
          this.connected = true

          const token = window.localStorage.getItem('token')
          if (token) {
            api.defaults.headers.common['Authorization'] = 'Bearer ' + token
            api
            .get('/s/sajer')
            .then(() => {
              this.updateData(token)
              this.loggedIn = true
            })
            .catch(() => {
              this.loggedIn = false
            })
          }

          
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
          this.updateData(res.data)
          //window.localStorage.setItem("role",this.roles);
        })
        .catch((err) => {
          this.loggedIn = false
          console.log(err)
        })
    },
    updateData(token: string) {
      const jwt: IJWT = parseJwt(token)
      api.defaults.headers.common['Authorization'] = 'Bearer ' + token
      window.localStorage.setItem('token', token)
      this.loggedIn = true
      this.roles = jwt.roles
      uBPMS.getATasks()
      uBPMS.getTasks()
      uACC.getAccounts()
      if (this.roles == 'ROLE_ADMIN') {
        uBPMS.getCTasks()
      }
    },
  },
})

function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/')
  if (base64) {
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )
    return JSON.parse(jsonPayload)
  }

  return ''
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSajerStore, import.meta.hot))
}
