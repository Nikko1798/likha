<template>
    <fwb-modal v-if="isOpen" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">
          {{ title }}
        </div>
      </template>
  
      <template #body>
        <slot name="body"></slot>
      </template>
  
      <template #footer>
        <div class="flex justify-end space-x-2">
          <fwb-button @click="closeModal" color="dark" >
            {{ cancelText }}
          </fwb-button>
          <fwb-button v-if="confirmText" @click="confirmAction" gradient="blue">
            {{ confirmText }}
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import { FwbModal, FwbButton } from 'flowbite-vue'
  
  const props = defineProps({
    isOpen: Boolean,
    title: { type: String, default: 'Modal Title' },
    cancelText: { type: String, default: 'Cancel' },
    confirmText: { type: String, default: '' },
    confirmColor: { type: String, default: 'green' },
  })
  
  const emit = defineEmits(['close', 'confirm'])
  
  const closeModal = () => emit('close')
  const confirmAction = () => emit('confirm')
  </script>