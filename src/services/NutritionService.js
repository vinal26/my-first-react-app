// export const getBookings = () => {
//     return axios.get(ApiConfig.getBookings);
// }

import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const addRecipe = (payload) => {
    return axios.post(ApiConfig.addRecipe, payload);
}

export const updateRecipe = (ID, payload) => {
    return axios.put(ApiConfig.updateRecipe+ID, payload);
}

export const getRecipes = () => {
    return axios.get(ApiConfig.getRecipes);
}

export const getRecommendedRecipes = () => {
    return axios.get(ApiConfig.getRecommendedRecipes);
}

export const getRecipeByID = (ID) => {
    return axios.get(ApiConfig.getRecipeByID+ID);
}

export const deleteRecipeByID = (ID) => {
    return axios.delete(ApiConfig.deleteRecipeByID+ID);
}