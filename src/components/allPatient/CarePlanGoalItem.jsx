import React,{useState} from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import DateInput from "../../commonComponent/CutomDatePicker";

const CarePlanGoalItem = () => {
    const [goalDateShow, setGoalDateShow] = useState("false");
    const handleToggle = () => {
        setGoalDateShow(!goalDateShow);  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div
            className="care_textdiv"
            style={{ padding: " 10px 15px 0px 13px" }}
          >
            <div className="row">
              <div className="col-md-12 forum_wid3 ">
                <div className="table_resouter">
                  <table class="table table-borderless active_listscroll  mb-0">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td>
                          <p
                            className="care_pgtitle"
                            style={{ marginTop: "0px" }}
                          >
                            lorem ipsum dummy lorem lorem lorem lorem
                          </p>
                        </td>
                        <td>Frequency</td>
                        <td>Daily</td>
                        <td>
                          <input
                            className="checkbox_care"
                            type="checkbox"
                            value=""
                            onChange={handleToggle}
                            id="flexCheckChecked"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* start data and end date section */}

          <div className="goal_startend" style={{display : goalDateShow ? "none" : "block"}}>
            <div className="row">
              <div className="col-md-6">
                <p className="goal_startendtitle">Start date</p>
                <DateInput
                  inputClassName={
                    "goal_startendinput d-flex align-items-center"
                  }
                  imageStyle={{
                    width: 15,
                    height: 15,
                    position: "relative",
                    left: "-27px",
                    borderRadius: "0px",
                  }}
                />
              </div>
              <div className="col-md-6">
                <p className="goal_startendtitle">End date</p>
                <DateInput
                  inputClassName={
                    "goal_startendinput d-flex align-items-center"
                  }
                  imageStyle={{
                    width: 15,
                    height: 15,
                    position: "relative",
                    left: "-27px",
                    borderRadius: "0px",
                  }}
                />
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarePlanGoalItem;
