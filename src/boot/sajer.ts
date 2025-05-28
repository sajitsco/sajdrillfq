import { defineBoot } from '#q-app/wrappers'
import { useACCStore } from 'src/sajer/acc/acc-store'
import { useBPMSStore } from 'src/sajer/bpms/bpms-store'
import { useSajerStore } from 'stores/sajer-store'

const ss = useSajerStore()
const bs = useBPMSStore()
const as = useACCStore()

const es = { s: ss, b: bs, a: as }

declare module 'vue' {
  interface ComponentCustomProperties {
    $s: typeof es
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$s = es
  es.s.connect()

  if (es.s.roles == 'ROLE_ADMIN') {
    es.s.router.push('/f/admin')
  } else {
    es.s.router.push('/f/bpms')
  }
  setInterval(() => es.s.connect(), 60000)
})

export { es }
