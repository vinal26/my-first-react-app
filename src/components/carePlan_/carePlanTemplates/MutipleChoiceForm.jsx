import React, { useState, useRef, useEffect } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const MultipleChoiceForm = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState([])
    let addFormFields = (data) => {
        handleFormValuesUpdate(index, null, 'input_options', null)
    }
    let removeFormFields = (i) => {
        // let newFormValues = [...formValues];
        // newFormValues.splice(i, 1);
        // setFormValues(newFormValues)
        handleFormValuesUpdate(index, null, 'input_options', i)
    }
    let handleChange = (i, e) => {
        handleFormValuesUpdate(index, e, 'input_options', i)
    }

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
                            <p className="whole_label mt-1">Multiple choice</p>
                        </div>
                        <p className="whole_label">Title <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
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
                    <div className="col-md-12">
                        <p className="whole_label">Help text</p>
                        <input
                            type="text"
                            className="description_inputMedi  "
                            name="helpText"
                            maxLength={40}
                            placeholder="Type a help text here"
                            value={element.helpText || ""}
                            onChange={e => handleFormValuesUpdate(index, e, 'input')}
                        />
                    </div>
                    <div className="col-md-12">
                        {element?.options?.map((ele, i) => (
                            <div className="row" key={i}>
                                <div className="col-md-11">
                                    {/* <label className="form-label">Name</label> */}
                                    <input className="form-control description_inputf mb-2" type="text" name="options"
                                        placeholder="options"
                                        maxLength={40}
                                        value={ele || ''}
                                        onChange={e => handleChange(i, e)}
                                    />
                                </div>
                                <div className="col-md-1 d-flex align-items-center">
                                    {
                                        i ?
                                            <button type="button" title="Remove" className="btn btn-outline-danger px-2" onClick={() => removeFormFields(i)}><AiOutlineCloseCircle style={{ marginTop: "-4px" }} size="22px" /></button>
                                            : null
                                    }
                                </div>
                            </div>
                        ))}
                        <div className="btn-custom-link ms-0 mt-3 mb-5" onClick={() => addFormFields()}><AiOutlinePlus className="me-2" /> Add option</div>


                    </div>
                    {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default MultipleChoiceForm;
