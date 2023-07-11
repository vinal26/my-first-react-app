import axios from "axios";
import ApiConfig from "../config/ApiConfig";

export const getQuickUpdatesService = async () => {
  const response = await axios.get(`${ApiConfig.getQuickUpdates}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const getNotification = async () => {
  const response = await axios.get(`${ApiConfig.getNotificationList}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}

export const notificationSeen = async () => {
  const response = await axios.get(`${ApiConfig.notificationSeen}`);
  if (response?.data?.status === 200) {
    return response.data || '';
  }
}
