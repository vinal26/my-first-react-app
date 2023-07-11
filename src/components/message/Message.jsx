import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import MessageHeader from "./MessageHeader";
import "./style.css";
import MessageList from "./MessageList";
import MessageChat from "./MessageChat";
import { useNavigate } from "react-router-dom";

// Sendbird
// import SendbirdApp from '@sendbird/uikit-react/App';
// import '@sendbird/uikit-react/dist/index.css';
import { useAuth } from "../../Context/AuthContext";
import ApiConfig from "../../config/ApiConfig";


const Message = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [chatList, setChatList] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 500px)").matches
  );

  const Down = () => {
    setChatList(true);
  };
  const Up = () => {
    setChatList(false);
  };

  const Moto = (e) => {
    setMatches(e.matches);
    setChatList(true);
  };

  useEffect(() => {
    // window.matchMedia("(min-width:500px)").addEventListener("change", Moto);
  }, []);

  // const myColorSet = {
  //     '--sendbird-light-primary-500': '#00487c',
  //     '--sendbird-light-primary-400': '#4bb3fd',
  //     '--sendbird-light-primary-300': '#3e6680',
  //     '--sendbird-light-primary-200': '#0496ff',
  //     '--sendbird-light-primary-100': '#027bce',
  // };

  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 pt-4 px-5">
            <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              message
            </p>

            <div style={{height: "500px"}}>
              {/* <SendbirdApp
                  profileUrl={authUser.profilePicture}
                  nickname={authUser.full_name}
                  // colorSet={myColorSet}
                  appId={ApiConfig.SENDBIRDDetails.APPLICATION_ID} // Specify your Sendbird application ID.
                  userId={authUser._id} // Specify your user ID.
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
