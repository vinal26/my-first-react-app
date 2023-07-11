import axios from 'axios';
import ApiConfig from '../config/ApiConfig';
import { changeDateFormat, changeDateFormatYYYY } from '../Utils/Helper';

export const getLifestyleList = async (category, userid, selectedTemplate) => {
  console.log('selectedTemplate', selectedTemplate)
  let url = `${ApiConfig.getLifeStyleList}${category}/${userid || ApiConfig.userID}`;
  if (selectedTemplate) {
    url = `${ApiConfig.getAdminLifeStyleList}${category}/${selectedTemplate.templateName}`;// TODO: Replace with templateId
  }
  const response = await axios.get(`${url}`);
  if (response?.data?.status === 200) {
    return response.data?.data || [];
  }
};

export const addAffirmationService = async (params) => {
  const response = await axios.post(`${ApiConfig.addAffirmation}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const deleteAffirmationService = async (id) => {
  const response = await axios.delete(`${ApiConfig.deleteAffirmation}${id}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}


export const addCheckListService = async (params) => {
  const response = await axios.post(`${ApiConfig.addCheckList}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const deleteCheckListService = async (id) => {
  const response = await axios.delete(`${ApiConfig.deleteCheckList}${id}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const markAffirmationsService = async (params) => {
  let url = `${ApiConfig.markAffirmations}`;
  if(params.templateName) { // TODO: replace with templateID
    url = `${ApiConfig.adminMarkAffirmation}`
  }
  const response = await axios.post(`${url}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getUserLifeStyleDetailService = async (date, category, params) => {
  const response = await axios.post(`${ApiConfig.userLifeStyle}${category}&intakeDate=${changeDateFormat(date)}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getTemplateListService = async () => {
  const response = await axios.get(`${ApiConfig.getLifeStyleTemplateList}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addNewTemplateService = async (params) => {
  const response = await axios.post(`${ApiConfig.addNewTemplate}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const changeUserLifestyleTemplate = async (params) => {
  const response = await axios.put(`${ApiConfig.changeUserLifestyleTemplate}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}