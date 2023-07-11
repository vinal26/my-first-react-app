import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TodayAppointmentTabs from "./TodayAppointmentTabs";
import MyAppointments from "./AppointmentNew";

const TodayAppointment = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">

            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate("/")}>Dashboard</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Appointments</li>
              </ol>
            </nav>
            {/* <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate("/")}
                className="icon"
              />
              appointments
            </p>
            {/* <hr className="today4_bottomhr" /> */}
            <MyAppointments />
            {/* <TodayAppointmentTabs /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodayAppointment;
