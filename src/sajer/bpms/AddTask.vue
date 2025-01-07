<template>
  <div style="position: absolute; width: 100%; height: 100%; background-color: gray; z-index: 11">
    <q-card class="q-pa-sm fixed-center" style="max-width: 500px; width: 99%; height: 99%">
      <q-scroll-area style="height: 100%">
        <q-tree style="font-size: 28px;"
          ref="tr"
          selected-color="green-9"
          :nodes="simple"
          node-key="key"
          :filter="filter"
          default-expand-all
          :filter-method="myFilterMethod"
          v-model:selected="selected"
        >
        <template v-slot:default-header="prop">
        <div class="row items-center">
          <q-icon :name="prop.node.icon || 'share'" color="orange" size="28px" class="q-mr-sm" />
          <div class="text-weight-bold">{{ prop.node.label }}</div>
        </div>
      </template>

      <template v-slot:default-body="prop">
        <div v-if="prop.node.story">
          <span class="text-weight-bold">This node has a story</span>: {{ prop.node.story }}
        </div>
        <span v-else class="text-weight-light text-black">{{ prop.node.content?.prtN }}</span>
      </template>
      </q-tree>
      </q-scroll-area>
    </q-card>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-toolbar class="bg-primary text-white rounded-borders">
        <q-input ref="filterRef" dark dense v-model="filter" class="q-ml-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn
          round
          size="large"
          flat
          icon="close"
          @click="showAddTask = false"
          color="red"
          class="q-mr-xs"
        />
        <q-btn
          v-if="selected"
          round
          size="large"
          flat
          icon="check"
          @click="showAddTask = false"
          color="green"
          class="q-mr-xs"
        />
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup lang="ts">
import { QTree } from 'quasar'
import { ref } from 'vue'
import type { TreeItem } from './entities'
import { CreateTree } from '.'

const tr = ref(<QTree>(<unknown>null))

const selected = ref(null)

const showAddTask = defineModel<boolean>({
  required: true,
})

function myFilterMethod(node: unknown, filter: string): boolean {
  const filt = filter.toLowerCase()
  const nd = <TreeItem>node
  let bol1 = false
  if (nd.content) {
    const jnc = JSON.stringify(nd.content);
    const re = /"/gi;
    const result = jnc.replace(re, "");
    bol1 = result.toLowerCase().indexOf(filt) > -1;
  }
  return nd.label.toLowerCase().indexOf(filt) > -1 || bol1
}

const simple = ref(CreateTree())
const filter = ref('')
const filterRef = ref(null)
</script>