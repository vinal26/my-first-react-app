import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

const AddNutrition = () => {
    return (
        <>
          <div className="row mt-4">
            <div className="col-md-4">
              <img
                src="images/dummy_image.jpg"
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
                    className="description_inputf"
                    placeholder="nutrition name"
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="description_inputf"
                    placeholder="contents"
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="description_inputf"
                    placeholder="contains"
                  />
                </div>
                <div className="col-md-12">
                            <select className="description_inputf form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option selected>pros</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                </div>
                <div className="col-md-12">
                            <select className="description_inputf form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                                <option selected>cons</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                </div>
                <div className="col-md-12">
                  <button className="description_btnsave">upload</button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

export default AddNutrition;



 


