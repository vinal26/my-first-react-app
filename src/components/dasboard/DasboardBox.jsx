import React from "react";
import { Link } from "react-router-dom";
import PageUnavailable from "../../commonComponent/PageUnavailable";

const DasboardBox = (props) => {
  const renderBadge = ()=>{
    let count = Number(props.count);
    let finalCount = 0;
    if(count > 99){
      finalCount = 99 + "+"
    }else{
      finalCount = count;
    }
    if(props?.url != "/messages" || props?.count == 0){
      return null
    }
    return <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{finalCount}</span>
  }
  return (
    <>
      <div className="col-md-4 mb-4">
        <Link to={`${props.url}`} className="link_text">
          <div
            className="dashboard_box align-middle position-relative"
            data-bs-toggle={`${props.modal}`}
            data-bs-target={`#${props.Pageunavailable}`}
          >
            <div>
              <img src={props.image} className="mx-auto d-block" alt="" />
              <p className="mt-1">{props.text}</p>
            </div>
            {props?.count ? renderBadge() : null}
          </div>
        </Link>
      </div>
      <PageUnavailable />
    </>
  );
};

export default DasboardBox;
