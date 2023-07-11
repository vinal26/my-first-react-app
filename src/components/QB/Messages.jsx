import React from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";


const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const route = state?.route ? `/${state.route}` : '/';
  const params = state?.user ? state?.user : {}
  const url = window.location.origin + '/chat/chat.html'
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
                onClick={() => navigate(route, {state: {user: params}}, { replace: true})}
                className="icon"
              />
              message
            </p>
            <iframe src={url} style={{
                height: "73vh"
              }} width="100%" title="Chat"></iframe>
          </div>
        </div>
      </div>
    </>
  );


}

export default Messages;