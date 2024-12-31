import { defineBoot } from '#q-app/wrappers'
import { useExampleStore } from 'src/stores/example-store'
import { useSajerStore } from 'stores/sajer-store'

const ss = useSajerStore()
const ex = useExampleStore()

const es = {ss: ss,ex: ex}

declare module 'vue' {
  interface ComponentCustomProperties {
    $ss: typeof es
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$ss = es
})

export { ss }
