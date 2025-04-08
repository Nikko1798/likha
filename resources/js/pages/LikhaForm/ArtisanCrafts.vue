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
                </div>
                <div
                class="grid grid-cols-1 sm:grid-cols-12 gap-3"
                >
                    <div class="sm:col-span-8">
                        <fwb-file-input v-model="modelValue.vocabularies_file" label="Vocabularies file" size="sm" />
                    </div>
                    <div class="sm:col-span-8">
                        <fwb-file-input @change="handleFileChange" v-model="modelValue.product_image" label="Product Image file" size="sm" />
                       
                    </div>
                </div>
                <div
                class="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-3"
                >
                    <div class="sm:col-span-6">
                        <fwb-textarea
                            v-model="modelValue.product_color_pallete"
                            :rows="4"
                            label="Product Color Palletes"
                            placeholder="Write the list of color palletes here."
                        />
                    </div>
                    <div class="sm:col-span-6 flex flex-col items-start space-y-2">
                        <canvas id="productImage" width="250" height="250" style="border:1px solid #000000;"></canvas>

                        <fwb-button-group>
                            <fwb-button color="purple" @click="openModal('cameraModal')">Open Camera</fwb-button>
                            <fwb-button color="alternative" @click="triggerFileInput">Select Image</fwb-button>
                        </fwb-button-group>
                        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" />
    
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
    
    <Camera 
        :isOpen="modals.cameraModal"
        v-model:imageSrc="imageSrc"
        @close="closeModal('cameraModal')"></Camera>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { FwbInput, FwbSelect, FwbButtonGroup, FwbButton, FwbTextarea, FwbFileInput   } from "flowbite-vue";
import {getRegionOptions, getProvinceOption, getCitiesOption, getBarangayOption} from '@/helpers/addressHelpers';
import {ipc, artsAndCraft, relatedPracticeOptions} from '@/helpers/dropdownHelper';
import ColorThief from "color-thief-ts";
import Camera from './CameraForProduct.vue'
import {useModal} from '@/helpers/modals';

const props=defineProps(["modelValue"]);
const emits=defineEmits(["update:modelValue"]);
const disableOtherIpc = ref(true);
const regionOptions = ref([]);
const provinceOptions = ref([]);
const cityOptions = ref([]);
const barangayOptions = ref([]);

const imageSrc = ref('');
const imgStrFromCam = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const colors = ref([]);
const { modals, openModal, closeModal } = useModal()

watch(imageSrc, (newUrl) => {
    drawImageFromDataUrl(newUrl)
})
function drawImageFromDataUrl(newUrl): void {
  const canvas = document.getElementById('productImage') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    console.error('Failed to get 2D context')
    return
  }

  const image = new Image()
  image.src = newUrl

  image.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear previous image (optional)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  }
  extractColorsFromDataUrl(newUrl, 5)  // Extract top 5 colors
  .then(colors => {
    console.log('Extracted Colors:', colors);
  })
  .catch(error => {
    console.error('Error extracting colors:', error);
  });
  image.onerror = () => {
    console.error('Failed to load image from dataUrl')
  }
}
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}
// const handleFileChange = async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   props.modelValue.product_color_pallete="";
//   // Convert File to Data URL
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = async () => {
//     imageSrc.value = reader.result;

//     // Wait for image to load, then extract colors
//     const img = new Image();
//     img.crossOrigin = "Anonymous";
//     img.src = reader.result;
//     img.onload = async () => {
//       const colorThief = new ColorThief();
//       colors.value = await colorThief.getPalette(img, 6); // Extract 6 colors
//       console.log("Extracted Color Palette:", colors.value);
//       colors.value.forEach((color, index) => {
//         console.log(`Color ${index + 1}: ${color}`);
//         props.modelValue.product_color_pallete+=(index > 0 ? "\n" : "")+`Color ${index + 1}: ${color}` ;
//       });
//     };
//   };
// };
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

function extractColorsFromDataUrl(dataUrl: string, colorCount: number = 10): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      // Create a canvas element to draw the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject('Failed to get canvas context');
        return;
      }

      // Set canvas size to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0);

      // Get pixel data from canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Get color palette (top N most frequent colors)
      const colorPalette = getColorPalette(pixels, colorCount);
      resolve(colorPalette);
    };

    img.onerror = () => {
      reject('Failed to load image from data URL');
    };
  });
}
// Helper function to get a color palette from pixel data
function getColorPalette(pixels: Uint8ClampedArray, colorCount: number): string[] {
  const colorMap: { [key: string]: number } = {};

  // Loop through pixels and create a color map (counting occurrences of each color)
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];         // Red
    const g = pixels[i + 1];     // Green
    const b = pixels[i + 2];     // Blue
    const a = pixels[i + 3];     // Alpha (unused here)

    // Ignore fully transparent pixels (Alpha 0)
    if (a === 0) continue;

    const hexColor = rgbToHex(r, g, b);
    colorMap[hexColor] = (colorMap[hexColor] || 0) + 1;
  }

  // Sort colors by frequency and take top 'colorCount' colors
  const sortedColors = Object.entries(colorMap)
    .sort(([, countA], [, countB]) => countB - countA)  // Sort by frequency, descending
    .slice(0, colorCount)  // Take the top 'colorCount' colors
    .map(([color]) => color);  // Extract only color code (Hex)

  return sortedColors;
}

// Convert RGB to Hex
function rgbToHex(r: number, g: number, b: number): string {
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
    const file = input.files[0];
    convertFileToDataUrl(file);
    }
};
const convertFileToDataUrl = (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Return or store the Base64 string (Data URL)
        imageSrc.value = reader.result as string;
        extractColorsFromDataUrl(imageSrc.value)
        console.log('Data URL:', imageSrc.value);  // Return or log the Data URL here
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsDataURL(file);  // Read the file as a data URL (Base64)
};


</script>