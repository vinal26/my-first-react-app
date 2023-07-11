import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { GoPrimitiveDot } from "react-icons/go";
import "../appointment/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import AllPatientTabs from "./AllPatientTabs";
import { useState } from "react";
import AllPatientLifeStyleSearch from "./AllPatientLifeStyleSearch";
import LifeStyleSearchInput from "./LifeStyleSearchInput";
import Avatar from "../../commonComponent/Avatar";

const EditUserLifeStyle = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row mb-5">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              <Avatar
                image={user?.profilePicture}
              />
              <span className="patient_name2">{user?.full_name}</span>
              <span className="patient_lifestyle2">
                <GoPrimitiveDot />
                lifestyle
              </span>
            </p>
            {/* for tabs */}
            <AllPatientTabs userid={user._id} fromEditLifestyle={true} />
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserLifeStyle;
