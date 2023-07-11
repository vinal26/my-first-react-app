import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import { getUser, storeQBUser, useAuth } from "../../Context/AuthContext";
import { checkZoomCodeAddedService } from "../../services/ZoomService";
import { getObjectFromStore, storageKeys } from "../../storage/Storage";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import DasboardBox from "./DasboardBox";
import QuickUpdates from "./QuickUpdates";

import Reminder from "./Reminder";

import "./style.css";

let isLoading = false;

const Dasboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const isAdmin = auth?.authUser?.role === 'administrator';
  const [params] = useSearchParams();
  const code = params?.get("code");

  const [zoomModalVisibility, setZoomModalVisibility] = useState(false);

  useEffect(() => {
    if (code && !isLoading) {
      isLoading = true;
      auth.addZoomId(code);
    }
  }, [code])

  // useEffect(() => {
  //   isAdmin && navigate('/doctorviewprofile')
  // },[isAdmin])

  useEffect(() => {
    if (auth.getMessageUnreadCount) {
      auth.getMessageUnreadCount()
    }
  })

  useEffect(() => {
    checkStorageUser();
    // !code && checkZoomCodeAdded() // Remove this zoom code status
  }, [])

  const checkStorageUser = () => {
    if (!getObjectFromStore(storageKeys.user)) {
      storeQBUser(auth?.authUser)
    }
  }

  const checkZoomCodeAdded = async () => {
    try {
      const response = await checkZoomCodeAddedService();
      !response?.isAdded && setZoomModalVisibility(true);
    } catch (error) {
      console.log(error)
    }
  }

  const onZoomConnectClick = () => {
    const url = `${ApiConfig.zoomCodeUrl}`
    window.open(url, '_self');
  }

  const current = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthIndex = new Date().getMonth();
  let monthName = monthNames[monthIndex];

  const showZoomModalVisibility = () => {
    return (
      <>
        <div style={{ backgroundColor: 'rgba(247, 247, 247, 0.4)' }} className={"modal fade" + (zoomModalVisibility ? "show d-block" : " d-none")} id="logoutModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog" style={{ justifyContent: 'center', position: 'absolute', alignSelf: 'center', alignItems: 'center', top: 200, left: 0, right: 0 }}>
            <div className="modal-content">
              <div className="modal-header border-0 text-center">
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
              </div>
              <div className="modal-body">
                <p className="modal_text_body">To continue please connect to your zoom account</p>
              </div>
              <div style={{ marginBottom: 50 }}>
                <center>
                  <button type="button" className="delete_blog" onClick={onZoomConnectClick} data-bs-dismiss="modal">Connect to Zoom</button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }



  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 px-5 pt-4">
            <p className="dashboard_title">
              today, {monthName} {current.getDate()}  {current.getFullYear()}
            </p>

            <div className="row">
              <div className="col-md-7">
                <div className="row">
                  {/* <a href={'https://zoom.us/oauth/authorize?client_id=hdVLt5xUR92JxbbBoWm9kQ&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3006%2F'} >Connect Zoom
                  </a> */}
                  <DasboardBox
                    image={`images/alert.png`}
                    text={`alerts`}
                    url={``}
                    modal={`modal`}
                    Pageunavailable={`Pageunavailable`}
                  />
                  <DasboardBox
                    image={`images/dash4.png`}
                    text={`messages`}
                    // url={`/message`}
                    url={`/messages`}
                    // modal={`modal`}
                    // Pageunavailable={`Pageunavailable`}
                    count={auth.unReadMessageCount}
                  />
                  <DasboardBox
                    image={`images/booking.png`}
                    text={`billing & insurance`}
                    url={``}
                    modal={`modal`}
                    Pageunavailable={`Pageunavailable`}
                  />
                  <DasboardBox
                    image={`images/dash1.png`}
                    text={`appointments`}
                    url={`/todayappointment`}
                  />
                  <DasboardBox
                    image={`images/care_plan.png`}
                    text={`care plans`}
                    url={`/careplan`}
                  />
                  <DasboardBox
                    image={`images/dash7.png`}
                    text={`blogs`}
                    url={`/blog`}
                  />
                  <DasboardBox
                    image={`images/dash3.png`}
                    text={`booking request`}
                    url={`/bookingrequest`}
                  />

                  <DasboardBox
                    image={`images/dash6.png`}
                    text={`groups`}
                    url={`/groups`}
                    // url={``}
                    // modal={`modal`}
                    Pageunavailable={`Pageunavailable`}
                  />

                  <DasboardBox
                    image={`images/dash5.png`}
                    text={`active programs`}
                    url={`/activeprogramlist`}
                  />

                  {/* <DasboardBox
                    image={`images/dash7.png`}
                    text={`recipe`}
                    url={`/recipes`}
                  /> */}
                </div>
              </div>
              <div className="col-md-5">
                <Reminder />
                <QuickUpdates />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {zoomModalVisibility ? showZoomModalVisibility() : null} */}
    </>
  );
};

export default Dasboard;
