// composables/useLikhaForm.ts
import { ref, reactive, toRaw, computed, onMounted  } from 'vue';
import { submitStepOne, insertOrUpdateStepTwo, insertOrUpdateStepThree,
     insertOrUpdateStepFour, insertOrUpdateStepFive, insertOrUpdateStepSix } from '@/Services/likhaFormApi';
import PersonalInformation from '@/pages/LikhaForm/PersonalInformation.vue'
import FamilyBackground from '@/pages/LikhaForm/FamilyBackground.vue';
import nonFormalEducation from '@/pages/LikhaForm/NonFormalEducation.vue';
import ArtisanCrafts from '@/pages/LikhaForm/ArtisanCrafts.vue';
import FormalEducation from '@/pages/LikhaForm/FormalEducation.vue';
import { CheckIcon, UserIcon, HomeIcon, AcademicCapIcon, PaintBrushIcon, LockClosedIcon } from '@heroicons/vue/24/solid';
import DataPrivacy from '@/pages/LikhaForm/DataPrivacy.vue';
import { usePage } from '@inertiajs/vue3';
import type { Page } from '@inertiajs/core';
export function useLikhaForm(props) {
    const isLoading = ref(false);
    const activeStep = ref(props.personalInfo?props.personalInfo.current_step:0);
    const steps = ref([
        { name: 'Data Privacy', component: DataPrivacy, icon: LockClosedIcon, active: activeStep.value!=0?false:true, details: 'Provide Personal information here' },
        { name: 'Personal Info', component: PersonalInformation, icon: UserIcon, active: activeStep.value!=1?false:true, details: 'Provide Personal information here' },
        { name: 'Family background', component:FamilyBackground, icon: HomeIcon, active: activeStep.value!=2?false:true, details: 'Provide family background here' },
        { name: 'Formal Education', icon: AcademicCapIcon, active: activeStep.value!=3?false:true, details: 'Provide educational information here' },
        { name: 'Non-formal Education', icon: AcademicCapIcon, active: activeStep.value!=4?false:true, details: 'Provide educational information here' },
        { name: 'Artisan and Craft', component: ArtisanCrafts,  icon: PaintBrushIcon, active: activeStep.value!=5?false:true, details: 'Provide artisan and crafts information here' },
        { name: 'Other Art',  icon: PaintBrushIcon, active: activeStep.value!=6?false:true, details: "Provide information about the artisan's other artworks here" },
    ]);
    const personalInfoForm = reactive({
        first_name: props.personalInfo?.first_name || "",
        middle_name: props.personalInfo?.middle_name || "",
        last_name: props.personalInfo?.last_name || "",
        other_name: props.personalInfo?.other_name || "",
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
        
        artisan_name: props.artisan?.artisan_info?.artisan_name || "",
        indiginous_people_community:props.artisan?.artisan_info?.indegenous_people_community||"",
        other_ipc: props.artisan?.artisan_info?.other_indegenous_people_community||"",
        primary_art:props.primaryCraft?.specialization_name || "",
        product_name: props.primaryCraft?.product_name || "",
        product_material:props.primaryCraft?.product_material || "",
        associative_narrative_of_production:props.primaryCraft?.associative_narrative_of_production || "",
        product_making_process:props.primaryCraft?.product_making_process || "",
        product_making_process_file:null,
        product_image:null,
        product_color_pallete: props.primaryCraft?.product_image_pallete || "",
        vocabularies:props.primaryCraft?.vocabularies || "",
        vocabularies_file:null,
        region: props.primaryCraft?.region || "",
        province: props.primaryCraft?.province || "",
        city: props.primaryCraft?.city_municipality || "",
        barangay: props.primaryCraft?.barangay || "",
        sitio: props.primaryCraft?.sitio || "",
        other_specialization_name: props.primaryCraft?.other_specialization_name || "",
        other_product_material: props.primaryCraft?.other_product_material || "",
        other_associative_narrative_of_production: props.primaryCraft?.other_associative_narrative_of_production || ""
    });

    
    const nonFormalEducations=ref([{transmission: "", other_transmission:"", mentor: "", ordinal_generation: "", place_of_mentoring: "", disableTransmission: true}])
    const FormalEducations=ref([{education_level:"", course_or_study: "", school_name:"", years_attended: ""}])
    const artsOrCraft=ref([{art_or_craft_name:"", related_practices:"", 
        product_making_process:"",
        product_making_process_file:null, region: "",
        province: "",  city: "",  barangay: "", sitio: "",
        other_specialization_name: "",
        other_associative_narrative_of_production: "",
        disableOtherSpecName: true, disableOtherNarative: true
    }])
        
    const familyMembers = ref([{ family_member_name: "", relation: "" }]);

    let originalFamilyMembers = reactive([]);
    let originalFormalEduc = reactive([]);
    let originalNonFormalEduc = reactive([]);
    let OriginalArtisanCraftsInfo = reactive({ ...ArtisanCraftsInfo });
    let OriginalPersonalINfo=reactive({...personalInfoForm})

    const getMembers = (() => {
        if (props.family_background?.family_backgrounds?.length) { 
            familyMembers.value = props.family_background.family_backgrounds.map(member => ({
                family_member_name: member.name,
                relation: member.relation
            }));
            
            originalFamilyMembers = JSON.parse(JSON.stringify(familyMembers.value)); 
            console.log(originalFamilyMembers)
        }
        
    });
    
    
    const getformalEducation=(()=>{
        if (props.formalEducation && props.formalEducation.length > 0) 
        {
            FormalEducations.value=[];
            FormalEducations.value = props.formalEducation.map(educ => ({
                education_level:educ.education_level||"", course_or_study: educ.course_or_study||"",
                school_name:educ.school_name||"", years_attended: educ.years||""
            }));
            originalFormalEduc=JSON.parse(JSON.stringify(FormalEducations.value)); 
        }
    });
    const getNonformalEducation=(()=>{
        if (props.NonformalEducation && props.NonformalEducation.length > 0) {
            nonFormalEducations.value = props.NonformalEducation.map(educ => ({
                transmission: educ.transmission || "", 
                other_transmission: educ.other_transmission || "", 
                mentor: educ.mentor || "",
                ordinal_generation: educ.ordinal_generation || "", 
                place_of_mentoring: educ.place_of_mentoring || "", 
                disableTransmission: !!educ.other_transmission // Convert to boolean
            }));
            originalNonFormalEduc=JSON.parse(JSON.stringify(nonFormalEducations.value)); 
        }
        
    });
    const submitStepOneForm = (() => {
        submitStepOne(toRaw(personalInfoForm), props.personalInfo).then((response)=>{
            if(response.status!="422")
            {
                nextAction();
            }
            isLoading.value=false
        });
    });
    const insertOrUpdateStepTwoForm = (() => {
        insertOrUpdateStepTwo(toRaw(familyMembers.value), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                
                originalFamilyMembers = JSON.parse(JSON.stringify(familyMembers.value)); 
                nextAction();
            }
            isLoading.value=false
        });
    });
    const insertOrUpdateStepThreeForm = (() => {
        insertOrUpdateStepThree(toRaw(FormalEducations.value), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                originalFormalEduc=JSON.parse(JSON.stringify(FormalEducations.value)); 
                console.log(JSON.parse(JSON.stringify(FormalEducations.value)))
                nextAction();
            }
            isLoading.value=false
        });
    });
    const insertOrUpdateStepFourForm = (() => {
        insertOrUpdateStepFour(toRaw(nonFormalEducations.value), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                originalNonFormalEduc=JSON.parse(JSON.stringify(nonFormalEducations.value)); 
                nextAction();
            }
            isLoading.value=false
        });
    });
    const createOrUpdateArtisanForm=(()=>{
        insertOrUpdateStepFive(toRaw(ArtisanCraftsInfo), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                Object.assign(OriginalArtisanCraftsInfo, { ...ArtisanCraftsInfo })
                nextAction();
            }
            isLoading.value=false
        });
    });
    const insertOrUpdateOtherArtsForm=(()=>{
        console.log(toRaw(artsOrCraft.value))
        insertOrUpdateStepSix(toRaw(artsOrCraft.value), props.personalInfo.id).then((response)=>{
            if(response.status!="422")
            {
                nextAction();
            }
            isLoading.value=false
        });
    })
    const isFamilyBgEdited = (() => {
        if (!familyMembers.value || !originalFamilyMembers || familyMembers.value.length !== originalFamilyMembers.length) {
            return true; // Assuming it's edited if lengths don't match
          }
          return familyMembers.value.some((member, index) => {
            // Ensure we don't get an error if originalFamilyMembers[index] is undefined
            const originalMember = originalFamilyMembers[index];
            return (
              member.family_member_name !== originalMember?.family_member_name ||
              member.relation !== originalMember?.relation
            );
          });
    });
    const isFormalEducEdited = () => {
        if (!FormalEducations.value || !originalFormalEduc || FormalEducations.value.length !== originalFormalEduc.length) {
            
            return true; // Assuming it's edited if lengths don't match
          }
          return FormalEducations.value.some((educ, index) => {
            // Ensure we don't get an error if originalFamilyMembers[index] is undefined
            const originaFormalEduc = originalFormalEduc[index];
            return (
                // education_level:"", course_or_study: "", school_name:"", years_attended
                educ.education_level !== originaFormalEduc?.education_level ||
                educ.course_or_study !== originaFormalEduc?.course_or_study ||
                educ.school_name !== originaFormalEduc?.school_name ||
                educ.years_attended !== originaFormalEduc?.years_attended 
            );
          });
    };
    const isNonFormalEducEdited = (() => {
        if (!nonFormalEducations.value || !originalNonFormalEduc || nonFormalEducations.value.length !== originalNonFormalEduc.length) {
            
            return true; // Assuming it's edited if lengths don't match
          }
          return nonFormalEducations.value.some((educ, index) => {
            // Ensure we don't get an error if originalFamilyMembers[index] is undefined
            const originaNonFormalEduc = originalNonFormalEduc[index];
            return (
                educ.transmission !== originaNonFormalEduc?.transmission ||
                educ.other_transmission !== originaNonFormalEduc?.other_transmission ||
                educ.mentor !== originaNonFormalEduc?.mentor ||
                educ.ordinal_generation !== originaNonFormalEduc?.ordinal_generation ||
                educ.place_of_mentoring !== originaNonFormalEduc?.place_of_mentoring 
            );
          });
    });
    const isPersonalInfoEdited=(()=>{
        const currentValues=toRaw(OriginalPersonalINfo);
        for (const key in personalInfoForm) {
            if (personalInfoForm[key] !== currentValues[key]) {
                console.log(`Changed: ${key}`);
                return true;
            }
        }
        return false;
    })
    const isArtisanInfoEdited = (() => {
        const currentValues = toRaw(OriginalArtisanCraftsInfo);
        for (const key in ArtisanCraftsInfo) {
            if (ArtisanCraftsInfo[key] !== currentValues[key]) {
                console.log(`Changed: ${ArtisanCraftsInfo[key]}`)
                console.log(`Changed2: ${currentValues[key]}`);
                return true;
            }
        }
        return false;
    });
    const nextStep = (() => {
        const page = usePage() as Page;
        const currentRoute: string = page.url;
        isLoading.value=true
        switch (activeStep.value) {
            case 1:
                if(currentRoute.includes('likha/form/draft'))
                {
                    if(isPersonalInfoEdited())
                    {
                        submitStepOneForm();
                    }
                    else{
                        nextAction();
                        isLoading.value=false
                    }
                }
                else{
                    submitStepOneForm();

                }
                break;
            case 2:
                if(isFamilyBgEdited())
                {
                    insertOrUpdateStepTwoForm();
                }
                else{
                    nextAction();
                    isLoading.value=false
                }
                break;
            case 3:
                if(isFormalEducEdited())
                {
                    insertOrUpdateStepThreeForm();
                }
                else{
                    nextAction();
                    isLoading.value=false
                }
                break;
            case 4:
                if(isNonFormalEducEdited())
                {
                    insertOrUpdateStepFourForm();
                }
                else{
                    nextAction();
                    isLoading.value=false
                }
                break;
            case 5:
                if(isArtisanInfoEdited())
                {
                    createOrUpdateArtisanForm()
                }
                else{
                    nextAction();
                    isLoading.value=false
                }
                break;
            case 6:
                
                insertOrUpdateOtherArtsForm()
                break;
                
            default:
                nextAction();
                isLoading.value=false
                console.log(familyMembers)
                break;
        }
       
    });
    const nextAction= (() =>{
        if (activeStep.value < steps.value.length - 1) {
            steps.value[activeStep.value].active = false;
            activeStep.value++;
            steps.value[activeStep.value].active = true;
        }
    });
    
    const prevStep = (() => {
        if (activeStep.value > 0) {
            steps.value[activeStep.value].active = false;
            activeStep.value--;
            steps.value[activeStep.value].active = true;
        }
    });
    return {
        personalInfoForm,
        familyMembers,
        ArtisanCraftsInfo, nonFormalEducations,FormalEducations, artsOrCraft,
        activeStep, steps, submitStepOneForm, insertOrUpdateStepTwoForm, nextStep, nextAction,prevStep,
        getMembers, getformalEducation, getNonformalEducation,
        isLoading
    };
}

