import { ref, reactive } from "vue";
import axios from 'axios';
import {warning, getErrorStr, success} from '@/helpers/ToastHelper';
import { router } from '@inertiajs/vue3';

export function useFormResponse(){
    const personalInfoForm = reactive({
        email:  "",
        first_name: "",
        middle_name: "",
        last_name: "",
        other_name: "",
        gender: "",
        age_group: "",
        place_of_birth: "",
        region: "",
        province: "",
        city_municipality: "",
        barangay: "",
        street: "",
    });
        
    const familyMembers = ref([{ family_member_name: "", relation: "" }]);

    const FormalEducations=ref([{education_level:"", course_or_study: "", school_name:"", years_attended: ""}])
    const nonFormalEducations=ref([{transmission: "", other_transmission:"", mentor: "", ordinal_generation: "", place_of_mentoring: "", disableTransmission: true}])
    const artisanInfo=reactive({
        craft_id: 0,
        artisan_name: "",
        indiginous_people_community:"",
        other_ipc: "",
        primary_art: "",
        product_name:  "",
        product_material: "",
        associative_narrative_of_production: "",
        product_making_process: "",
        product_making_process_file:"",
        product_image:"",
        product_color_pallete: "",
        vocabularies: "",
        vocabularies_file:"",
        region: "",
        province: "",
        city:  "",
        barangay: "",
        sitio: "",
        other_specialization_name: "",
        other_product_material:  "",
        other_associative_narrative_of_production: ""
    })
    const artsOrCraft=ref([{
        craft_id: 0,
        art_or_craft_name:"", related_practices:"", 
        product_making_process:"",
        product_making_process_file:"", region: "",
        province: "",  city: "",  barangay: "", sitio: "",
        other_specialization_name: "",
        other_associative_narrative_of_production: "",
    }])
   
      
    const IsViewResponse=ref(false);
    const returnBackToResponseTable=((newVal)=>{
        IsViewResponse.value=newVal;
    })
    const OpenViewingOfresponse=(async (id)=>{
        resetAllTabs()
        const details=await getResponseDetails(id);
        populatePersonalnfo(details)
        details['family_backgrounds'] ? populatefamilyMember(details['family_backgrounds']) : "";
        details["educational_backgrounds"] ? populateFormalEducation(details['educational_backgrounds']) : "";
        details["educational_backgrounds"] ? populateNonFormalEducation(details['educational_backgrounds']) : "";
        details["crafts"] ? populateArtisanAndCraft(details['artisan_info'], details['crafts']) : "";
        details["crafts"] ? populateOtherArts(details['crafts']) : "";
        
        // 
        IsViewResponse.value=true;
    })
    const resetAllTabs=(()=>{
        resetPersonalInfoForm()
        resetFormalEducation()
        resetNonFormalEducation()
        resetArtisanInfo()
        resetArtsOrCraft()
    })
    const resetPersonalInfoForm = () => {
        personalInfoForm.email = "";
        personalInfoForm.first_name = "";
        personalInfoForm.middle_name = "";
        personalInfoForm.last_name = "";
        personalInfoForm.other_name = "";
        personalInfoForm.gender = "";
        personalInfoForm.age_group = "";
        personalInfoForm.place_of_birth = "";
        personalInfoForm.region = "";
        personalInfoForm.province = "";
        personalInfoForm.city_municipality = "";
        personalInfoForm.barangay = "";
        personalInfoForm.street = "";
    };
    const resetFamilyMembers = () => {
        familyMembers.value = [{ family_member_name: "", relation: "" }];
    };
    const resetFormalEducation=() => {
        
        FormalEducations.value=([{education_level:"", course_or_study: "", school_name:"", years_attended: ""}])
    }
    const resetNonFormalEducation =()=>{
        nonFormalEducations.value=([{transmission: "", other_transmission:"", mentor: "", ordinal_generation: "", place_of_mentoring: "", disableTransmission: true}])
        
    }
    const resetArtisanInfo = () => {
        artisanInfo.craft_id = 0;
        artisanInfo.artisan_name = "";
        artisanInfo.indiginous_people_community = "";
        artisanInfo.other_ipc = "";
        artisanInfo.primary_art = "";
        artisanInfo.product_name = "";
        artisanInfo.product_material = "";
        artisanInfo.associative_narrative_of_production = "";
        artisanInfo.product_making_process = "";
        artisanInfo.product_making_process_file = "";
        artisanInfo.product_image = "";
        artisanInfo.product_color_pallete = "";
        artisanInfo.vocabularies = "";
        artisanInfo.vocabularies_file = "";
        artisanInfo.region = "";
        artisanInfo.province = "";
        artisanInfo.city = "";
        artisanInfo.barangay = "";
        artisanInfo.sitio = "";
        artisanInfo.other_specialization_name = "";
        artisanInfo.other_product_material = "";
        artisanInfo.other_associative_narrative_of_production = "";
    };
    const resetArtsOrCraft = () => {
        artsOrCraft.value = [{
            craft_id: 0,
            art_or_craft_name: "",
            related_practices: "",
            product_making_process: "",
            product_making_process_file: "",
            region: "",
            province: "",
            city: "",
            barangay: "",
            sitio: "",
            other_specialization_name: "",
            other_associative_narrative_of_production: ""
        }];
    };
    const getResponseDetails=((id)=>{
        return axios.get(route('response.getResponseDetails', {id:id}))
        .then((response) => {
            console.log(response.data)
            return response.data;
        })
        .catch((error) => {
          console.log(error);
          let errorStr=getErrorStr(error.response.data.errors);
            warning(errorStr)
            return error;
        });
    })
    const populatePersonalnfo=(async (response)=>{
        console.log(response.addresses[0])
        personalInfoForm.email = response.email ?? "";
        personalInfoForm.first_name = response.first_name ?? "";
        personalInfoForm.middle_name= response.middle_name ?? "";
        personalInfoForm.last_name = response.last_name ?? "";
        personalInfoForm.other_name = response.other_name ?? "";
        personalInfoForm.gender = response.gender ?? "";
        personalInfoForm.age_group = response.age_group ?? "";
        personalInfoForm.place_of_birth = response.place_of_birth ?? "";
        personalInfoForm.region = response.addresses[0]?.region ?? "";
        personalInfoForm.province = response.addresses[0]?.province ?? "";
        personalInfoForm.city_municipality = response.addresses[0]?.city_municipality ?? "";
        personalInfoForm.barangay = response.addresses[0]?.barangay ?? "";
        personalInfoForm.street = response.addresses[0]?.street ?? "";
    });
    const populatefamilyMember=((members)=>{
        familyMembers.value = []; 
        const mappedMember=members.map(item=>({family_member_name: item.name, relation: item.relation }));
        familyMembers.value = mappedMember; 

    });
    const populateFormalEducation=((education)=>{
        // const FormalEducations=ref([{education_level:"", course_or_study: "", school_name:"", years_attended: ""}])
        console.log(education)
        FormalEducations.value=[];
        const formalEducationsMapped=education
        .filter(educ => educ.type === "FORMAL")
        .map(educ=>({
            education_level: educ.education_level,
            course_or_study: educ.course_or_study,
            school_name: educ.school_name,
            years_attended: educ.years,
        }));
        FormalEducations.value=formalEducationsMapped;
        console.log(FormalEducations.value)
    })
    const populateNonFormalEducation=((education)=>{
        nonFormalEducations.value=[];
        const NonformalEducationsMapped=education
        .filter(educ => educ.type === "NONFORMAL")
        .map(educ=>({
            transmission: educ.transmission ?? "",
            other_transmission: educ.other_transmission ?? "",
            mentor: educ.mentor_name ?? "",
            ordinal_generation: educ.ordinal_generation ?? "",
            place_of_mentoring: educ.place_of_mentoring ?? "",
        }));
        nonFormalEducations.value=NonformalEducationsMapped;
    })
    const populateArtisanAndCraft=((artisan, crafts)=>{
        const MappedCraft=crafts
        .filter(crft=> crft.specialization_rank===1)
        .map(itm=>({
            craft_id:itm.id,
            primary_art:itm.specialization_name,
            product_name:itm.product_name,
            product_material:itm.product_material,
            associative_narrative_of_production: itm.associative_narrative_of_production,
            product_making_process: itm.product_making_process,
            product_making_process_file: itm.product_making_process_file,
            product_image: itm.product_image_pattern,
            product_color_pallete: itm.product_image_pallete,
            vocabularies: itm.vocabularies,
            vocabularies_file: itm.vocabularies_file,
            region: itm.region,
            province: itm.province,
            city: itm.city_municipality,
            sitio: itm.sitio,
            other_specialization_name: itm.other_specialization_name,
            other_product_material: itm.other_product_material,
            other_associative_narrative_of_production: itm.other_associative_narrative_of_production,
        }));
        artisanInfo.craft_id=MappedCraft[0]?.craft_id?? 0;
        artisanInfo.artisan_name=artisan.artisan_name?? "";
        artisanInfo.indiginous_people_community=artisan.indegenous_people_community?? "";
        artisanInfo.other_ipc=artisan.other_indegenous_people_community?? "";
        artisanInfo.primary_art=MappedCraft[0]?.specialization_name,
        artisanInfo.product_name=MappedCraft[0]?.product_name,
        artisanInfo.product_material=MappedCraft[0]?.product_material,
        artisanInfo.associative_narrative_of_production=MappedCraft[0]?.associative_narrative_of_production,
        artisanInfo.product_making_process=MappedCraft[0]?.product_making_process,
        artisanInfo.product_making_process_file=MappedCraft[0]?.product_making_process_file,
        artisanInfo.product_image=MappedCraft[0]?.product_image,
        artisanInfo.product_color_pallete=MappedCraft[0]?.product_color_pallete,
        artisanInfo.vocabularies=MappedCraft[0]?.vocabularies,
        artisanInfo.vocabularies_file=MappedCraft[0]?.vocabularies_file,
        artisanInfo.region=MappedCraft[0]?.region,
        artisanInfo.province=MappedCraft[0]?.province,
        artisanInfo.city=MappedCraft[0]?.city,
        artisanInfo.sitio=MappedCraft[0]?.sitio,
        artisanInfo.other_specialization_name=MappedCraft[0]?.other_specialization_name,
        artisanInfo.other_product_material=MappedCraft[0]?.other_product_material,
        artisanInfo.other_associative_narrative_of_production=MappedCraft[0]?.other_associative_narrative_of_production,
        console.log(MappedCraft[0])
        
    })
    const populateOtherArts=((crafts)=>{
      
        artsOrCraft.value=[];
        const MappedCraft=crafts
        .filter(crft=> crft.specialization_rank>1)
        .map(itm=>({
            craft_id:itm.id,
            art_or_craft_name: itm.specialization_name,
            related_practices: itm.associative_narrative_of_production,
            product_making_process: itm.product_making_process,
            product_making_process_file: itm.product_making_process_file,
            region: itm.region,
            city: itm.city_municipality,
            province: itm.province,
            barangay: itm.barangay,
            sitio: itm.sitio,
            other_specialization_name: itm.other_specialization_name,
            other_associative_narrative_of_production: itm.other_associative_narrative_of_production,
        }))
        artsOrCraft.value=MappedCraft;
        console.log(artsOrCraft.value)
    })
    return {IsViewResponse, returnBackToResponseTable, OpenViewingOfresponse,
         personalInfoForm, familyMembers, FormalEducations, nonFormalEducations, artisanInfo, artsOrCraft};
}