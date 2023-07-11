import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const CareBox = (props) => {
  return (
    <>
      <div className="col-md-12 ml-4">
        <Link to={`${props.url}`} className="link_text">
          <div className="create_newplan" style={props.style}>
            <div>
              <p className="button_text"><AiOutlinePlus /> {props.text}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CareBox;