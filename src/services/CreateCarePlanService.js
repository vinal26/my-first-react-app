import axios from 'axios';
import ApiConfig from '../config/ApiConfig';
import { getObjectFromStore, storageKeys } from '../storage/Storage';

export const getAllCarePlanListService = async () => {
  const response = await axios.get(`${ApiConfig.getAllCarePlanList}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const setDefaultCarePlan = (careplanId) => {
  return axios.post(`${ApiConfig.setDefaultPlan + careplanId}`);

};
export const getSupplementData = (searchWord) => {
  const response = axios.get(`${ApiConfig.supplemetApi + searchWord}`);
  // if (response?.status === 200) {
  //   return response.data || '';
  // }
  return response || '';
};
export const getMedicationData = (searchWord) => {
  const response = axios.get(`${ApiConfig.medicationApi + searchWord}`);
  // if (response?.status === 200) {
  //   return response.data || '';
  // }
  return response || '';
};
export const getSupplementQuantity = (id) => {
  const response = axios.get(`${ApiConfig.supplementQuantity + id}`);
  // if (response?.status === 200) {
  //   return response.data || '';
  // }
  return response || '';
};
export const getDefaultPlanList = () => {
  return axios.get(ApiConfig.getDefaultCarePlan);
};
export const getSingleCarePlanListService = async (id) => {
  const response = await axios.get(`${ApiConfig.getSingleCarePlan}${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const createCarePlanService = async (params) => {
  const response = await axios.post(`${ApiConfig.createCarePlan}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const updateCarePlanService = async (id, params) => {
  const response = await axios.put(`${ApiConfig.updateCarePlan}${id}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const assignGroupToCarePlanService = async (params) => {
  const response = await axios.post(`${ApiConfig.assignGroupCarePlan}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const getGoalListService = async (id) => {
  const response = await axios.get(`${ApiConfig.getGoalsList}${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}


export const createCarePlanGoalService = async (params, id) => {
  const response = await axios.post(`${ApiConfig.createGoalPlan}${id}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const updateCarePlanGoalService = async (params, id) => {
  const response = await axios.post(`${ApiConfig.updateGoalPlan}${id}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const createCarePlanFileService = async (params, id) => {
  const response = await axios.post(`${ApiConfig.createFilePlan}${id}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const getSingleGoal = async (goalId, id) => {
  const response = await axios.get(`${ApiConfig.getSingleGoal}${goalId}&careplanId=${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const deleteGoal = async (goalId, id) => {
  const response = await axios.delete(`${ApiConfig.deleteGoal}${goalId}&careplanId=${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const changeGoalStatusService = async (care_plan_goal_id, care_plan_id) => {
  const response = await axios.get(`${ApiConfig.createCarePlans}/add_goal_to_plan?care_plan_goal_id=${care_plan_goal_id}&care_plan_id=${care_plan_id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const getTaskListService = async (id) => {
  const response = await axios.get(`${ApiConfig.createCarePlans}/goals/task`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

// Based on Care plan id 
export const getCarePlanGoalService = async (id) => {
  const response = await axios.get(`${ApiConfig.createCarePlans}/goals/multiple?care_plan_id=${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const selectTaskForGoalService = async (task_id, goal_id) => {
  const response = await axios.get(`${ApiConfig.createCarePlans}/add_task_to_goals?goal_id=${goal_id}&task_id=${task_id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const createCarePlanTaskService = async (params) => {
  const response = await axios.post(`${ApiConfig.createCarePlans}/goals/task/create`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const deleteTaskService = async (id) => {
  const response = await axios.delete(`${ApiConfig.createCarePlans}/goals/task/delete/${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const updateCarePlanTaskService = async (id, params) => {
  const response = await axios.put(`${ApiConfig.createCarePlans}/goals/task/update?task_id=${id}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const createCarePlanFormService = async (params) => {
  const response = await axios.post(`${ApiConfig.createCarePlanForm}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const updateCarePlanFormService = async (formId, params) => {
  const response = await axios.post(`${ApiConfig.updateCarePlanForm}?formId=${formId}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const getCarePlanFormListService = async () => {
  const response = await axios.get(`${ApiConfig.getCarePlanFormList}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const getCarePlanFormDefaultList = async () => {
  const response = await axios.get(`${ApiConfig.getCarePlanDefaultFormList}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const getCarePlanFormResponseList = async (formId) => {
  const response = await axios.get(`${ApiConfig.getCarePlanFormResponseList}${formId}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const getSingleCarePlanFormListService = async (formId) => {
  const response = await axios.get(`${ApiConfig.getSingleCarePlanFormList}${formId}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const formListSumbitService = async (formId, params) => {
  const response = await axios.post(`${ApiConfig.formListSumbitService}${formId}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
export const setDefaultTemplate = (id) => {
  return axios.post(`${ApiConfig.formTemplate + id}`);
};
export const getFormShareLink = async (formId) => {
  const response = await axios.get(`${ApiConfig.getFormShareLink}${formId}`);
  if (response?.status === 200) {
    return response.data || '';
  }
}

// export const setDefaultTemplate = (id) => {
//   return axios.post(`${ApiConfig.formTemplate + id}`);
// };

export const createExerciseService = async (params) => {
  const response = await axios.post(`${ApiConfig.createExercise}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}


export const getExerciseListService = async (id) => {
  const response = await axios.get(`${ApiConfig.getExerciseList}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const getExerciseListByIdService = async (id) => {
  const response = await axios.get(`${ApiConfig.getExerciseListById}${id}`);
  if (response?.status === 200) {
    return response.data || '';
  }
}


// export const updateExerciseService = async ( params) => {
//   console.log(params , "params");
//   const response = await axios.put(`${ApiConfig.updateExercise}`, params);
//   if (response?.data?.status === 200) {
//     return response.data || '';
//   }
// }



export const updateExerciseService = async (id, params) => {
  console.log(id, "id");
  console.log(params, "params");
  const response = await axios.post(`${ApiConfig.updateExercise}${id}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const deleteExerciseService = async (id) => {
  const response = await axios.delete(`${ApiConfig.deleteExercise}${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}


export const addFitnessPlanService = async (params) => {
  const response = await axios.post(`${ApiConfig.addFitnessPlan}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}


export const getFitnessPlanListService = async () => {
  const response = await axios.get(`${ApiConfig.fitnessPlanList}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}


export const updateFitnessPlanService = async (id, params) => {

  const response = await axios.post(`${ApiConfig.updateFitnessPlan}${id}`, params);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}



export const addFitnessPlanDaysService = async (params) => {
  const response = await axios.post(`${ApiConfig.addDaysFitnessPlan}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}



export const addfitnessPlanDetailService = async (params) => {
  const response = await axios.post(`${ApiConfig.addFitnessPlanDetails}`, params);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}




export const deleteFitnessPlanService = async (id) => {
  const response = await axios.delete(`${ApiConfig.deleteFitnessPlan}${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
