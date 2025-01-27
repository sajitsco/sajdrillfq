<template>
  <div style="position: absolute; width: 100%; height: 100%; background-color: gray; z-index: 11">
    <q-card class="q-pa-sm fixed-center" style="max-width: 500px; width: 99%; height: 99%">
      <q-scroll-area style="height: 100%">
        <q-tree style="font-size: 28px;"
          ref="tr"
          selected-color="green-9"
          :nodes="simple"
          node-key="key"
          :filter="filter"
          :filter-method="myFilterMethod"
          v-model:selected="selected"
        >
        <template v-slot:default-header="prop">
        <div class="row items-center" @click="onItemClicked(prop.node)">
          <q-icon :name="prop.node.icon || icons[prop.node.label]" color="orange" size="28px" class="q-mr-sm" />
          <div class="text-weight-bold">{{ prop.node.label }}</div>
        </div>
      </template>

<!-- <template v-slot:default-body="prop">
  
      </template> -->
      </q-tree>
      </q-scroll-area>
    </q-card>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-toolbar class="bg-primary text-white rounded-borders">
        <q-btn
          v-if="selected"
          round
          size="large"
          flat
          icon="check"
          @click="showAddTask = false"
          color="green"
          class="q-mr-xs"
        />
        <q-btn
          round
          size="large"
          flat
          icon="add"
          @click="addNewNode()"
          color="green"
          class="q-mr-xs"
        />
        <q-input ref="filterRef" dark dense v-model="filter" class="q-ml-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn
          round
          size="large"
          flat
          icon="close"
          @click="showAddTask = false"
          color="red"
          class="q-mr-xs"
        />
        
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup lang="ts">
import { QTree } from 'quasar'
import { ref } from 'vue'
import type { TreeItem } from './entities'
import { CreateTree } from '.'

const tr = ref(<QTree>(<unknown>null))
const simple = ref(CreateTree())
const selected = ref(null)
const clicked = ref(<TreeItem>(<unknown>null))

const showAddTask = defineModel<boolean>({
  required: true,
})

const icons: Record<string,string> = {
  Xarid: 'shopping_cart',
  Tolid: 'factory',
  vVv: 'dynamic_feed',
}

function myFilterMethod(node: unknown, filter: string): boolean {
  const filt = filter.toLowerCase()
  const nd = <TreeItem>node
  let bol1 = false
  if (nd.content) {
    const jnc = JSON.stringify(nd.content);
    const re = /"/gi;
    const result = jnc.replace(re, "");
    bol1 = result.toLowerCase().indexOf(filt) > -1;
  }
  return nd.label.toLowerCase().indexOf(filt) > -1 || bol1
}


const filter = ref('')
const filterRef = ref(null)

function rnd1(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addNewNode(){
  if(clicked.value){
    const node = clicked.value;
    let icn = 'extension';
    if(node.type == 2) {
      icn = 'work_history';
    }
    
    const newNode: TreeItem = {selectable: false, label: 'asdfg'+rnd1(100,200).toString(), key: rnd1(100,200), children: [], parent: node, type: node.type+1, icon: icn};
    //const newNewItem: TreeItem = {selectable: false, label: 'new item', key: rnd1(100,200), parent: newNode};
    //const newNewItem2: TreeItem = {selectable: false, label: 'new item'+rnd1(100,200).toString(), key: rnd1(100,200)};
    //if(newNode[0]){
      //newNode.children?.push(newNewItem);
    //  newNode[0].children?.push(newNewItem2);
node.children?.splice(node.children?.length,0, newNode);
    //}    
  }  else {
    simple.value.push({selectable: false, label: 'asdfg'+rnd1(100,200).toString(), key: rnd1(100,200), children: [], icon: 'add', type: 1});
  }

}

function onItemClicked(node: TreeItem){
  console.log(node.type);
  clicked.value = node;
}
</script>