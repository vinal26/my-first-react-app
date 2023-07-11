import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../../commonComponent/Avatar";
import DateInput from "../../commonComponent/CutomDatePicker";
import { changeDateFormatYYYY } from "../../Utils/Helper";

const LifeStyleHeader = ({ date, onDateChange, user, onChangeTemplate }) => {
  return (
    <>
      <div className="daily_journal" style={{ position: "relative" }}>
        <div className="row">
          <div className="col-md-1 mchat_wid1 text-center">
            <Avatar image={user?.profilePicture} />
          </div>
          <div className="col-md-11 mchat_wid2">
            <h5>
              {user.full_name}
              <span className="date_formatright">
                <DateInput
                  value={date || ""}
                  onChangeDate={(date) => onDateChange(date)}
                  maxDate={new Date()}
                  imageStyle={{ width: 15, height: 15 , position: "relative",
                  left: "-23px", top: "-2px" , borderRadius : "0px" }}
                  inputClassName1={"border-1 bg-white"}
                />
                {/* <DateInput
                  value={date || ""}
                  onChangeDate={(date) => onDateChange(date)}
                  maxDate={new Date()}
                  imageStyle={{ width: 15, height: 15 , position: "relative",
                  left: "-27px", }}
                  inputClassName1={"border-1 bg-white"}
                /> */}
                {/* <input type="date" max={changeDateFormatYYYY(new Date())} value={changeDateFormatYYYY(date)} onChange={(e) => onDateChange(e.target.value)} /> */}
              </span>
              <Link
                to="/edituserlifestyle"
                state={{ user: user }}
                className="link_text"
              >
                <button
                  style={{
                    width: 180,
                    paddingLeft: 10,
                    paddingRight: 10,
                    position: "relative",
                    top: "-9px",
                  }}
                  className="float-end lifestyle_edit"
                >
                  edit
                </button>
              </Link>
              <button
                onClick={onChangeTemplate}
                data-bs-toggle="modal"
                data-bs-target="#chooseTemplate"
                className="float-end lifestyle_edit"
                style={{
                  marginRight: 20,
                  width: 180,
                  textTransform: "none",
                  paddingLeft: 10,
                  paddingRight: 10,
                  position: "relative",
                  top: "-9px",
                }}
              >
                Change template
              </button>
            </h5>
            {/* <p>150 people</p> //TODO: Change the default value */}
          </div>
        </div>
      </div>
    </>
  );
};
// 27-06-2022 <FaRegCalendarAlt className='icon' />
export default LifeStyleHeader;
