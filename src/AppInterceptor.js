import Axios from 'axios';
import  ApiConfig from './config/ApiConfig';
import { getObjectFromStore, storageKeys } from './storage/Storage';

Axios.interceptors.request.use(request => requestHandler(request));

Axios.interceptors.response.use(
  response => {
    console.log('response', response);
    checkTokenIsValid(response);
    return response;
  },
  error => errorHandler(error),
);

const checkTokenIsValid = (response) => {
  if (response?.data?.message?.toLowerCase() === 'Invalid token'.toLocaleLowerCase()) {
    window.location = "/logout";
  }
}

const requestHandler = async request => {
  let token = ApiConfig.token;
  if (!token) {
    token = await getObjectFromStore(storageKeys.token);
  }
  request.headers = {
    Authorization: `Bearer ${token}`,
    // 'X-CSCAPI-KEY': "RmtmRFFKZDg3Y0cyaTVMWlNpNHVYcjV2VWZ3OWZGWU9nRHlpYkJuNQ==",
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  console.log("REQUEST_URL", request.url)
  console.log('request', request);
  return request;
};

const errorHandler = async error => {
  console.log('errorHandler', error.response);
  throw error.response;
};