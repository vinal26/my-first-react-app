import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const getGroupsListData = async (params) => {
  const response = await axios.get(`${ApiConfig.getGroupsList}`);
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}
