import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import "./style.css";
import { useNavigate } from "react-router-dom";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import ViewCareTeamBox from "./ViewCareTeamBox";
import AppointmentPatientSection from "./AppointmentPatientSection";
import TeamMemberList from "./TeamMemberList";
import CareTeamStatus from "./CareTeamStatus";

const ViewCareTeam = () => {
  const navigate = useNavigate();
  const renderSearchHeader = () => {
    return (
      <div className="d-flex mt-5 mb-3 ">
        <div className="w-100">
          <h4>Diabetes Management Prevention Group</h4>
          <p className="view_createdby9 mt-3 mb-3">
            <span className="span1 me-2">Created by:</span>
            <span className="span2">
              <SquareAvatar
                src={"images/avatar.png"}
                className="imgsize me-2"
              />
              Clara Cardenas MD
            </span>
            <span className="span1  me-1 ms-3">Created on</span>
            <span className="span2">Feb 10,2022</span>
          </p>

          <p>
            The prevention management program is based on group interventions.
            The intention is to motivate the person
            <br /> at risk to self-manage the diabetes.
          </p>
        </div>
      </div>
    );
  };

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
                <li
                  class="breadcrumb-item cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  Dashboard
                </li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">
                  View Care Team
                </li>
              </ol>
            </nav>
            <div>
              {renderSearchHeader()}
              <ViewCareTeamBox />
              <AppointmentPatientSection />
              <TeamMemberList />
              
            </div>
          </div>
          <CareTeamStatus />
        </div>
      </div>
      
    </>
  );
};

export default ViewCareTeam;
