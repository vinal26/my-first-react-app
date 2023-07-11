import { combineReducers } from 'redux';
import CarePlanReducer from './CarePlanReducer';
import PatientReducer from './PatientReducer';
import GroupReducer from './GroupReducer';
export default combineReducers({
  carePlan: CarePlanReducer,
  patient: PatientReducer,
  group: GroupReducer
});

