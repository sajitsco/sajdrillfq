<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <action-button />
  </q-layout>
</template>

<script setup lang="ts">
import ActionButton from 'src/sajer/components/ActionButton.vue';
// import { useRouter } from 'vue-router';

// const rt = useRouter()
//   const role = window.localStorage.getItem('role')
//   if (role) rt.push('/f/bpms')
</script>

<style></style>
