import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProviderWaiversView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    useEffect(() => {
        handleFormValuesUpdate(element, {name: element.title, acknowledged: true}, index)
    }, [])

    return (
        <>
            <div className="row mt-3">
                <div className="col-md-12 ">
                    <p className="whole_label mt-4">Provider's Signature</p>
                    <p style={{fontStyle: 'italic'}}>{element.answer ? element.answer.name : ""}</p>
                    <div className="form-check mt-1 event-none d-none">
                        <input className="form-check-input" defaultChecked={element.answer ? element.answer.acknowledged : false} type="checkbox" value="" id="flexCheckDefault"
                        //  onChange={e => setAcknowledged(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                        I agree to the terms and conditions
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProviderWaiversView