<template>
    <q-scroll-area style="height: 200px;">
        <q-tree class="q-mx-sm" no-connectors :nodes="$s.a.accounts.children" node-key="label" />
    </q-scroll-area>

</template>

<script setup lang="ts">
</script>