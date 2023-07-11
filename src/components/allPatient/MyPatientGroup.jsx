import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import AllButton from "./AllButton";
import MessageList from "../message/MessageList";
import GroupsHeader from "../groups/GroupsHeader";
import MessageChat from "../message/MessageChat";
import AllPatientChooseProgram from "./AllPatientChooseProgram";
import Avatar from "../../commonComponent/Avatar";

const MyPatientGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
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
              Groups
            </p>
            <div className="daily_journal">
              <div className="row">
                <div className="col-md-1 mchat_wid1 text-center">
                  <Avatar image={''}/>
                </div>
                <div className="col-md-11 mchat_wid2">
                  <h5 className="usergoalh5">lisa jones</h5>
                  <p>apr 20</p>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="my_patient_groups_outer ">
                  <div className="my_patient_groups_inner">
                    <MessageList />
                    <MessageList />
                    <MessageList />
                    <MessageList />
                    <MessageList />
                    <MessageList />
                    <MessageList />
                    <MessageList />
                  </div>
                  <button
                  data-bs-toggle="modal"
                  data-bs-target="#chooseprogram">add more</button>
                </div>
              </div>

              <div className="col-md-8">
                <GroupsHeader btnHide={`none`} />
                <MessageChat />
              </div>
            </div>
            
           <div className="mt_patient_top9">
           <AllButton user={user}/>
           </div>
          </div>
        </div>
      </div>
      <AllPatientChooseProgram />
    </>
  );
};

export default MyPatientGroup;
