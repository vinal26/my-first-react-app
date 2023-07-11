import React from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const GroupsHeader = (props) => {
  return (
    <>
      <div className="group_header43">
        <div className="row">
          <div className="col-md-1 mchat_wid1">
            <img src="images/group.png" alt="" />
          </div>
          <div className="col-md-11 mchat_wid2">
            <h5>
              lisa jones
              <Link className="link_text" to="/addnewpatient" style={{ display: props.btnHide }}>
                <button>
                  <AiOutlinePlus /> add Member
                </button>
              </Link>
            </h5>
            <p>150 people</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupsHeader;
