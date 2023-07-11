import React, { useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";

const AddProviders = () => {
  const [formValues, setFormValues] = useState([
    { gmail: "", name: "", role: "" },
  ]);
  let addFormFields = () => {
    setFormValues([...formValues, { gmail: "", name: "", role: "" }]);
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
        id="addproviders"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog viewteam_width8">
          <div class="modal-content">
            <div class="modal-header p-4">
              <h5 className="mb-0">
                Add a list of care team providers{" "}
                <AiOutlinePlusCircle
                  onClick={() => addFormFields()}
                  className="list_plusicon"
                />
              </h5>
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
                  <div className="col-md-4 mb-2">
                    <label className="form-label" for="members">
                      Email Address
                    </label>
                  </div>

                  <div className="col-md-4  mb-2">
                    <label className="form-label" for="members">
                      First & Last Name
                    </label>
                  </div>

                  <div className="col-md-4  mb-2">
                    <label className="form-label" for="members">
                      Title/Role
                    </label>
                  </div>
                  <div className="col-md-12">
                    {formValues.map((element, index) => (
                      <div
                        className="row"
                        key={index}
                        style={{ marginBottom: "-10px" }}
                      >
                        <div className="col-md-4">
                          <input
                            className="form-control description_inputf mb-2"
                            type="gmail"
                            id="gmail"
                            name="gmail"
                            placeholder="e.g. sharonjames@gmail.com"
                          />
                        </div>

                        <div className="col-md-4">
                          <input
                            className="form-control description_inputf mb-2"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g. Clara M Cardenas"
                          />
                        </div>

                        <div className="col-md-4">
                          <div className="btn-group">
                            <select
                              name="role"
                              id="role"
                              className="description_inputf"
                            >
                              <option value="category">Please select</option>
                              <option value="Lead Physician">
                                Lead Physician
                              </option>
                              <option value="Case Manager">Case Manager</option>
                              <option value="Care Coordinator">
                                Care Coordinator
                              </option>
                              <option value="Admin">Admin</option>
                              <option value="Group Moderator">
                                Group Moderator
                              </option>
                              <option value="Collaborating Physician">
                                Collaborating Physician
                              </option>
                              <option value="Nurse Practitioner">
                                Nurse Practitioner{" "}
                              </option>
                            </select>
                            {index ? (
                              <button
                                type="button"
                                title="Remove"
                                style={{ height: "55px" }}
                                className="btn btn-outline-danger px-2 ms-2 rounded"
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
                    Send Invitation
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

export default AddProviders;
