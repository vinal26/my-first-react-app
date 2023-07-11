import React from "react";
import { Link } from "react-router-dom";

const AllPatientButton = (props) => {
  return (
    <Link to={`${props.url}`} className="allpatient_btn9color">
      <button className={`patient_textimp ${props.background}`}>
        {props.name}
      </button>
    </Link>
  );
};

export default AllPatientButton;
