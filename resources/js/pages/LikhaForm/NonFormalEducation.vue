<template>
    <div
        v-for="(educ, index) in nonFormalEducations"
        :key="index"
        class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4 p-4 border border-gray-300 shadow-lg rounded-lg"
    >
        <div class="sm:col-span-3">
            <fwb-select
                v-model="educ.transmission"
                :options="transmissions"
                label="Select your Transmission"
            />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="educ.other_transmission" 
            :disabled="educ.disableTransmission"
            label="Transmission" 
            placeholder="Manually input the transmission here" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="educ.mentor" 
            label="Mentor name" 
            placeholder="Enter mentor name" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="educ.ordinal_generation" 
            label="Ordinal Generation" 
            placeholder="Indicate ordinal generation" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="educ.place_of_mentoring" 
            label="Place of Mentoring" 
            placeholder="Enter the place of mentoring" size="sm" />
        </div>
        <div class="sm:col-span-12 flex justify-end items-center w-full">
            <fwb-button-group class="rounded flex">
                <fwb-button gradient="green-blue" @click="addNonFormal">Add</fwb-button>
                <fwb-button gradient="red" @click="removeNonFormal(index)" v-if="nonFormalEducations.length > 1">Remove</fwb-button>
            </fwb-button-group>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { FwbInput, FwbSelect, FwbButtonGroup, FwbButton } from "flowbite-vue";
import {transmissions} from '@/helpers/dropdownHelper';

const props = defineProps({
    nonFormalEducations: Object
});
const addNonFormal = () => {
    props.nonFormalEducations.push({ transmission: "",other_transmission:"", mentor: "", ordinal_generation: "", place_of_mentoring: "", disableTransmission: true, });
};

const removeNonFormal = (index: String) => {
    if (props.nonFormalEducations.length > 1) {
        props.nonFormalEducations.splice(index, 1);
    }
};

watch(
    () => props.nonFormalEducations,
    (newNonFormalEducations) => {
        newNonFormalEducations.forEach((educ) => {
            if (educ.transmission === "OTHER") {
                educ.disableTransmission = false;
            } else {
                educ.disableTransmission = true;
                educ.other_transmission = "";
            }
        });
    },
    { deep: true }
);
</script>