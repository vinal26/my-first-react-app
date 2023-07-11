import { addDays, addMonths, differenceInDays, format, parse, startOfMonth, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import Select from "react-select";
import { addAvailability, getAvailability, getAvailableSlots } from "../../services/DoctorService";
import ToastBox from "../../commonComponent/ToastBox";
import { formatAMPM, showToastError, showToastSuccess } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import { timezone, toastMsg } from "../../Utils/AllConstant";
import DateInput from "../../commonComponent/CutomDatePicker";
import { Button } from "bootstrap";
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import EventViewModal from "./EventViewModal";
import AssignClients from "./AssignClients";
import AssignGroups from "./AssignGroups";
import { ImCross, ImFileText2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../commonComponent/DeleteModal";
import { getServiceList } from "../../services/MyService";



const MyEvents = () => {
    // console.log(addMonths(startOfMonth(new Date()),3));
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [eventDate, setEventDate] = useState(new Date())
    const [eventFee, setEventFee] = useState("")
    const [eventTitle, setEventTitle] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventNotes, setEventNotes] = useState("")
    const [endTime, setEndTime] = useState("")
    const [startTime24, setStartTime24] = useState("")
    const [endTime24, setEndTime24] = useState("")
    const [showTimePicker, setTimePickerVisible] = useState(false);
    const [showEndTimePicker, setEndTimePickerVisible] = useState(false);
    const [duration, setDuration] = useState("")
    const [appointmentType, setAppointmentType] = useState("")
    const [frequency, setFrequency] = useState("")
    const [durationObject, setDurationObject] = useState("")
    const [timeZoneObject, setTimeZoneObject] = useState({})
    const [weekDays, setWeekDays] = useState([])
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setLoader] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [service, setService] = useState([]);

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

    const getMyServiceList = async () => {
        try {
          const response = await getServiceList();
          setLoader(false)
          if (response.status === 200) {
            setServiceList(response?.data?.data);
          }
        } catch (error) {
          setLoader(false)
        }
      };

      useEffect(() => {
        // getAvailabilityList();
        // getTodaysBookingList(initialDate);
        // setTimeZoneObject(timezone[0]);
        // getTimeSlots(initialDate);
        getMyServiceList()
      }, [])

    const [toastShow, setToastShow] = useState(false);
    const [dateVal, setdateVal] = useState(false)
    const [weekVal, setweekVal] = useState(false)

    const [timeList, setTimeList] = useState([]);

    function formatTime(time) {
        var arr1 = time.split("-")
        setEndTime(arr1[1]);
    }
    const getTimeSlots = async (type) => {
        try {
            const response = await getAvailableSlots({ "date": format(eventDate, "yyyy-MM-dd"), "type": type });
            if (response.status === 200) {
                // console.log(response, "booking data");
                setTimeList(response.data.data.length > 0 ? response?.data?.data : []);
            } else {
                alert(response?.data || response.message);
            }
            //    setLoader(false)
        } catch (error) {
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }
    const availableTimings = () => {
        const options = timeList.map((dt) => {
            return {
                value: formatAMPM(dt.start) + "-" + formatAMPM(dt.end),
                label: formatAMPM(dt.start)
            }
        });
        return options || [];
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
            ((new Date('1/1/2022 ' + endTime) - new Date('1/1/2022 ' + startTime)) < 1)
            // !checkDaysDates()
        ) {
            setError(true)
            // checkDaysDates()
        }
        else {
            setError(false);



            try {
                const response = await addAvailability();
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
            <form
            // onSubmit={handleSubmit}
            >
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="px-1 mb-3">Add Events</h4>
                        <div style={{ backgroundColor: "#fff", padding: "10px" }}>
                            <div className="col-md-12">
                                <p className="whole_label">title</p>
                                <input
                                    type="text"
                                    className="description_inputf"
                                    value={eventTitle}
                                    maxLength={50}
                                    onChange={(e) => {
                                        setEventTitle(e.target.value)
                                        // setError({ ...error, name: false })
                                    }}
                                />
                                {/* {renderError('Please enter name', error.name)} */}
                            </div>

                            <div className="col-md-12">
                                <p className="whole_label">description</p>
                                <textarea
                                    rows="6"
                                    type="text"
                                    className="description_inputf description_descpf is-invalid"
                                    value={eventDescription}
                                    maxLength={300}
                                    onChange={(e) => {
                                        // setError({ ...error, description: false })
                                        setEventDescription(e.target.value)
                                    }}
                                />
                                {/* {renderError('Please enter description', error.description)} */}
                            </div>
                            <div className="d-flex ">
                                <div className="col-md-4 ml-2">
                                    <p className="whole_label">Service <span className="text-lowercase">Type</span></p>
                                    <Select
                                        // isMulti
                                        // closeMenuOnSelect={false}
                                        placeholder={"Select"}
                                        value={appointmentType}
                                        options={[{ 'value': 'session', 'label': 'Individual Session' }, { 'value': 'group', 'label': 'Group Session' }]}
                                        onChange={(opt, meta) => {
                                            getTimeSlots(opt.value);
                                            setAppointmentType(opt);
                                        }}
                                    />
                                    {error && appointmentType.length === 0 && <h6 className="text-danger  error">Please select appointment type</h6>}
                                    {/* {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
                                </div>
                                <div className="col-md-4 px-4">
                                    <p className="whole_label">Service Title</p>
                                    <Select
                placeholder={"Select a service"}
                value={service}
                options={serviceList.map(dt => { return {label: dt.serviceName, value: dt._id}})}
                onChange={(opt) => {
                  setService(opt)
                }}
              />
                                    {/* {error && frequency.length === 0 && <h6 className="text-danger  error">Please select frequency</h6>} */}
                                    {/* {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
                                </div>
                                <div className="col-md-4 px-1">
                                    <p className="whole_label">Fee</p>
                                    <input
                                        type="number"
                                        className="description_inputf"
                                        placeholder="$000"
                                        value={eventFee}
                                        onChange={(e) => {
                                            setEventFee(e)
                                            // setError({ ...error, name: false })
                                        }}
                                    />
                                    {error && eventFee && <h6 className="text-danger  error">Please add event fee</h6>}
                                    {/* {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-md-4">
                                    <p className="whole_label">date</p>
                                    <DateInput
                                        value={eventDate}
                                        onChangeDate={(date) => {
                                            setEventDate(date)
                                            // setError({ ...error, start_date: false })

                                        }}
                                        // maxDate={endDateCreate}
                                        minDate={new Date()}
                                        inputClassName={"description_inputf d-flex align-items-center"} />
                                    {/* {error.start_date ?
                                    <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: 7 }}>
                                        {'Please select start date'}
                                    </h6> : null} */}
                                </div>
                                <div className="col-md-4 px-4">
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
                                        // disabled
                                        className="description_inputf"
                                        value={startTime}
                                        />
                                        <img src="images/clock.png" className="clock_icon" />
                                    </span>
                                    </TimePicker>

                                    {error && !startTime && <h6 className="text-danger error">Please add start time</h6>}
                                </div>

                                <div className="col-md-4 px-1">
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
                                        // disabled
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

                            {/* <div className="col-md-12">
                    {startTime && 
                    endTime && 
                    ( (new Date('1/1/2022 '+endTime)-new Date('1/1/2022 '+startTime))< 1) 
                    && <h6 className="text-danger error">Please enter correct start and end time</h6>}
                  </div> */}
                            <div className="col-md-12">
                                <p className="whole_label">Add Location</p>
                                <div className="btn-group margin_top_20">
                                    <p className="affir_checkbox">
                                        <input
                                            type="checkbox"
                                        //   checked={lifeStyleDetail?.relax?.dailyInput || false}
                                        />
                                    </p>
                                    <p className="affir_checkbox" style={{ fontSize: 16, color: "#156563" }}>{"Create zoom meeting link"}</p>
                                </div>
                                <textarea
                                    type="text"
                                    className="description_inputf description_descpf is-invalid"
                                    placeholder="Type physical address or leave blank if online only"
                                    value={eventLocation}
                                    onChange={(e) => {
                                        // setError({ ...error, description: false })
                                        setEventLocation(e.target.value)
                                    }}
                                />
                                {/* {renderError('Please enter description', error.description)} */}
                            </div>
                            <div className="col-md-12 mb-4">
                                <p className="whole_label">Invite participants</p>
                                <div className="d-flex justify-content-space-between">
                                    <div className="col-md-6">
                                        <button type="button" disabled={appointmentType === "group" ? true : false} className="btn btn-primary btn-custom-light-modal1 w-100 " data-bs-toggle="modal" data-bs-target="#assignclientsmodal">
                                            <AiOutlinePlus /> Add Clients
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary btn-custom-light-modal1 mx-2" style={{ width: "98%" }} data-bs-toggle="modal" data-bs-target="#assigngroupsmodal">
                                            <AiOutlinePlus />  Add Groups
                                        </button>
                                    </div>
                                </div>
                                <AssignClients />
                                <AssignGroups />
                            </div>
                            <div className="col-md-12">
                                <p className="whole_label">Notes to attendees</p>
                                <textarea
                                    rows="6"
                                    type="text"
                                    maxLength={500}
                                    className="description_inputf description_descpf is-invalid"
                                    placeholedr="Write here"
                                    value={eventNotes}
                                    onChange={(e) => {
                                        // setError({ ...error, description: false })
                                        setEventNotes(e.target.value)
                                    }}
                                />
                                {/* {renderError('Please enter description', error.description)} */}
                            </div>
                           <div className="col-md-12">                         
                                <p className="affir_checkbox" style={{ fontSize: 16, color: "#156563" }}> <input
                                        type="checkbox"
                                    //   checked={lifeStyleDetail?.relax?.dailyInput || false}
                                    />{"Send a notification to participants"} <button type="submit" className="description_btnsave float-end">Submit</button></p>
                           </div>
                        </div>                     
                    </div>
                </div>
            </form>

            <hr />
            <div className="row">
                <div className="col-md-8">
                    <h4 className="mb-3">Upcoming Events</h4>
                </div>
                <div className="col-md-4">
                    <div className="row">
                    <div className="col-md-4">
                        <button className="description_btntoday w-100" style={{
                            backgroundColor: "#1f7e78",
                            borderColor: "#1f7e78",
                        }}>Today</button>
                    </div>
                    <div className="col-md-8">
                        <DateInput
                            // value={startDateCreate}
                            // onChangeDate={(date) => {
                            //     setStartDateCreate(date)
                            //     setError({ ...error, start_date: false })

                            // }}
                            // maxDate={endDateCreate}
                            minDate={new Date()}
                            inputClassName={"description_inputf d-flex align-items-center"} />
                    </div>
                    </div>
                </div>
            </div>
            <div className="table_resouter upcoming_scroll_div">
                {/* {isLoading ? (<center>
                    <Loader visible={isLoading}
                        style={{ top: "-15px", position: "relative" }} /> </center>)
                    : BookingList.length ? ( */}
                <table className="table appointment_table1 table_resinner2 ">
                    <thead>
                        <tr className="text-center">
                            <th scope="col" style={{ width: "280px" }}>title</th>
                            <th scope="col">date</th>
                            <th scope="col">time</th>
                            <th scope="col">location</th>
                            <th scope="col">service</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody className="mb-5 ">
                        {/* {BookingList.length && BookingList?.map(dt => { */}
                        {/* //     console.log(dt.booking_date, "booking_date")
                            //     let changeDateFormat = dt?.booking_date?.split("-")
                            //     return  */}
                        <tr
                            // key={dt._id} 
                            className="text-center mt-5">
                            <td>
                                new event
                                {/* {dt.full_name && dt.full_name} */}
                            </td>
                            <td style={{
                                width: "80px"
                            }}>23-04-2023
                                {/* {dt.age && dt.age} */}
                            </td>
                            <td style={{
                                width: "130px"
                            }}>02:30AM
                                {/* {dt.gender && dt.gender} */}
                            </td>
                            <td>Zoom link
                                {/* {`${changeDateFormat[1]}-${changeDateFormat[2]}-${changeDateFormat[0]}`} */}
                            </td>
                            <td className="text_unset">Gut relief
                                {/* {dt.time} */}
                            </td>
                            <td>
                                <button
                                    // onClick={() => onStartSession(dt?.sessionLink_doctor)} 
                                    className="btn btn-light me-2">
                                    <span><ImFileText2 className="mb-1 " /></span>
                                </button>
                                <button
                                    onClick={() => { navigate('/viewevent') }}
                                    // onClick={() => onStartSession(dt?.sessionLink_doctor)} 
                                    className="btn btn-light">
                                    <span><AiFillEye className="mb-1 " /></span>
                                </button>
                                <button className="btn btn-light ms-2" data-bs-toggle="modal" data-bs-target="#deleteEvent"
                                //   onClick={() => updateBooking({ "bookingId": dt._id, "status": "cancelled" })}
                                >
                                    <span><ImCross /></span>
                                </button>
                            </td>

                        </tr>


                        {/* }
                        )} */}
                    </tbody>
                </table>
                {/* ) : (<div className="card p-2"><div className="card-body">There are currently no appointments.</div></div>)} */}

            </div>
            <DeleteModal
                title={'Delete'}
                content1={'Are you sure, you want to cancel'}
                content2={'this event?'}
                modalId={'deleteEvent'}
                button2={'No'}
                button1={'Yes'}
            //   onDelete={() => deleteMember(memberId)}
            />
            <EventViewModal
                // gname={state?.selectedGroup?.groupName}
                // gid={state?.selectedGroup?._id}
                show={modalShow}
                // getGroupPosts={getGroupPosts}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default MyEvents;
