<template>
    <pop-up v-if="isAddResourceVisible" @ok="onOK" v-model="isAddResourceVisible" :comp="AddResource" />
<span :title="generateTitle(resource)"><q-icon  size="32px" name="edit" color="yellow" @click="isAddResourceVisible = true"/>
    <span v-if="resource.id != '' " >
    <q-icon name="check" />
    </span>
    <q-icon v-else name="save" color="green" size="32px" @click="onTaskSave" />
    {{ generateTitle(resource)
          }} ({{ resource.id }})</span>
</template>

<script setup lang="ts">
import type {Resource} from "./entities"
import PopUp from "../components/PopUp.vue";
import { defineAsyncComponent, ref } from "vue";
//import { api } from "src/boot/axios";
const AddResource = defineAsyncComponent(() => import('./AddResource.vue'),)

const resource = defineModel<Resource>({required: true});
  const emits = defineEmits({
  onChange: null,
});

const isAddResourceVisible = ref(false);

async function onTaskSave() {
    console.log("save");
    /* await api
        .post<Resource>('/s/bpms/task', resource.value)
        .then((ret) => {
          resource.value = ret.data;
          emits('onChange');
        })
        .catch((err) => {
          console.log(err)
        }) */
}

function onOK(rsrc: Resource){
  resource.value = rsrc;
  emits('onChange');
}

function generateTitle(res: Resource): string{
  let title = res.title;
  let parent = res.parent;
  while( parent){
    title += "<"+parent.title;
    parent = parent.parent;
  }
  //if( title.length > 20){
  //  return title.substring(0,20)+'...';
  //}
  return title;
}
</script>

<style>
span:active:after {
  position: absolute;
  content:attr(title);
  background: #bada55;
  left: 0px;
  top: 45px;
}
</style>