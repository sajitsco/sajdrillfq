<template>
  <q-layout view="lHh Lpr lFf">
    <div
      v-if="!$ss.ss.connected"
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
    {{ $ss.ss.connected }}
    </div>
    <div
      v-if="!$ss.ss.loggedIn"
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
      v-if="!$ss.ss.loggedIn"
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
        $ss.ss.connected ? { backgroundColor: 'paleturquoise' } : { backgroundColor: 'lightcoral' }
      "
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ss } from 'src/boot/sajer'
import login from 'src/components/Log-In.vue'
ss.connect()
setInterval(() => ss.connect(), 60000)
</script>

<style></style>
