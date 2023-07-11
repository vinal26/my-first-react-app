import React from "react";
import { ImCross } from "react-icons/im";

const PageUnavailable = () => {
  return (
    <>
      <div
        className="modal fade"
        id="Pageunavailable"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-body">
              <p className="choosep_title text-center">
                <ImCross
                  data-bs-dismiss="modal"
                  role="button"
                  className="icon"
                />
              </p>
              <center>
                <img src="images/coming_soon.png" alt="" />
              </center>

              <h6 className="text-center mt-4 mb-5">
                This feature is coming soon.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageUnavailable;
