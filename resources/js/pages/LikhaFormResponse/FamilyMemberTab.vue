<template>
    
    <div v-for="member in familyMembers" class="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div class="sm:col-span-8">
            <fwb-input v-model="member.family_member_name"
            label="Family member name" size="sm" />
        </div>
        <div class="sm:col-span-4">
            <fwb-input v-model="member.relation"
            label="Relation" size="sm" />
        </div>
    </div>
</template>
<script setup>
import { FwbInput } from 'flowbite-vue';
const props = defineProps({
    familyMembers:Object
})
</script>