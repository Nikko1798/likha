import { ref } from 'vue'

// regiester here the modal
const modals = ref<Record<string, boolean>>({
  cameraModal: false,
})

export function useModal() {
  const openModal = (name: string) => {
    modals.value[name] = true
  }

  const closeModal = (name: string) => {
    modals.value[name] = false
  }

  return { modals, openModal, closeModal }
}