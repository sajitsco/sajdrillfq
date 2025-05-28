<template>
  <div style="height: 100%;display: grid; grid-template-rows: auto max-content;">
    <q-scroll-area>
      <q-tree ref="tr" style="font-size: 28px" selected-color="green-9" :nodes="trd" node-key="key" v-model:selected="selected" :filter="filter" v-model:expanded="expandedKeys"
      :filter-method="myFilterMethod" @update:selected="onSelect">
      <template v-slot:default-header="prop">
        <div v-if="prop.node.key > 0" class="row items-center mjitem">
            {{ prop.node.label }}<q-btn v-if="((prop.node.level < maxLevel || maxLevel == -1) && !isInEditMode && isExpanded(prop.node.key)) || (prop.node.children && prop.node.children.length == 0)" icon="add" round flat size="sm"
              @click="addNewItem(prop.node)" />
        </div>
        <div v-else @keypress.stop @click.stop>
          <q-input bottom-slots v-model="prop.node.label" label="Label" dense @click.stop>
            <template v-slot:append>
              <q-icon name="check" @click="checkInItem(prop.node)" class="cursor-pointer" />
              <q-icon name="delete" @click="deleteItem()" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
      </template>
    </q-tree>

    </q-scroll-area>
  <div>
    <q-toolbar class="text-white rounded-borders" style="background-color: darkblue;">
        <q-btn
          round
          size="large"
          flat
          icon="add"
          @click="addNewItem(<TreeItem><unknown>null)"
          color="green"
          class="q-mr-xs"
        />
        <q-input ref="filterRef" dark dense v-model="filter" class="q-ml-md" style="width: 100%">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
  </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TreeItem } from '../bpms/entities';
import type { QTree } from 'quasar';
const props = defineProps<{
  data: TreeItem[],
  maxLevel: number,
  newItem: (node: TreeItem) => unknown;
  editItem: (node: TreeItem) => void;
}>()

const trd = ref(props.data);

const model = defineModel();
const selected = ref(null)
const expandedKeys = ref([])
const filter = ref('')
const isInEditMode = ref(false);
let cntr = 10000;
let selectedParent: TreeItem = <TreeItem><unknown>null;

function addNewItem(node: TreeItem) {
  const cntnt = props.newItem(node);
  if (node == null) {
    selectedParent = <TreeItem><unknown>null;
    trd.value.push({ label: "new Item", children: [], key: -cntr++, icon: 'check', level: 1, type: 1, selectable: props.maxLevel == -1, content: cntnt });
  } else {
    selectedParent = node;
  isInEditMode.value = true;
  if(!node.children){
    node.children = [];
  }
  node.children?.push({ label: "new Item", children: [], key: -cntr++, icon: 'check', level: node.level + 1, selectable:(node.level==(props.maxLevel-1) || props.maxLevel == -1)?true:false, content: cntnt, parent: node });
  }
}

function checkInItem(node: TreeItem) {
  isInEditMode.value = false;
  node.key = cntr++;
  props.editItem(node);
}

function deleteItem() {
  isInEditMode.value = false;
  if (selectedParent == null) {
    delete trd.value[trd.value.length - 1];
  }
  if (selectedParent.children?.length)
    delete selectedParent.children[selectedParent.children?.length - 1];
}

const tr = ref(<QTree>(<unknown>null));


function myFilterMethod(node: unknown, filter: string): boolean {
  const filt = filter.toLowerCase()
  const nd = <TreeItem>node
  let bol1 = false
  if (nd.content) {
    const jnc = JSON.stringify(nd.content)
    const re = /"/gi
    const result = jnc.replace(re, '')
    bol1 = result.toLowerCase().indexOf(filt) > -1
  }
  if(nd.label)
  return nd.label.toLowerCase().indexOf(filt) > -1 || bol1
else
  return bol1
}

function onSelect(){
  if (selected.value) {
    const strData = tr.value.getNodeByKey(selected.value);
    model.value = strData.content;
  } else {
    model.value = null;
  }
}

function isExpanded(key: unknown): boolean{
  if(tr.value && key){
    return tr.value.isExpanded(key);
  }
  
  return false;
}
</script>

<style>
.q-tree__icon, .q-tree__node-header-content .q-icon{
    font-size: 36px;
}
</style>