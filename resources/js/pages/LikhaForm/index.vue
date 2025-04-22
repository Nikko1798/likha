<script setup>
import { ref, reactive, toRaw, onMounted } from 'vue';
import { CheckIcon, UserIcon, HomeIcon, AcademicCapIcon, PaintBrushIcon } from '@heroicons/vue/24/solid';
import PersonalInformation from './PersonalInformation.vue'
import FamilyBackground from './FamilyBackground.vue';
import nonFormalEducation from './NonFormalEducation.vue';
import ArtisanCrafts from './ArtisanCrafts.vue';
import FormalEducation from './FormalEducation.vue';
import DataPrivacy from './DataPrivacy.vue';
import OtherArt from './otherArt.vue';
import {submitStepOne, insertOrUpdateStepTwo} from '@/Services/likhaFormApi';
import { useLikhaForm } from '@/Services/likhaFormService';
import Loader from '@/components/Loader.vue'; // Import loader
const props = defineProps({
    personalInfo: Object,
    family_background: Object,
    formalEducation: Object,
    NonformalEducation: Object,
    artisan: Object,
    primaryCraft: Object
});
const loadShow=ref(props.isLoading)
const { personalInfoForm, familyMembers, ArtisanCraftsInfo, nonFormalEducations,FormalEducations, artsOrCraft, getMembers, getformalEducation, getNonformalEducation,
    activeStep, steps, isLoading, submitStepOneForm, insertOrUpdateStepTwoForm, nextStep, nextAction,prevStep, } = useLikhaForm(props);

onMounted(()=>{
    getNonformalEducation()
    getformalEducation()
    getMembers()
    console.log(props.primaryCraft)
});

</script>

<template>
    <Loader :loading="isLoading"/>
    <div class="flex flex-col md:flex-row md:items-start p-5 gap-2">
        <!-- Sidebar Stepper (Desktop Only) -->
        <div class="p-2">
            <!-- Image at the top of the stepper -->
            <div class="h-32 w-full bg-cover bg-center rounded-md" 
            style="background-image: url('/likha/images/LikhaBanner.jpg')"
            >
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
                <DataPrivacy v-if="activeStep === 0"></DataPrivacy>
                <PersonalInformation v-if="activeStep === 1" v-model="personalInfoForm" />
                <FamilyBackground v-if="activeStep === 2" v-model:familyMembers="familyMembers" />
                <FormalEducation v-if="activeStep===3" v-model:FormalEducations="FormalEducations" />
                <nonFormalEducation v-if="activeStep === 4" v-model:nonFormalEducations="nonFormalEducations" />
                <ArtisanCrafts v-if="activeStep === 5" v-model="ArtisanCraftsInfo" />
                <OtherArt v-if="activeStep === 6" v-model:artsOrCraft="artsOrCraft" />
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
                    class="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {{ activeStep === steps.length - 1 ? 'Submit' : 'Next' }}
                    
                </button>
            </div>
        </div>
    </div>
</template>
