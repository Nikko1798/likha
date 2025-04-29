<template>
    
    <div v-for="craft in artsOrCraft" class="grid grid-cols-1 sm:grid-cols-12 gap-4 mb 10">
        <div class="sm:col-span-4">
            <fwb-input v-model="craft.art_or_craft_name"
            label="Art and Craft Specialization" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="craft.other_specialization_name"
            label="Other" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="craft.related_practices"
            label="Related practices before the process" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="craft.other_associative_narrative_of_production"
            label="Other" size="sm" />
        </div>
       
        <div class="sm:col-span-12 flex flex-col">
            <fwb-textarea
                v-model="craft.product_making_process"
                :rows="4"
                label="Product Making Process"
            />
            <div class="flex justify-end mt-2">
                <fwb-button v-if="craft.product_making_process_file" :href="route('response.downloadFile', {fileName: craft.product_making_process_file})" gradient="blue">Download Product Making process file</fwb-button>
            </div>
        </div>

        
        <div class="sm:col-span-4">
            <fwb-input v-model="craft.region"
            label="Region"  size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="craft.province"
            label="Province"  size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="craft.city"
            label="City"  size="sm" />
        </div>
        <div class="sm:col-span-12">
            <fwb-input v-model="craft.sitio"
            label="Sitio"  size="sm" />
        </div>
    </div>
</template>
<script setup>
import { FwbInput, FwbTextarea, FwbButton } from 'flowbite-vue';
const props = defineProps({
    artsOrCraft:Object
})
</script>