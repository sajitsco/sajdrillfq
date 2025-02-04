<template>
  <q-card
    bordered
    :style="
      atask.status == ATaskStatus.PAUSED
        ? { backgroundColor: 'grey' }
        : { backgroundColor: 'aquamarine' }
    "
    class="q-ma-sm, q-pa-sm"
  >
    <q-card-actions>
      <q-btn
        v-if="atask.status == ATaskStatus.ACTIVE"
        round
        color="secondary"
        icon="pause"
        @click="
          atask.status = ATaskStatus.PAUSED;
          $s.b.updateATasks(atask)
        "
      />
      <span style="padding: 6px"
        >{{ atask.task.grp }}>{{ atask.task.subgroup }}>{{ atask.task.name }}</span
      >
      <q-space />
      <q-btn
        color="primary"
        round
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-card-section>
          <q-card style="background-color: rgb(255, 180, 180)">
            <q-card-section class="q-pt-xs">
              <q-btn
                round
                icon="file_present"
                color="green"
                @click="func1()"
                style="margin-left: 10px"
              /><q-btn round icon="add" color="green" /><span
                style="margin: 10px; font-size: 18px; font-weight: bolder"
                >مصارف ورودی</span
              >
              <hr />
              <div>
                <span style="padding: 6px">کالای یک</span>
                <input type="number" label="asdf" />
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-card style="background-color: rgb(180, 255, 180)">
            <q-card-section class="q-pt-xs">
              <span style="padding: 5px"
                ><i
                  style="
                    font-size: 40px;
                    color: green;
                    position: relative;
                    float: right;
                    right: 45px;
                    top: -4px;
                  "
                  class="material-icons"
                  >file_present</i
                ><input
                  style="position: relative; opacity: 0; width: 40px; height: 25px; top: -5px"
                  type="file"
                  id="myFile"
                  name="filename"
              /></span>
              <q-btn round icon="add" size="sm" color="green" /><span style="margin: 10px"
                >محصولات خروجی</span
              >
              <hr />
              <div>
                <span style="padding: 6px">کالای یک</span>
                <input type="number" label="asdf" />
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-input v-model="atask.description" label="توضیحات" />
        </q-card-section>
        <q-separator />
        <q-card-section>
          {{ atask }}
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn
            round
            color="green-9"
            icon="done"
            @click="
              atask.status = ATaskStatus.COMPLETED;
              $s.b.updateATasks(atask)
            "
          />
        </q-card-actions>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { api } from 'src/boot/axios'
import type { ATask } from './entities'
import { ATaskStatus } from './entities'
import { ref } from 'vue'

const expanded = ref(false)
const atask = defineModel<ATask>({
  required: true,
})

function func1() {
  const i1 = document.createElement('input')
  i1.type = 'file'
  i1.addEventListener('change', onChange)
  i1.click()
}

function onChange(event: Event): void {
  console.log((event.target as HTMLInputElement).files?.length)
  const files = (event.target as HTMLInputElement).files
  if (files) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      console.log(file)
      const formData = new FormData();
      formData.append("file", <Blob>file);
      api.post('/p/sajer/uf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }
  }
}
</script>
