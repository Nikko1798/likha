// composables/useLikhaForm.ts
import { ref, reactive, toRaw, computed, onMounted  } from 'vue';
import { submitStepOne, insertOrUpdateStepTwo, insertOrUpdateStepThree, insertOrUpdateStepFour } from '@/Services/likhaFormApi';
import PersonalInformation from '@/pages/LikhaForm/PersonalInformation.vue'
import FamilyBackground from '@/pages/LikhaForm/FamilyBackground.vue';
import nonFormalEducation from '@/pages/LikhaForm/NonFormalEducation.vue';
import ArtisanCrafts from '@/pages/LikhaForm/ArtisanCrafts.vue';
import FormalEducation from '@/pages/LikhaForm/FormalEducation.vue';
import { CheckIcon, UserIcon, HomeIcon, AcademicCapIcon, PaintBrushIcon } from '@heroicons/vue/24/solid';

export function useLikhaForm(props) {
    const isLoading = ref(false);
    const activeStep = ref(props.personalInfo?props.personalInfo.current_step:0);
    const steps = ref([
        { name: 'Personal Info', component: PersonalInformation, icon: UserIcon, active: activeStep.value!=0?false:true, details: 'Provide Personal information here' },
        { name: 'Family background', component:FamilyBackground, icon: HomeIcon, active: activeStep.value!=1?false:true, details: 'Provide family background here' },
        { name: 'Formal Education', icon: AcademicCapIcon, active: activeStep.value!=2?false:true, details: 'Provide educational information here' },
        { name: 'Non-formal Education', icon: AcademicCapIcon, active: activeStep.value!=3?false:true, details: 'Provide educational information here' },
        { name: 'Artisan and Craft', component: ArtisanCrafts,  icon: PaintBrushIcon, active: activeStep.value!=4?false:true, details: 'Provide artisan and crafts information here' },
        { name: 'Other Art',  icon: PaintBrushIcon, active: activeStep.value!=5?false:true, details: "Provide information about the artisan's other artworks here" },
    ]);
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


    const nonFormalEducations=ref([{transmission: "", other_transmission:"", mentor: "", ordinal_generation: "", place_of_mentoring: "", disableTransmission: true}])
    const FormalEducations=ref([{education_level:"", course_or_study: "", school_name:"", years_attended: ""}])
    const artsOrCraft=ref([{art_or_craft_name:"", related_practices:"", product_making_process:"",
    product_making_process_file:null, region: "",
        province: "",  city: "",  barangay: "", sitio: "",}])
        
    const familyMembers = ref([{ family_member_name: "", relation: "" }]);

    let originalFamilyMembers = reactive([]);
   
    const getMembers = () => {
        if (props.family_background?.family_backgrounds?.length) { 
            familyMembers.value = props.family_background.family_backgrounds.map(member => ({
                family_member_name: member.name,
                relation: member.relation
            }));
            
            originalFamilyMembers = JSON.parse(JSON.stringify(familyMembers.value)); 
            console.log(originalFamilyMembers)
        }
        
    };
    const getformalEducation=()=>{
        if (props.formalEducation && props.formalEducation.length > 0) 
        {
            FormalEducations.value=[];
            FormalEducations.value = props.formalEducation.map(educ => ({
                education_level:educ.education_level||"", course_or_study: educ.course_or_study||"",
                school_name:educ.school_name||"", years_attended: educ.years||""
            }));
        }
    }
    const getNonformalEducation=()=>{
        if (props.NonformalEducation && props.NonformalEducation.length > 0) {
            nonFormalEducations.value = props.NonformalEducation.map(educ => ({
                transmission: educ.transmission || "", 
                other_transmission: educ.other_transmission || "", 
                mentor: educ.mentor || "",
                ordinal_generation: educ.ordinal_generation || "", 
                place_of_mentoring: educ.place_of_mentoring || "", 
                disableTransmission: !!educ.other_transmission // Convert to boolean
            }));
        }
        
    }
    const submitStepOneForm = () => {
        submitStepOne(toRaw(personalInfoForm), props.personalInfo).then((response)=>{
            if(response.status!="422")
            {
                nextAction();
            }
            isLoading.value=false
        });
    };
    const insertOrUpdateStepTwoForm = () => {
        insertOrUpdateStepTwo(toRaw(familyMembers.value), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                nextAction();
            }
            isLoading.value=false
        });
    };
    const insertOrUpdateStepThreeForm = () => {
        insertOrUpdateStepThree(toRaw(FormalEducations.value), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                nextAction();
            }
            isLoading.value=false
        });
    };
    const insertOrUpdateStepFourForm = () => {
        insertOrUpdateStepFour(toRaw(nonFormalEducations.value), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                nextAction();
            }
            isLoading.value=false
        });
    };
    const isFamilyBgEdited = computed(() => {
        return familyMembers.value.some((member, index) => {
          return (
            member.family_member_name !== originalFamilyMembers[index].family_member_name ||
            member.relation !== originalFamilyMembers[index].relation
          );
        });
    });
    const isPersonalInfoEdited = computed(() => {
        return Object.keys(personalInfoForm).some(
            (key) => personalInfoForm[key] !== props.personalInfo?.[key]
        );
    });

    const nextStep = () => {
        isLoading.value=true
        switch (activeStep.value) {
            case 0:
                if(isPersonalInfoEdited.value)
                {
                    submitStepOneForm();
                }
                else{
                    nextAction();
                    isLoading.value=false
                }
                break;
            case 1:
                // if(isFamilyBgEdited.value)
                // {
                    insertOrUpdateStepTwoForm();
                // }
                // else{
                //     nextAction();
                //     isLoading.value=false
                // }
                break;
            case 2:
                insertOrUpdateStepThreeForm();
                break;
            case 3:
                insertOrUpdateStepFourForm();
                break;
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
    
    const prevStep = () => {
        if (activeStep.value > 0) {
            steps.value[activeStep.value].active = false;
            activeStep.value--;
            steps.value[activeStep.value].active = true;
        }
    };
    return {
        personalInfoForm,
        familyMembers,
        ArtisanCraftsInfo, nonFormalEducations,FormalEducations, artsOrCraft,
        activeStep, steps, submitStepOneForm, insertOrUpdateStepTwoForm, nextStep, nextAction,prevStep,
        getMembers, getformalEducation, getNonformalEducation,
        isLoading
    };
}

