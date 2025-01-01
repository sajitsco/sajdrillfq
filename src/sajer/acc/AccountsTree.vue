<template>
    <q-scroll-area style="height: 200px;">
        <q-tree no-connectors :nodes="$s.s.accounts.children" node-key="label" />
    </q-scroll-area>

</template>

<script setup lang="ts">
</script>