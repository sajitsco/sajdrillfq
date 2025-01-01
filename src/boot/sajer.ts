import { defineBoot } from '#q-app/wrappers'
import { useExampleStore } from 'src/stores/example-store'
import { useSajerStore } from 'stores/sajer-store'

const ss = useSajerStore()
const ex = useExampleStore()

const es = {s: ss,ex: ex}

declare module 'vue' {
  interface ComponentCustomProperties {
    $s: typeof es
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$s = es
})

export { es }
