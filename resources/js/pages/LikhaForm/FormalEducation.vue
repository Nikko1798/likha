<template>
     <div
        v-for="(educ, index) in FormalEducations"
        :key="index"
        class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4 p-4 border border-gray-300 shadow-lg rounded-lg"
    >
    
        <div class="sm:col-span-3">
            <fwb-select
                v-model="educ.education_level"
                :options="educationalLevels"
                label="Select level of education"
            />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="educ.course_or_study" 
            label="Course" 
            placeholder="Enter your course/study" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="educ.school_name" 
            label="Name of school" 
            placeholder="Enter the name of school" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="educ.years_attended" 
            label="Years attended" 
            placeholder="Enter the years attended" size="sm" />
        </div>
        <div class="sm:col-span-12 flex justify-end items-center w-full">
            <fwb-button-group class="rounded flex">
                <fwb-button gradient="green-blue" @click="addFormal">Add</fwb-button>
                <fwb-button gradient="red" @click="removeFormal(index)" v-if="FormalEducations.length > 1">Remove</fwb-button>
            </fwb-button-group>
        </div>
    </div>
</template>
<script setup lang="ts">
import { FwbInput, FwbSelect, FwbButtonGroup, FwbButton } from "flowbite-vue";
import {educationalLevels} from '@/helpers/dropdownHelper';
const props = defineProps({
    FormalEducations: Object
});

const addFormal = () => {
    props.FormalEducations.push({ education_level:"", course_or_study: "", school_name:"", years_attended: "" });
};

const removeFormal = (index: String) => {
    if (props.FormalEducations.length > 1) {
        props.FormalEducations.splice(index, 1);
    }
};
</script>