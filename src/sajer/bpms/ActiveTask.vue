<template>
  <q-card bordered :style="atask.status == ATaskStatus.PAUSED
    ? { backgroundColor: 'grey' }
    : { backgroundColor: 'aquamarine' }
    " class="q-ma-xs, q-pa-xs">
    <q-card-actions>
      <q-btn v-if="atask.status == ATaskStatus.ACTIVE" round color="secondary" icon="pause" @click="
        atask.status = ATaskStatus.PAUSED;
      $s.b.updateATasks(atask)
        " />
      <span style="padding: 6px">{{ atask.task.grp }}>{{ atask.task.subgroup }}>{{ atask.task.name }}</span>
      <q-space />
      <q-btn color="primary" round :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded" />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-card-section>
          <q-input v-model="atask.description" label="توضیحات" />
        </q-card-section>
        <q-card-section>
          <resource-list :key="1" :bg-color="'#FFBBBB'" :model-value="atask.inpts" title="مصارف ورودی" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          <resource-list :key="2" :bg-color="'#BBFFBB'" :model-value="atask.otpts" title="محصولات خروجی" />
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn round color="green-9" icon="done" @click="
            atask.status = ATaskStatus.COMPLETED;
          $s.b.updateATasks(atask)
            " />
        </q-card-actions>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import type { ATask } from './entities'
import { ATaskStatus } from './entities'
import { ref, watch } from 'vue';
import ResourceList from './ResourceList.vue';
import { useBPMSStore } from './bpms-store';

const expanded = ref(true)
const atask = defineModel<ATask>({
  required: true,
})

if (!atask.value.inpts) atask.value.inpts = [];
if (!atask.value.otpts) atask.value.otpts = [];

const uBPMS = useBPMSStore();
watch( atask.value, () => {
  uBPMS.updateATasks(uBPMS.activeTask)
})
</script>
