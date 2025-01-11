<template>
  <q-page v-if="$s.s.roles.indexOf('ADMIN') > 0">
    <div class="row">
      {{ $t('success') }}
    </div>
<action-button />
  </q-page>
</template>

<script setup lang="ts">
import ActionButton from 'src/components/ActionButton.vue';
</script>
