<template>
  <q-card bordered :style="atask.status == ATaskStatus.PAUSED ? { backgroundColor: 'grey' } : { backgroundColor: 'aquamarine' }"
    class="q-ma-sm, q-pa-sm">
    <q-card-actions>
<q-btn v-if="atask.status == ATaskStatus.ACTIVE" round color="secondary" icon="pause" @click="atask.status = ATaskStatus.PAUSED;$s.b.updateATasks(atask)" />
      <q-space />
      <q-btn color="primary" round :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded" />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-card-section>
          {{ atask.id }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input v-model="atask.description" label="Description" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          {{ atask }}
        </q-card-section>
        <q-separator />
        <q-card-actions>
<q-btn round color="secondary" icon="done"  @click="atask.status = ATaskStatus.COMPLETED;$s.b.updateATasks(atask)"/>
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