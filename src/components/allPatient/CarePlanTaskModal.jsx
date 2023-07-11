import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Select from "react-select";
import CarePlanTaskModalAllGoal from "./CarePlanTaskModalAllGoal";
import CarePlanTaskModalGoalTask from "./CarePlanTaskModalGoalTask";

const CarePlanTaskModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="careplantaskmodal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8 careplantaskpopup" style={{top : "30px"}}>
            <div className="modal-body">
              <p className="choosep_title text-center">
                Task <span id="crossbtn" data-bs-dismiss="modal"><ImCross className="icon" /></span>
              </p>
              <div className="col-md-12 mt-4">
              <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
               <CarePlanTaskModalAllGoal />
                </div>
              <div className="col-md-8">
                <CarePlanTaskModalGoalTask />
                </div>
            </div>
          </div>
          <div className="col-md-12 mb-2 mt-2">
                <button className="active_assign_now" 
                >
                  Submit
                </button>
              </div>
        </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarePlanTaskModal;
