<template>
    <div>
        <div
            v-for="(member, index) in familyMembers"
            :key="index"
            class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4 p-4 border border-gray-300 shadow-lg rounded-lg"
        >
            <div class="sm:col-span-6">
                <fwb-input v-model="member.family_member_name" label="Family member name" placeholder="Enter name" size="sm" />
            </div>

            <div class="sm:col-span-3">
                <fwb-select v-model="member.relation" :options="relation" label="Select Relation" />
            </div>

            <div class="sm:col-span-3 flex items-end">
                <fwb-button-group class="w-full rounded">
                    <fwb-button gradient="green-blue" @click="addFamilyMember">Add</fwb-button>
                    <fwb-button gradient="red" @click="removeFamilyMember(index)" v-if="familyMembers.length > 1">Remove</fwb-button>
                </fwb-button-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { FwbInput, FwbSelect, FwbButtonGroup, FwbButton } from "flowbite-vue";
import {relation} from '@/helpers/dropdownHelper';
const props = defineProps({
    familyMembers: Array
});

const addFamilyMember = () => {
    props.familyMembers.push({ family_member_name: "", relation: "" });
};

const removeFamilyMember = (index: number) => {
    if (props.familyMembers.length > 1) {
        props.familyMembers.splice(index, 1);
    }
};
</script>
