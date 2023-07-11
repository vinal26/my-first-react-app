import { GET_PATIENT_LIST } from '../actions/keys';

const INIT_STATE = {
  patientLists: [],
};

const PatientReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PATIENT_LIST:
      return {
        ...state,
        patientLists: action.payload,
      };

    default:
      return state;
  }
};

export default PatientReducer;
