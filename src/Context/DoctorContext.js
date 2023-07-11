import React, {useReducer, createContext, useState} from 'react'
import { doctorReducer, doctorState } from '../Reducer/doctor';

export const doctorContext = createContext();

const combineReducers = (reducers) => {  
    return (state = {}, action) => {
      const newState = {};
      for (let key in reducers) {
        newState[key] = reducers[key](state[key], action);
      }
      return newState;
    }
}

const DoctorContextProvider = (props) => {
    const [updateDoctorStatus , setUpdateDoctorStatus] = useState(false); 
    const [state, dispatch] = useReducer(combineReducers({
        doctor: doctorReducer,
      }), { //combined states
        doctor: doctorState,
      });

    return (
        <doctorContext.Provider value={{state, dispatch , setUpdateDoctorStatus , updateDoctorStatus}}>
            {props.children}
        </doctorContext.Provider>
    )
}

export default DoctorContextProvider