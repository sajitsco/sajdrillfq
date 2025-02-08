<template>
  <q-page>
    <ed-view :data="simple" />
    <add-task v-model="showAddTask" v-if="showAddTask" />
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
      <q-btn v-show="!$s.b.activeTask" fab icon="add" color="green-10" @click="showAddTask = true" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import ATask from "src/sajer/bpms/ATask.vue"
import ActiveTask from "src/sajer/bpms/ActiveTask.vue"
import AddTask from "src/sajer/bpms/AddTask.vue";
import EdView from "./EdView.vue";
import { ref } from "vue";
import { CreateTree } from "src/sajer/bpms";

const showAddTask = ref(false);
const simple = ref(CreateTree())
console.log(simple.value);

</script>
