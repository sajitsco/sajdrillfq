<template>
  <div style="height: 100%;display: grid; grid-template-rows: auto max-content;">
    <q-scroll-area>
      <q-tree ref="tr" style="font-size: 28px" selected-color="green-9" :nodes="data" node-key="key" v-model:selected="selected" :filter="filter"
      :filter-method="myFilterMethod">
      <template v-slot:default-header="prop">
        <div v-if="prop.node.key > 0" class="row items-center mjitem">
          <div class="text-weight-bold">
            {{ prop.node.label }}<q-btn v-if="prop.node.level < maxLevel && !isInEditMode" icon="add" round flat size="sm"
              @click="addNewItem(prop.node)" />
          </div>
        </div>
        <div v-else @keypress.stop>
          <q-input bottom-slots v-model="prop.node.label" label="Label" dense @click.stop>
            <template v-slot:append>
              <q-icon name="check" @click="checkInItem(prop.node)" class="cursor-pointer" />
              <q-icon name="delete" @click="deleteItem()" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
      </template>
    </q-tree>
    <q-btn style="margin: 10px;" icon="add" @click="addNewItem(<TreeItem><unknown>null)" />

    </q-scroll-area>
  <div>
    <q-toolbar class="bg-primary text-white rounded-borders">
        <q-btn
         v-if="selected"
          round
          size="large"
          flat
          icon="check"
          @click="onOK"
          color="green"
          class="q-mr-xs"
        />
        <q-input ref="filterRef" dark dense v-model="filter" class="q-ml-md" style="width: 100%">
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
          @click="$emit('cancel')"
          color="red"
          class="q-mr-xs"
        />
      </q-toolbar>
  </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TreeItem } from './bpms/entities';
import type { QTree } from 'quasar';
const props = defineProps<{
  data: TreeItem[],
  maxLevel: number,
}>()

const selected = ref(null)
const filter = ref('')
const isInEditMode = ref(false);
let cntr = 100;
let selectedParent: TreeItem = <TreeItem><unknown>null;

function addNewItem(node: TreeItem) {
  if (node == null) {
    selectedParent = <TreeItem><unknown>null;
    // eslint-disable-next-line vue/no-mutating-props
    props.data.push({ label: "new Item", children: [], key: -1, icon: 'check', level: 1, type: 1, selectable: false });
  } else {
    selectedParent = node;
  isInEditMode.value = true;
  node.children?.push({ label: "new Item", children: [], key: -1, icon: 'check', level: node.level + 1, selectable:node.level==(props.maxLevel-1)?true:false });
  }
  
}



function checkInItem(node: TreeItem) {
  isInEditMode.value = false;
  node.key = cntr++;
}

function deleteItem() {
  isInEditMode.value = false;
  if (selectedParent == null) {
    // eslint-disable-next-line vue/no-mutating-props
    delete props.data[props.data.length - 1];
  }
  if (selectedParent.children?.length)
    delete selectedParent.children[selectedParent.children?.length - 1];
}

const emit = defineEmits({
  cancel: null,
  ok: null,
})

const tr = ref(<QTree>(<unknown>null));
function onOK() {
  if (selected.value) {
    const strData = tr.value.getNodeByKey(selected.value);
    emit('ok', strData);
  }
  
}

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
</script>