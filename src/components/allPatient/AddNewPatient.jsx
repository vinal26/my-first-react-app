import React from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import AddNewPatientComponent from "./AddNewPatientComponent";
import "./style.css";
import { useNavigate } from "react-router-dom";

const AddNewPatient = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
          <div className="row">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item  cursor-pointer" onClick={() => navigate(-1)}>My Client</li>
                  <li
                    class="breadcrumb-item active fw-bold"
                    aria-current="page"
                  >
                   Add New Client
                  </li>
                </ol>
              </nav>
              <div className="d-flex mb-3">
        <div className="w-100">
          <h4>Add New Client</h4>
          <p>Fill in Client information to complete adding client successfully...</p>
        </div>
       
      </div>
      <AddNewPatientComponent />
              </div>
            
          
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewPatient;
