<template>
  <div style="background-color: white; padding: 5px;" class="justify-center items-center">
    <q-input v-model="un" />
    <q-input type="password" v-model="ps" />
    <q-btn label="login" @click="$s.s.login(un,ps)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const un = ref('sajer')
const ps = ref('sajer')
</script>
