<template>
    <div
      style="
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: gray;
        z-index: 11;
      "
    >
    {{ selected }}
    <q-card class="q-ma-xs q-pa-sm fixed-center" style="max-width: 500px;width: 90%;height: 80%;">
        <q-scroll-area style="height: 100%;">
          <q-tree ref="tr" selected-color="primary"
      :nodes="simple"
      node-key="label"
      :filter="filter"
      default-expand-all
      :filter-method="myFilterMethod"
      v-model:selected="selected"
    />
    </q-scroll-area>
        
    </q-card>
    <q-page-sticky position="bottom" :offset="[18, 18]">
      <q-toolbar class="bg-primary text-white rounded-borders">
        <q-input  ref="filterRef" dark dense v-model="filter" class="q-ml-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>        
        <q-space />
        <q-btn round size="large" flat icon="close" @click="showAddTask = false" color="red" class="q-mr-xs" />
        <q-btn v-if="selected" round size="large" flat icon="check" @click="showAddTask = false" color="green" class="q-mr-xs" />
      </q-toolbar>
    </q-page-sticky>
    </div>
</template>

<script setup  lang="ts">
import { QTree } from 'quasar';
import { ref } from 'vue';

const tr = ref(<QTree><unknown>null);

const selected = ref(null)

const showAddTask = defineModel<boolean>({
  required: true,
});

function myFilterMethod(node: unknown, filter: string): boolean {
  const filt = filter.toLowerCase()
  const nd = <TreeItem>node;
  return nd.label.toLowerCase().indexOf(filt) > -1
}

interface TreeItem {
  selectable?: boolean;
  label: string;
  children?: TreeItem[];
}

const simple= ref(<TreeItem[]>[
        {
          selectable: false,
          label: 'Satisfied customers',
          children: [
            {selectable: false,
              label: 'Good food',
              children: [
                { label: 'Quality ingredients', key: 1 },
                { label: 'Good recipe', key: 2 }
              ]
            },
            {selectable: false,
              label: 'Pleasant surroundings',
              children: [
                { label: 'Happy atmosphere' },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' }
              ]
            }
          ]
        }
      ]);
const filter = ref('')
const filterRef = ref(null)



const list = [
  {code: '1', label: 'label1', opG: 'Xarid', prG: 'Group1', prtN: 'Part1', prS: 1, ocM: ''},
  {code: '2', label: 'label2', opG: 'Tolid', prG: 'Group1', prtN: 'Part2', prS: 2, ocM: 'tarash1'},
  {code: '3', label: 'label3', opG: 'Tolid', prG: 'Group1', prtN: 'Part3', prS: 3, ocM: 'tarash1'},
  {code: '4', label: 'label4', opG: 'Xarid', prG: 'Group2', prtN: 'Part1', prS: 1, ocM: ''},
  {code: '5', label: 'label5', opG: 'Tolid', prG: 'Group2', prtN: 'Part2', prS: 2, ocM: 'tarash1'},
  {code: '6', label: 'label6', opG: 'Tolid', prG: 'Group2', prtN: 'Part3', prS: 3, ocM: 'tarash1'},
  {code: '7', label: 'label7', opG: 'Xarid', prG: 'Group3', prtN: 'Part1', prS: 1, ocM: ''},
  {code: '8', label: 'label8', opG: 'Tolid', prG: 'Group3', prtN: 'Part2', prS: 2, ocM: 'tarash1'},
  {code: '9', label: 'label9', opG: 'Tolid', prG: 'Group3', prtN: 'Part3', prS: 3, ocM: 'tarash1'},
  {code: '10', label: 'label10', opG: 'Tolid', prG: 'Group4', prtN: 'Part1', prS: 1, ocM: 'tarash2'},
];

CreateTree();

function CreateTree() {
  const opG: Record<string, Record<string, TreeItem[]>> = {};
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if(element)  {
      if(!(element.opG in opG)){
        opG[element.opG] = {};
      }

      const str1 = element.opG;
      if(opG[str1] != undefined) {
        if(!(element.prG in opG[str1])){
          opG[str1][element.prG] = [];
        }

        if(element.prG in opG[str1]){
          opG[str1][element.prG]?.push({label: element.label});
        }
      }
    }
    
  }
  simple.value = [];
  for (const [key, value] of Object.entries(opG)) {
    
    const prGlist: TreeItem[] = [];
    for (const [k1, v1] of Object.entries(value)) {
      prGlist.push({selectable: false, label: k1, children: v1})
    }
    simple.value.push({selectable: false, label: key, children: prGlist})
  }
}
</script>