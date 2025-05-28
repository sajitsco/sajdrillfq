<template>
    <q-page-sticky position="bottom" :offset="[0, 18]">
      <q-fab color="accent" icon="keyboard_arrow_up" direction="up">
        <q-btn fab v-if="$router.currentRoute.value.path != '/f/admin' && $s.s.roles.indexOf('ADMIN') > 0" color="primary" @click="$router.push('/f/admin')" icon="admin_panel_settings" />
        <q-btn fab v-if="$router.currentRoute.value.path != '/f/bpms' && $s.s.loggedIn" color="primary" @click="$router.push('/f/bpms')" icon="task_alt" />
        <q-btn fab v-if="$router.currentRoute.value.path != '/'" color="primary" @click="$router.push('/')" icon="home" />
        <q-btn fab v-if="$s.s.loggedIn" color="primary" @click="logout" icon="logout" />
        <q-btn fab v-if="!$s.s.loggedIn" color="primary" @click="login" icon="login" />
      </q-fab>
    </q-page-sticky>
</template>

<script setup lang="ts">
function logout() {
  window.localStorage.removeItem("token");
  window.location.href = "/";
}
function login() {
  window.location.href = "/f/bpms";
}
</script>
