<template>
  <q-page>
    <div class="row">
      <div style="width: 100%; background-color: cornflowerblue;" class="q-ma-xs, q-pa-xs">
        <template v-if="$s.s.activeTask">
          <active-task v-model="$s.s.activeTask" />
        </template>
      </div>
      <div style="width: 100%;" v-for="(atask, index) in $s.s.atasks" :key="atask.id" class="q-ma-xs, q-pa-xs">
        <template v-if="$s.s.atasks[index]">
          <a-task v-model="$s.s.atasks[index]" />
        </template>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="$s.s.newATask()" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import ATask from "src/sajer/ATask.vue"
import ActiveTask from "src/sajer/ActiveTask.vue"
</script>
