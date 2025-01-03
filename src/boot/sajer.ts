import { defineBoot } from '#q-app/wrappers'
import { useACCStore } from 'src/sajer/acc/acc-store'
import { useBPMSStore } from 'src/sajer/bpms/bpms-store'
import { useSajerStore } from 'stores/sajer-store'

const ss = useSajerStore()
const bs = useBPMSStore()
const as = useACCStore()

const es = {s: ss, b: bs, a: as}

declare module 'vue' {
  interface ComponentCustomProperties {
    $s: typeof es
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$s = es
})

export { es }
