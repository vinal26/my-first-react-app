import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RichEditor } from "../RichEditor";
const RichTextView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();

    useEffect(() => {
        handleFormValuesUpdate(element, {title: element.title}, index)
    }, [])
    return (
        <>
            <div className="mb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        {/* <p className="whole_label mt-4">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p> */}
                        <RichEditor
                            noStyle={false}
                            // name={'richText_'+index}
                            onChange={data => {}}
                            placeholder="start writing..."
                            value={element.title || ""}
                            toolbar={false}
                            readOnly={true}
                        // onAddNewFile={(fileName) => { }}
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

export default RichTextView;
