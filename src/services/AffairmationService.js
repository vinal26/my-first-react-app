// export const getBookings = () => {
//     return axios.get(ApiConfig.getBookings);
// }

import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const updateAffairmation = (payload) => {
    return axios.post(ApiConfig.updateAffairmation, payload);
}

export const getAffairmation = () => {
    return axios.get(ApiConfig.getAffairmation);
}

// export const getRecipeByID = (ID) => {
//     return axios.get(ApiConfig.getRecipeByID+ID);
// }

// export const deleteRecipeByID = (ID) => {
//     return axios.delete(ApiConfig.deleteRecipeByID+ID);
// }