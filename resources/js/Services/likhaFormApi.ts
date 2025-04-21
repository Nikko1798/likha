import axios from 'axios';
import {warning, getErrorStr, success} from '@/helpers/ToastHelper';
import { router } from '@inertiajs/vue3';

axios.defaults.headers.common["X-CSRF-TOKEN"] = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");


export const submitStepOne = (formData, personalInfo) => {
  if(personalInfo) {
    return updateStepOne(formData, personalInfo.id);
  }
  else{
    return insertStepOne(formData);
  }
};
const insertStepOne = (formData) => {
  return axios.post(route('form.step_one'), formData)
  .then((response) => {
    success("Step one details inserted successfully")
      router.visit(route('form.draft', { uuid: response.data.data }));
      return response.data;
  })
  .catch((error) => {
    console.log(error);
    let errorStr=getErrorStr(error.response.data.errors);
      warning(errorStr)
      return error;
  });
}
const updateStepOne=(formData, id)=>{
  return axios.post(route('form.updatePersonalInfo', {id:id}), formData)
  .then((response) => {
      success("Step one details updated successfully")
      return response.data;
  })
  .catch((error) => {
    console.log(error);
    let errorStr=getErrorStr(error.response.data.errors);
      warning(errorStr)
      return error;
  });
}

export const insertOrUpdateStepTwo=(formData, id)=>{
  return axios.post(route('form.insertOrUpdateFamilybackground', {id:id}), formData)
  .then((response) => {
      success("Step two details inserted successfully")
      return response.data;
  })
  .catch((error) => {
    console.log(error);
    let errorStr=getErrorStr(error.response.data.errors);
      warning(errorStr)
      return error;
  });
}

export const insertOrUpdateStepThree=(formData, id)=>{
  return axios.post(route('form.createOrUpdateFormalEducation', {id:id}), formData)
  .then((response) => {
      success("Step three details inserted successfully")
      return response.data;
  })
  .catch((error) => {
    console.log(error);
    let errorStr=getErrorStr(error.response.data.errors);
      warning(errorStr)
      return error;
  });
}

export const insertOrUpdateStepFour=(formData, id)=>{
  
  return axios.post(route('form.createOrUpdateNonFormalEducation', {id:id}), formData)
  .then((response) => {
      success("Step four details inserted successfully")
      return response.data;
  })
  .catch((error) => {
    console.log(error);
    let errorStr=getErrorStr(error.response.data.errors);
      warning(errorStr)
      return error;
  });
}

export const insertOrUpdateStepFive=(ArtisanCraftsInfo, id)=>{
  const formData = new FormData();
  for (const key in ArtisanCraftsInfo) {
    const value = ArtisanCraftsInfo[key];

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  }
  console.log(formData)
  return axios.post(route('form.createOrUpdateArtisan', {id:id}), formData)
  .then((response) => {
      success("Step five details inserted successfully")
      return response.data;
  })
  .catch((error) => {
    console.log(error);
    let errorStr=getErrorStr(error.response.data.errors);
      warning(errorStr)
      return error;
  });
};

export const insertOrUpdateStepSix=(artsOrCraft, id)=>{
  // form.createOrUpdateOtherArts
  const formData = new FormData();
  artsOrCraft.forEach((item, index) => {
    for (const key in item) {
      const value = item[key];
  
      // Set key as: 0[art_or_craft_name], 0[product_making_process_file], etc.
      const formKey = `${index}[${key}]`;
  
      if (value instanceof File || value instanceof Blob) {
        formData.append(formKey, value);
      } else if (value !== null && value !== undefined) {
        formData.append(formKey, value);
      }
    }
  });
  return axios.post(route('form.createOrUpdateOtherArts', {id:id}), formData)
  .then((response) => {
      success("Step three details inserted successfully")
      router.visit(route('form.thankyouPage', { uuid: response.data.uuid }));
      return response.data;
  })
  .catch((error) => {
    console.log(error);
    let errorStr=getErrorStr(error.response.data.errors);
      warning(errorStr)
      return error;
  });
}