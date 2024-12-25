<template>
  <div style="background-color: white" class="justify-center items-center">
    <q-input v-model="un" />
    <q-input v-model="ps" />
    <q-btn label="login" @click="login" />
    <q-btn label="Call Secure" @click="checkUser" />
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios'
import { ref } from 'vue'

const un = ref('sajer')
const ps = ref('sajer')

async function login() {
  await api
    .get('/p/auth/op/token', { auth: { password: ps.value, username: un.value } })
    .then((res) => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

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
