import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "../appointment/style.css";
import ProfileInput from "./ProfileInput";
import { useNavigate } from "react-router-dom";
import "./style.css";

const MyProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 pt-4 px-5">
            <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item cursor-pointer" onClick={() => navigate("/")}>Dashboard</li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                    My Profile
                  </li>
                </ol>
              </nav>
              <h4 className="blognew_header">My Profile</h4>
            </div>

            <ProfileInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
