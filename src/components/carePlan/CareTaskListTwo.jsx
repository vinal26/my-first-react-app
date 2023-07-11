import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CareTaskListTwo = ({ list, selectedGoal, selectTaskForGoal }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="col-md-12">
        <div className="caretask_div99">
          <p className="caretask_allgoal3">
            task
            <button onClick={() => navigate("/caretask")}>
              <AiOutlinePlus /> add new
            </button>
          </p>
          <div className="caretask_scroll00">
            {list.map((item) =>
              <div className="row caretask_carddiv2">
                <center>
                  <hr className="caretask_hr45" />
                </center>
                <p className="caretask_cardpnew">
                  {item.name}
                </p>
                <div className="col-md-1">
                  <input checked={selectedGoal?.tasks?.includes(item._id) || false} onClick={() => selectedGoal ? selectTaskForGoal(item) : alert('Please select goal.')} type="checkbox" className="checkbox_access45" />
                </div>
                {/* <div className="col-md-5">
                  <p className="caretask_cardp2">{`Start date ${item.start_date}`}</p>
                  <p className="caretask_cardp2">{`End date ${item.end_date}`}</p>
                </div> */}
                 <div className="col-md-5">
                  <p className="caretask_cardp2">{`Assign by ${item.assignBy}`}</p>
                  <p className="caretask_cardp2">{`SLA ${item.sla}`}</p>
                </div>
                <div className="col-md-3">
                  <p className="caretask_cardp2">Frequency</p>
                  <p className="caretask_cardp2">Status</p>
                </div>
                <div className="col-md-3">
                  <p className="caretask_cardp2">{item.frequency}</p>
                  <p className="caretask_cardp3">
                    <GoPrimitiveDot className="icon" />
                    {item.status}
                  </p>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareTaskListTwo;
