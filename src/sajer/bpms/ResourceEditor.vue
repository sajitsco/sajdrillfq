<template>
    <pop-up v-if="isAddResourceVisible" @ok="onOK" v-model="isAddResourceVisible" :comp="AddResource" />
<span style="padding: 6px">
    <span v-if="resource.id != '' " >
    <q-icon name="check" /><q-icon  size="32px" name="edit" color="yellow" @click="isAddResourceVisible = true"/>
    </span>
    <q-icon v-else name="save" color="red" size="32px" @click="onTaskSave" />
    {{ generateTitle(resource)
          }} ({{ resource.id }})</span>
</template>

<script setup lang="ts">
import type {Resource} from "./entities"
import PopUp from "../components/PopUp.vue";
import { defineAsyncComponent, ref } from "vue";
import { api } from "src/boot/axios";
const AddResource = defineAsyncComponent(() => import('./AddResource.vue'),)

const resource = defineModel<Resource>({required: true});
const isAddResourceVisible = ref(false);

async function onTaskSave() {
    console.log("save");
    await api
        .post<Resource>('/s/bpms/task', resource.value)
        .then((ret) => {
          resource.value = ret.data;
        })
        .catch((err) => {
          console.log(err)
        })
}

function onOK(rsrc: Resource){
  resource.value = rsrc;
}

function generateTitle(res: Resource): string{
  let title = res.title;
  let parent = res.parent;
  while( parent){
    title += "<"+parent.title;
    parent = parent.parent;
  }
  return title;
}
</script>