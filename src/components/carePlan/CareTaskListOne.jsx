import React from "react";
import { GoPrimitiveDot } from "react-icons/go";

const CareTaskListOne = ({ list, selectedGoal, changeSelectedGoal }) => {
  return (
    <>
      <div className="col-md-12">
        <div className="caretask_div99">
          <p className="caretask_allgoal3">all goals</p>
          <div className="caretask_scroll00">
            {list.map((item) =>
              <div className="row caretask_carddiv2" style={selectedGoal._id === item._id ? { background: '#1f7e78' } : {}} onClick={() => changeSelectedGoal(item)}>
                <center>
                  <hr className="caretask_hr45" />
                </center>
                <p className="caretask_cardp1" style={selectedGoal._id === item._id ? { color: '#fff' } : {}}>
                  {item.name}
                </p>
                <div className="col-md-6">
                  <p className="caretask_cardp2" style={selectedGoal._id === item._id ? { color: '#fff' } : {}}>{`Start date ${item.start_date}`}</p>
                  <p className="caretask_cardp2" style={selectedGoal._id === item._id ? { color: '#fff' } : {}}>{`End date ${item.end_date}`}</p>
                </div>
                <div className="col-md-3">
                  <p className="caretask_cardp2" style={selectedGoal._id === item._id ? { color: '#fff' } : {}}>Frequency</p>
                  <p className="caretask_cardp2" style={selectedGoal._id === item._id ? { color: '#fff' } : {}}>Status</p>
                </div>
                <div className="col-md-3">
                  <p className="caretask_cardp2" style={selectedGoal._id === item._id ? { color: '#fff' } : {}}>Daily</p>
                  <p className="caretask_cardp3" style={selectedGoal._id === item._id ? { color: '#fff' } : {}}>
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

export default CareTaskListOne;
