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