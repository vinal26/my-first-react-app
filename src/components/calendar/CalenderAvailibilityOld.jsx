import { addDays, addMonths, differenceInDays, format, parse, startOfMonth, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import Select from "react-select";
import { addAvailability, getAvailability } from "../../services/DoctorService";
import ToastBox from "../../commonComponent/ToastBox";
import { changeDateFormat, showToastError, showToastSuccess } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import { timezone, toastMsg } from "../../Utils/AllConstant";
import EventViewModal from "./EventViewModal";
import DateInput from "../../commonComponent/CutomDatePicker";
import Loader from "../../commonComponent/Loader";

const CalenderAvailabilityOld = () => {
    // console.log(addMonths(startOfMonth(new Date()),3));
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [currency, setCurrency] = useState("")
    const [price, setPrice] = useState("")
    const [appointmentType, setAppointmentType] = useState("")
    const [location, setLocation] = useState("")
    const [startTime24, setStartTime24] = useState("")
    const [endTime24, setEndTime24] = useState("")
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [showEndTimePicker, setEndTimePickerVisible] = useState(false);
    const [duration, setDuration] = useState("")
    const [durationObject, setDurationObject] = useState("")
    const [timeZoneObject, setTimeZoneObject] = useState({})
    const [weekDays, setWeekDays] = useState([])
    const [disabledDates, setDisabledDates] = useState([])
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [daysDatesError, setDaysDatesError] = useState(false);
    const [availabilityList, setAvailabilityList] = useState([]);
    const [isLoading, setLoader] = useState(true);

    const getAvailabilityList = async () => {
        try {
            let dates = [];
            getAvailability().then(response => {
                if (response.status === 200) {
                    console.log(response?.data?.data[0], "availability")
                    //console.log(response?.data?.data[0]?.availability_details);
                    response?.data?.data[0]?.availability_details.map((dt) => {
                        let start = parse(dt.start_date, 'yyyy-MM-dd', new Date())
                        let end = parse(dt.end_date, 'yyyy-MM-dd', new Date())
                        let diff = Math.abs(differenceInDays(start, end));
                        for (let i = 0; i <= diff; i++) {
                            dates.push(addDays(start, i));
                        }
                    })
                } else {
                    alert(response?.data || response.message);
                }
            }).then(_ => {
                //console.log(dates);
                setDisabledDates(dates);
            }).finally(_ => {
                setLoaded(true);
            });
        } catch (error) {
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        getAvailabilityList();
        setTimeZoneObject(timezone[0])
    }, [])

    const startTimeSetting = (date12, date24) => {
        setStartTime(date12);
        const myArray = date24.split(":");
        if (myArray[0] < 10) { date24 = "0" + date24; }
        setStartTime24(date24)
    }

    const endTimeSetting = (date12, date24) => {
        setEndTime(date12);
        const myArray = date24.split(":");
        if (myArray[0] < 10) { date24 = "0" + date24; }
        setEndTime24(date24)
    }

    const [toastShow, setToastShow] = useState(false);
    const [dateVal, setdateVal] = useState(false)
    const [weekVal, setweekVal] = useState(false)

    const checkDaysDates = () => {
        if (!startDate || !endDate || weekDays.length == 0) {
            setDaysDatesError(false); return
        }
        let week_days = weekDays.map(dt => { return dt.value })
        let start = parse(startDate, 'yyyy-MM-dd', new Date())
        let end = parse(endDate, 'yyyy-MM-dd', new Date())
        let diff = Math.abs(differenceInDays(start, end));
        let result = false;
        let format_add_val = 0;
        for (let i = 0; i <= diff; i++) {
            format_add_val = format(addDays(start, i), 'i').toString();
            if (format_add_val == 7) { format_add_val = '0'; }
            if (week_days.includes(format_add_val)) { result = true; break; };
        }
        if (!result) { setDaysDatesError(true) } else { setDaysDatesError(false) }
        return result;
    }
    const getDate = (date) => {
        try {
            if (date && new Date(date) != 'Invalid Date') {
                return new Date(date)
            }
            return new Date()
        } catch (error) {
            console.log('error', error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startTime ||
            !endTime ||
            !duration ||
            !startDate ||
            !endDate ||
            !timeZoneObject.value ||
            weekDays.length == 0 ||
            ((new Date('1/1/2022 ' + endTime) - new Date('1/1/2022 ' + startTime)) < 1) ||
            !checkDaysDates()) {
            setError(true)
            checkDaysDates()
        }
        else {
            setError(false);
            let addObject = {
                "availability_details": [
                    {
                        "start_date": startDate,
                        "end_date": endDate,
                        "shift_start": `${startTime24}:00`,
                        "shift_end": `${endTime24}:00`,
                        "duration": duration,
                        "daysofweek": weekDays.map(dt => { return dt.value }),
                        "timezone": timeZoneObject?.value
                    }
                ]
            }

            //  console.log(addObject);
            //  return;

            try {
                const response = await addAvailability(addObject);
                if (response.status === 200) {
                    //console.log(response?.data);
                    showToastSuccess(`Successfully Saved!`);
                    setToastShow(true);
                    resetValues();
                } else {
                    showToastError(response?.data || response.message || toastMsg.errorMssg)
                }
            } catch (error) {
                showToastError(error?.data?.data || error.data?.message || toastMsg.errorMssg)
            }
        }
    }

    const resetValues = () => {
        setweekVal(false);
        setdateVal(false);
        setStartDate("");
        setEndDate("");
        setWeekDays([]);
        setLoaded(false);
        getAvailabilityList();
        setStartTime("");
        setEndTime("");
        setStartTime24("");
        setEndTime24("");
        setError(false);
        setDuration("");
        setDurationObject("")
        setTimeZoneObject(timezone[0])
    }


    return (
        <>
            {/* <hr /> */}
            <form onSubmit={handleSubmit}>
                <div className="row mx-4 mt-3" >
                    <div className="col-md-12">
                        {/* <div className="card h-100">
              <div className="card-body"> */}
                        <p className="text-secondary my-4 px-4 ">Start<span className="text-lowercase"> by setting your services and available times.</span>This<span className="text-lowercase">  will allow your clients to set appointments with you.</span></p>

                        {/* {loaded ? <DateRange
              className="available_calender"

              editableDateInputs={false}
              minDate={new Date()}
              maxDate={subDays(addMonths(startOfMonth(new Date()), 3), 1)}
              rangeColors={["#1f7e78"]}
              disabledDates={disabledDates}
              showMonthAndYearPickers={false}
              onChange={item => {
                setStartDate(format(item.selection.startDate, 'yyyy-MM-dd'));
                setEndDate(format(item.selection.endDate, 'yyyy-MM-dd'));
                setState([item.selection])
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
            /> : <p>Checking Availability...</p>}
            {error && (startDate === "" && endDate === "") && <h6 className="text-danger error" style={{ padding: "10px" }}>Please select start date and end date</h6>}
          </div> */}

                        {/* </div>
          </div> */}
                        {/* <div className="col-md-6"> */}
                        {/* <div className="card h-100 mt-3 mt-md-0">
              <div className="card-body py-4 px-md-5"> */}
                        <div className="d-flex justify-content-space-between mt-4">
                            <div className="col-md-6 px-4 ">
                                <p className="whole_label">Appointment Type</p>
                                <Select
                                    placeholder={"Select appointment type"}
                                    value={appointmentType}
                                    // options={[{ 'value': '0', 'label': 'Group Session' }, { 'value': '1', 'label': 'Video/Audio/Chat Session' }, { 'value': '2', 'label': 'Video Session' }, { 'value': '3', 'label': 'Chat' }]}
                                    options={[{ 'value': '0', 'label': 'Group Session' }, { 'value': '1', 'label': 'Video/Audio/Chat Session' }]}
                                    onChange={(opt, meta) => {
                                        setAppointmentType(opt);
                                    }}
                                />
                                {/* {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
                            </div>

                            <div className="col-md-6 px-4">
                                <p className="whole_label">Available <span className="text-lowercase">days of the week</span></p>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    placeholder={"Select week days"}
                                    value={weekDays}
                                    options={[{ 'value': '0', 'label': 'Sunday' }, { 'value': '1', 'label': 'Monday' }, { 'value': '2', 'label': 'Tuesday' }, { 'value': '3', 'label': 'Wednesday' }, { 'value': '4', 'label': 'Thursday' }, { 'value': '5', 'label': 'Friday' }, { 'value': '6', 'label': 'Saturday' }]}
                                    onChange={(opt, meta) => {
                                        setWeekDays(opt);
                                    }}
                                />
                                {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="d-flex justify-content-space-between">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-space-between">
                                    <div className="col-md-6 px-4">
                                        <p className="whole_label">Price</p>
                                        <input
                                            type="number"
                                            className="description_inputf"
                                            value={price}
                                        // onChange={(e) => {
                                        //     setProgramNameCreate(e.target.value)
                                        //     setError({ ...error, name: false })
                                        // }}
                                        />
                                    </div>
                                    <div className="col-md-6 px-4">
                                        <p className="whole_label">Currency</p>
                                        <Select
                                            value={currency}
                                            options={[{ 'value': '0', 'label': 'USD' }]}
                                            onChange={(opt, meta) => {
                                                setCurrency(opt);
                                            }}
                                        />
                                        {/* {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                    {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="d-flex justify-content-space-between">
                                    <div className="col-md-6 px-4 ">
                                        <p className="whole_label">start <span className="text-lowercase">time</span></p>

                                        <TimePicker
                                            value={startTime ? startTime : null}
                                            visibility={showTimePicker}
                                            onChangeDate={startTimeSetting}
                                            onDone={() => setTimePickerVisible(false)}>
                                            <span onClick={() => setTimePickerVisible(!showTimePicker)}>
                                                <input
                                                    required
                                                    placeholder="--:--"
                                                    disabled
                                                    className="description_inputf"
                                                    value={startTime}
                                                />
                                                <img src="images/clock.png" className="clock_icon" />
                                            </span>
                                        </TimePicker>

                                        {error && !startTime && <h6 className="text-danger error">Please add start time</h6>}
                                    </div>
                                    <div className="col-md-6 px-4" >
                                        <p className="whole_label">End <span className="text-lowercase">time</span></p>


                                        <TimePicker
                                            value={endTime ? endTime : null}
                                            visibility={showEndTimePicker}
                                            onChangeDate={endTimeSetting}
                                            onDone={() => setEndTimePickerVisible(false)}>
                                            <span onClick={() => setEndTimePickerVisible(!showEndTimePicker)}>
                                                <input
                                                    required
                                                    placeholder="--:--"
                                                    disabled
                                                    className="description_inputf"
                                                    value={endTime}
                                                />
                                                <img src="images/clock.png" className="clock_icon" />
                                            </span>
                                        </TimePicker>
                                        {error && !startTime && <h6 className="text-danger error">Please add end time</h6>}
                                        {startTime &&
                                            endTime &&
                                            ((new Date('1/1/2022 ' + endTime) - new Date('1/1/2022 ' + startTime)) < 1)
                                            && <h6 className="text-danger error">Please enter correct end time</h6>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="d-flex justify-content-space-between">
                                <div className="col-md-6 px-4">
                                    {/* <div className="d-flex justify-content-space-between"> */}
                                    <p className="whole_label">Location</p>
                                    <Select
                                        value={location}
                                        options={[{ 'value': '0', 'label': 'Zoom' }, { 'value': '1', 'label': 'In person' }]}
                                        onChange={(opt, meta) => {
                                            setLocation(opt);
                                        }}
                                    />
                                    {/* <input
                    type="text"
                    className="description_inputf"
                    value={location}
                  onChange={(e) => {
                      setProgramNameCreate(e.target.value)
                      setError({ ...error, name: false })
                  }}
                  /> */}
                                    {/* <div className="col-md-6 px-4 ">
                      <p className="whole_label">Start Date</p>
                      <DateInput
                        value={getDate(startDate) || ''}
                        // onChangeDate={(date) => {
                        //   setStartDate(date);
                        //   setError({ ...error, start_date: false })
                        // }}
                        minDate={new Date()}
                        // maxDate={programProps.end_date === endDate ? '' : getDate(endDate)}
                        inputClassName={"description_inputf d-flex mb-0 align-items-center"} />
                    </div>
                    <div className="col-md-6 px-4" >
                      <p className="whole_label">End Date</p>
                      <DateInput
                        value={getDate(endDate) || ''}
                        // onChangeDate={(date) => {
                        //   setStartDate(date);
                        //   setError({ ...error, start_date: false })
                        // }}
                        minDate={new Date()}
                        // maxDate={programProps.end_date === endDate ? '' : getDate(endDate)}
                        inputClassName={"description_inputf d-flex mb-0 align-items-center"} />
                    </div> */}
                                    {/* </div> */}
                                </div>


                                <div className="col-md-6 px-4">
                                    <p className="whole_label">duration</p>
                                    <Select
                                        placeholder={"Select Duration"}
                                        value={durationObject}
                                        options={[{ 'value': '00:15:00', 'label': '15 Minutes' },
                                        { 'value': '00:30:00', 'label': '30 Minutes' },
                                        { 'value': '00:45:00', 'label': '45 Minutes' },
                                        { 'value': '01:00:00', 'label': '1 Hour' }]}
                                        onChange={(opt) => {
                                            setDurationObject(opt)
                                            setDuration(opt.value);
                                        }}
                                    />
                                    {error && !duration && <h6 className="text-danger error">Please add duration</h6>}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-space-between ">
                            <div className="col-md-6 px-4 ">
                                <p className="whole_label">Form</p>
                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    // value={weekDays}
                                    // options={[{ 'value': '0', 'label': 'Sunday' }, { 'value': '1', 'label': 'Monday' }, { 'value': '2', 'label': 'Tuesday' }, { 'value': '3', 'label': 'Wednesday' }, { 'value': '4', 'label': 'Thursday' }, { 'value': '5', 'label': 'Friday' }, { 'value': '6', 'label': 'Saturday' }]}
                                    onChange={(opt, meta) => {
                                        setWeekDays(opt);
                                    }}
                                />
                                {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>}
                            </div>

                            <div className="col-md-6 px-4">
                                <p className="whole_label">Timezone</p>
                                <Select
                                    placeholder={"Select Duration"}
                                    value={timeZoneObject}
                                    options={timezone}
                                    onChange={(opt) => {
                                        setTimeZoneObject(opt)
                                    }}

                                />
                                {error && !timeZoneObject && <h6 className="text-danger error">Please select timezone</h6>}
                            </div>
                        </div>
                        {/* <div className="d-flex justify-content-space-between ">
              <div className="col-md-6 px-4 ">
                <p className="whole_label">Form</p>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  // value={weekDays}
                  options={[{ 'value': '0', 'label': 'Sunday' }, { 'value': '1', 'label': 'Monday' }, { 'value': '2', 'label': 'Tuesday' }, { 'value': '3', 'label': 'Wednesday' }, { 'value': '4', 'label': 'Thursday' }, { 'value': '5', 'label': 'Friday' }, { 'value': '6', 'label': 'Saturday' }]}
                  onChange={(opt, meta) => {
                    setWeekDays(opt);
                  }}
                />
                {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>}
              </div> */}

                        {/* </div> */}

                    </div>
                </div>
                <div className="col-md-12 mt-4 px-4">
                    <button type="submit" className="update_btncalender">Save <span className="text-lowercase">availability</span></button>
                </div>



                {/* </div>
        </div> */}
            </form>
            <hr />
            <div className="d-flex">
                <div className="col-md-12">
                    <h5 className="px-4 mb-3">Availability</h5>
                </div>

            </div>

            <div className="table_resouter upcoming_scroll_div">
                {/* {isLoading ? (<center>
          <Loader visible={isLoading}
            style={{ top: "-15px", position: "relative" }} /> </center>)
          : availabilityList.length ? ( */}
                <table className="table appointment_table1 table_resinner2 ">
                    <thead>
                        <tr className="text-center">
                            <th scope="col" style={{ width: "280px" }}>Appointment Type</th>
                            <th scope="col">time</th>
                            <th scope="col">location</th>
                            <th scope="col">days</th>
                            {/* <th scope="col">services</th> */}
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody className="mb-5 appointment_table1 no-border table_resinner2">
                        {/* {availabilityList.length && availabilityList?.map(dt => {
                      console.log(dt.booking_date, "booking_date")
                      let changeDateFormat = dt?.booking_date?.split("-")
                       return   */}
                        <tr
                            // key={dt._id} 
                            className="text-center mt-5">
                            <td>
                                Video
                                {/* {dt.full_name && dt.full_name} */}
                            </td>
                            <td style={{
                                width: "130px"
                            }}>3:00
                                {/* {dt.age && dt.age} */}
                            </td>
                            <td style={{
                                width: "130px"
                            }}>
                                Zoom
                                {/* {dt.gender && dt.gender} */}
                            </td>
                            {/* <td>
                {`${changeDateFormat[1]}-${changeDateFormat[2]}-${changeDateFormat[0]}`}
              </td> */}
                            <td className="text_unset">Mon/Tue
                                {/* {dt.time} */}
                            </td>
                            <td>
                                <button
                                    // onClick={() => onStartSession(dt?.sessionLink_doctor)} 
                                    // onClick={() => setModalShow(true)}
                                    className="start_call">
                                    <span>View</span>
                                </button>
                                <button className="appointment_cancel ms-2"
                                //   onClick={() => updateBooking({ "bookingId": dt._id, "status": "cancelled" })}
                                >
                                    <span>cancel</span>
                                </button>
                            </td>

                        </tr>
                        {/* } */}
                        {/* )} */}
                    </tbody>
                </table>
                {/* ) : (<div className="card p-2"><div className="card-body">There are currently no appointments.</div></div>)} */}

            </div>


        </>
    );
};

export default CalenderAvailabilityOld;
