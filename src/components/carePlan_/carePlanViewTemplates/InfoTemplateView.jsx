import { formatISO, parseISO } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DateInput from '../../../commonComponent/CutomDatePicker'
import { formList1, formList2 } from '../../../Utils/AllConstant'

function InfoTemplateView({ handleFormValuesUpdate, element, index }) {
    // console.log(element, "ele")
    const [calenderDate, setCalenderDate] = useState(element.answer ? parseISO(element.answer['Date of Birth']) : "")
    const [formValues, setFormValues] = useState(element.answer ? element.answer : {})
    const [valid, setValid] = useState(true)

    let handleChange = (e, cal=false) => {
        let newFormValues = {...formValues};

        if(cal)
            newFormValues['Date of Birth'] = e;
        else
            newFormValues[e.target.name] = e.target.value;

        setFormValues(newFormValues);

        handleFormValuesUpdate(element, newFormValues, index);
    }

    return (
        <div>
            <div className="mb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        {/* <p className="whole_label">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p> */}
                        <p className="whole_label">Patient Information <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                    </div>
                    <div className="col-md-12">
                        <p className="text-secondary">{element.helpText || ""}</p>

                    </div>
                    <div className="container ">
                        <div className="row">
                            {element.options?.map((dt, i) => {
                                // console.log(dt, "dt")
                                return (
                                    <div key={i} className="col-sm-6 mt-1 justify-content-center">
                                        <div
                                            className={`mb-1`}>
                                                    <p className="py-0">
                                                        {dt}<span style={{ color: "red", fontWeight: "bold" }}> *</span>
                                                    </p>
                                                    {(dt!=='Gender' && dt!=='Contact Information' && dt!=='Relationship Status' && dt!=='Date of Birth' && dt!=='Address') && <input
                                                        type="text"
                                                        className="description_inputForm ps-0 mt-0"
                                                        name={dt}
                                                        maxLength={40}
                                                        value={formValues[dt] || ""}
                                                        // onKeyDown={(e) => setValid(e.key==='Backspace' || (/^[A-Za-z\b]$/i).test(e.key))}
                                                        placeholder=""
                                                        onChange={e => valid && handleChange(e)}
                                                    />}
                                                    {dt=='Contact Information' && <input
                                                        type="number"
                                                        className="description_inputForm ps-0 mt-0"
                                                        name={dt}
                                                        value={formValues[dt] || ""}
                                                        placeholder=""
                                                        onChange={e => (e.target.value>=0 && e.target.value<999_999_999_999_999) && handleChange(e)}
                                                    />}
                                                    {dt=='Address' && <textarea
                                                        type="text"
                                                        className="description_inputForm ps-0 mt-0"
                                                        name={dt}
                                                        maxLength={400}
                                                        value={formValues[dt] || ""}
                                                        placeholder=""
                                                        onChange={e => handleChange(e)}
                                                    />}
                                                    {dt=='Gender' && <select
                                                        name={dt}
                                                        className="description_inputForm ps-0 mt-0"
                                                        value={formValues[dt] || ""}
                                                        onChange={(e) => handleChange(e)}
                                                        >
                                                            <option disabled value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="transgender">Transgender</option>
                                                            <option value="other">Other</option>
                                                        </select>}
                                                    {dt=='Relationship Status' && <select
                                                        name={dt}
                                                        className="description_inputForm ps-0 mt-0"
                                                        value={formValues[dt] || ""}
                                                        onChange={(e) => handleChange(e)}
                                                        >
                                                            <option disabled value="">Select Status</option>
                                                            <option value="single">Single</option>
                                                            <option value="married">Married</option>
                                                        </select>}
                                                    {dt=='Date of Birth' && <DateInput
                                                        imageStyle={{ width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: 0 }}
                                                        inputClassName={"description_inputForm mt-0 d-flex align-items-center ps-2 mb-0"}
                                                        value={calenderDate}
                                                        name={dt}
                                                        onChangeDate={(date) => {
                                                            setCalenderDate(date);
                                                            handleChange(formatISO(date), true);
                                                        }}
                                                    />}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default InfoTemplateView