import axios from 'axios';
import ApiConfig from '../config/ApiConfig';

export const login = (payload) => {
    console.log('ApiConfig.login', ApiConfig.login)
    return axios.post(ApiConfig.login, payload);
};

export const SignUpService = (payload) => {
    console.log('SignUpService.signUp', ApiConfig.signUp)
    return axios.post(ApiConfig.signUp, payload);
}


export const forgotPasswordService = async (params) => {
    const response = await axios.post(ApiConfig.forgotPassword, params);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}

export const resetPasswordService = async (params, userId, token) => {
    const response = await axios.post(`${ApiConfig.resetPassword}?userId=${userId}&token=${token}`, params);
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}

export const activeStatusChangeService = async (status) => {
    const response = await axios.put(`${ApiConfig.activeStatusChange}`, {onlineStatus: status});
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}

export const activateAccount = async (id, token, payload) => {
    const response = await axios.post(`${ApiConfig.activateAccount}/${id}/${token}`, payload);
    if (response?.status === 200) {
        return response.data || '';
    }
};