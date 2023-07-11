import axios from 'axios';
import ApiConfig from '../config/ApiConfig';

export const getUserAssesment = (date, userId) => {
    return axios.get(`${ApiConfig.getUserAssesment}?type=day&startDate=${date}&user_id=${userId}`);
};

export const getUserVital_Metrix = (type, name, start, end, userId) => {
    return axios.get(`${ApiConfig.getUserVital}?type=${type}&vitalName=${name}&startDate=${start}&endDate=${end}&user_id=${userId}`);
}

export const getUserAllergies_Vaccination = (userId) => {
    return axios.get(`${ApiConfig.getUserAllergy}?userId=${userId}`);
}

export const getUserSymptoms = (date, userId) => {
    return axios.get(`${ApiConfig.getUserSymptoms}?userId=${userId}&date=${date}`);
};

export const getUserGoals = (userId) => {
    return axios.get(`${ApiConfig.getUserGoals}?userId=${userId}`);
};

export const getUserScore = (userId) => {
    return axios.get(`${ApiConfig.getUserScore}?user_id=${userId}`);
};

export const getFormResponses = (userId) => {
    return axios.get(`${ApiConfig.getFormResponses}?userId=${userId}`);
};

export const getFormSelfResponses = (userId, formId) => {
    return axios.get(`${ApiConfig.getFormSelfResponses}?userId=${userId}&formId=${formId}`);
};

export const updatePatientProfileService = async (params) => {
    const response = await axios.post(`${ApiConfig.updatePatientProfile}`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}

export const sendInvitationService = async (params) => {
    const response = await axios.post(`${ApiConfig.sendInvitation}`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}
