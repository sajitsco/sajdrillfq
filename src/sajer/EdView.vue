<template>
    {{ data }}
    <div> <q-tree style="font-size: 28px" selected-color="green-9" :nodes="data" node-key="key">
            <template v-slot:default-header="prop">
                <div v-if="prop.node.key > 0" class="row items-center mjitem">
                    <div class="text-weight-bold">
                        {{ prop.node.label }}<q-btn v-if="prop.node.children && !isInEditMode" icon="add" round flat size="sm" @click="addNewItem(prop.node)"/>
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
        </q-tree></div>
</template>

<script setup lang="ts">
import type { QTreeNode } from 'quasar';
import { ref } from 'vue';

defineProps<{
    data: QTreeNode[]
}>()

const isInEditMode = ref(false);
let cntr = 100;
let selectedParent: QTreeNode = <QTreeNode><unknown>null;

function addNewItem(node: QTreeNode){
    selectedParent = node;
    isInEditMode.value= true;
    node.children?.push({label: "newItem", children: [], key: -1, handler: handle1, icon: 'check'});
}

function handle1(nd: QTreeNode<unknown>){
    console.log(nd.label);
}

function checkInItem(node: QTreeNode){
    isInEditMode.value= false;
    node.key = cntr++;
}

function deleteItem() {
    isInEditMode.value= false;
    if(selectedParent.children?.length)
    delete selectedParent.children[selectedParent.children?.length-1];
}
</script>