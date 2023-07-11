import React from "react";
import { ImCross } from "react-icons/im";

const ProgramModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="programModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div class="modal-header">
                <h5 class="modal-title">Elimination Program</h5>
                <ImCross data-bs-dismiss="modal" className="icon" data-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">                
                <div className="row mt-4">
                  <div className="col-md-12 text-center">
                    <button className="reminder_addnew45">add new</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramModal;
