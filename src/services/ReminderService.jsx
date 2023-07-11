import axios from "axios";
import ApiConfig from "../config/ApiConfig";


export const AddReminder = (payload) => {
    return axios.post(ApiConfig.postReminderData, payload);
  };
  
  export const getReminder = () => {
    return axios.get(ApiConfig.getReminderList);
  };

  export const deleteReminder = (id) => {
    return axios.delete(`${ApiConfig.deleteReminder}${id}`);
  };