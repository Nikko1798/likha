<template>
     <div
        class="grid grid-cols-1 sm:grid-cols-12 mt-4"
    >
    
        <div class="sm:col-span-12">
            <fieldset class="border border-gray-300 p-4 rounded-lg">
                <legend class="text-lg font-semibold px-2">Artisan Information</legend>
                <div
                class="grid grid-cols-1 sm:grid-cols-12 gap-3"
                >
                    <div class="sm:col-span-4">
                        <fwb-input v-model="modelValue.artisan_name" 
                        label="Artisan name" 
                        placeholder="Enter the name of artisan" size="sm" />
                    </div>
                    <div class="sm:col-span-4">
                        <fwb-select
                            v-model="modelValue.indiginous_people_community"
                            :options="ipc"
                            label="Indigenous Peoples Community"
                        />
                    </div>
                    <div class="sm:col-span-4">
                        <fwb-input v-model="modelValue.other_ipc" 
                        label="Other" 
                        placeholder="Other" size="sm" :disabled="disableOtherIpc"/>
                    </div>
                </div>
            </fieldset>

        </div>
    </div>
    <div
        class="grid grid-cols-1 sm:grid-cols-12 mt-4"
    >
    
        <div class="sm:col-span-12">
            <fieldset class="border border-gray-300 p-4 rounded-lg">
                <legend class="text-lg font-semibold px-2">Product Information</legend>
                <div
                class="grid grid-cols-1 sm:grid-cols-12 gap-3"
                >
                    <div class="sm:col-span-4">
                        <fwb-input v-model="modelValue.product_name" 
                        label="Product name" 
                        placeholder="Enter the name of product" size="sm" />
                    </div>
                    
                    <div class="sm:col-span-4">
                        <fwb-select
                            v-model="modelValue.product_material"
                            :options="ipc"
                            label="Product Material"
                        />
                    </div>
                </div>
            </fieldset>

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { FwbInput, FwbSelect, FwbButtonGroup, FwbButton } from "flowbite-vue";

const props=defineProps(["modelValue"]);
const emits=defineEmits(["update:modelValue"]);
const disableOtherIpc = ref(true);
const ipc = [
    { value: "Northen - Region I - Ilocano", name: "Northen - Region I - Ilocano" },
    { value: "Northen - Region I - Bolinao / Pangasinense", name: "Northen - Region I - Bolinao / Pangasinense" },
    { value: "Northen - Region II - Gaddang / Isinay", name: "Northen - Region II - Gaddang / Isinay" },
    { value: "Northen - Region II - Bugkalot", name: "Northen - Region II - Bugkalot" },
    { value: "OTHER", name: "Other" }
];


watch(() => props.modelValue.indiginous_people_community,async (newIpc) => {
    props.modelValue.other_ipc="";
    newIpc==="OTHER" ? disableOtherIpc.value=false : disableOtherIpc.value=true;
})
</script>