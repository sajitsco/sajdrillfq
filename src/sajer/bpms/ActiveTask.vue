<template>
  <q-card bordered :style="atask.status == ATaskStatus.PAUSED ? { backgroundColor: 'grey' } : { backgroundColor: 'aquamarine' }"
    class="q-ma-sm, q-pa-sm">
    <q-card-actions>
<q-btn v-if="atask.status == ATaskStatus.ACTIVE" round color="secondary" icon="pause" @click="atask.status = ATaskStatus.PAUSED;$s.b.updateATasks(atask)" />
      <q-space />
      <q-btn color="primary" round :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded" />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-card-section>
          {{ atask.id }}
        </q-card-section>
        <q-separator />
        <q-card-section>
          {{ atask.duration }}
        </q-card-section>
        <q-separator />
        <q-card-actions>
<q-btn round color="secondary" icon="done" />
    </q-card-actions>
      </div>
    </q-slide-transition>
  </q-card>

</template>

<script setup lang="ts">
import type { ATask } from './entities';
import { ATaskStatus } from './entities';
import { ref } from 'vue';

const expanded = ref(false);
const atask = defineModel<ATask>({
  required: true,
});

/*const simple = ref([
        {
          label: 'Satisfied customers (with avatar)',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
            {
              label: 'Good food (with icon)',
              icon: 'restaurant_menu',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            },
            {
              label: 'Good service (disabled node with icon)',
              icon: 'room_service',
              disabled: true,
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Pleasant surroundings (with icon)',
              icon: 'photo',
              children: [
                {
                  label: 'Happy atmosphere (with image)',
                  img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
                },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' }
              ]
            }
          ]
        }
      ])
*/
</script>