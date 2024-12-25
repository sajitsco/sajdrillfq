import { defineBoot } from '#q-app/wrappers'
import { useSajerStore } from 'stores/sajer-store'

const ss = useSajerStore()

declare module 'vue' {
  interface ComponentCustomProperties {
    $ss: typeof ss
  }
}

export default defineBoot(({ app }) => {
  app.config.globalProperties.$ss = ss
})

export { ss }
