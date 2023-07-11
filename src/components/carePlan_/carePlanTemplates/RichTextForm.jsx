import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RichEditor } from "../RichEditor";
const RichTextForm = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="card px-4 mb-2">
                <div className="row mt-3">
                    <div className="col-md-12 mb-3">
                        <div className=" col-md-3 card px-2 mt-1 mb-2">
                            <p className="whole_label mt-1">RichText</p>
                        </div>
                        {/* <p className="whole_label mt-4">Title <span style={{ color: "red", fontWeight: "bold" }}>*</span></p> */}
                        {/* <input
                            type="text"
                            className="description_inputMedi  "
                            name="title"
                            placeholder="Type your question here..."
                            value={element.title || ""}
                            onChange={e => handleFormValuesUpdate(index, e, 'input')}
                        /> */}
                        <RichEditor
                          onChange={(data) => {
                            handleFormValuesUpdate(index, data, 'editor')
                          }}
                          placeholder="start writing..."
                          value={element.title || ""}
                        //   onAddNewFile={(fileName) => { }}
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

export default RichTextForm;
