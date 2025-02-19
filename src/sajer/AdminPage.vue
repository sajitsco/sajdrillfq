<template>
  <q-page v-if="$s.s.roles.indexOf('ADMIN') > 0">
    <div class="row">
      <div style="width: 100%;" v-for="(ctask, index) in $s.b.ctasks" :key="ctask.id" class="q-ma-xs, q-pa-xs">
        <template v-if="$s.b.ctasks[index]">
          <c-task v-model="$s.b.ctasks[index]" />
        </template>
      </div>
    </div>
    <div>
      <accounts-tree />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AccountsTree from 'src/sajer/acc/AccountsTree.vue'
import CTask from './bpms/CTask.vue';
</script>
