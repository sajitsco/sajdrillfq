<template>
  <q-card :style="atask.status == ATaskStatus.PAUSED?{backgroundColor: 'grey'}:{backgroundColor: 'aquamarine'}" class="q-ma-sm, q-pa-sm">
  <q-btn v-if="atask.status == ATaskStatus.PAUSED" round color="grey" icon="play_arrow" @click="do1()" />
  <q-btn v-if="atask.status == ATaskStatus.ACTIVE" round color="secondary" icon="pause" @click="do2()" />
    {{ atask.status }}    
  </q-card>

</template>

<script setup lang="ts">
import { ss } from 'src/boot/sajer';
import type { ATask } from './bpms';
import { ATaskStatus } from './bpms';

const atask = defineModel<ATask>({
  required: true,
});

async function do1(){
  if( ss.activeTask != null){
        alert("There is an active Task")
        return;
      }
  atask.value.status = ATaskStatus.ACTIVE;
  await ss.updateATasks(atask.value);
}

async function do2(){
  atask.value.status = ATaskStatus.PAUSED;
  await ss.updateATasks(atask.value);
}
</script>