<template>
  <q-card bordered :style="atask.status == ATaskStatus.PAUSED ? { backgroundColor: 'grey' } : { backgroundColor: 'aquamarine' }"
    class="q-ma-sm, q-pa-sm">
    <q-card-actions>
<q-btn v-if="atask.status == ATaskStatus.ACTIVE" round color="secondary" icon="pause" @click="atask.status = ATaskStatus.PAUSED;$s.b.updateATasks(atask)" />
<span style="padding: 6px;">{{ atask.task.grp }}>{{ atask.task.subgroup }}>{{ atask.task.name }}</span>
      <q-space />
      <q-btn color="primary" round :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded" />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-card-section>
          <q-card style="background-color: rgb(255,180,180);">
            <q-card-section class="q-pt-xs">
          <q-btn round icon="add" size="xs" color="green"/><span style="margin: 6px;">مصارف ورودی</span>
          <hr/>
          <div>
            <span style="padding: 6px;">کالای یک</span>
            <input type="number" label="asdf" />
          </div>
        </q-card-section>
          </q-card>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-card style="background-color: rgb(180,255,180);">
            <q-card-section class="q-pt-xs">
          <q-btn round icon="add" size="xs" color="green"/><span style="margin: 6px;">محصولات خروجی</span>
          <hr/>
          <div>
            <span style="padding: 6px;">کالای یک</span>
            <input type="number" label="asdf" />
          </div>
        </q-card-section>

          </q-card>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input v-model="atask.description" label="توضیحات" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          {{ atask }}
        </q-card-section>
        <q-separator />
        <q-card-actions>
<q-btn round color="green-9" icon="done"  @click="atask.status = ATaskStatus.COMPLETED;$s.b.updateATasks(atask)"/>
    </q-card-actions>
      </div>
    </q-slide-transition>
  </q-card>

</template>

<script setup lang="ts">
import type { ATask } from './entities';
import { ATaskStatus } from './entities';
import { ref } from 'vue';

const expanded = ref(false);
const atask = defineModel<ATask>({
  required: true,
});

</script>