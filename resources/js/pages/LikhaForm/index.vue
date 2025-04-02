<script setup>
import { ref, reactive, toRaw } from 'vue';
import { CheckIcon, UserIcon, HomeIcon, AcademicCapIcon, PaintBrushIcon } from '@heroicons/vue/24/solid';
import PersonalInformation from './PersonalInformation.vue'
import FamilyBackground from './FamilyBackground.vue';
import nonFormalEducation from './NonFormalEducation.vue';
import ArtisanCrafts from './ArtisanCrafts.vue';
import FormalEducation from './FormalEducation.vue';
import OtherArt from './otherArt.vue';
import {submitStepOne, insertOrUpdateStepTwo} from '@/Services/likhaFormApi';
const props = defineProps({
    personalInfo: Array
});
const activeStep = reactive(props.personalInfo?props.personalInfo.current_step:0);
const steps = ref([
    { name: 'Personal Info', component: PersonalInformation, icon: UserIcon, active: activeStep!=0?false:true, details: 'Provide Personal information here' },
    { name: 'Family background', component:FamilyBackground, icon: HomeIcon, active: activeStep!=1?false:true, details: 'Provide family background here' },
    { name: 'Formal Education', icon: AcademicCapIcon, active: activeStep!=2?false:true, details: 'Provide educational information here' },
    { name: 'Non-formal Education', icon: AcademicCapIcon, active: activeStep!=3?false:true, details: 'Provide educational information here' },
    { name: 'Artisan and Craft', component: ArtisanCrafts,  icon: PaintBrushIcon, active: activeStep!=4?false:true, details: 'Provide artisan and crafts information here' },
    { name: 'Other Art',  icon: PaintBrushIcon, active: activeStep!=5?false:true, details: "Provide information about the artisan's other artworks here" },
]);


const personalInfoForm = reactive({
  first_name: props.personalInfo ? props.personalInfo.first_name : "",
  middle_name: "",
  last_name: "",
  gender: "",
  age_group: "",
  place_of_birth:"",
  region: "",
  province: "",
  city_municipality: "",
  barangay: "",
  street: "",

});
const ArtisanCraftsInfo=reactive({
    artisan_name: "",
    indiginous_people_community:"",
    other_ipc:"",
    primary_art:"",
    product_name: "",
    product_material:"",
    associative_narrative_of_production:"",
    product_making_process:"",
    product_making_process_file:null,
    product_image:null,
    product_color_pallete: null,
    vocabularies:"",
    vocabularies_file:null,
    region: "",
    province: "",
    city: "",
    barangay: "",
    sitio: "",
});

const familyMembers = ref([{ family_member_name: "", relation: "" }]);
const nonFormalEducations=ref([{transmission: "", other_transmission:"", mentor: "", ordinal_generation: "", place_of_mentoring: "", disableTransmission: true}])
const FormalEducations=ref([{education_level:"", course_or_study: "", school_name:"", years_attended: ""}])
const artsOrCraft=ref([{art_or_craft_name:"", related_practices:"", product_making_process:"",
product_making_process_file:null, region: "",
    province: "",  city: "",  barangay: "", sitio: "",}])
// Function to go to the next step

const submitStepOneForm = () => {
    submitStepOne(toRaw(personalInfoForm), props.personalInfo).then((response)=>{
        if(response.status!="422")
        {
            nextAction();
            console.log(personalInfoForm)
        }
    });
};
const insertOrUpdateStepTwoForm = () => {
    insertOrUpdateStepTwo(toRaw(familyMembers._rawValue), props.personalInfo.id).then((response)=>{
        if(response.status!="422")
        {
            nextAction();
        }
    });
};
const insertOrUpdateStepTwoForm2 = () => {
   console.log(toRaw(toRaw(familyMembers._rawValue)))
};

const nextStep = () => {
    switch (activeStep.value) {
        case 0:
            submitStepOneForm();
        case 1:
            insertOrUpdateStepTwoForm();
        default:
            console.log(familyMembers)
            break;
    }
   
};
const nextAction= () =>{
    if (activeStep.value < steps.value.length - 1) {
        steps.value[activeStep.value].active = false;
        activeStep.value++;
        steps.value[activeStep.value].active = true;
    }
};

// Function to go to the previous step
const prevStep = () => {
    if (activeStep.value > 0) {
        steps.value[activeStep.value].active = false;
        activeStep.value--;
        steps.value[activeStep.value].active = true;
    }
};
</script>

<template>
    <div class="flex flex-col md:flex-row md:items-start p-5 gap-2">
        <!-- Sidebar Stepper (Desktop Only) -->
        <div class="p-2">
            <!-- Image at the top of the stepper -->
            <div class="h-32 w-full bg-cover bg-center rounded-md" 
                style="background-image: url('https://lh5.googleusercontent.com/TxS-VLhP_f5OuQRJBy3Ho8aXBQWPRu2Oea91olVvEO58Qp7N4HprJvU7MUu0YHHYwPKmlwbzPwFth7cYIaO9BqAsjhJlGLeWBkBqZfFc6i_lH6xVzMIXG9cVe4umNnMf9uQUBUpdH0Q=w782');">
            </div>
            <ol class="relative mt-4 w-auto min-w-max text-gray-500 border-l border-gray-300 dark:border-gray-700 dark:text-gray-400 hidden md:block pr-6">
                <li v-for="(step, index) in steps" :key="index" class="mb-10 ml-6">
                    <span
                        class="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-3"
                        :class="step.active ? 'bg-red-500 text-white ring-red-300' : 'bg-gray-300 text-gray-600 ring-gray-200'">
                        <component :is="step.icon" class="w-5 h-5" />
                    </span>
                    <h3 class="font-small leading-tight">{{ step.name }}</h3>
                </li>
            </ol>
        </div>

        <!-- Step Content -->
        <div class="w-full md:flex-1 p-4 bg-white shadow-md rounded-md h-screen flex flex-col">
            <!-- Step Header -->
            <div class="mb-4">
                <h2 class="text-lg font-semibold">{{ steps[activeStep].name }}</h2>
                <p class="text-gray-600">{{ steps[activeStep].details }}</p>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto">
                <PersonalInformation v-if="activeStep === 0" v-model="personalInfoForm" />
                <FamilyBackground v-if="activeStep === 1" v-model:familyMembers="familyMembers" />
                <FormalEducation v-if="activeStep===2" v-model:FormalEducations="FormalEducations" />
                <nonFormalEducation v-if="activeStep === 3" v-model:nonFormalEducations="nonFormalEducations" />
                <ArtisanCrafts v-if="activeStep === 4" v-model="ArtisanCraftsInfo" />
                <OtherArt v-if="activeStep === 5" v-model:artsOrCraft="artsOrCraft" />
            </div>

            <!-- Navigation Buttons (Sticky) -->
            <div class="mt-4 py-4 bg-white sticky bottom-0 left-0 w-full shadow-t flex justify-between">
                <button
                    @click="prevStep"
                    :disabled="activeStep === 0"
                    class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    @click="nextStep"
                    :disabled="activeStep === steps.length - 1"
                    class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>
