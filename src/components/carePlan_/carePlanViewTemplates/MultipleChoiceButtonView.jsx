import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const MultipleChoiceButtonView = ({ handleFormValuesUpdate, element, index }) => {
    console.log(element, "ele")
    const [formValues, setFormValues] = useState({})
    let ob = {}

    let handleChange = (e) => {
        element.options.map(dt => ob[dt]=false)
        setFormValues(ob);

        let newFormValues = {...ob};
        newFormValues[e.target.value] = true;

        handleFormValuesUpdate(element, newFormValues, index);
    }

    useEffect(() => {
        element.options.map(dt => ob[dt]=false)
        setFormValues(ob)
    }, [])

    return (
        <>
            <div className="row mt-3">
                <div className="col-md-12">
                    <p className="whole_label" id="transformNone">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                </div>
                <div className="col-md-12">
                    <p className="text-secondary">{element.helpText || ""}</p>
                </div>
                <div className="col-md-12">
                    {element?.options?.map((ele, i) => (
                        <div className="d-flex" key={i}>
                            <div className="affir_checkbox">
                                <input
                                    type="radio" 
                                    defaultChecked={element['answer'] ? element['answer'][ele] : false}
                                    value={ele} name={element.title+'-'+index} onChange={e => handleChange(e)} id="btnradio1" autoComplete="off"
                                />
                            </div>
                            <div className="actlist_wid2">
                                <p className="py-0">
                                    {ele}
                                </p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default MultipleChoiceButtonView;
