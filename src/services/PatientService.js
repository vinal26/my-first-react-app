import axios from 'axios';
import ApiConfig from '../config/ApiConfig';
import { changeDateFormat } from '../Utils/Helper';

export const addPatient = (payload) => {
    return axios.post(ApiConfig.addPatient, payload);
}

export const getLifestyle = () => {
    return axios.get(ApiConfig.getLifestyle);
}

export const getCarePLan = () => {
    return axios.get(ApiConfig.getCarePLan);
}

export const getElimination = (ID) => {
    return axios.get(ApiConfig.getElimination + ID);
}

export const getMealPlan = () => {
    return axios.get(ApiConfig.getMealPlan);
}

// Patient Daily Journal
export const getDailySleep = (date, userId) => {
    let url = ApiConfig.getDailySleep.replace('$date', changeDateFormat(date));
    url = url.replace('$user_id', userId);
    return axios.get(url);
}
export const getDailyEat = (date, userId) => {
    let url = ApiConfig.getDailyEat.replace('$date', changeDateFormat(date));
    url = url.replace('$user_id', userId);
    return axios.get(url);
}
export const getDailyMove = (date, userId) => {
    let url = ApiConfig.getDailyMove.replace('$date', changeDateFormat(date));
    url = url.replace('$user_id', userId);
    return axios.get(url);
}
export const getDailyReflect = (date, userId) => {
    let url = ApiConfig.getDailyReflect.replace('$date', changeDateFormat(date));
    url = url.replace('$user_id', userId);
    return axios.get(url);
}
export const getDailyWaterIntake = (date, userId) => {
    let url = ApiConfig.getDailyWaterIntake.replace('$date', changeDateFormat(date));
    url = url.replace('$user_id', userId);
    return axios.get(url);
}
export const getDailyFeeling = (date, userId) => {
    let url = ApiConfig.getDailyFeeling.replace('$date', changeDateFormat(date));
    url = url.replace('$user_id', userId);
    return axios.get(url);
}

export const getUserSymptoms = (userId) => {
    let url = ApiConfig.getUserSymptoms + '?user_id=' + userId;
    return axios.get(url);
}
//********************* 

export const getUserInfoService = (userId) => {
    let url = ApiConfig.getUserProfile.replace('$user_id', userId);
    return axios.get(url);
}

export const getMealPlansListService = (page, limit) => {
    return axios.get(`${ApiConfig.getMealPlan}?page=${page}&limit=${limit}`);
}

export const getMealPlansInfoService = (mealPlanId) => {
    let url = ApiConfig.getMealPlanInfo.replace('$meal_id', mealPlanId);
    return axios.get(url);
}

export const getUserMealPlansInfoService = (userId) => {
    let url = ApiConfig.getUserMealPlanInfo.replace('$userId', userId);
    return axios.get(url);
}

export const changeUserMealPlanService = ({ mealPlanId, userId }) => {
    let url = ApiConfig.changeUserMealPlan.replace('$meal_id', mealPlanId);
    return axios.post(url, userId);
}

export const getPatientList = (searchWord) => {
    return axios.get(`${ApiConfig.getPatientList}${searchWord || ""}`);
};

export const getVisits = (userID) => {
    return axios.get(`${ApiConfig.getVisits}${userID}`);
};

export const getMyPatientList = (searchWord) => {
    return axios.get(`${ApiConfig.getMyPatientList}${searchWord || ""}`);
};
export const getAllForms = (searchWord) => {
    return axios.get(`${ApiConfig.getAllFormData}${searchWord || ""}`);
};

export const getUserSetGoalData = async (userId) => {
    const response = await axios.get(`${ApiConfig.getUserSetGoal}?userId=${userId}`);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
};

export const getUserShortGoalData = async (goalType, userId) => {
    const response = await axios.get(`${ApiConfig.shortGoals}?goal_type=${goalType}&userId=${userId}`);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
};


export const deleteMealPlanService = async (planId) => {
    const response = await axios.delete(`${ApiConfig.deleteMealPlan}${planId}`,);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}


export const AddExcelSheetService = async (rows) => {
    const response = await axios.post(`${ApiConfig.AddExcelSheet}`, rows);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}