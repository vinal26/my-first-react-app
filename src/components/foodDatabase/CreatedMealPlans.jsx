import React from 'react';
import { AiOutlineEye } from "react-icons/ai";
import {RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CreatedMealPlans = ({mealPlanList , isLoading}) => {
  return (
    <>
    {isLoading ? (
          <center>
            <div
              style={{
                width: "3rem", height: "3rem", color: "#1f7e78", top: "110px",
                position: "relative"
              }}
              className="spinner-border mt-3 mb-4"
              role="status"
            />
          </center>
        ) : mealPlanList.length ? mealPlanList.map((dt,i) => <div key={i} className="card shadow-sm border-0 mb-3 p-3 d-flex flex-md-row justify-content-between">
        <div className="d-flex align-items-center">
          {/* <img
          src="images/recipeTable.png"
          // onError={(e) => {
          //   e.target.src = "images/recipeTable.png" //replacement image imported above
          // }}
          className="recipe_image_ me-4" alt="" /> */}
          <p className="m-0 text-capitalize">{dt.mealPlanName}</p>
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <Link className="btn btn-primary btn-custom-light ms-3" to={`/viewmealplan?mealplanId=${dt._id}`}>
            <span><AiOutlineEye className="me-2" />View</span>
          </Link>
          <Link className="btn btn-primary btn-custom-light ms-3" to={`/editmealplan?mealplanId=${dt._id}`}>
              <span><RiEdit2Fill className="me-2" />Edit</span>
          </Link>
          {/* <Link className="btn btn-primary btn-custom-light ms-3" to={`/EditRecipe?recipeId=${dt._id}`}>
            <span><RiEdit2Fill className="me-2" />Edit</span>
          </Link> */}
        </div>
      </div>) : <div class="card px-3 py-4"><h2 class="text-green text-center mx-5 mb-4">You do not have any meal plans yet let’s begin creating meal plans</h2>
      <p class="text-green text-center">Click on the button above to begin creating meal plans.</p></div>}
    
    
    </>
  )
}

export default CreatedMealPlans;