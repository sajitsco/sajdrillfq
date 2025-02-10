<template>
<add-resource ref="popup1" @ok="onOK" @cancel="popup1.hide();" />
  <q-card :style="{backgroundColor: bgColor}">
    <q-card-section class="q-pt-xs">
      <q-btn round icon="add" color="green" @click="showPopUp()" /><span
        style="margin: 10px; font-size: 18px; font-weight: bolder"
        >{{ title }}</span
      >
      <hr />
      <div>
        <div style="width: 100%" v-for="item in list" :key="item.id" class="q-ma-xs, q-pa-xs">
          <q-icon :name="icons[item.type]" size="md" />{{ item.title
          }}<q-input
            style="float: left"
            dense
            v-if="item.countable"
            v-model="item.count"
            type="number"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Resource } from './entities'
import AddResource from './AddResource.vue'

const icons = ref(<Record<string, string>>{ file: 'file_open', asdf: 'check' })
const popup1 = ref(<typeof AddResource>(<unknown>null))

function showPopUp() {
  popup1.value.show()
}
function onOK(res: Resource) {
  list.value.push(res)
}

const list = defineModel<Resource[]>({
  required: true,
})

defineProps<{
    bgColor: string,
    title: string
}>()
</script>
