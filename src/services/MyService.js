import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const getServiceList = () => {
  return axios.get(ApiConfig.getServiceList);
};

export const addService = (payload) => {
  return axios.post(`${ApiConfig.addIndividualService}`, payload);
};

export const deleteMyService = async (id) => {
  const response = await axios.delete(`${ApiConfig.deleteMyService}${id}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}