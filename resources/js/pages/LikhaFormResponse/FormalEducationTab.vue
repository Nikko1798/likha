<template>
    
    <div v-for="education in FormalEducations" class="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div class="sm:col-span-3">
            <fwb-input v-model="education.education_level"
            label="Education Level" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="education.course_or_study"
            label="Course/Study" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="education.school_name"
            label="School" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="education.years_attended"
            label="Years Attended" size="sm" />
        </div>
    </div>
</template>
<script setup>
import { FwbInput } from 'flowbite-vue';
const props = defineProps({
    FormalEducations:Object
})
</script>