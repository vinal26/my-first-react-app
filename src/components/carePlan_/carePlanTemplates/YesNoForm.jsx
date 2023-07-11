import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const YesNoForm = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const ref = useRef();
    const handleKeyDown = () => {
        ref.current.style.height = "inherit";
        ref.current.style.height = ref.current.scrollHeight + "px";
        // In case you have a limitation
        // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
    }

    useEffect(() => {
        handleKeyDown()
    }, [])
    
    
    return (
        <>
            <div className="card px-4 mb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className=" col-md-3 card px-2 mt-1 mb-2">
                            <p className="whole_label mt-1">Yes/No</p>
                        </div>

                        {/* <p className="whole_label">Title <span style={{ color: "red", fontWeight: "bold" }}>*</span></p> */}
                        <textarea
                            type="text"
                            className="description_inputMedi  "
                            name="title"
                            maxLength={200}
                            ref={ref}
                            style={{overflowY: 'hidden', paddingBlock: '15px'}}
                            placeholder="Type your question here..."
                            value={element.title || ""}
                            onChange={e => {handleFormValuesUpdate(index, e, 'input'); handleKeyDown()}}
                        />
                    </div>
                    {/* <div className="container ">
                        <div className="row">
                            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <div className="col-md-6 mt-1 justify-content-center">
                                    <div className="btn-group mt-1 align-items-center">
                                        <p className="affir_checkbox">
                                            <input
                                                type="radio" name="btnradio" id="btnradio1" autoComplete="off" checked
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
                                            <input name="btnradio" id="btnradio2" autoComplete="off"
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
                    </div> */}
                    {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default YesNoForm;
