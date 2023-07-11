import axios from "axios";
import ApiConfig from "../config/ApiConfig";

// Will return zoom added status and zoom detail
export const checkZoomCodeAddedService = async (code) => {
  const response = await axios.get(`${ApiConfig.checkZoomCodeStatus}`);
  console.log('checkZoomCodeAddedService response*************', response)
  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addZoomIdService = async (code) => {
  const response = await axios.post(`${ApiConfig.zoomCode}${code}&grant_type=authorization_code`);
  console.log('addZoomIdService response*************', response)

  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const createZoomMeetingService = async(params) => {
  const response = await axios.post(`${ApiConfig.createZoomMeeting}`, params);
  console.log('createZoomMeetingService response*************', response)

  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const addZoomCredentialService = async(params) => {
  const response = await axios.post(`${ApiConfig.addZoomDetail}`, params);

  if (response?.data?.status === 200) {
    return response.data?.data || '';
  }
}

export const getMessageBadgeCount = async(qbToken) => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'QB-Token': qbToken
    }
  };
  return fetch('https://api.quickblox.com/chat/Message/unread.json', options)
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(err => console.error(err));
}