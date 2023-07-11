import { SET_SELECTED_CARE_PLAN_ID } from './keys';

export const setSelectedCarePlanID = selectedCarePlan => ({
  type: SET_SELECTED_CARE_PLAN_ID,
  payload: selectedCarePlan,
});
