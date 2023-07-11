import React from 'react';
import { useAuth } from '../Context/AuthContext';
import DoctorContextProvider from '../Context/DoctorContext';
import LoggedInRoutes from './LoggedInRoutes';
import LoggedOutRoutes from './LoggedOutRoutes';

const AuthRoute = () => {
  const auth = useAuth();
  if (auth.authUser) {
    return (<DoctorContextProvider><LoggedInRoutes /></DoctorContextProvider>)
  }
  return <LoggedOutRoutes />
}

export default AuthRoute;