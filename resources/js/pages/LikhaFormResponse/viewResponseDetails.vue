<template>
  
    <div class="" >
        
        <div class="p-4 border border-gray-300 shadow-lg rounded-lg flex flex-wrap">
            <div class="w-full flex items-center space-x-2">
            
                <fwb-button
                    gradient="blue" shadow @click="returnBack" square
                    class="px-4 py-2"
                    >
                    <div class="flex items-center space-x-2">
                        <svg width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path d="M14.389 7.956v4.374l1.056 0.010c7.335 0.071 11.466 3.333 12.543 9.944-4.029-4.661-8.675-4.663-12.532-4.664h-1.067v4.337l-9.884-7.001 9.884-7zM15.456 5.893l-12.795 9.063 12.795 9.063v-5.332c5.121 0.002 9.869 0.26 13.884 7.42 0-4.547-0.751-14.706-13.884-14.833v-5.381z" fill="#ffffff"> </path> </g></svg>
                        <span>Return back</span>
                    </div>
                </fwb-button>

            </div>
        </div>
        <div class="p-4 mt-2 border border-gray-300 shadow-lg rounded-lg">
            <fwb-tabs @click:pane="handlePaneClick" v-model="activeTab" class="p-5">
                <fwb-tab name="personal_information" title="Personal Information">
                    <PersonalInformationTab :personalInfo="personalInfo"></PersonalInformationTab>
                </fwb-tab>
                <fwb-tab name="family_background" title="Family Background">
                    <FamilyMemberTab :familyMembers="familyMembers"></FamilyMemberTab>
                </fwb-tab>
                <fwb-tab name="formal_education" title="Formal Education">
                    <FormalEducationTab :FormalEducations="FormalEducations"></FormalEducationTab>
                </fwb-tab>
                <fwb-tab name="non_formal_education" title="Non-formal Education">
                    <NonFormalEducationTab :nonFormalEducations="nonFormalEducations"></NonFormalEducationTab>
                </fwb-tab>
                <fwb-tab name="artisan_and_craft" title="Artisan Info and Craft">
                    <ArtisanInfoTab :artisanInfo="artisanInfo"></ArtisanInfoTab>
                </fwb-tab>
                <fwb-tab name="other_crafts" title="Other Crafts">
                    <OtherCraftsTab :artsOrCraft="artsOrCraft"></OtherCraftsTab>
                </fwb-tab>
            </fwb-tabs>
        </div>
        <div class="relative"> 
            <Loader :loading="isLoading"></Loader>
            <div v-for="(item, index) in requestedItems"
                :key="index"
                class="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4 p-4 border border-gray-300 shadow-lg rounded-lg"
            >
            
            </div>
        </div>
        
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { FwbInput, FwbSelect, FwbButton, FwbButtonGroup,
            FwbTextarea, FwbListGroup, FwbListGroupItem, 
            FwbAccordion, FwbAccordionPanel,
            FwbAccordionHeader, FwbAccordionContent,
            FwbTab, FwbTabs } from 'flowbite-vue';
    import Loader from '@/components/Loader.vue';
    import PersonalInformationTab from './PersonalInformationTab.vue';
    import FamilyMemberTab from './FamilyMemberTab.vue';
    import FormalEducationTab from './FormalEducationTab.vue';
    import NonFormalEducationTab from './NonFormalEducationTab.vue';
    import ArtisanInfoTab from './ArtisanInfoTab.vue';
    import OtherCraftsTab from './OtherCraftsTab.vue';
    const props=defineProps({
        personalInfo:Object,
        familyMembers: Object,
        FormalEducations: Object,
        nonFormalEducations: Object,
        artisanInfo: Object,
        artsOrCraft: Object,
    })
    const emit = defineEmits(['update:viewResponseDetail'])
    const returnBack=(()=>{
        emit('update:viewResponseDetail', false)
    });
        
    const activeTab = ref('personal_information')

    const handlePaneClick = () => { console.log('Click!') }
</script>