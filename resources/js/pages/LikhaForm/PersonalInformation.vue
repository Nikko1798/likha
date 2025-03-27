<template>
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10">
        <!-- First Name: Takes 4 out of 12 columns -->
        <div class="sm:col-span-3">
            <fwb-input v-model="modelValue.first_name" label="First name" placeholder="Enter your first name" size="sm" />
        </div>

        <!-- Middle Name: Takes 4 out of 12 columns -->
        <div class="sm:col-span-3">
            <fwb-input v-model="modelValue.middle_name" label="Middle name" placeholder="Enter your middle name" size="sm" />
        </div>

        <!-- Last Name: Takes 4 out of 12 columns -->
        <div class="sm:col-span-3">
            <fwb-input v-model="modelValue.last_name" label="Last name" placeholder="Enter your last name" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-input v-model="modelValue.name_extension" label="Name Extension" placeholder="Enter your name extension" size="sm" />
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
        <div class="sm:col-span-6">
            <fwb-input v-model="modelValue.other_name" label="Other name" placeholder="Enter your other name" size="sm" />
        </div>
        <div class="sm:col-span-3">
            <fwb-select
                v-model="modelValue.gender"
                :options="genders"
                label="Select your gender"
            />
        </div>
        <div class="sm:col-span-3">
            <fwb-select
                v-model="modelValue.age_group"
                :options="ageGroup"
                label="Select your age"
            />
        </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
        <div class="sm:col-span-6">
            <fwb-input v-model="modelValue.place_of_birth" label="Place of birth" placeholder="Enter your place of birth" size="sm" />
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-10">
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
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
        <div class="sm:col-span-4">
            <fwb-select
                v-model="modelValue.barangay"
                :options="barangayOptions"
                label="Select your Barangay"
            />
        </div>
        <div class="sm:col-span-8">
            <fwb-input v-model="modelValue.street" label="Street" placeholder="Enter your Street address" size="sm" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, defineExpose, computed, watch, onMounted, ref } from "vue";
import { FwbInput, FwbSelect  } from 'flowbite-vue'
import {getRegionOptions, getProvinceOption, getCitiesOption, getBarangayOption} from '@/helpers/addressHelpers';

const genders = [
  { value: 'MALE', name: 'Male' },
  { value: 'FEMALE', name: 'Female' },
  { value: 'NON-BINARY', name: 'Non-binary' },
  { value: 'PREFER NOT TO SAY', name: 'Prefer not to say' },
]
const ageGroup = [
  { value: '17 OR BELOW', name: '17 or below' },
  { value: '18 TO 24', name: '18 to 24' },
  { value: '25 TO 34', name: '25 to 34' },
  { value: '35 TO 44', name: '35 to 44' },
  { value: '45 TO 54', name: '45 to 54' },
  { value: '55 TO 64', name: '55 to 64' },
  { value: '55 OR OVER', name: '65 or over' },
]
const props=defineProps(["modelValue"]);
const emits=defineEmits(["update:modelValue"]);
const regionOptions = ref([]);
const provinceOptions = ref([]);
const cityOptions = ref([]);
const barangayOptions = ref([]);
// const provinceOptions = computed(() => getProvinceOption(props.modelValue.region));
// const cityOptions=computed(()=>getCitiesOption(props.modelValue.region==='130000000' ? props.modelValue.region : props.modelValue.province ))
onMounted(async () => {
  regionOptions.value = await getRegionOptions();
});
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
