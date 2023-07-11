import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const uploadFileService = async (params) => {
  const response = await axios.post(`${ApiConfig.uploadMealFile}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}


export const getMealPlanListService = async () => {
  const response = await axios.get(`${ApiConfig.getMealPlanList}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getRecommendedMealPlanListService = async () => {
  const response = await axios.get(`${ApiConfig.getRecommenededMealPlanList}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getMealPlanAvailableService = async (name) => {
  const response = await axios.get(`${ApiConfig.getMealPlanAvailable}${name}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addMealPlanService = async (params) => {
  const response = await axios.post(`${ApiConfig.addNewMealPlan}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}


export const updateMealPlanService = async (id , params) => {
  const response = await axios.post(`${ApiConfig.updateMealPlan}${id}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getMealPlanDetailService = async (id) => {
  const response = await axios.get(`${ApiConfig.getMealPlanDetail}${id}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addMealPlanDaysService = async (params) => {
  const response = await axios.post(`${ApiConfig.addDaysMealPlan}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addMealPlanDetailService = async (params) => {
  const response = await axios.post(`${ApiConfig.updateMealPlanDetail}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getRecipeListService = async (params) => {
  const response = await axios.post(`${ApiConfig.getMealPlanRecipeList}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}
