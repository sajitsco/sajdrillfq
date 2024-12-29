<template>
  <q-page>
    <div class="row">
      <div style="width: 100%;" v-for="(atask, index) in $ss.atasks" :key="atask.id" class="q-ma-xs, q-pa-xs">
        <template v-if="$ss.atasks[index]">
          <a-task v-model="$ss.atasks[index]" />
        </template>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="$ss.getATasks()" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import ATask from "src/sajer/ATask.vue"
</script>
