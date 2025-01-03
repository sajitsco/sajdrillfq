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
    <q-card class="q-ma-xs q-pa-sm">
        <q-card-actions>
            <q-btn  fab color="blue" icon="ok"/>
        <q-btn @click="showAddTask = false" fab color="red" icon="close" class="absolute" style="top: 4px; right: 4px;"/>
      </q-card-actions>
      <q-separator />
      <q-card-section>
        add task
      </q-card-section>
        
    </q-card>
    
    </div>
</template>

<script setup  lang="ts">
const showAddTask = defineModel<boolean>({
  required: true,
});
</script>