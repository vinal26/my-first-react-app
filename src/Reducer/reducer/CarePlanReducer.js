import {SET_SELECTED_CARE_PLAN_ID} from '../actions/keys';

const INIT_STATE = {
  selectedCarePlan: '', // Use for care plan
};

const CarePlanReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_CARE_PLAN_ID:
      return {
        ...state,
        selectedCarePlan: action.payload,
      };
    // case SET_HOME_DATA:
    //   return {
    //     ...state,
    //     home: {
    //       ...state.home,
    //       loading: false,
    //       data: action.payload,
    //     },
    //   };
    // case FAIL_HOME_DATA:
    //   return {
    //     ...state,
    //     home: {
    //       ...state.home,
    //       loading: false,
    //       error: action.payload,
    //     },
    //   };
    // case UPDATE_GOAL:
    //   return {
    //     ...state,
    //     home: {
    //       ...state.home,
    //       data: {
    //         ...state.home.data,
    //         weeklyGoal: action.payload,
    //       },
    //     },
    //   };
    // case UPDATE_USER_BIOMETRIC:
    //   return {
    //     ...state,
    //     home: {
    //       ...state.home,
    //       data: {
    //         ...state.home.data,
    //         ...action.payload,
    //       },
    //     },
    //   };
    default:
      return state;
  }
};

export default CarePlanReducer;
