<template>
<pop-up v-if="isAddResourceVisible" @ok="onOK"  v-model="isAddResourceVisible" :comp="AddResource" />
  <q-card :style="{backgroundColor: bgColor}">
    <q-card-section class="q-pt-xs">
      <q-btn round icon="add" color="green" @click="isAddResourceVisible = true" />
      <span
        style="margin: 10px; font-size: 18px; font-weight: bolder"
        >{{ title }}</span
      >
      <hr />
      <div>
        <div style="width: 100%" v-for="item,index in list" :key="item.id" class="q-ma-xs, q-pa-xs">
          <q-icon name="delete" size="32px" color="red"/>
          <resource-editor v-if="list[index]" v-model="list[index]" />
          <q-icon :name="icons[item.type]" size="md" /><q-input
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
import { defineAsyncComponent, ref } from 'vue'
import type { Resource } from './entities'
import ResourceEditor from './ResourceEditor.vue';

import PopUp from "../components/PopUp.vue";
const AddResource = defineAsyncComponent(() => import('./AddResource.vue'),)
const isAddResourceVisible = ref(false);

const icons = ref(<Record<string, string>>{ file: 'file_open', asdf: 'check' })

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
