import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ScaleFormView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    // const [formValues, setFormValues] = useState([])
    // let ob = {"1": false, "2": false, "3": false, "4": false, "5": false, "6": false, "7": false, "8": false, "9": false, "10": false}

    let handleChange = (e) => {
        let newFormValues = "";
        newFormValues = e.target.value;
        // setFormValues(newFormValues);

        handleFormValuesUpdate(element, newFormValues, index);
    }

    return (
        <>
            <div className="mb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="whole_label" id="transformNone">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        {/* <input
                            type="text"
                            className="description_inputMedi  "
                            name="title"
                            placeholder="********"
                            // value={element.title || ""}
                            // onChange={e => handleFormValuesUpdate(index, e, 'input')}
                        /> */}
                    </div>
                    <div className="container ">
                        <div className="row">
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="1" ? true : false} value={"1"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                1
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="2" ? true : false} value={"2"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                2
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="3" ? true : false} value={"3"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                3
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="4" ? true : false} value={"4"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                4
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="5" ? true : false} value={"5"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                5
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="6" ? true : false} value={"6"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                6
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="7" ? true : false} value={"7"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                7
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="8" ? true : false} value={"8"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                8
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" defaultChecked={element.answer==="9" ? true : false} value={"9"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio1" autoComplete="off" 
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                9
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input value={"10"} name={element.title+'-'+index} onChange={e => handleChange(e)}  id="btnradio2" autoComplete="off"
                                                type="radio" defaultChecked={element.answer==="10" ? true : false}
                                            />
                                        </p>
                                        <div className="actlist_wid2">
                                            <p className="py-0">
                                                10
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
            </div>
        </>
    );
};

export default ScaleFormView;

