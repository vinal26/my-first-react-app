import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const NumberTypeFormView = ({ handleFormValuesUpdate, element, index }) => {

    let handleChange = (e) => {
        let newFormValues = "";
        newFormValues = e.target.value;

        handleFormValuesUpdate(element, newFormValues, index);
    }

    return (
        <>
            <div className="mb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="whole_label mt-4" id="transformNone">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <input
                            type="number"
                            className="description_inputMedi px-0"
                            name={element.title+index}
                            onChange={e => e.target.value<999_999_999_999_999 && handleChange(e)}
                            defaultValue={element.answer || ""}
                            placeholder="Type your number here..."
                        // value={element.title || ""}
                        // onChange={e => handleFormValuesUpdate(index, e, 'input')}
                        />
                    </div>
                    {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default NumberTypeFormView;
