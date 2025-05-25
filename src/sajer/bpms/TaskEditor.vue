<template>
    <pop-up v-if="isAddTaskVisible" @ok="onOK" v-model="isAddTaskVisible" :comp="AddTask" />
<span style="padding: 6px">
    <span v-if="task.id != '' " >
    <q-icon name="check" /><q-icon  size="32px" name="edit" color="yellow" @click="isAddTaskVisible = true"/>
    </span>
    <q-icon v-else name="save" color="red" size="32px" @click="onTaskSave" />
    {{ task.grp }}>{{ task.subgroup }}>{{ task.name }} ({{ task.id }})</span>
</template>

<script setup lang="ts">
import type {Task} from "./entities"
import PopUp from "../components/PopUp.vue";
import { defineAsyncComponent, ref } from "vue";
import { api } from "src/boot/axios";
const AddTask = defineAsyncComponent(() => import('./AddTask.vue'),)

const task = defineModel<Task>({required: true});
const emits = defineEmits({
  onChange: null,
});
const isAddTaskVisible = ref(false);

async function onTaskSave() {
    console.log("save");
    await api
        .post<Task>('/s/bpms/task', task.value)
        .then((ret) => {
          task.value = ret.data;
          emits('onChange');
        })
        .catch((err) => {
          console.log(err)
        })
}

function onOK(tsk: Task){
    task.value = tsk;
    emits('onChange');
}
</script>