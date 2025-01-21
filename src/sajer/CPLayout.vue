<template>
  <q-layout view="lHh Lpr lFf">
    <div
      v-if="!$s.s.connected"
      style="color: red;
        border: 1px solid blue;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: gray;
        opacity: 0.8;
        z-index: 1002;
      "
    >
    <h4 class="fixed-center">X Check Your Network Connection!</h4>
    {{ $s.s.connected }}
    </div>
    <div
      v-if="!$s.s.loggedIn"
      style="
        border: 1px solid blue;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: gray;
        opacity: 0.4;
        z-index: 1000;
      "
    >
    </div>
    <div
      v-if="!$s.s.loggedIn"
      style="
        border: 1px solid green;
        z-index: 1001;
      "
      class="fixed-center"
    >
      <login />
    </div>
    <q-page-container
      :style="
        $s.s.connected ? { backgroundColor: 'paleturquoise' } : { backgroundColor: 'lightcoral' }
      "
    >
      <router-view />
    </q-page-container>
    <action-button />
  </q-layout>
</template>

<script setup lang="ts">
import { es } from 'src/boot/sajer'
import login from 'src/sajer/Log-In.vue'
import ActionButton from 'src/sajer/ActionButton.vue';
es.s.connect()
setInterval(() => es.s.connect(), 60000)
</script>

<style></style>
