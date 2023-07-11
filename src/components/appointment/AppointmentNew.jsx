import { addDays, addMonths, differenceInDays, format, parse, startOfMonth, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import Select from "react-select";
import { addAvailability, confirmBookingStatus, getAvailability, getBookingByDate, getBookingByStatus, getBookings, getUpcomingBookings, getUpcomingGroupSession, updateBookingStatus } from "../../services/DoctorService";
import ToastBox from "../../commonComponent/ToastBox";
import { changeDateFormat, convertTime12to24, formatAMPM, onStartSession, showToastError, showToastSuccess, validDate } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import { timezone, toastMsg } from "../../Utils/AllConstant";
import DateInput from "../../commonComponent/CutomDatePicker";
import { Button } from "bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import AssignClients from "../carePlan_/AssignClientsModal";
import Avatar from "../../commonComponent/Avatar";
import Loader from "../../commonComponent/Loader";
import { createZoomMeetingService } from "../../services/ZoomService";
import { useNavigate } from "react-router-dom";
import { getUserInfoService } from "../../services/PatientService";
import swal from "sweetalert";
import DeleteModal from "../../commonComponent/DeleteModal";
import { deleteSessionService } from "../../services/ActivePrograms";
// import EventViewModal from "./EventViewModal";

const MyAppointments = () => {
    // console.log(addMonths(startOfMonth(new Date()),3));
    const navigate = useNavigate();
    const [timeZoneObject, setTimeZoneObject] = useState({})
    const [disabledDates, setDisabledDates] = useState([])
    const [loaded, setLoaded] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [BookingList, setBookingList] = useState([]);
    const [UpcomingBookingList, setUpcomingBookingList] = useState([]);
    const [SessionList, setSessionList] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [sessionId, setSessionId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const [programId, setProgramId] = useState("");
    let initialDate = format(new Date(), "yyyy-MM-dd");
    const getBookingList = async (date) => {
        try {
            const response = await getBookingByStatus(date, "pending");
            if (response.status === 200) {
                setBookingList(response?.data?.data.reverse());
            } else {
                showToastError(response?.data || response.message)
            }
        } catch (error) {
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }
    const getTodaysBookingList = async (date) => {
        try {
            const response = await getBookingByStatus(date, "confirmed");
            if (response.status === 200) {
                // console.log(response, "booking data");
                setUpcomingBookingList(response.data.data.length >= 1 ? response?.data?.data : []);
            } else {
                showToastError(response?.data || response.message);
            }
            setLoader(false)
        } catch (error) {
            error?.data?.data && showToastError(error?.data?.data || error.data?.message);
        }
    }
    const deleteSession = async (sessionId) => {
        try {
            const response = await deleteSessionService(sessionId, programId);
            if (response) {
                showToastSuccess(response?.data || 'Session deleted successfully.');
                getSessionList()
            } else {
                showToastError(response?.data || response.message || "Some error occurred")
            }
        } catch (error) {
            showToastError(error?.data?.data || error.data?.message || "Some error occurred")
        }
    }
    const getSessionList = async () => {
        try {
            const response = await getUpcomingGroupSession();
            if (response.status === 200) {
                // const result = response?.data?.data?.filter((value) => {
                //     if (changeDateFormat(value?.sessionDate) < changeDateFormat(new Date())) {

                //         return (
                //             value
                //         );
                //     }
                // });
                // setSessionList(result);
                setSessionList(response?.data?.data);
            } else {
                showToastError(response?.data || response.message);
            }
            setLoader(false);
        } catch (error) {
            error?.data?.data && showToastError(error?.data?.data || error.data?.message);
        }
    }

    const getAvailabilityList = async () => {
        try {
            let dates = [];
            getAvailability().then(response => {
                if (response.status === 200) {
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
    const createMeeting = async (request) => {
        try {
            // const time24h = request?.time?.split('-')?.[0]?.trim();
            const params = {
                "topic": "Doctor appointment",
                "type": 2,
                "start_time": request.startTime,
                "duration": "30",
                "settings": {
                    "host_video": true,
                    "participant_video": true,
                    "join_before_host": true,
                    "mute_upon_entry": "true",
                    "watermark": "true",
                    "audio": "voip",
                    "auto_recording": "cloud",
                    "email_notification": true,
                    "registrants_email_notification": true,
                    "meeting_invitees": [
                        {
                            "email": request?.userId?.email
                        }
                    ],
                }
            }
            const meetingResponse = await createZoomMeetingService(params);
            if (meetingResponse) {
                return meetingResponse;
            }
        } catch (error) {
            if (error?.data?.data) {
                navigate('/myprofile');
                showToastError(error?.data?.data || error.data?.message || "Some error occurred")
            }
        }
    }
    const updateAppointmentBooking = async (payload) => {
        try {
            const response = await confirmBookingStatus(payload);
            if (response.status === 200) {
                showToastSuccess(response?.data?.message)
                getTodaysBookingList(initialDate);
            } else {
                showToastError(response?.data || response.message)
            }
        } catch (error) {
            error?.data?.data && showToastError(error?.data?.data || error.data?.message)
        }
    }

    const updateBooking = async (payload, request) => {
        try {
            if (payload.status === 'confirmed') {
                const meetingResponse = await createMeeting(request);
                if (meetingResponse) {
                    payload.sessionLink_doctor = meetingResponse.start_url;
                    payload.sessionLink_user = meetingResponse.join_url;
                    const response = await confirmBookingStatus(payload);
                    if (response.status === 200) {
                        showToastSuccess(response?.data?.data)
                        getBookingList(initialDate);
                        getTodaysBookingList(initialDate);
                    } else {
                        showToastError(response?.data || response.message);
                    }
                }
            }
            else {
                const response = await confirmBookingStatus(payload);
                if (response.status === 200) {
                    showToastSuccess(response?.data?.data)
                    getBookingList(initialDate);
                    getTodaysBookingList(initialDate);
                } else {
                    showToastError(response?.data || response.message);
                }
            }
        } catch (error) {
            error?.data?.data && showToastError(error?.data?.data || error.data?.message)
        }
    }

    useEffect(() => {
        getSessionList();
        getBookingList(initialDate);
        getTodaysBookingList(initialDate);
        getAvailabilityList();
        setTimeZoneObject(timezone[0])
    }, [])
    const getUserData = async (user_id) => {
        if (user_id == '') { return; }

        try {
            const response = await getUserInfoService(user_id);
            if (response.status === 200) {
                console.log(response?.data?.data[0]);
                return response?.data?.data[0];
            }
        } catch (error) {

        }
    }


    return (
        <>
            {/* <hr /> */}
            {/* hidden for now */}
            {/* <form onSubmit={handleSubmit}>
                <div className="row" style={{ backgroundColor: "#f5f5f5", padding: "10px" }}>
                    <div className="col-md-12">
                        <h4 className="px-4 mb-3">Booking</h4>
                        <hr />
                        <div style={{ backgroundColor: "#fff", padding: "10px" }}>
                            <div className="d-flex ">
                                <div className="col-md-4 ml-2">
                                    <p className="whole_label">Booking <span className="text-lowercase">Type</span></p>
                                    <Select
                                        isMulti
                                        closeMenuOnSelect={false}
                                        placeholder={"Select"}
                                        value={weekDays}
                                        options={[{ 'value': '0', 'label': 'Sunday' }, { 'value': '1', 'label': 'Monday' }, { 'value': '2', 'label': 'Tuesday' }, { 'value': '3', 'label': 'Wednesday' }, { 'value': '4', 'label': 'Thursday' }, { 'value': '5', 'label': 'Friday' }, { 'value': '6', 'label': 'Saturday' }]}
                                        onChange={(opt, meta) => {
                                            setWeekDays(opt);
                                        }}
                                    />
                                    {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                    {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>}
                                </div>
                                <div className="col-md-4 px-4">
                                    <p className="whole_label">Reason for booking</p>
                                    <Select
                                        isMulti
                                        closeMenuOnSelect={false}
                                        placeholder={"Select"}
                                        value={weekDays}
                                        options={[{ 'value': '0', 'label': 'Sunday' }, { 'value': '1', 'label': 'Monday' }, { 'value': '2', 'label': 'Tuesday' }, { 'value': '3', 'label': 'Wednesday' }, { 'value': '4', 'label': 'Thursday' }, { 'value': '5', 'label': 'Friday' }, { 'value': '6', 'label': 'Saturday' }]}
                                        onChange={(opt, meta) => {
                                            setWeekDays(opt);
                                        }}
                                    />
                                    {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                    {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>}
                                </div>
                                <div className="col-md-4 px-1">
                                    <p className="whole_label">Add Participants</p>
                                    <button type="button" className="btn btn-primary btn-custom-light-modal1 w-100" data-bs-toggle="modal" data-bs-target="#assignclientsmodal">
                                        Add
                                    </button>
                                    {/* <input
                                        type="number"
                                        className="description_inputf"
                                        placeholder="Add"
                                    // value={programNameCreate}
                                    // onChange={(e) => {
                                    //     setProgramNameCreate(e.target.value)
                                    //     setError({ ...error, name: false })
                                    // }}
                                    /> */}
            {/* {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
            {/* </div>
                            </div>
                            <AssignClients />
                            <div className="d-flex">
                                <div className="col-md-4 ml-2">
                                    <p className="whole_label">Add <span className="text-lowercase">Services</span></p>
                                    <Select
                                        isMulti
                                        closeMenuOnSelect={false}
                                        placeholder={"Select"}
                                        value={weekDays}
                                        options={[{ 'value': '0', 'label': 'Sunday' }, { 'value': '1', 'label': 'Monday' }, { 'value': '2', 'label': 'Tuesday' }, { 'value': '3', 'label': 'Wednesday' }, { 'value': '4', 'label': 'Thursday' }, { 'value': '5', 'label': 'Friday' }, { 'value': '6', 'label': 'Saturday' }]}
                                        onChange={(opt, meta) => {
                                            setWeekDays(opt);
                                        }}
                                    />
                                    {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                    {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>}
                                </div>
                                <div className="col-md-4 px-4">
                                    <p className="whole_label">Session date</p>
                                    <DateInput */}
            {/* value={startDateCreate}
                                        onChangeDate={(date) => {
                                             setStartDateCreate(date)
                                            setError({ ...error, start_date: false })

                                         }}
                                         maxDate={endDateCreate}
                                        minDate={new Date()}
                                        inputClassName={"description_inputf d-flex align-items-center"} /> */}
            {/* {error.start_date ?
                                    <h6 className="blog_error_text4" style={{ marginBottom: 15, marginTop: 7 }}>
                                        {'Please select start date'}
                                    </h6> : null} */}
            {/* </div>
                                <div className="col-md-4 px-1">
                                    <p className="whole_label">start <span className="text-lowercase">time</span></p> */}
            {/* <div className="d-flex align-items-center"> */}
            {/* <TimePicker
                                        value={startTime ? startTime : null}
                                        visibility={showTimePicker}
                                        onChangeDate={startTimeSetting}
                                        onDone={() => setTimePickerVisible(false)}>
                                        <span onClick={() => setTimePickerVisible(!showTimePicker)}>
                                            <input
                                                required
                                                placeholder="--:--"
                                                disabled
                                                className="description_inputf d-flex align-items-center"
                                                value={startTime}
                                            />
                                            <img src="images/clock.png" className="clock_icon" />
                                        </span>
                                    </TimePicker> */}
            {/* </div> */}
            {/* {error && !startTime && <h6 className="text-danger error">Please add start time</h6>}
                                </div>
                            </div>
                            <div className="d-flex ">
                                <div className="col-md-4 ml-2">
                                    <p className="whole_label">Fee</p>
                                    <input
                                        type="number"
                                        className="description_inputf"
                                        placeholder="$000" */}
            {/* value={programNameCreate}
                                     onChange={(e) => {
                                        setProgramNameCreate(e.target.value)
                                        setError({ ...error, name: false })
                                    }}
                                    /> */}
            {/* {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
            {/* </div>
                                <div className="col-md-4 px-4">
                                    <p className="whole_label">Notes to Attendees</p>
                                    <input
                                        type="text"
                                        className="description_inputf"
                                        placeholder="Write here..." */}
            {/* value={programNameCreate}
                                     onChange={(e) => {
                                      setProgramNameCreate(e.target.value)
                                       setError({ ...error, name: false })
                                     }}
                                    /> */}
            {/* {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
            {/* </div>
                                <div className="col-md-4 px-1">
                                    <p className="whole_label">Send a notification to clients</p>
                                    <input
                                        type="email"
                                        className="description_inputf"
                                        placeholder="Enter your email" */}
            {/* value={programNameCreate}
                                     onChange={(e) => {
                                        setProgramNameCreate(e.target.value)
                                        setError({ ...error, name: false })
                                    }}
                                    /> */}
            {/* {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>} */}
            {/* </div>
                            </div>
                        </div>

                        <div className=" d-flex justify-content-space-between mt-2">
                            <div className="col-md-12">
                                <button type="submit" className="description_btnsave">Submit</button>
                            </div>
                        </div>

                    </div>
                </div> */}

            {/* </form>  */}

            <div className="mt-4" style={{
                backgroundColor: "white"
                // , borderRadius: "8px", boxShadow: " 0px 4px 20px #ccc9ca" 
            }}>
                <div className="d-flex  " >
                    <div className="col-md-8 mt-3 ">
                        <h4 className="px-4 mt-2">Appointments</h4>
                    </div>

                    <div className="col-md-4 mt-3 d-flex" >
                        <div className="col-md-6 px-4 ">
                            <button className="description_btntoday w-100" style={{
                                backgroundColor: "#1f7e78",
                                borderColor: "#1f7e78",
                            }} onClick={() => { setSelectedDate(new Date()); getTodaysBookingList(format(selectedDate, "yyyy-MM-dd")); }}>Today</button>
                        </div>
                        <div className="col-md-6 px-4">
                            <DateInput
                                value={selectedDate}
                                onChangeDate={(date) => {
                                    // console.log(date, "dateee")
                                    setSelectedDate(date)
                                    // setError({ ...error, start_date: false })
                                    getTodaysBookingList(format(date, "yyyy-MM-dd"));

                                }}
                                // maxDate={endDateCreate}
                                minDate={new Date()}
                                inputClassName={"description_inputf d-flex align-items-center"} />
                        </div>
                    </div>
                </div>

                <hr style={{ marginTop: "-20px" }} />
                <div className="table_resouter upcoming_scroll_div  mx-3">
                    {isLoading ? (<center>
                        <Loader visible={isLoading}
                            style={{ top: "-15px", position: "relative" }} /> </center>)
                        : UpcomingBookingList.length ? (
                            <table className="table appointment_table1 table_resinner2 " >
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col" style={{ width: "280px" }}>Name</th>
                                        {/* <th scope="col">Age</th> */}
                                        <th scope="col">Type</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {UpcomingBookingList.length && UpcomingBookingList?.map(dt => {
                                        //     console.log(dt.booking_date, "booking_date")
                                        let changeDateFormat = dt?.bookingDate?.split("-")
                                        return <tr key={dt._id} className="text-center mt-5">
                                            <td>
                                                <span
                                                    onClick={() => { navigate("/allpatientinfo", { state: { user: dt.userId } }) }}
                                                    className="link_profile"
                                                >
                                                    {dt?.userId?.full_name && dt?.userId?.full_name}
                                                </span>
                                            </td>
                                            {/* <td style={{
                                                width: "80px"
                                            }}>{dt.age && dt.age}</td> */}
                                            <td
                                            >{dt?.type === "session" ? "Individual Session" : "Group Session"}</td>
                                            <td>{`${changeDateFormat[1]}-${changeDateFormat[2]}-${changeDateFormat[0]}`}</td>
                                            <td className="text_unset">{formatAMPM(dt.startTime) + " - " + formatAMPM(dt.endTime)}</td>
                                            <td>
                                                <button onClick={() => onStartSession(dt?.sessionLink_doctor)} className="start_call">
                                                    <span>start call</span>
                                                </button>
                                                <button className="appointment_cancel ms-2"
                                                    onClick={() => updateAppointmentBooking({ "bookingId": dt._id, "status": "cancelled", "message": " " })}>
                                                    <span>cancel</span>
                                                </button>
                                            </td>
                                        </tr>
                                    }
                                    )}
                                </tbody>
                            </table>
                        ) : (<div className="card p-2"><div className="card-body">There are currently no appointments for this date.</div></div>)}

                </div>
            </div>
            <div className="mt-4" style={{ backgroundColor: "white" }}>

                <div className="d-flex">
                    <div className="col-md-12 mt-4">
                        <h4 className="px-4">Program Sessions</h4>
                    </div>
                </div>
                <DeleteModal
                    title={'Delete'}
                    content1={'Are you sure you want to delete'}
                    content2={'this Session?'}
                    modalId={'deleteSession'}
                    button2={'No'}
                    button1={'Yes'}
                    onDelete={() => deleteSession(sessionId)}
                />
                <hr />
                <div className="table_resouter upcoming_scroll_div mx-3">
                    {isLoading ? (<center>
                        <Loader visible={isLoading}
                            style={{ top: "-15px", position: "relative" }} /> </center>)
                        : SessionList.length ? (
                            <table className="table appointment_table1 table_resinner2 ">
                                <thead>
                                    <tr className="text-center">
                                        {/* <th scope="col">image</th> */}
                                        <th scope="col">program name</th>
                                        <th scope="col">session name</th>
                                        {/* <th scope="col">people</th> */}
                                        <th scope="col">date</th>
                                        <th scope="col">time</th>
                                        <th scope="col">call</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody className="mb-5 px-4">
                                    {SessionList.length && SessionList?.map(dt => {
                                        // console.log(dt, "dt");
                                        // let groupName = dt.title.length > 20
                                        //     ? dt.title.substring(0, 20) + "..."
                                        //     : dt.title.substring(0, 20)
                                        return <tr
                                            key={dt._id}
                                            className="text-center mt-5">
                                            {/* <td>
                                                <Avatar image={dt.programImage} className="group_profile" />
                                            </td> */}
                                            <td className="tooltip-td ps-5">{dt.programId.programName}</td>
                                            <td>{dt.title}</td>
                                            {/* <td>{dt.bookUser ? dt.bookUser.length : 0}/{dt.epMasterId.approvedUser ? dt.epMasterId.approvedUser.length : 0} people coming</td> */}
                                            <td>{changeDateFormat(dt.sessionDate)}</td>
                                            <td style={{ textTransform: "lowercase" }}>{formatAMPM(dt.startTime) + " - " + formatAMPM(dt.endTime)}</td>
                                            <td >
                                                <button onClick={() => onStartSession(dt?.sessionLink_doctor)} className="start_call ms-4">
                                                    <span>start Session</span>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="appointment_cancel" data-bs-toggle="modal" data-bs-target="#deleteSession" onClick={() => {
                                                    setProgramId(dt.programId._id)
                                                    setSessionId(dt._id);
                                                }}>
                                                    <span>cancel</span>
                                                </button>
                                            </td>

                                        </tr>


                                    }
                                    )}
                                </tbody>
                            </table>
                        ) : (<div className="card p-2 mx-2"><div className="card-body">There are currently no group sessions.</div></div>)}

                </div>
            </div>

            {/* <div className="mt-4" style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: " 0px 4px 20px #ccc9ca" }}>
                <div className="d-flex">
                    <div className="col-md-6">
                        <h4 className="px-4 mt-3">Booking Requests</h4>
                    </div>
                </div>
                <hr />
                <div className="table_resouter upcoming_scroll_div">
                    {isLoading ? (<center>
                        <Loader visible={isLoading}
                            style={{ top: "-15px", position: "relative" }} /> </center>)
                        : BookingList.length ? (
                            <table className="table appointment_table1 table_resinner2 ">
                                <thead>
                                    <tr className="text-center">
                                        <th scope="col" style={{ width: "280px" }}>Name</th>
                                    
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody className="mb-5 ">
                                    {BookingList.length && BookingList?.map(dt => {
                                        // let disabled = validDate(format(new Date(dt?.bookingDate || dt?.date), "MM-dd-yyyy"));
                                        let disabled = validDate(format(new Date(dt?.bookingDate), "MM-dd-yyyy"));
                                     
                                        return <tr key={dt?._id} className={`text-center mt-5`}>
                                            <td>{dt?.userId?.full_name && dt?.userId?.full_name}</td>
                                         
                                            <td>{format(new Date(dt?.startTime), "MM-dd-yyyy")}</td>
                                            <td className="text_unset">{dt?.startTime ? formatAMPM(dt.startTime) + " - " + formatAMPM(dt.endTime) : "N/A".toLowerCase()}</td>
                                            <td>
                                                {!disabled && <button className="start_call"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    title={`Accept ${disabled == true ? "Disabled" : ""}`}
                                                    // style={{ width: "42px", height: "42px" }}
                                                    disabled={disabled || false}
                                                    onClick={() => updateBooking({ "bookingId": dt?._id, "status": "confirmed", "message": " " }, dt)}
                                                >
                                                    Accept
                                                </button>}
                                                <button className="appointment_cancel ms-2"
                                                    data-bs-toggle="tooltip" data-bs-placement="top"
                                                    title="Deny"
                                                    // style={{ width: "42px", height: "42px" }}
                                                    onClick={() => updateBooking({ "bookingId": dt._id, "status": "cancelled", "message": " " }, dt)}
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>


                                    }
                                    )}
                                </tbody>
                            </table>
                        ) : (<div className="card p-2 mx-2"><div className="card-body">There are currently no booking requests.</div></div>)}

                </div>
            </div> */}
            {/* <EventViewModal
                // gname={state?.selectedGroup?.groupName}
                // gid={state?.selectedGroup?._id}
                show={modalShow}
                // getGroupPosts={getGroupPosts}
                onHide={() => setModalShow(false)}
            /> */}
        </>
    );
};

export default MyAppointments;
