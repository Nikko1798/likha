<template>
    <div
        v-for="(art, index) in artsOrCraft"
        :key="index"
        class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4 p-4 border border-gray-300 shadow-lg rounded-lg"
    >
        <div class="sm:col-span-6">
            <fwb-select
                v-model="art.art_or_craft_name"
                :options="artSpecializationOptions"
                label="Art and Craft Specialization"
            />
        </div>
        <div class="sm:col-span-6">
            <fwb-select
                v-model="art.related_practices"
                :options="relatedPracticeOptions"
                label="Any related practices before the process"
            />
        </div>
        <div class="sm:col-span-12">
            <fwb-textarea
                v-model="art.product_making_process"
                :rows="2"
                label="Product making process"
                placeholder="Write the steps/process for making the product."
            />
        </div>
        <div class="sm:col-span-8">
            <fwb-file-input @change="event=>handleFileProductMakingProcess(index, event)" v-model="art.product_making_process_file" label="Product making process file" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-select
                v-model="art.region"
                :options="regionOptions"
                label="Select your Region"
            />
        </div>
        <div class="sm:col-span-4">
            <fwb-select
                v-model="art.province"
                :options="provinceOptions[index]"
                label="Select your Province"
            />
        </div>
        <div class="sm:col-span-4">
            <fwb-select
                v-model="art.city"
                :options="cityOptions[index]"
                label="Select your City"
            />
        </div>
        <div class="sm:col-span-4">
            <fwb-select
                v-model="art.barangay"
                :options="barangayOptions[index]"
                label="Select your Barangay"
            />
        </div>
        <div class="sm:col-span-8">
            <fwb-input v-model="art.sitio" label="Sitio" placeholder="Enter Sitio" size="sm" />
        </div>
        <div class="sm:col-span-3 flex items-end">
            <fwb-button-group class="w-full rounded">
                <fwb-button gradient="green-blue" @click="addartsOrCraft">Add</fwb-button>
                <fwb-button gradient="red" @click="removeartsOrCraft(index)" v-if="artsOrCraft.length > 1">Remove</fwb-button>
            </fwb-button-group>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { FwbInput, FwbSelect, FwbFileInput, FwbTextarea, FwbButton, FwbButtonGroup } from "flowbite-vue";
import { getRegionOptions, getProvinceOption, getCitiesOption, getBarangayOption } from '@/helpers/addressHelpers';
import {ipc, artsAndCraft, productMaterial, artSpecializationOptions, relatedPracticeOptions} from '@/helpers/dropdownHelper';

const props = defineProps({
    artsOrCraft: Object
});

const regionOptions = ref([]);
const provinceOptions = ref([]); // Array of province options for each art
const cityOptions = ref([]);
const barangayOptions = ref([]);



const handleFileProductMakingProcess = (index, event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    props.artsOrCraft[index].product_making_process_file = file;
    console.log(props.artsOrCraft[index])
};

onMounted(async () => {
    regionOptions.value = await getRegionOptions();
});

watch(
    () => props.artsOrCraft,
    (newArtsOrCraft) => {
        newArtsOrCraft.forEach((art, index) => {
            watch(
                () => art.region,
                async (newRegion) => {
                    art.province = "";
                    art.city = "";
                    art.barangay = "";
                    provinceOptions.value[index] = await getProvinceOption(newRegion);
                    cityOptions.value[index] = [];
                    barangayOptions.value[index] = [];
                }
            );

            watch(
                () => art.province,
                async (newProvince) => {
                    art.city = "";
                    art.barangay = "";
                    cityOptions.value[index] = await getCitiesOption(newProvince);
                    barangayOptions.value[index] = [];
                }
            );

            watch(
                () => art.city,
                async (newCity) => {
                    art.barangay = "";
                    barangayOptions.value[index] = await getBarangayOption(newCity);
                }
            );
        });
    },
    { deep: true }
);
const addartsOrCraft = () => {
    props.artsOrCraft.push({ family_member_name: "", relation: "" });
};

const removeartsOrCraft = (index: String) => {
    if (props.artsOrCraft.length > 1) {
        props.artsOrCraft.splice(index, 1);
    }
}
</script>
