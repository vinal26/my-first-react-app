import { GET_PATIENT_LIST } from './keys';

export const setPatientList = lists => ({
  type: GET_PATIENT_LIST,
  payload: lists,
});
