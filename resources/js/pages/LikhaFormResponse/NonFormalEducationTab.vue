<template>
    
    <div v-for="education in nonFormalEducations" class="grid grid-cols-1 sm:grid-cols-12 gap-4">

        <div class="sm:col-span-3">
            <fwb-input v-model="education.transmission"
            label="Transmission" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="education.other_transmission"
            label="Other Transmission" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="education.mentor"
            label="Mentor" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="education.ordinal_generation"
            label="Ordinal Generation" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="education.place_of_mentoring"
            label="Place of Menttoring" size="sm" />
        </div>
    </div>
</template>
<script setup>
import { FwbInput } from 'flowbite-vue';
const props = defineProps({
    nonFormalEducations:Object
})
</script>