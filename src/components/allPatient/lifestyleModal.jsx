import React from "react";
import { ImCross } from "react-icons/im";
import AllPatientTabs from "./AllPatientTabs";

const LifestyleModal = (props) => {
  return (
    <>
      <div
        className="modal fade"
        id="lifestyleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{maxWidth: '90%', height: '90%'}}>
          <div className="modal-content h-100 overflow-hidden">
            <div class="modal-header">
                <h5 class="modal-title">Lifestyle</h5>
                <ImCross data-bs-dismiss="modal" className="icon" data-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body" style={{overflowY: 'auto'}}>                
                <div className="row">
                  <div className="col-md-12">
                    <AllPatientTabs userid={props.userid} />

                    {/* <button className="reminder_addnew45">add new</button> */}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LifestyleModal;
