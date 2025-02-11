<template>
  <div style="position: absolute; width: 100%; height: 100%; background-color: gray; z-index: 11" @click="$emit('hide')">
    <q-card class="q-pa-sm fixed-center" style="max-width: 500px; width: 99%; height: 99%" @click.stop>
      <div style="height: 100%;display: grid;grid-template-rows: auto max-content;">
      <ed-view :new-item="newTaskItem" style="padding: 5px;" v-model="task" :data="simple" :max-level="3" />
      <div><q-toolbar class="bg-primary text-white rounded-borders">
        <q-btn v-if="task" round size="large" flat icon="check" @click="onAddTask" color="green" class="q-mr-xs" />
        <q-space />
        <q-btn round size="large" flat icon="close" @click="$emit('hide')" color="red" class="q-mr-xs" />
      </q-toolbar></div>        
      </div>

    </q-card>
  </div>
</template>

<script setup lang="ts">
import EdView from "../components/EdView.vue";
import { ref } from "vue";
import type { TreeItem } from "./entities";
import { useBPMSStore } from "./bpms-store";

const task = ref(null)
function onAddTask(dt: unknown) {
  console.log(dt);
  emit('hide');
}

const emit = defineEmits({
  hide: null
})

function newTaskItem(){
  return {name: "Task1"};
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
          prGlist.push({selectable: false, label: k1, children: v1, key: cntr++, icon: 'extension', level: 2})
        }
        
      }
      if( key != ''){
        simple.push({selectable: false, label: key, children: prGlist, key: cntr++, level: 1})
      }
    }

    return simple;
  }
</script>
