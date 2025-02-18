<template>
      <div style="height: 100%;display: grid;grid-template-rows: auto max-content;">
      <ed-view :edit-item="editTaskItem" :new-item="newTaskItem" style="padding: 5px;" v-model="task" :data="simple" :max-level="3" />
      <div><q-toolbar class="bg-primary text-white rounded-borders">
        <q-btn v-if="task" round size="large" flat icon="check" @click="onAddTask" color="green" class="q-mr-xs" />
        <q-space />
        <q-btn round size="large" flat icon="close" @click="$emit('cancel')" color="red" class="q-mr-xs" />
      </q-toolbar></div>        
      </div>
</template>

<script setup lang="ts">
import EdView from "../components/EdView.vue";
import { ref } from "vue";
import type { Task, TreeItem } from "./entities";
import { useBPMSStore } from "./bpms-store";

const task = ref(null)
function onAddTask() {
  console.log(task.value);
  emit('ok');
}

const emit = defineEmits({
  ok: null,
  cancel: null,
})

function newTaskItem(node: TreeItem){
  const content: Task = {id: "",name: "جدید", code: 0, subgroup: "", grp: ""};
  if(node){
  if(node.level == 1){
    content.grp = node.label?node.label:"unknown"
  }
  if(node.level == 2){
    content.subgroup = node.label?node.label:"unknown";
    if(node.content){
      const tsk = <Task>node.content;
      content.grp = tsk.grp;
    }
  }    
  }

  return content;
}

function editTaskItem(node: TreeItem){
  const tsk = <Task>node.content;
  tsk.name = node.label?node.label:"unknown";
}

const uBPMS = useBPMSStore();
const simple = ref(CreateTree())
function CreateTree(): TreeItem[] {
    const simple: TreeItem[]= [];
    const opG: Record<string, Record<string, TreeItem[]>> = {};
    let cntr = 1;

    for (let index = 0; index < uBPMS.tasks.length; index++) {
      const element = uBPMS.tasks[index];
      if(element)  {
        if(!(element.grp in opG)){
          opG[element.grp] = {};
        }
  
        const str1 = element.grp;
        if(opG[str1] != undefined) {
          if(!(element.subgroup in opG[str1])){
            opG[str1][element.subgroup] = [];
          }
  
          if(element.subgroup in opG[str1]){
            opG[str1][element.subgroup]?.push({label: element.name, key: cntr++, content: element, icon: 'work_history', level: 3});
          }
        }
      }
    }
    for (const [key, value] of Object.entries(opG)) {
      const prGlist: TreeItem[] = [];
      for (const [k1, v1] of Object.entries(value)) {
        if( key == '' && k1 == ''){
          simple.push(...v1)
        } else if( k1 == ''){
          prGlist.push(...v1)
        } else
        {
          prGlist.push({selectable: false, label: k1, children: v1, key: cntr++, icon: 'extension', level: 2, content: {grp: key}})
        }
        
      }
      if( key != ''){
        simple.push({selectable: false, label: key, children: prGlist, key: cntr++, level: 1})
      }
    }

    return simple;
  }
</script>
