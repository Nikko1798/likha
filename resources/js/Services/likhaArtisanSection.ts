import { ref, reactive, toRaw, computed, onMounted  } from 'vue';
import { submitStepOne, insertOrUpdateStepTwo, insertOrUpdateStepThree, insertOrUpdateStepFour } from '@/Services/likhaFormApi';
import PersonalInformation from '@/pages/LikhaForm/PersonalInformation.vue'
import FamilyBackground from '@/pages/LikhaForm/FamilyBackground.vue';
import nonFormalEducation from '@/pages/LikhaForm/NonFormalEducation.vue';
import ArtisanCrafts from '@/pages/LikhaForm/ArtisanCrafts.vue';
import FormalEducation from '@/pages/LikhaForm/FormalEducation.vue';
import { CheckIcon, UserIcon, HomeIcon, AcademicCapIcon, PaintBrushIcon } from '@heroicons/vue/24/solid';

export function useArtisanForm(props){
     const personalInfoForm = reactive({
        first_name: props.personalInfo?.first_name || "",
        middle_name: props.personalInfo?.middle_name || "",
        last_name: props.personalInfo?.last_name || "",
        gender: props.personalInfo?.gender || "",
        age_group: props.personalInfo?.age_group || "",
        place_of_birth: props.personalInfo?.place_of_birth || "",
        region: props.personalInfo?.region || "",
        province: props.personalInfo?.province || "",
        city_municipality: props.personalInfo?.city_municipality || "",
        barangay: props.personalInfo?.barangay || "",
        street: props.personalInfo?.street || "",
    }); 
}