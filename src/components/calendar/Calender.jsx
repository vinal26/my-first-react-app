import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import CalenderTabs from "./CalenderTabs";

const Calender = () => {
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
                <li class="breadcrumb-item active fw-bold" aria-current="page">My Calendar</li>
              </ol>
            </nav>
            {/* <p className="dashboard_title">
             
                <HiOutlineArrowSmLeft
                  onClick={() => navigate("/")}
                  className="icon"
                />
            
              Calendar
            </p> */}

<CalenderTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
