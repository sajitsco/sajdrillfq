<template>
  <div style="position: absolute; width: 100%; height: 100%; background-color: gray; z-index: 11" @click="$emit('hide')">
    <q-card class="q-pa-sm fixed-center" style="max-width: 500px; width: 99%; height: 99%" @click.stop>
      <ed-view :data="simple" :max-level="3" @ok="onAddTask" @cancel="$emit('hide')" />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import EdView from "src/sajer/EdView.vue";
import { ref } from "vue";
import { CreateTree } from ".";
const simple = ref(CreateTree())
function onAddTask(dt: unknown) {
  console.log(dt);
  emit('hide');
}

const emit = defineEmits({
  hide: null
})

</script>
