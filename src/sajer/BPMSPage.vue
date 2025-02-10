<template>
  <q-page>
    <add-task v-if="isAddTaskVisible" @hide="isAddTaskVisible=false" />
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
import AddTask from "src/sajer/bpms/AddTask.vue";
import { ref } from "vue";

const isAddTaskVisible = ref(false);

</script>
