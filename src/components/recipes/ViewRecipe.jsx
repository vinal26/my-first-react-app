
import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./style.css";
import RecipeTabs from "./RecipeTabs";
import { GoPrimitiveDot } from "react-icons/go";
import ViewRecipeComponent from "./ViewRecipeComponent";
import { IoIosArrowBack } from "react-icons/io";
const ViewRecipe = () => {
  let location = useLocation();
  const navigate = useNavigate();
  let mealplan = location?.state?.mealplan || false;
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer"  onClick={() => navigate(-2)}>My Library</li>
                <li class="breadcrumb-item cursor-pointer"  onClick={() => navigate(-1)}>{mealplan ? 'Mealplan' : 'Recipe'}</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">View Recipe</li>
              </ol>
            </nav>

            {/* <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              Nutrition
              <span className="patient_lifestyle2">
                <GoPrimitiveDot />
                recipes
              </span>
            
            </p> */}

            <p className="dashboard_title text-green pt-4 fs-6 pointer" onClick={() => navigate(-1)}>
              <IoIosArrowBack
                size="0.5em"
                className="icon"
              />
              View {mealplan ? 'Mealplans' : 'Recipes'}
            </p>

            <div>
              <ViewRecipeComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRecipe;
