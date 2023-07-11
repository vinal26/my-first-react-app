import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "../../../commonComponent/TimePicker";
const TimeView = ({ handleFormValuesUpdate, element, index }) => {
    const navigate = useNavigate();
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [timeValue, setTimeValue] = useState(element.answer ? element.answer : "")
    const [formValues, setFormValues] = useState([])

    let handleChange = (time) => {
        let newFormValues = "";
        newFormValues = time;
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
                        <TimePicker
                            value={timeValue ? timeValue : null}
                            visibility={showTimePicker}
                            onChangeDate={(time) => {
                                setTimeValue(time);
                                handleChange(time)
                            }}
                            onDone={() => setTimePickerVisible(false)}>
                            <span onClick={() => setTimePickerVisible(!showTimePicker)}>
                                <input
                                    placeholder="--:--"
                                    disabled
                                    className="description_inputMedi px-0"
                                    value={timeValue}
                                />
                                <img src="images/clock.png" className="clock_icon mt-2" alt="" />
                            </span>
                        </TimePicker>
                    </div>
                    {/* <div className="col-md-12 mb-2 mt-4">
                        <button className="description_btnsave justify-content-end flex-end">Done</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default TimeView;
