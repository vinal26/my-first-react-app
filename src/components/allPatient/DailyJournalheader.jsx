import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import Avatar from "../../commonComponent/Avatar";
import { changeDateFormatYYYY } from "../../Utils/Helper";
import DateInput from "../../commonComponent/CutomDatePicker";

const DailyJournalheader = ({user , date,onChange}) => {
  return (
    <>
      <div className="daily_journal rounded px-3" style={{ position: "relative" }}>
        <div className="row">
          <div className="col-md-1 d-flex align-items-center">
            <Avatar image={user?.profilePicture} />
          </div>
          <div className="col-md-11 d-flex align-items-center ps-0">
              <h4 className="mb-0">{user.full_name}</h4>
              <div className="ms-auto">
                <DateInput
                  value={date}
                  onChangeDate={(date) => onChange(date)}
                  maxDate={new Date()}
                  inputClassName={"description_inputf d-flex mb-0 align-items-center"}
                />
              </div>
            {/* <p>150 people</p> */}
          </div>
        </div>
      </div>
    </>
  );
};
// 27-06-2022 <FaRegCalendarAlt className='icon' />
export default DailyJournalheader;
