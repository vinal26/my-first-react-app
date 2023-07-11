import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useNavigate } from "react-router-dom";
import MessageList from "../message/MessageList";
import { GoPrimitiveDot } from "react-icons/go";
import MessageChat from "../message/MessageChat";
import GroupsHeader from "./GroupsHeader";

const GroupChats = () => {
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
              t&c groups
              <span className="patient_lifestyle3">
                <GoPrimitiveDot />
                chat
              </span>
            </p>
            <div className="row">
              <div className="col-md-4">
                <div className="message_sidebar" style={{ height: "570px" }}>
                  <MessageList />
                  <MessageList />
                  <MessageList />
                  <MessageList />
                  <MessageList />
                  <MessageList />
                  <MessageList />
                </div>
              </div>

              <div className="col-md-8">
                <GroupsHeader />
                <MessageChat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChats;
