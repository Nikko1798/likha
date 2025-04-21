<template>
    <div v-if="submitted" class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2 class="text-2xl font-bold text-red-500 mb-2">Thank you! 🎉</h2>
        <p class="text-gray-700 mb-4">We’ve received your response. We appreciate your time and effort!</p>
        <button @click="goBack" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition">
          Submit Another response
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { router } from '@inertiajs/vue3'
  
  const submitted = ref(true)
  
  function goBack() {

    router.visit(route('home')); // or any route you want to redirect to
  }
  </script>
  