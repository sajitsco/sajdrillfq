<template>
  <div v-show="model" style="position: fixed; top:0px;left:0px; width: 100%; height: 100%; background-color: gray; z-index: 11">
    <q-card class="q-pa-sm fixed-center" style="max-width: 500px; width: 99%; height: 99%">
      <component :is="comp" @ok="onOK" @cancel="model = false;$emit('cancel');" />
    </q-card>
  </div>
</template>

<script setup lang="ts">

const model = defineModel();

defineProps<{
  comp: unknown,
}>()

const emits = defineEmits({
  cancel: null,
  ok: null,
})

function onOK(dt: unknown) {
  emits('ok', dt);
  model.value = false;
}

</script>