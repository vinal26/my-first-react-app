import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./style.css";
import NutritionTabs from "./NutritionTabs";
const EditNutrition = () => {
  const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <p className="dashboard_title">
                            <Link to="" className="link_text">
                                <HiOutlineArrowSmLeft  onClick={() => navigate(-1)} className="icon" />
                            </Link>
                             Edit Food Database
                            {/* <Link to="" className="link_text float_text5">
                view more
              </Link> */}
                        </p>
                        <div class="container">
                            <div class="row justify-content-start">
                            <div className="row mt-4">
                            <div className="col-md-4">
              <img
                src="images/recipeCover.png"
                alt=""
                className="active_dummyimage"
              />
              <input type="file" className="form-control uploader-input" />
              <div className="uploader-mask d-flex justify-content-center align-items-center">
                <BsFillPlusCircleFill className="upload-icon" />
              </div>
            </div>
    
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="text"
                    className="description_inputg"
                    placeholder="T Nutrition"
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="description_inputg"
                    placeholder="Lorem ipsum is dummy text"
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="description_inputg"
                    placeholder="Lorem ipsum is dummy text"
                  />
                </div>
                <div className="col-md-12">
                            <select className="description_inputg form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option selected>pros</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                </div>
                <div className="col-md-12">
                            <select className="description_inputg form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option selected>cons</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                </div>
    
                <div className="col-md-12">
                  <button className="description_btnsave">save</button>
                </div>
              </div>
            </div>
          </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditNutrition;