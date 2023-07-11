import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import RatingsListComponent from "./RatingsListComponent";

const MyRatingsList = () => {
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
              my ratings
            </p>
            <RatingsListComponent />
            <RatingsListComponent />
            <RatingsListComponent />
            <RatingsListComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRatingsList;
