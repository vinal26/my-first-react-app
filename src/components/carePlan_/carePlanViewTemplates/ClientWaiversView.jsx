import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientWaiversView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({name: element.answer?.name || '', acknowledged: element.answer?.acknowledged || false})

    let handleChange = async (values) => {
        await handleFormValuesUpdate(element, {...formValues, ...values}, index);
        setFormValues(prev => {return {...prev, ...values}})
    }

    // let ob = {}
    // useEffect(() => {
    //     element.options.map(dt => ob[dt]="")
    //     setFormValues(ob)
    // }, [])

    return (
        <>
            <div className="row mt-3">
                <div className="col-md-12 ">
                    <p className="whole_label mt-4">Your Signature <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                    <input
                        type="text"
                        className="description_inputMedi ps-0"
                        placeholder="Write your name..."
                        name={"title_"+index}
                        maxLength={50}
                        defaultValue={element.answer ? element.answer.name : ""}
                        onChange={e => handleChange({name: e.target.value})}
                    />
                    <div className="form-check mt-1">
                        <input name={"acknowledged_"+index} className="form-check-input" defaultChecked={element.answer ? element.answer.acknowledged : false} type="checkbox" value="" id="flexCheck"
                            onChange={e => handleChange({acknowledged: e.target.checked})}
                        />
                        <label className="form-check-label" htmlFor="flexCheck">
                        I agree to the terms and conditions
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientWaiversView