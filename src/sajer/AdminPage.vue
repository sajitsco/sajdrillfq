<template>
  <q-page v-if="$s.s.roles.indexOf('ADMIN') > 0">
    <div class="row">
      {{ $t('success') }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
</script>
