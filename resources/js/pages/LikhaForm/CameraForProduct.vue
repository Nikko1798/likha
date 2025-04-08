<template>
      <Modal
        :isOpen="props.isOpen"
        title="New Item"
        cancelText="Close"
        confirmText="Save"
        @close="closeModal"
        @confirm="captureImage">
            <template #body>
                <div class="modal-content">
                    <!-- Video element for the camera -->
                     
                    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div class="sm:col-span-12">
                            <video ref="videoElement" width="640" height="480" autoplay></video>
                        </div>
                        <div class="sm:col-span-12">
                            <fwb-button-group>
                                <fwb-button>Button Default</fwb-button>
                                <fwb-button color="purple">Button Purple</fwb-button>
                            </fwb-button-group>
                        </div>
                    </div>
                </div>
            </template>
        </Modal>
</template>
<script lang="ts" setup> 
import { ref, computed, onMounted, watch, Ref } from 'vue'
import { FwbInput, FwbSelect, FwbButtonGroup, FwbButton, FwbTextarea, FwbFileInput   } from "flowbite-vue";
import { usePage } from "@inertiajs/vue3";
import Modal from '@/components/Modal.vue';

const stream = ref<MediaStream | null>(null);
const videoElement = ref<HTMLVideoElement | null>(null);
const capturedImage = ref<string | null>(null)
const emit = defineEmits(['close', 'confirm', 'update:imageSrc'])//this is the event @close and @confirm
const closeModal = () => emit('close') // the closeModal() will be called in the @click here, then emit here will trigger the @close to the parent vue

const props = defineProps<{
    isOpen: boolean,
    imageSrc: String,
}>()
const captureImage = () => {
  if (!videoElement.value) return

  const canvas = document.createElement('canvas')
  canvas.width = videoElement.value.videoWidth
  canvas.height = videoElement.value.videoHeight

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height)
  capturedImage.value = canvas.toDataURL('image/png')
  emit('update:imageSrc', canvas.toDataURL('image/png'))
  closeModal();
}
const startCamera = async () => {
  try {
    // Request access to the user's webcam
    const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    // Set the video element's srcObject to the camera stream
    if (videoElement.value) {
      videoElement.value.srcObject = cameraStream;
    }
    stream.value = cameraStream;
  } catch (error) {
    console.error("Error accessing the camera:", error);
  }
};

const stopCamera = () => {
  if (stream.value) {
    // Stop all tracks (video/audio) in the stream
    stream.value.getTracks().forEach(track => track.stop());
  }
};
watch(()=>props.isOpen, (newVal)=>{
    if(newVal)
    {
        startCamera()
    }
    else{
        stopCamera();
    }
})
</script>