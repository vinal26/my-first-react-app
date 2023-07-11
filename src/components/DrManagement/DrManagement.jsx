import React, { useContext, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import "./style.css";
import ActivemembersList from "../activeProgram/ActivemembersList";
import DrManagementTabs from "./DrManagementTabs";
import { useNavigate } from "react-router-dom";
import { doctorContext } from "../../Context/DoctorContext";


const DrManagement = () => {
  const { dispatch } = useContext(doctorContext);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch({ type: "Clear Profile" });
    }
  }, [])

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            {/* <p className="dashboard_title">
              <HiOutlineArrowSmLeft onClick={() => navigate('/')} className="icon" />
              Dr. management
            </p> */}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate("/")}>Dashboard</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Dr. Management</li>
              </ol>
            </nav>

            <div className="row">
              <div className="col-md-4">
                <ActivemembersList heightDiv={`75.5vh`} iconHide={`none`} />
              </div>
              <div className="col-md-8">
                <DrManagementTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrManagement;
