<template>
      <div style="height: 100%;display: grid;grid-template-rows: max-content auto max-content;">
        <div>
          <div style="text-align: center;">
          <q-btn-toggle v-model="optn" push rounded glossy toggle-color="purple" :options="[
            { value: 'product', slot: 'product' },
            { value: 'file', slot: 'file' }
          ]">
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
          </q-btn-toggle>
        </div></div>
<div style="padding: 5px;">
        <div v-if="optn == 'file'" style="padding: 10px;"><q-btn round icon="file_present" color="green"
            @click="func1()" style="margin-left: 10px" /></div>
            <ed-view :edit-item="editResItem" :new-item="newResItem" v-model="res" v-if="optn == 'product'" :data="simple" :max-level="-1" @ok="onAddTask" @cancel="console.log('cancel')" />
</div>
<div><q-toolbar class="bg-primary text-white rounded-borders">
        <q-btn v-if="res" round size="large" flat icon="check" @click="onOk()" color="green" class="q-mr-xs" />
        <q-space />
        <q-btn round size="large" flat icon="close" @click="model = false;$emit('cancel');" color="red" class="q-mr-xs" />
      </q-toolbar></div>
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Files, Resource, TreeItem } from './entities';
import { api } from '../../boot/axios';
import EdView from '../components/EdView.vue';

const model = defineModel();

const optn = ref("file");
const res = ref(<Resource><unknown>null)
const cnt = ref(0);

const emit = defineEmits({
  cancel: null,
  ok: null,
})


function onOk() {
  model.value = false;
  console.log(res.value);
  emit('ok', res.value);
}

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
      }).then((rs) => {
        console.log(rs.data.id);
        res.value = { type: 'file', id: (cnt.value++).toString(), countable: false, data: {}, title: rs.data.name, count: 1, parent: null };
      })
    }
  }
}

function CreateResourcesTree(): TreeItem[] {
    const resources: TreeItem[]= [];
    let cntr = 1;
    
    for (let i = 0; i < 4; i++) {
      const res1: Resource = { type: 'product', id: (cntr).toString(), countable: true, data: {}, title: "G"+i, count: 1, parent: null }
      const grp: TreeItem = {label: "G"+i, key: cntr++, level: 1, children: [], content: res1}
      for (let j = 0; j < 4; j++) {
        const res2: Resource = { type: 'product', id: (cntr).toString(), countable: true, data: {}, title: "SG"+j, count: 1, parent: res1 }
        const sgrp: TreeItem = {label: "SG"+j, key: cntr++,level: 2, children: [], content: res2}
        for (let k = 0; k < 4; k++) {
          const res3: Resource = { type: 'product', id: (cntr).toString(), countable: true, data: {}, title: "PR"+k, count: 1, parent: res2 }
          const pr: TreeItem = {label: "PR"+k, key: cntr++, content: res3, level: 3}
          sgrp.children?.push(pr);
        }
        grp.children?.push(sgrp);
      }
      resources.push(grp);
    }
    return resources;
  }
const simple = ref(CreateResourcesTree())
function onAddTask(dt: unknown) {
  console.log(dt);
}

function newResItem(node: TreeItem) {
  const res: Resource = {title: "title", type: 'product', id: "",countable: true, count: 1, data: null, parent: <Resource>node?.content};
  return res
}

function editResItem(node: TreeItem){
  const res = <Resource>node.content;
  res.title = node.label?node.label:"unknown";
}
</script>