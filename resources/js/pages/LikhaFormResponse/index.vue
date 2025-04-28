<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import Datatable from '@/Components/Datatable.vue';
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
     
        <div class="overflow-x-auto w-full p-5" style="max-width: 80vw;">
                <Datatable :apiUrl="route('response.likhaResponses')" 
                :tableHeaders="['Name', 'Email', 'uuid']" 
                :visibleColumns="['first_name','email', 'uuid']" 
                :itemsPerPage="1" eventName="refresh-allResponses"> 

                <template #cell-first_name="{ rowData }">
                    <div class="space-y-2">
                        {{ rowData.first_name + ' ' + rowData.last_name }}
                    </div>
                </template>
                    
                </Datatable>
            
         </div>
    </AppLayout>
</template>
