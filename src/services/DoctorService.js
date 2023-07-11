import axios from 'axios';
import ApiConfig from '../config/ApiConfig';

export const addDoctor = (payload) => {
    return axios.post(ApiConfig.addDoctor, payload);
}

export const getLocation = (zipcode) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${ApiConfig.MAP_API_KEY}`);
}

export const getCategories = () => {
    return axios.get(ApiConfig.getCategories);
}

export const getQualifications = () => {
    return axios.get(ApiConfig.getQualifications);
}

export const getServices = () => {
    return axios.get(ApiConfig.getServices);
}

export const addQualification = (payload) => {
    return axios.post(ApiConfig.getQualifications, payload);
}

export const getDoctors = () => {
    // return axios.get(`${ApiConfig.baseUrl}/admin/doctor/list?limit=5&page=0`);
    return axios.get(`${ApiConfig.baseUrl}/admin/doctor/list`);
}

export const getDoctorProfile = () => {
    return axios.get(ApiConfig.getDoctorProfile);
}

export const editDoctorProfile = (payload) => {
    return axios.post(ApiConfig.editDoctorProfile, payload);
}
export const editDoctorEmail = (payload) => {
    return axios.post(ApiConfig.editDoctorEmail, payload);
}
export const editDoctorOtp = (payload) => {
    return axios.get(`${ApiConfig.editDoctorEmailOtp}?token=${payload}`);
}
export const getAvailability = () => {
    return axios.get(ApiConfig.getAvailability);
}
export const getAvailableSlots = (payload) => {
    return axios.post(ApiConfig.getAvailableSlots, payload);
}
export const getBookingByDate = (payload) => {
    return axios.get(`${ApiConfig.getBookingByDate}?date=${payload}`);
}
export const getBookingByStatus = (payload, status) => {
    return axios.get(`${ApiConfig.getBookingByStatus}?date=${payload}&status=${status}`);
}
export const addAvailability = (payload) => {
    return axios.post(ApiConfig.addAvailability, payload);
}
export const rescheduleSlots = (payload) => {
    return axios.post(ApiConfig.rescheduleSlots, payload);
}
export const addUnavailability = (payload) => {
    return axios.post(ApiConfig.addUnavailability, payload);
}

export const getBookings = () => {
    return axios.get(ApiConfig.getBookings);
}

export const getUpcomingBookings = () => {
    return axios.get(ApiConfig.getUpcomingBookings);
}

export const getUpcomingGroupSession = () => {
    return axios.get(ApiConfig.getUpcomingGroupSession);
}

export const updateBookingStatus = (payload) => {
    return axios.post(ApiConfig.updateBookingStatus, payload);
}
export const confirmBookingStatus = (payload) => {
    return axios.post(ApiConfig.confirmBookingStatus, payload);
}
export const getBookingsByDate = (payload) => {
    return axios.get(`${ApiConfig.getBookingsByDate}?date=${payload}`);
}

export const getPastBookings = () => {
    return axios.get(ApiConfig.getPastBookings);
}

export const addLifeStyle = (payload) => {
    return axios.put(ApiConfig.addLifeStyle, payload);
}

export const addElimination = (payload) => {
    return axios.put(ApiConfig.addElimination, payload);
}

export const addMealPlan = (templateID, payload) => {
    return axios.put(ApiConfig.addMealPlan + templateID, payload);
}

export const getCountry = async () => {
    // return axios.get("https://api.countrystatecity.in/v1/countries");

    let resp = await fetch("https://api.countrystatecity.in/v1/countries", {
        method: "GET",
        headers: {
            'X-CSCAPI-KEY': "RmtmRFFKZDg3Y0cyaTVMWlNpNHVYcjV2VWZ3OWZGWU9nRHlpYkJuNQ==",
        }
    })
    let finalResp = await resp.json()
    return finalResp

}

export const getState = async (cId) => {
    // return axios.get("https://api.countrystatecity.in/v1/countries/ES/states");
    let resp = await fetch(`https://api.countrystatecity.in/v1/countries/${cId}/states`, {
        method: "GET",
        headers: {
            'X-CSCAPI-KEY': "RmtmRFFKZDg3Y0cyaTVMWlNpNHVYcjV2VWZ3OWZGWU9nRHlpYkJuNQ==",
        }
    })
    let finalResp = await resp.json()
    return finalResp
}

export const getCity = async (cId, csId) => {
    // return axios.get("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities");
    let resp = await fetch(`https://api.countrystatecity.in/v1/countries/${cId}/states/${csId}/cities`, {
        method: "GET",
        headers: {
            'X-CSCAPI-KEY': "RmtmRFFKZDg3Y0cyaTVMWlNpNHVYcjV2VWZ3OWZGWU9nRHlpYkJuNQ==",
        }
    })
    let finalResp = await resp.json()
    return finalResp
}

export const changePatientStatusService = async (params, userID) => {
    const response = await axios.put(`${ApiConfig.changePatientStatus}${userID}`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}

export const changeDoctorStatusService = async (params, docID) => {
    const response = await axios.put(`${ApiConfig.changeDoctorStatus}${docID}`, params);
    if (response?.data?.status === 200) {
        return response.data?.data || '';
    }
}

export const updateDoctorProfileService = async (params) => {
    const response = await axios.post(`${ApiConfig.updateDoctorProfile}`, params);
    // return response;
    if (response?.data?.status === 200) {
        return response.data || '';
    }
}