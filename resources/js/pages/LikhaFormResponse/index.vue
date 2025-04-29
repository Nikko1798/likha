<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import Datatable from '@/components/Datatable.vue';
import { FwbButtonGroup, FwbButton } from 'flowbite-vue';
import { useFormResponse } from '@/Services/LikhaForResponseService';
import viewResponseDetails from './viewResponseDetails.vue';
const {IsViewResponse, returnBackToResponseTable, OpenViewingOfresponse,
     personalInfoForm, familyMembers, FormalEducations, nonFormalEducations, artisanInfo, artsOrCraft}=useFormResponse();
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Likha Form Responses',
        href: '/response',
    },
];
</script>

<template>
    <Head title="Form Responses" />

    <AppLayout :breadcrumbs="breadcrumbs">
     
        <div v-if="!IsViewResponse" class="overflow-x-auto w-full p-5" style="max-width: 80vw;">
            <Datatable :apiUrl="route('response.likhaResponses')" 
            :tableHeaders="['Full Name','Other name','Artisan Name', 'Email', 'Action']" 
            :visibleColumns="['first_name','other_name' , 'artisan_name','email', 'uuid']" 
            :itemsPerPage="1" eventName="refresh-allResponses"> 

            <template #cell-first_name="{ rowData }">
                <div class="space-y-2">
                    {{ rowData.first_name + ' ' + rowData.last_name }}
                </div>
            </template>
            <template #cell-uuid="{ rowData }">
                <fwb-button @click="OpenViewingOfresponse(rowData.id)" gradient="teal">View</fwb-button>
            </template>
            </Datatable>
         </div>
         
        <div v-else class="overflow-x-auto w-full p-5" style="max-width: 80vw;">
            <viewResponseDetails  
            v-model:personalInfo="personalInfoForm"
            v-model:familyMembers="familyMembers"
            v-model:FormalEducations="FormalEducations"
            v-model:nonFormalEducations="nonFormalEducations"
            v-model:artisanInfo="artisanInfo"
            v-model:artsOrCraft="artsOrCraft"
            @update:viewResponseDetail="returnBackToResponseTable"></viewResponseDetails>
        </div>
    </AppLayout>
</template>
