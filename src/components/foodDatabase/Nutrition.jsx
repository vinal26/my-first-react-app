import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./style.css";
import NutritionTabs from "./NutritionTabs";
import DasboardBox from "../dasboard/DasboardBox";
const Nutrition = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 px-5 pt-4">
            <p className="dashboard_title">
              {/* <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              /> */}
             Nutrition
              {/* <Link to="" className="link_text float_text5">
                view more
              </Link> */}
            </p>
            <div className="col-md-9">
                <div className="row">
            <DasboardBox
                    image={`images/recipeCover.png`}
                    text={`recipes`}
                    url={`/recipes`}
                  /> 
                  {/* <DasboardBox
                    image={`images/dash8.png`}
                    text={`food database`}
                    url={`/foodDatabase`}
                  /> */}
                  <DasboardBox
                    image={`images/dash9.png`}
                    text={`meal plans`}
                    url={`/mealplan`}
                  />
                  </div>
                  </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nutrition;
