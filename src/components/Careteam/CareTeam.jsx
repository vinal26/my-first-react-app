import React, { useState, useRef } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./style.css";
import { useNavigate } from "react-router-dom";
import CareTeamComponent from "./CareTeamComponent";


const CareTeam = () => {
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
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Dashboard</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">My Care Team</li>
              </ol>
            </nav>
            <div>

              <CareTeamComponent />
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareTeam;

