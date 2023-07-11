import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import "./style.css";
import ActivemembersList from "../activeProgram/ActivemembersList";
import DrManagementTabs from "./DrManagementTabs";
import EditProfileForm from "./EditProfileForm";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <p className="dashboard_title">
            <HiOutlineArrowSmLeft
onClick={() => navigate(-1)}
className="icon"
/>
              edit profile
            </p>

            <div className="row">
                <div className="col-md-4">
                    <ActivemembersList heightDiv={`400px`} iconHide={`none`} />
                </div>
                <div className="col-md-8 ">
              <EditProfileForm />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
