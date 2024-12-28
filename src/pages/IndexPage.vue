<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <q-btn @click="checkUser()" label="Check User" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios'

async function checkUser() {
  await api
    .get('/s/sajer')
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
