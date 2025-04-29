<template>
    
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div class="sm:col-span-4">
            <fwb-input v-model="artisanInfo.artisan_name"
            label="Artisan name"  size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="artisanInfo.indiginous_people_community"
            label="Indigenous Peoples Community"  size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="artisanInfo.other_ipc"
            label="Other Indigenous Peoples Community"  size="sm" />
        </div>
        <div class="sm:col-span-6">
            <fwb-input v-model="artisanInfo.primary_art"
            label="Primary Art and Craft Specialization"  size="sm" />
        </div>
        <div class="sm:col-span-6">
            <fwb-input v-model="artisanInfo.other_specialization_name"
            label="Primary Art and Craft other_specialization_name"  size="sm" />
        </div>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10">
        <div class="sm:col-span-12">
            <fwb-input v-model="artisanInfo.product_name"
            label="Product name"  size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="artisanInfo.product_material"
            label="Product Material"  size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="artisanInfo.other_product_material"
            label="Other Product Material"  size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="artisanInfo.associative_narrative_of_production"
            label="Associative narrative of production"  size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="artisanInfo.other_associative_narrative_of_production"
            label="Other"  size="sm" />
        </div>
        <div class="sm:col-span-12 flex flex-col">
            <fwb-textarea
                v-model="artisanInfo.product_making_process"
                :rows="4"
                label="Product Making Process"
            />
            <div class="flex justify-end mt-2">
              
                <div v-if="artisanInfo.product_making_process_file">
                    <fwb-button  :href="route('response.downloadFile', {fileName: artisanInfo.product_making_process_file})" gradient="blue">Download Product Making process file</fwb-button>
                </div>
            </div>
        </div>

        <div class="sm:col-span-12 flex flex-col">
            <fwb-textarea
                v-model="artisanInfo.vocabularies"
                :rows="4"
                label="Vocabularies"
            />
            <div class="flex justify-end mt-2">
                <div v-if="artisanInfo.vocabularies_file">
                    <fwb-button :href="route('response.downloadFile', {fileName: artisanInfo.vocabularies_file})" gradient="blue">Download Vocabularies file</fwb-button>
                </div>
            </div>
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <!-- Textarea (Left Column) -->
        <div>
            <fwb-textarea
                v-model="artisanInfo.product_color_pallete"
                :rows="6"
                label="Product Color Palletes"
            />
        </div>

        <!-- Image Preview (Right Column) -->
        <div class="flex justify-center items-center border rounded-lg p-4">
          
            <img
                v-if="artisanInfo.product_image"
                :src="route('response.getProductimg', { id: artisanInfo.craft_id })"
                alt="Vocabulary Image"
                class="max-w-full max-h-64 object-contain rounded"
            />
            <p v-else class="text-gray-500 text-sm">No image uploaded:</p>
        </div>
    </div>

    
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10">
        
        <div class="sm:col-span-4">
            <fwb-input v-model="artisanInfo.region"
            label="Region"  size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="artisanInfo.province"
            label="Province"  size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="artisanInfo.city"
            label="City"  size="sm" />
        </div>
        <div class="sm:col-span-12">
            <fwb-input v-model="artisanInfo.sitio"
            label="Sitio"  size="sm" />
        </div>
    </div>
</template>
<script setup>
import { FwbInput, FwbTextarea, FwbButton } from 'flowbite-vue';
const props = defineProps({
    artisanInfo:Object
})
</script>