import React from "react";
import { Link } from "react-router-dom";

const MyLibraryItem = (props) => {
  return (
    <>
      <div className="col-sm-4">
        <Link to={`${props.url}`} className="link_text">
          <div className="library_box">
            <img src={props.image} alt="" />
            <p>{props.text}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MyLibraryItem;
