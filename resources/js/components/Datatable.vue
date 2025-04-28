<template>
    
    <!-- Search Input -->
    <div class="flex justify-end space-x-4">
      <fwb-input v-model="query" label="Search" placeholder="Enter your search query" size="sm">
        <template #prefix>
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </template>
        <template #suffix>
          <fwb-button gradient="cyan-blue" @click="searchMethod">Search</fwb-button>
        </template>
      </fwb-input>
    </div>
    <br>
    <div class="overflow-x-auto w-full">
    <!-- Table -->
     <div class="relative">
      <Loader :loading="isLoading"></Loader>
        <fwb-table class="min-w-full table-auto text-sm" striped>
          <fwb-table-head style="background-color: lightgray; ">
            <fwb-table-head-cell  v-for="(header, index) in tableHeaders" :key="index">
              {{ header }}
            </fwb-table-head-cell>
          </fwb-table-head>
    
          <fwb-table-body>
            <fwb-table-row v-if="filteredTableData.length === 0">
              <fwb-table-cell :colspan="visibleColumns.length" class="text-center py-4 text-gray-500 !text-center">
                <div class="flex items-center justify-center gap-2">
                  <svg height="20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path opacity="0.1" d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" fill="#817e7e"></path>
                      <path d="M17 17L21 21" stroke="#817e7e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#817e7e" stroke-width="2"></path>
                    </g>
                  </svg>
                  <span>No results found.</span>
                </div>
              </fwb-table-cell>
            </fwb-table-row>
            <fwb-table-row v-else v-for="(item, rowIndex) in filteredTableData" :key="rowIndex">
              <fwb-table-cell v-for="(column, colIndex) in visibleColumns" :key="colIndex">
                <slot :name="`cell-${column}`" :rowData="tableData[rowIndex]">
                  <!-- Default content (text) if no slot is provided -->
                  <span v-html="item[column]"></span>
                </slot>
               
              </fwb-table-cell>
            </fwb-table-row>
          </fwb-table-body>
        </fwb-table>
      </div>
    </div>
    <!-- Pagination -->
    <div class="flex justify-end mt-5">
      <fwb-pagination  
        v-model="currentPage" 
        :total-items="totalItems" 
        :items-per-page="itemsPerPage">
      </fwb-pagination>
    </div>

 
</template>

<script setup>
import { FwbInput, FwbPagination, FwbButton ,  FwbA,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow } from 'flowbite-vue';
import { ref, watch, onMounted, computed } from 'vue';
import axios from 'axios';
import { debounce } from 'lodash';
import { eventBus } from '@/Services/mitt';
import Loader from './Loader.vue' // Import event bus

const props = defineProps({
  apiUrl: { type: String, required: true },
  tableHeaders: { type: Array, required: true },
  visibleColumns: { type: Array, required: true },
  itemsPerPage: { type: Number, default: 1 },
  eventName: { type: String, required: true }, // Unique event name for refreshing
  extraParams: { type: Object, default: () => ({}) }, // Accept additional parameters
});
const isLoading=ref(false)
const query = ref('');
const tableData = ref([]);
const currentPage = ref(1);
const totalItems = ref(0);

// This function is responsible for accessing a specific value from a deeply nested object
// example data.item.approver.name this function loop through the object and find thtet value if that data.item.approver.name
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

//this will arranges the selected values in an easily accessible format (flattened structure), ready to be displayed in a table or any other format
const filteredTableData = computed(() => {
return tableData.value.map(item => {
  let filteredItem = {};
  props.visibleColumns.forEach(col => {
    filteredItem[col] = getNestedValue(item, col);
  });
  return filteredItem;
});
});


const fetchData = async () => {
  isLoading.value=true;
  try {
    const response = await axios.get(props.apiUrl, {
      params: {
        name: query.value,
        page: currentPage.value,
        ...props.extraParams,
      },
    });
    console.log(response.data.total)
    tableData.value = response.data.data;
    totalItems.value = response.data.total;
    isLoading.value=false;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const debouncedFetchData = debounce(fetchData, 300);

const searchMethod = () => {
  currentPage.value = 1;
  fetchData();
};
// Listen for an event
eventBus.on(props.eventName, fetchData);
onMounted(fetchData);
watch([query, currentPage, () => props.extraParams], debouncedFetchData, { deep: true }); //extraParams is an object (e.g., { status: 'active', type: 'urgent' }), Vue doesn’t detect changes inside it unless deep: true is used.
watch(() => props.extraParams, () => {
  fetchData
}, { deep: true });
</script>