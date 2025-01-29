<template>
  <q-page v-if="$s.s.roles.indexOf('ADMIN') > 0">
    <div class="row">
      {{ $t('success') }}
    </div>
    <div>
      <accounts-tree />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AccountsTree from 'src/sajer/acc/AccountsTree.vue'
</script>
