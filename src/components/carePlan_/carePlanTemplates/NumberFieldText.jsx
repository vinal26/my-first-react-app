import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const NumberTypeForm = ({ handleFormValuesUpdate, element, index }) => {
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
                            <p className="whole_label mt-1">Number</p>
                        </div>

                        <p className="whole_label mt-4">Title <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
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
                    {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default NumberTypeForm;
