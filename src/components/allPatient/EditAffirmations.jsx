import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import EditAffirmationsForm from "./EditAffirmationsForm";

const EditAffirmations = () => {
  let location = useLocation();
  const navigate=useNavigate();
  let data = location?.state?.list || [];
  let categoryName = location.state?.categoryName;
  
  return (
    <>
      <Navbar />
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <p className="dashboard_title">
              <Link to="" className="link_text">
                <HiOutlineArrowSmLeft  onClick={() => navigate(-1)} className="icon" />
              </Link>
              Edit Affirmations
            </p>

            <EditAffirmationsForm list={data} categoryName={categoryName}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAffirmations;
