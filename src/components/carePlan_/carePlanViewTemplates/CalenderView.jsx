import { formatISO, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateInput from "../../../commonComponent/CutomDatePicker";
const CalenderView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const [calenderDate, setCalenderDate] = useState(element.answer ? parseISO(element.answer) : "")
    const [formValues, setFormValues] = useState([])

    let handleChange = (date) => {
        let newFormValues = "";
        newFormValues = date;
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
            <div className="mb-2">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <p className="whole_label" id="transformNone">{element.title || ""} <span style={{ color: "red", fontWeight: "bold" }}>*</span></p>
                        <DateInput
                            imageStyle={{ width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: 0 }}
                            inputClassName={"description_inputMedi d-flex align-items-center ps-2 mb-0"}
                            value={calenderDate}
                            onChangeDate={(date) => {
                                setCalenderDate(date);
                                handleChange(formatISO(date));
                            }}
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

export default CalenderView;
