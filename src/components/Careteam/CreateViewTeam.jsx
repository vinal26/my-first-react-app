import React, { useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";

const CreateViewTeam = () => {
  const [formValues, setFormValues] = useState([{ members: "" }]);
  let addFormFields = () => {
    setFormValues([...formValues, { members: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  return (
    <>
      <div
        class="modal fade"
        id="createviewteam"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog viewteam_width8">
          <div class="modal-content">
            <div class="modal-header p-4">
              <h5 className="mb-0">Create view team</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body pb-4 px-4">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label" for="Team Name">
                      Team Name
                    </label>
                    <input
                      className="form-control description_inputf mb-3 mt-2"
                      placeholder="e.g. Diabetes management team"
                    />

                    <label className="form-label" for="Description">
                      Description
                    </label>
                    <textarea
                      rows="9"
                      type="text"
                      className="description_inputf description_descpf mt-2"
                      placeholder="Write a short description here"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" for="members">
                      Add a list of care team members{" "}
                      <AiOutlinePlusCircle
                        onClick={() => addFormFields()}
                        className="list_plusicon"
                      />
                    </label>

                    {formValues.map((element, index) => (
                      
                      <div className="row mt-2" key={index}>
                        <div className="col-md-10">
                          <input
                            className="form-control description_inputf mb-2"
                            type="members"
                            id="members"
                            name="members"
                            placeholder="e.g. Nutritionist"
                          />
                        </div>

                        <div className="col-md-2 d-flex align-items-center">
                          {index ? (
                            <button
                              type="button"
                              title="Remove"
                              className="btn btn-outline-danger px-2"
                              onClick={() => removeFormFields(index)}
                            >
                              <AiOutlineCloseCircle
                                style={{ marginTop: "-4px" }}
                                size="22px"
                              />
                            </button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-between mt-1">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-custom"
                    data-bs-toggle="modal"
                    data-bs-target="#forumModal"
                    type="submit"
                  >
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateViewTeam;
