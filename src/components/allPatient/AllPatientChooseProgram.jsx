import React from "react";
import { ImCross } from "react-icons/im";
import { FiSearch } from "react-icons/fi";

const AllPatientChooseProgram = () => {
  return (
    <>
      <div
        className="modal fade"
        id="chooseprogram"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-body">
              <p className="choosep_title text-center">
                Choose group for Lisa tony
                <ImCross data-bs-dismiss="modal" className="icon" />
                <div className="row mt-4">
                  <div className="col-md-6">
                    <p className="choose_title4">get enroll in</p>
                    <div className="chooseprogram_box">
                      <FiSearch className="boxicon" />
                      <input placeholder="Search Here" />
                    </div>

                    <p className="chooselist_input">
                      <input type="checkbox" /> Detox Program
                    </p>

                    <p className="chooselist_input">
                      <input type="checkbox" /> Detox Program
                    </p>
                  </div>

                  <div className="col-md-6">
                    <p className="choose_title4">Suggested</p>
                    <div className="chooseprogram_box">
                      <FiSearch className="boxicon" />
                      <input placeholder="Search Here" />
                    </div>

                    <p className="chooselist_input">
                      <input type="checkbox" /> Detox Program
                    </p>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPatientChooseProgram;
