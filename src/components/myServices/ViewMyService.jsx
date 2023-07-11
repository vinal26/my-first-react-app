import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";

const ViewMyService = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let singleService = location?.state.dt || [];

  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 pt-4 px-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li
                  class="breadcrumb-item cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  My Services
                </li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">
                  View Service
                </li>
              </ol>
            </nav>

            <div>
              <div className="view_recipe_div  mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <p className="viewrecipetitle">
                      {singleService?.serviceName
                        ? singleService?.serviceName
                        : null}
                    </p>

                    <hr className="viewrecipe_hr  mb-2 px-2" />
                    <div className="row">
                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Buffer Time <br />
                          <span>
                            {singleService?.breakTime
                              ? `${singleService?.breakTime} Mins`
                              : "N/A"}{" "}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Currency <br />
                          <span>
                            {singleService?.rate ? singleService?.rate : "0"}{" "}
                            {singleService?.currency
                              ? singleService?.currency
                              : null}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Duration <br />
                          <span>
                            {singleService?.duration
                              ? singleService?.duration
                              : "N/A"}
                          </span>
                        </p>
                      </div>

                      <div className="col-md-3">
                        <p className="viewrecipe_server">
                          Category <br />
                          <span className="text-capitalize">
                            {singleService?.serviceType
                              ? singleService?.serviceType.join(", ")
                              : "N/A"}{" "}
                          </span>
                        </p>
                      </div>

                      <div className="col-md-3 mt-4">
                        <p className="viewrecipe_server">
                          Attendees Limit <br />
                          <span>
                            {singleService?.attendeesLimit
                              ? singleService?.attendeesLimit
                              : "N/A"}
                          </span>
                        </p>
                      </div>

                      <div className="col-md-3 mt-4">
                        <p className="viewrecipe_server">
                          Phone Number <br />
                          <span>
                            {singleService?.phone
                              ? singleService?.phone
                              : "N/A"}
                          </span>
                        </p>
                      </div>

                      <div className="col-md-6 mt-4">
                        <p className="viewrecipe_server">
                          Location <br />
                          <span>
                            {singleService?.location
                              ? singleService?.location
                              : "N/A"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <hr className="viewrecipe_hr  mb-1 mt-4" />
                  </div>
                </div>

                <div className="d-flex">
                  <p>
                    <span class="badge bg-green me-2 py-2 px-3 mt-4">
                      {singleService?.group
                        ? "Group Session"
                        : "Individual Session"}
                    </span>
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <p className="viewrecipe_server">
                       Description <br />
                      <span>
                        {singleService?.serviceDesc
                          ? singleService?.serviceDesc
                          : "N/A"}
                      </span>
                    </p>
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

export default ViewMyService;
