<template>
    <div> <q-tree style="font-size: 28px" selected-color="green-9" :nodes="data" node-key="key">
            <template v-slot:default-header="prop">
                <div v-if="prop.node.key > 0" class="row items-center mjitem">
                    <div class="text-weight-bold">
                        {{ prop.node.label }}<q-btn v-if="prop.node.level<maxLevel && !isInEditMode" icon="add" round flat size="sm" @click="addNewItem(prop.node)"/>
                    </div>
                </div>
                <div v-else>
                <q-input bottom-slots v-model="prop.node.label" label="Label" dense>
                  <template v-slot:append>
                    <q-icon
                      name="check"
                      @click="checkInItem(prop.node)"
                      class="cursor-pointer"
                    />
                    <q-icon
                      name="delete"
                      @click="deleteItem()"
                      class="cursor-pointer"
                    />
                  </template>
                </q-input>
              </div>
            </template>
        </q-tree>
        <q-btn style="margin: 10px;" icon="add" @click="addNewItem(<TreeItem><unknown>null)" />
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TreeItem } from './bpms/entities';

const props = defineProps<{
    data: TreeItem[],
    maxLevel: number,
}>()

const isInEditMode = ref(false);
let cntr = 100;
let selectedParent: TreeItem = <TreeItem><unknown>null;

function addNewItem(node: TreeItem){
  if(node == null){
    selectedParent = <TreeItem><unknown>null;
    // eslint-disable-next-line vue/no-mutating-props
    props.data.push({label: "newItem", children: [], key: -1, icon: 'check', level: 1, type: 1});
  }
    selectedParent = node;
    isInEditMode.value= true;
    node.children?.push({label: "newItem", children: [], key: -1, icon: 'check', level: node.level+1});
}



function checkInItem(node: TreeItem){
    isInEditMode.value= false;
    node.key = cntr++;
}

function deleteItem() {
    isInEditMode.value= false;
    if(selectedParent == null){
        // eslint-disable-next-line vue/no-mutating-props
    delete props.data[props.data.length-1];
    }
    if(selectedParent.children?.length)
    delete selectedParent.children[selectedParent.children?.length-1];
}
</script>