<template>
    <div
      style="
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: gray;
        z-index: 11;
      "
    >
    {{ selected }}
    <q-card class="q-ma-xs q-pa-sm fixed-center" style="max-width: 500px;width: 90%;height: 80%;">
        <q-scroll-area style="height: 100%;">
          <q-tree ref="tr" selected-color="primary"
      :nodes="simple"
      node-key="label"
      :filter="filter"
      default-expand-all
      v-model:selected="selected"
    />
    </q-scroll-area>
        
    </q-card>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-toolbar class="bg-primary text-white rounded-borders">
        <q-input  ref="filterRef" dark dense v-model="filter" class="q-ml-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>        
        <q-space />
        <q-btn round size="large" flat icon="close" @click="showAddTask = false" color="red" class="q-mr-xs" />
        <q-btn v-if="selected" round size="large" flat icon="check" @click="showAddTask = false" color="green" class="q-mr-xs" />
      </q-toolbar>
    </q-page-sticky>
    </div>
</template>

<script setup  lang="ts">
import { QTree } from 'quasar';
import { ref } from 'vue';

const tr = ref(<QTree><unknown>null);

const selected = ref(null)

const showAddTask = defineModel<boolean>({
  required: true,
});
const simple= ref([
        {
          selectable: false,
          label: 'Satisfied customers',
          children: [
            {selectable: false,
              label: 'Good food',
              children: [
                { label: 'Quality ingredients', key: 1 },
                { label: 'Good recipe', key: 2 }
              ]
            },
            {selectable: false,
              label: 'Pleasant surroundings',
              children: [
                { label: 'Happy atmosphere' },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' }
              ]
            }
          ]
        }
      ]);
const filter = ref('')
const filterRef = ref(null)
</script>