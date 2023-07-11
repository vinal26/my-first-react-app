import React, { useState } from "react";
import { TiGroupOutline, TiUserOutline } from "react-icons/ti";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const AddServices = () => {
  return (
    <>
      <div
        class="modal fade"
        id="addservices"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header p-4">
              <h5 className="mb-0">Select Service Type</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body pb-4 px-4">
              <p>
                You can set up a service for one-on-one or group sessions. The
                service type
                <br /> cannot be changed once you've created this service.
              </p>
              <Link  className="link_text" to="/individualsession">
              <div className="addservice_divtext px-3 py-3 mt-5 mb-3 w-75 rounded-2 cursor-pointer text-dark" data-bs-dismiss="modal">
                <TiUserOutline className="fs-4 me-2" /> Individual Session
                <MdArrowForwardIos className="fs-5 float-end mt-1" />
              </div>
              </Link>
              <Link  className="link_text" to="/groupsessionservice">
              <div className="addservice_divtext px-3 py-3 mb-4 w-75 rounded-2 cursor-pointer text-dark"  data-bs-dismiss="modal">
                <TiGroupOutline className="fs-4 me-2" /> Group Session
                <MdArrowForwardIos className="fs-5 float-end mt-1" />
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServices;
