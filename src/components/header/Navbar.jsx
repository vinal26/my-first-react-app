import React, { useEffect, useState, useRef } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { FaBell } from "react-icons/fa";
import "./style.css";
import { Link } from "react-router-dom";
import { getCategories, getDoctorProfile } from "../../services/DoctorService";
import { getObjectFromStore, setObjectInStore } from "../../storage/Storage";
// import LogoutModal from "./LogoutModal";
import { showToastError } from "../../Utils/Helper";
import NotificationSidebar from "../sidebar/NotificationSidebar";
import { notificationSeen } from "../../services/DashboardService";
import { activeStatusChangeService } from "../../services/api";
import fulllogo from "../../images/fulllogo.png";

const Navbar = (props) => {
  const modalRef = useRef();
  const [fname, setfname] = useState(getObjectFromStore("first_name") || "");
  const [sname, setsname] = useState(getObjectFromStore("last_name") || "");
  const [qualifications, setqualifications] = useState(
    getObjectFromStore("qualifications") || []
  );
  const [category, setcategory] = useState(
    getObjectFromStore("category") || ""
  );
  const [profilePicture, setprofilePicture] = useState(
    getObjectFromStore("profile_picture") || ""
  );
  const [badgeCount, setBadgeCount] = useState(0);
  const [profileBox, setProfileBox] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(null);

  // const windowFocused = useWindowFocus();
  // useEffect(() => {
  //   if (windowFocused) {
  //     console.log('Called APi 11111 .....')
  //   } else if (windowFocused) {
  //     console.log('Called APi 2222.....')
  //   }
  // }, [windowFocused]);

  useEffect(() => {
    function handler(event) {
      if (!modalRef.current?.contains(event.target)) {
        setProfileBox(false);
      }
    }

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const getDoctorInfo = async () => {
    try {
      const response = await getDoctorProfile();
      if (response.status === 200) {
        setObjectInStore("user_id", response?.data?.data[0]?._id);
        console.log(response?.data);
        if (response?.data?.data[0]?.first_name) {
          setObjectInStore("first_name", response?.data?.data[0]?.first_name);
          setfname(response?.data?.data[0]?.first_name);
        }
        if (response?.data?.data[0]?.last_name) {
          setObjectInStore("last_name", response?.data?.data[0]?.last_name);
          setsname(response?.data?.data[0]?.last_name);
        }
        if (response?.data?.data[0]?.qualifications) {
          setObjectInStore(
            "qualifications",
            response?.data?.data[0]?.qualifications
          );
          setqualifications(response?.data?.data[0]?.qualifications);
        }
        if (response?.data?.data[0]?.role) {
          setObjectInStore("role", response?.data?.data[0]?.role);
        }
        if (response?.data?.data[0]?.profilePicture) {
          setObjectInStore(
            "profile_picture",
            response?.data?.data[0]?.profilePicture
          );
          setprofilePicture(response?.data?.data[0]?.profilePicture);
        }
        setOnlineStatus(response?.data?.data[0]?.onlineStatus);
        if (response?.data?.data[0]?.docCategory) {
          // await getCategoryList(response?.data?.data[0]?.docCategory);
          setObjectInStore("category", response?.data?.data[0].docCategory);
          setcategory(response?.data?.data[0].docCategory);
        }
      } else {
        // alert(response?.data || response.message);
        showToastError(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  const getCategoryList = async (docID) => {
    try {
      const response = await getCategories(docID);
      if (response.status === 200) {
        console.log(response?.data);
        setcategory(response?.data?.data.filter((dt) => dt._id === docID));
        setObjectInStore(
          "category",
          response?.data?.data.filter((dt) => dt._id === docID)
        );
      } else {
        alert(response?.data || response.message);
      }
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  };

  useEffect(() => {
    // if (!fname && !sname && !qualifications.length && !category) getDoctorInfo();
    getDoctorInfo();
  }, []);

  const renderBadge = () => {
    let count = Number(badgeCount);
    let finalCount = 0;
    if (count > 99) {
      finalCount = 99 + "+";
    } else {
      finalCount = count;
    }
    if (badgeCount == 0) {
      return null;
    }
    return (
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {finalCount}
      </span>
    );
  };

  const openNav = () => {
    let notificationSidebar = document.getElementById("notificationSidebar");
    let notificationBackdrop = document.getElementById("notificationBackdrop");
    if (notificationSidebar && notificationBackdrop) {
      notificationSidebar.style.right = "0";
      notificationBackdrop.style.width = "100%";
    }
    notificationSeen();
    setBadgeCount(0);
  };

  return (
    <div className="container-fluid header_marbot">
      <div className="row">
        <div className="col-md-2 px-0 bg-less-white header_fullwid09">
          {/* <div className="row profile_div mt-2">
              <div className="col-md-4 mnav_wid30">
                <img
                  src={require("../../images/logoTree.png")}
                  className="profile_img"
                  alt="profile"
                />
              </div>
              <div className="col-md-8 mnav_wid70 ">
                <div className="d-flex flex-column justify-content-center h-100">
                  <p className="profile_name mb-1">{fname + " " + sname} </p>
                  <p className="profile_desc_wrapper">
                    {category || ""} {qualifications?.length ? <>({qualifications?.map((dt, i) =>
                      <span key={i} className="profile_desc comma">{dt?.name}</span>
                    )})</> : " "}
                  </p>
                </div>
              </div>
            </div> */}
          <img src={fulllogo} className="fulllogo bg-less-white" />
        </div>
        <div className="col-md-10 p-0 header_fullwid09">
          <div className="navgrey">
            <div
              className="mpush_top"
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {/* <img
                      title="Logout"
                      src={require("../../images/logout.png")}
                      alt="logout"
                      className="logout_icon"
                      data-bs-toggle="modal"
                      data-bs-target="#logoutModal"
                    /> */}
              <span
                className="position-relative bell_iconmob8"
                style={{ marginRight: "20px" }}
                title="Notifications"
              >
                <FaBell
                  className="bell_icon mx-0"
                  onClick={() => {
                    openNav();
                  }}
                />
                {badgeCount ? renderBadge() : null}
              </span>

              <div
                className="prob hikuhsiufi"
               
              >
                <div className="d-flex flex-column justify-content-center h-100 header_namepro90">
                  <p className="profile_name mb-0">{fname + " " + sname} </p>
                  <p className="profile_desc_wrapper mb-0">
                    {category || ""}{" "}
                    {qualifications?.length ? (
                      <>
                        (
                        {qualifications?.map((dt, i) => (
                          <span key={i} className="profile_desc comma">
                            {dt?.name}
                          </span>
                        ))}
                        )
                      </>
                    ) : (
                      " "
                    )}
                  </p>
                </div>
 
                <div className="head_bellmob8" style={{ position: "relative" , top : "24px"}} ref={modalRef}>
                  <Link
                    className="link_text"
                    to="/myprofile"
                    title="View Profile"
                  >
                    <img
                      src={profilePicture && `${profilePicture}?${Date.now()}`}
                      onError={(e) => {
                        e.target.src = "images/avatar.png"; //replacement image imported above
                      }}
                      className="image_icon float-none"
                      alt="profile"
                    />
                  </Link>
                  <GoPrimitiveDot
                    className="profile-active-dot"
                    style={{
                      color:
                        onlineStatus?.toLowerCase() === "busy"
                          ? "#d81010"
                          : "green",
                    }}
                    onClick={() => setProfileBox(!profileBox)}
                  />
                  {profileBox ? (
                    <div className="profile-drop-down-box">
                      <ul tabindex="1" class="list-group">
                        <li
                          className="list-group-item active_status_hover"
                          onClick={() => {
                            activeStatusChangeService("available");
                            setProfileBox(false);
                            setOnlineStatus("available");
                          }}
                        >
                          Available
                        </li>
                        <li
                          onClick={() => {
                            activeStatusChangeService("busy");
                            setProfileBox(false);
                            setOnlineStatus("busy");
                          }}
                          className="list-group-item active_status_hover"
                        >
                          Busy
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <LogoutModal /> */}
      <NotificationSidebar
        badgeCount={badgeCount}
        getBadgeCount={(count) => {
          setBadgeCount(count);
        }}
      />
    </div>
  );
};

export default Navbar;
