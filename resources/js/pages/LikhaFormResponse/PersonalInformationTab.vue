<template>
    
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div class="sm:col-span-12">
            <fwb-input v-model="personalInfo.email" type="email"
            label="Emaiil address" 
            placeholder="Enter your email" size="sm" />
        </div>

        <div class="sm:col-span-3">
            <fwb-input v-model="personalInfo.first_name"
            label="First name" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="personalInfo.middle_name"
            label="Middle name" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="personalInfo.last_name"
            label="Last name" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="personalInfo.other_name"
            label="Other name" size="sm" />
        </div>
        <div class="sm:col-span-12">
            <fwb-input v-model="personalInfo.place_of_birth"
            label="Place of birth" size="sm" />
        </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10">
        <div class="sm:col-span-4">
            <fwb-input v-model="personalInfo.region"
            label="Region" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="personalInfo.province"
            label="Province" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="personalInfo.city"
            label="City" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="personalInfo.barangay"
            label="City" size="sm" />
        </div>
        <div class="sm:col-span-8">
            <fwb-input v-model="personalInfo.street"
            label="City" size="sm" />
        </div>
    </div>
</template>
<script setup>
import { FwbInput } from 'flowbite-vue';
const props = defineProps({
    personalInfo:Object
})
</script>