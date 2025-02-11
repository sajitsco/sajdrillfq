<template>
  <div v-show="showPopup" style="position: absolute; width: 100%; height: 100%; background-color: gray; z-index: 11">
    <q-card class="q-pa-sm fixed-center" style="max-width: 500px; width: 99%; height: 99%">
      <q-scroll-area style="height: 100%; border: 1px red solid">
        <q-btn round size="large" flat icon="check" @click="res={type: 'asdf',id: '', countable: false, data: {}, title: 'title1', count: 1}" color="green" class="q-mr-xs" />
      </q-scroll-area>
    </q-card>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-toolbar class="bg-primary text-white rounded-borders">
        <q-btn v-if="res" round size="large" flat icon="check" @click="onOk()" color="green" class="q-mr-xs" />
        <q-space />
        <q-btn round size="large" flat icon="close" @click="$emit('cancel')" color="red" class="q-mr-xs" />
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Resource } from '../bpms/entities';

const res = ref(<Resource><unknown>null)

  const emit = defineEmits({
  // No validation
  cancel: null,

  // Validate submit event
  ok: null,
})

const showPopup = ref(false);

function onOk() {
  showPopup.value = false;
  emit('ok',res.value);
}

function show(){
  res.value = <Resource><unknown>null;
  showPopup.value = true;
}

function hide(){
  showPopup.value = false;
}

defineExpose({
      show,hide
    })
</script>