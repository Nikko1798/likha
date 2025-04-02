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
                    <div class="sm:col-span-6">
                        <fwb-select
                            v-model="modelValue.primary_art"
                            :options="artsAndCraft"
                            label="Primary Art and Craft Specialization"
                        />
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
                            v-model="modelValue.productMaterial"
                            :options="ipc"
                            label="Product Material"
                        />
                    </div>

                    <div class="sm:col-span-4">
                        <fwb-select
                            v-model="modelValue.associative_narrative_of_production"
                            :options="relatedPracticeOptions"
                            label="Associative narrative of production"
                        />
                    </div>
                    <div class="sm:col-span-12">
                        <fwb-textarea
                            v-model="modelValue.product_making_process"
                            :rows="4"
                            label="Product making process"
                            placeholder="Write the steps/process for making the product."
                        />
                    </div>
                    <div class="sm:col-span-8">
                        <fwb-file-input v-model="modelValue.product_making_process_file" label="Product making process file" size="sm" />
                    </div>
                    
                    <div class="sm:col-span-12">
                        <fwb-textarea
                            v-model="modelValue.Vocabularies"
                            :rows="4"
                            label="Vocabularies"
                            placeholder="Write vocabularies here."
                        />
                    </div>
                    <div class="sm:col-span-8">
                        <fwb-file-input v-model="modelValue.vocabularies_file" label="Vocabularies file" size="sm" />
                    </div>
                    <div class="sm:col-span-8">
                        <fwb-file-input @change="handleFileChange" v-model="modelValue.product_image" label="Product Image file" size="sm" />
                       
                    </div>
                    <div class="sm:col-span-12">
                        <fwb-textarea
                            v-model="modelValue.product_color_pallete"
                            :rows="4"
                            label="Product Color Palletes"
                            placeholder="Write the list of color palletes here."
                        />
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
                <legend class="text-lg font-semibold px-2">Source of material</legend>
                <div
                class="grid grid-cols-1 sm:grid-cols-12 gap-3"
                >
                    <div class="sm:col-span-4">
                        <fwb-select
                            v-model="modelValue.region"
                            :options="regionOptions"
                            label="Select your Region"
                        />
                    </div>
                    <div class="sm:col-span-4">
                        <fwb-select
                            v-model="modelValue.province"
                            :options="provinceOptions"
                            label="Select your Province"
                        />
                    </div>
                    <div class="sm:col-span-4">
                        <fwb-select
                            v-model="modelValue.city"
                            :options="cityOptions"
                            label="Select your City"
                        />
                    </div>
                    
                    <div class="sm:col-span-4">
                        <fwb-select
                            v-model="modelValue.barangay"
                            :options="barangayOptions"
                            label="Select your Barangay"
                        />
                    </div>
                    <div class="sm:col-span-8">
                        <fwb-input v-model="modelValue.sitio" label="Sitio" placeholder="Enter Sitio" size="sm" />
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { FwbInput, FwbSelect, FwbButtonGroup, FwbButton, FwbTextarea, FwbFileInput   } from "flowbite-vue";
import {getRegionOptions, getProvinceOption, getCitiesOption, getBarangayOption} from '@/helpers/addressHelpers';
import {ipc, artsAndCraft, relatedPracticeOptions} from '@/helpers/dropdownHelper';
import ColorThief from "color-thief-ts";

const props=defineProps(["modelValue"]);
const emits=defineEmits(["update:modelValue"]);
const disableOtherIpc = ref(true);
const regionOptions = ref([]);
const provinceOptions = ref([]);
const cityOptions = ref([]);
const barangayOptions = ref([]);

const imageSrc = ref(null);
const colors = ref([]);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  props.modelValue.product_color_pallete="";
  // Convert File to Data URL
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    imageSrc.value = reader.result;

    // Wait for image to load, then extract colors
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = reader.result;
    img.onload = async () => {
      const colorThief = new ColorThief();
      colors.value = await colorThief.getPalette(img, 6); // Extract 6 colors
      console.log("Extracted Color Palette:", colors.value);
      colors.value.forEach((color, index) => {
        console.log(`Color ${index + 1}: ${color}`);
        props.modelValue.product_color_pallete+=(index > 0 ? "\n" : "")+`Color ${index + 1}: ${color}` ;
      });
    };
  };
};
onMounted(async () => {
  regionOptions.value = await getRegionOptions();
});
watch(() => props.modelValue.indiginous_people_community,async (newIpc) => {
    props.modelValue.other_ipc="";
    newIpc==="OTHER" ? disableOtherIpc.value=false : disableOtherIpc.value=true;
})

watch(() => props.modelValue.region,async (newRegion) => {
    props.modelValue.province="";
    props.modelValue.city="";
    props.modelValue.barangay="";
    provinceOptions.value = await getProvinceOption(newRegion);
    cityOptions.value = await getCitiesOption(props.modelValue.region==='130000000' ? newRegion :props.modelValue.province);
});
watch(() => props.modelValue.province,async (newProvince) => {
    props.modelValue.city="";
    props.modelValue.barangay="";
    cityOptions.value = await getCitiesOption(newProvince);
});
watch(() => props.modelValue.city,async (newCity) => {
    props.modelValue.barangay="";
 
    barangayOptions.value = await getBarangayOption(newCity);
    console.log(barangayOptions.value)
});

</script>