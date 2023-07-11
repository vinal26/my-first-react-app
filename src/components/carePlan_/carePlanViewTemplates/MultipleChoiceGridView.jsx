import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const MultipleChoiceGridView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({})
    let ob = {}


    let handleChange = (e) => {
        let newFormValues = {...formValues};
        let name = (e.target.name).split("-")[0];
        newFormValues[name] = e.target.value;

        setFormValues(newFormValues);

        handleFormValuesUpdate(element, newFormValues, index);
    }

    useEffect(() => {
        element.options.map(dt => ob[dt]="0")
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
                        <div key={i}>
                                <div className="mb-3 justify-content-center">
                                    <div className="btn-group align-items-center">
                                        <div className="actlist_wid2 me-4">
                                            <p className="py-0 mb-0">
                                                {ele}
                                            </p>
                                        </div>
                                        <p className="affir_checkbox mb-0">
                                            <input
                                                value="1" defaultChecked={element.answer && element.answer[ele]==="1" ? true : false} type="radio" name={ele+'-'+i} onChange={e => handleChange(e)} id="btnradio1" autoComplete="off"
                                            />
                                        </p>
                                        <p className="affir_checkbox mb-0">
                                            <input
                                                value="2" defaultChecked={element.answer && element.answer[ele]==="2" ? true : false} type="radio" name={ele+'-'+i} onChange={e => handleChange(e)} id="btnradio1" autoComplete="off"
                                            />
                                        </p>
                                        <p className="affir_checkbox mb-0">
                                            <input
                                                value="3" defaultChecked={element.answer && element.answer[ele]==="3" ? true : false} type="radio" name={ele+'-'+i} onChange={e => handleChange(e)} id="btnradio1" autoComplete="off"
                                            />
                                        </p>
                                        <p className="affir_checkbox mb-0">
                                            <input
                                                value="4" defaultChecked={element.answer && element.answer[ele]==="4" ? true : false} type="radio" name={ele+'-'+i} onChange={e => handleChange(e)} id="btnradio1" autoComplete="off"
                                            />
                                        </p>
                                        <p className="affir_checkbox mb-0">
                                            <input
                                                value="5" defaultChecked={element.answer && element.answer[ele]==="5" ? true : false} type="radio" name={ele+'-'+i} onChange={e => handleChange(e)} id="btnradio1" autoComplete="off"
                                            />
                                        </p>
                                        
                                    </div>
                                </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default MultipleChoiceGridView;
