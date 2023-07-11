import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const YesNoFormView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    console.log(element, "ele")
    // const [formValues, setFormValues] = useState({})
    // let ob = {yes: false, no: false}

    let handleChange = (e) => {
        let newFormValues = "";
        newFormValues = e.target.value;
        // setFormValues(newFormValues);

        handleFormValuesUpdate(element, newFormValues, index);
    }

    return (
        <>
            <div className="row mt-3 mb-3">
                <div className="col-md-12">

                    <p className="whole_label" id="transformNone">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                </div>
                <div className="container ">
                    <div className="row">
                            <div className="col-md-6 mt-1 justify-content-center">
                                <div className="btn-group mt-1 align-items-center">
                                    <p className="affir_checkbox">
                                        <input
                                            defaultChecked={element.answer==='yes' ? true : false}
                                            value={"yes"} name={element.title+'-'+index} onChange={e => handleChange(e)}
                                            type="radio" autoComplete="off"
                                        />
                                    </p>
                                    <div className="col-md-12 actlist_wid2">
                                        <p className="py-0">
                                            Yes
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-1 justify-content-center">
                                <div className="btn-group mt-1 align-items-center">
                                    <p className="affir_checkbox">
                                        <input autoComplete="off"
                                            defaultChecked={element.answer==='no' ? true : false}
                                            value={"no"} name={element.title+'-'+index} onChange={e => handleChange(e)}
                                            type="radio"
                                        />
                                    </p>
                                    <div className="col-md-12 actlist_wid2">
                                        <p className="py-0">
                                            No
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
            </div>
        </>
    );
};

export default YesNoFormView;
