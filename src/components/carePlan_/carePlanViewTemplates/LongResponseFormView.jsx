import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const LongResponseFormView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState([])

    let handleChange = (e) => {
        let newFormValues = "";
        newFormValues = e.target.value;
        setFormValues(newFormValues);

        handleFormValuesUpdate(element, newFormValues, index);
    }

    let ob = {}
    useEffect(() => {
        element.options.map(dt => ob[dt]="")
        setFormValues(ob)
    }, [])

    return (
        <>
            <div className="row mt-3">
                <div className="col-md-12 ">
                    <p className="whole_label mt-4" id="transformNone">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                    <textarea
                        style={{minHeight: '200px'}}
                        type="text"
                        className="description_inputMedi ps-0"
                        placeholder="Type your answer here..."
                        name={element.title+index}
                        maxLength={400}
                        defaultValue={element.answer || ""}
                        onChange={e => handleChange(e)}
                    />
                </div>
                {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
            </div>
        </>
    );
};

export default LongResponseFormView;
