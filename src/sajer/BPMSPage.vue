<template>
  <q-page>
    <pop-up v-if="isAddTaskVisible" @ok="onOK" v-model="isAddTaskVisible" :comp="AddTask" />
    <div class="row">
      <div style="width: 100%; background-color: cornflowerblue;" class="q-ma-xs, q-pa-xs">
        <template v-if="$s.b.activeTask">
          <active-task v-model="$s.b.activeTask" />
        </template>
      </div>
      <div style="width: 100%;" v-for="(atask, index) in $s.b.atasks" :key="atask.id" class="q-ma-xs, q-pa-xs">
        <template v-if="$s.b.atasks[index]">
          <a-task v-model="$s.b.atasks[index]" />
        </template>
      </div>
    </div>
    <q-page-sticky style="left: auto;" position="bottom-right" :offset="[18, 18]">
      <q-btn v-show="!$s.b.activeTask" fab icon="add" color="green-10" @click="isAddTaskVisible = true" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import ATask from "src/sajer/bpms/ATask.vue"
import ActiveTask from "src/sajer/bpms/ActiveTask.vue"
import { defineAsyncComponent, ref } from "vue";
import PopUp from "./components/PopUp.vue";
import type { Task } from "./bpms/entities";
import { es } from 'src/boot/sajer'

const AddTask = defineAsyncComponent(() => import('./bpms/AddTask.vue'),)

const isAddTaskVisible = ref(false);

function onOK(task:Task) {
  console.log(task);
  es.b.newATask(task);
}

</script>
