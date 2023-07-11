import React from "react";
import "./style.css";
import { GoDeviceDesktop } from "react-icons/go";
import { FaUserInjured, FaUserMd } from "react-icons/fa";
import { BsFillCalendar2Fill, BsGearFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import PageUnavailable from "../../commonComponent/PageUnavailable";
import { RiLogoutBoxRLine, RiTeamFill } from "react-icons/ri";
import LogoutModal from "./LogoutModal";
import { IoIosNutrition } from "react-icons/io";
import { SiStylelint } from "react-icons/si";
import { MdSpaceDashboard } from "react-icons/md";
import { HiLibrary } from "react-icons/hi";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = () => {
  const { isAdmin } = useAuth();
  return (
    <>
      <div className="sidebar">
        <div className="space">
          <span
            className="d-block p-0 mx-0 my-3"
            style={{ fontSize: "0.8em", color: "#acacac" }}
          >
            NAVIGATION
          </span>
          <NavLink to="/" exact className="NavLink_text">
            <p>
              {/* <GoDeviceDesktop className="icon" /> */}
              {/* <img src="images/dashboard.png" className="custom_img" alt="" /> */}
              <MdSpaceDashboard className="icon" size={"1.2em"} />
              <span>dashboard</span>
            </p>
          </NavLink>
          <NavLink to="/allpatientlist" className="NavLink_text">
            <p>
              <FaUserInjured className="icon" />
              <span>my client</span>
            </p>
          </NavLink>
          <NavLink to="/calender" className="NavLink_text">
            <p>
              <BsFillCalendar2Fill className="icon" />
              <span>my calendar</span>
            </p>
          </NavLink>
          {/* <p>
          <img src="images/service.png" alt="" />
          <span>my services</span>
        </p>
        <p>
          <BiCodeAlt className="icon" />
          <span>programs</span>
        </p> */}
          {isAdmin ? (
            <NavLink to="/doctorviewprofile" className="NavLink_text">
              <p>
                <FaUserMd className="icon" />
                <span>dr. management</span>
              </p>
            </NavLink>
          ) : null}

          {/* <NavLink 
        to="/mycareteam"
         className="NavLink_text">
          <p>
          <RiTeamFill className="icon" />
            <span>care team</span>
          </p>
        </NavLink> */}

          <p data-bs-toggle="modal" data-bs-target="#Pageunavailable">
            {/* <img src={require("../../images/side7.png")} className="sidebar_iconimg0" alt="" /> */}
            <RiTeamFill className="icon" />
            <span>care team</span>
          </p>

          {/* <NavLink to="/nutrition" className="NavLink_text">
            <p>
              <img src={require("../../images/side6.png")} className="sidebar_iconimg1" alt="" />
              <IoIosNutrition className="icon" size={"1.2em"} />
              <span>nutrition</span>
            </p>
          </NavLink> */}

          <NavLink to="/mylibrary" className="NavLink_text">
            <p>
              {/* <img src={require("../../images/side6.png")} className="sidebar_iconimg1" alt="" /> */}
              <HiLibrary className="icon" size={"1.2em"} />
              <span>My Library</span>
            </p>
          </NavLink>
          <NavLink to="/myservices" className="NavLink_text">
            <p>
              {/* <img src={require("../../images/side6.png")} className="sidebar_iconimg1" alt="" /> */}
              <BsGearFill className="icon" size={"1.2em"} />
              <span>My Services</span>
            </p>
          </NavLink>
          {/* <img src={require("../../images/side5.png")} className="sidebar_iconimg2" alt="" /> */}
          {/* <NavLink to="/allpatient" className="NavLink_text">
            <p>
             
              <SiStylelint className="icon" />
              <span>lifestyle</span>
            </p>
          </NavLink> */}

          <hr />
          <a
            title="Logout"
            alt="logout"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal"
          >
            <p>
              <RiLogoutBoxRLine className="icon" />
              <span>Logout</span>
            </p>
          </a>
        </div>
      </div>
      <PageUnavailable />
      <LogoutModal />
    </>
  );
};

export default Sidebar;
