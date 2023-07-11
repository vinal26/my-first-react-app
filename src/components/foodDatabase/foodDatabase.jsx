import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./style.css";
import NutritionTabs from "./NutritionTabs";
import { GoPrimitiveDot } from "react-icons/go";
const FoodDatabase = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="container-fluid">
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
              Nutrition
              <span className="patient_lifestyle2">
                <GoPrimitiveDot  />
                food database
              </span>
              {/* <Link to="" className="link_text float_text5">
                view more
              </Link> */}
            </p>
            <NutritionTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDatabase;
