import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Activate from "../components/activate/Activate";
import OpenFormsAndWaiver from "../components/carePlan_/OpenFormsAndWaiver";
import ForgotPassword from "../components/forgotPassword/ForgotPassword";
import Login from "../components/login/Login";
import ContactUs from "../components/policies/ContactUs";
import PolicyUsages from "../components/policies/PolicyUsages";
import PrivacyPolicy from "../components/policies/PrivacyPolicy";
import ResetPassword from "../components/resetPassword/ResetPassword";
import SignUp from "../components/signUp/SignUp";
import ReOpenFormsAndWaiver from "../components/carePlan_/ReOpenFormsAndWaiver";

const LoggedOutRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword/>}/> 
        <Route exact path="/privacypolicy" element={<PrivacyPolicy/>}/> 
        <Route exact path="/contactus" element={<ContactUs/>}/>
        <Route exact path="/policyusages" element={<PolicyUsages/>}/>           
        <Route exact path="/resetpassword" element={<ResetPassword/>}/>
        <Route exact path="/openformandwaivers" element={<OpenFormsAndWaiver />} />
        <Route exact path="/openformandwaivers/submitted" element={<ReOpenFormsAndWaiver />} />
        <Route path="/user/account/activate/:id/:token" element={<Activate />} />
        <Route path="/openformandwaivers/submit/successfully" exact element={<></>} />
        <Route path="/login" exact element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />}/> 
      </Routes>
    </>
  );
};

export default LoggedOutRoutes;
