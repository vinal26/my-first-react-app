


import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CarePlanTaskModalGoalTask = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="col-md-12">
        <div className="caretask_div99">
          <p className="caretask_allgoal3">
            task
            {/* <button onClick={() => navigate("/caretask")}>
              <AiOutlinePlus /> add new
            </button> */}
          </p>
          <div className="caretask_scroll00" style={{height : "300px"}}>
           
              <div className="row caretask_carddiv2">
                <center>
                  <hr className="caretask_hr45" />
                </center>
                <p className="caretask_cardpnew">
                lorem ipsum dummy
                </p>
                <div className="col-md-1">
                  <input type="checkbox" className="checkbox_access45" />
                </div>
                {/* <div className="col-md-5">
                  <p className="caretask_cardp2">{`Start date ${item.start_date}`}</p>
                  <p className="caretask_cardp2">{`End date ${item.end_date}`}</p>
                </div> */}
                 <div className="col-md-5">
                  <p className="caretask_cardp2">{`Assign by Physician`}</p>
                  <p className="caretask_cardp2">{`SLA  1 Hours`}</p>
                </div>
                <div className="col-md-3">
                  <p className="caretask_cardp2">Frequency</p>
                  <p className="caretask_cardp2">Status</p>
                </div>
                <div className="col-md-3">
                  <p className="caretask_cardp2">weekly</p>
                  <p className="caretask_cardp3">
                    <GoPrimitiveDot className="icon" />
                    Active
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarePlanTaskModalGoalTask;
