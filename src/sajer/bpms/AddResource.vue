<template>
  <div v-show="showPopup" style="position: absolute; width: 100%; height: 100%; background-color: gray; z-index: 11">
    <q-card class="q-pa-sm fixed-center" style="max-width: 500px; width: 99%; height: 99%">
      <q-scroll-area style="height: 100%;">
        <div style="text-align: center;">
          <q-btn-toggle
        v-model="model"
        push
        rounded
        glossy
        toggle-color="purple"
        :options="[
          {value: 'product', slot: 'product'},
          {value: 'file', slot: 'file'}
        ]"
      >
        <template v-slot:product>
          <div class="row items-center no-wrap">
            <div class="text-center">
              انتخاب<br>محصول
            </div>
            <q-icon right name="settings" />
          </div>
        </template>

        <template v-slot:file>
          <div class="row items-center no-wrap">
            <div class="text-center">
              انتخاب<br>فایل
            </div>
            <q-icon right name="file_present" />
          </div>
        </template>
      </q-btn-toggle></div>
<div v-if="model == 'file'" style="padding: 10px;"><q-btn round icon="file_present" color="green" @click="func1()" style="margin-left: 10px" /></div>
<div v-if="model == 'product'" style="padding: 10px;"><q-btn round size="large" flat icon="check" @click="res={type: 'asdf',id: (cnt++).toString(), countable: true, data: {}, title: 'title1', count: 1}" color="green" class="q-mr-xs" /></div>
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
import type { Files, Resource } from './entities';
import { api } from 'src/boot/axios';

const model = ref("file");

const res = ref(<Resource><unknown>null)
const cnt = ref(0);

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

    function func1() {
  const i1 = document.createElement('input')
  i1.type = 'file'
  i1.addEventListener('change', onChange)
  i1.click()
}

function onChange(event: Event): void {
  console.log((event.target as HTMLInputElement).files?.length)
  const files = (event.target as HTMLInputElement).files
  if (files) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      console.log(file)
      const formData = new FormData();
      formData.append("file", <Blob>file);
      api.post<Files>('/p/sajer/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((rs)=>{
        console.log(rs.data.id);
        res.value={type: 'file',id: (cnt.value++).toString(), countable: false, data: {}, title: rs.data.name, count: 1};
      })
    }
  }
}
</script>