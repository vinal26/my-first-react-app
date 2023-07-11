import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

import CarePlanGoalItem from "./CarePlanGoalItem";

const CarePlanGoalModal = () => {
  return (
    <div
      className="modal fade"
      id="careplangoalmodal"
      // tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      
      
    >
      <div className="modal-dialog">
        <div className="modal-content chooselist_mdiv8 careplangoalpopup">
          <div className="modal-body">
            <p className="choosep_title text-center">
              goal 
              <span id="crossbtn2" data-bs-dismiss="modal"><ImCross className="icon" /></span>
            </p>
            <div className="col-md-12">
              <div className="lifestyle_scroll" style={{  maxHeight: "360px"}}>
                <CarePlanGoalItem />
                <CarePlanGoalItem />
                <CarePlanGoalItem />
                <CarePlanGoalItem />
                
              </div>
              <div className="col-md-12 mb-5 mt-3">
                <button className="active_assign_now" 
                 data-bs-toggle="modal"
                 data-bs-target="#careplantaskmodal"
                 onClick={()=> {document.getElementById("crossbtn2").click();
                }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarePlanGoalModal;
