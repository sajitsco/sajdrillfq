<template>
  <q-card :style="atask.status == ATaskStatus.PAUSED?{backgroundColor: 'grey'}:{backgroundColor: 'aquamarine'}" class="q-ma-sm, q-pa-sm">
  <q-btn v-if="atask.status == ATaskStatus.PAUSED" round color="grey" icon="play_arrow" @click="do1()" />
  <q-btn v-if="atask.status == ATaskStatus.ACTIVE" round color="secondary" icon="pause" @click="do2()" />
  <span style="padding: 6px;">{{ atask.task.grp }}>{{ atask.task.subgroup }}>{{ atask.task.name }}</span>:<span style="padding: 6px;">{{ atask.description }}</span>
  </q-card>

</template>

<script setup lang="ts">
import { es } from 'src/boot/sajer';
import type { ATask } from './entities';
import { ATaskStatus } from './entities';

const atask = defineModel<ATask>({
  required: true,
});

async function do1(){
  if( es.b.activeTask != null){
        alert("There is an active Task")
        return;
      }
  atask.value.status = ATaskStatus.ACTIVE;
  await es.b.updateATasks(atask.value);
}

async function do2(){
  atask.value.status = ATaskStatus.PAUSED;
  await es.b.updateATasks(atask.value);
}
</script>