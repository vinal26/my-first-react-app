import { addDays, addMonths, differenceInDays, format, getWeek, lastDayOfMonth, parse, startOfMonth, startOfYear, subDays } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-date-range';
import { addUnavailability, confirmBookingStatus, getAvailability, getAvailableSlots, getBookingByDate, getBookingsByDate, getUpcomingBookings, getUpcomingGroupSession, rescheduleSlots, updateBookingStatus } from '../../services/DoctorService';
import { changeDateFormat, changeDateFormatYYYY, convertTime12to24, formatAMPM, onStartSession, showToastError, showToastSuccess } from '../../Utils/Helper';
import swal from 'sweetalert';
import { BsPersonCircle, BsPlusCircle, BsTrash } from 'react-icons/bs';
import DateInput from '../../commonComponent/CutomDatePicker';
import EventViewModal from './EventViewModal';
import "../appointment/style.css";
import Loader from '../../commonComponent/Loader';
import Avatar from '../../commonComponent/Avatar';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { AiOutlineCheck, AiOutlineClockCircle, AiOutlineQuestion, AiOutlineSend } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useAuth } from '../../Context/AuthContext';
import CalendarWeek from './CalenderWeek';
import Select from "react-select";
import DeleteModal from '../../commonComponent/DeleteModal';
import { createZoomMeetingService } from '../../services/ZoomService';
import { useNavigate } from 'react-router-dom';

//import { showToastSuccess , showToastError } from '../../Utils/Helper';
let initialDate = format(new Date(), "yyyy-MM-dd");

const MyCalender = () => {
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState("");
  const auth = useAuth();
  const [disabledDates, setDisabledDates] = useState([])
  const [unavailableList, setUnavailableList] = useState([])
  const [filterData, setFilterData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [BookingList, setBookingList] = useState([]);
  const [BookingList1, setBookingList1] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [SessionList, setSessionList] = useState([]);
  const [request, setRequest] = useState({});
  const [sessionType, setSessionType] = useState("");
  const [sessionWith, setSessionWith] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rescheduleStartTime, setRescheduleStartTime] = useState("");
  const [rescheduleEndTime, setRescheduleEndTime] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [attend, setAttend] = useState("");
  const [popClose, setPopClose] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [availabilityId, setAvailabilityId] = useState("");
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const showDetailsHandle = (dayStr) => {
    setDate1(changeDateFormatYYYY(dayStr));
    setData(dayStr);
    setShowDetails(true);
    // getRescheduleBookingList(changeDateFormatYYYY(dayStr))
  };
  const availableTimings = () => {
    const options = timeList.map((dt) => {
      return {
        value: formatAMPM(dt.start) + "-" + formatAMPM(dt.end),
        label: formatAMPM(dt.start) + " - " + formatAMPM(dt.end)
      }
    });
    return options || [];
  }

  const rescheduleSet = (date12) => {
    // console.log(date12, "date1222");
    const myArray = date12.split(" ");

    setRescheduleStartTime(myArray[0]);
    setRescheduleEndTime(myArray[2]);
  }
  function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

  }

  const rescheduleTimeSlots = async (date) => {
    if (!rescheduleTime
    ) {
      setError(true)
      // checkDaysDates()
    }
    else {
      setError(false);
      try {
        const response = await rescheduleSlots({ "bookingDate": date1 ? date1 : format(date, "yyyy-MM-dd"), "startTime": rescheduleStartTime, "endTime": rescheduleEndTime, "bookingId": bookingId });
        if (response.status === 200) {
          // console.log(response, "booking data");
          confirmBooking(request);
          showToastSuccess("Booking rescheduled sucessfully.")
          setRescheduleTime("");
        } else {
          showToastError(response?.data || response.message);
        }
        setLoader(false)
      } catch (error) {
        error?.data?.data && showToastError(error?.data?.data || error.data?.message);
      }
    }
  }
  const getSessionList = async () => {
    try {
      const response = await getUpcomingGroupSession();
      if (response.status === 200) {
        // console.log(response, "response data");
        const result = response?.data?.data?.filter((value) => {
          if (changeDateFormat(value?.sessionDate) < changeDateFormat(new Date())) {

            return (
              value
            );
          }
        });
        setSessionList(result);
        // setSessionList(response?.data?.data);
      } else {
        showToastError(response?.data || response.message);
      }
      setLoader(false);
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }

  const getTodaysBookingList = async (date) => {
    try {
      const response = await getBookingByDate(date);
      if (response.status === 200) {
        setBookingList(response.data.data.length >= 1 ? response?.data?.data : []);
      } else {
        showToastError(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }
  const getAvailabilityList = async () => {
    try {
      const response = await getAvailability();
      if (response.status === 200) {
        setDisabledDates(response?.data?.data[0].unavailableOn)
        setAvailabilityId(response?.data?.data[0]._id)
      } else {
        showToastError(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }
  const createMeeting = async (request) => {
    // console.log(request, "request")
    try {
      // const time24h = request?.startTime?.split('-')?.[0]?.trim();
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
  const confirmBooking = async (req) => {
    const meetingResponse = await createMeeting(req);
    if (meetingResponse) {
      var sessionLink_doctor1 = meetingResponse.start_url;
      var sessionLink_user1 = meetingResponse.join_url;
    }
    try {
      const response = await confirmBookingStatus({
        "bookingId": bookingId,
        "status": "confirmed",
        "message": confirmMessage,
        "sessionLink_doctor": sessionLink_doctor1,
        "sessionLink_user": sessionLink_user1
      });
      if (response.status === 200) {
        showToastSuccess(response?.data?.message)
        getTodaysBookingList(initialDate);
        setDate(new Date())
      } else {
        showToastError(response?.data || response.message)
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message)
    }
  }
  useEffect(() => {
    getAvailabilityList();
    getTodaysBookingList(initialDate);
    setDate(new Date())
    getSessionList();
  }, [])

  const unavailable_box = (date) => {
    swal({
      text: "Do you want make this date unavailable?",
      title: format(date, 'PPPP'),
      icon: "info",
      buttons: {
        Yes: {
          text: "Yes",
          value: true,
        },
        No: {
          text: "No",
          value: false,
        },
      },
    })
      .then(async (val) => {
        console.log(val)
        if (!val) return;

        try {
          const response = await addUnavailability({
            "availabilityId": availabilityId,
            "selectedDate": changeDateFormatYYYY(date)
          });
          if (response.status === 200) {
            showToastSuccess(`Successful!`);
            setLoaded(false);
            getAvailabilityList();
          } else {
            //alert(response?.data || response.message);
          }
        } catch (error) {
          error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
      });
  }

  const available_box = (date) => {
    swal({
      text: "Do you want make this date available?",
      title: format(new Date(date), 'PPPP'),
      icon: "info",
      buttons: {
        Yes: {
          text: "Yes",
          value: true,
        },
        No: {
          text: "No",
          value: false,
        },
      },
    })
      .then(async (val) => {
        console.log(val)
        if (!val) return;

        try {
          const response = await addUnavailability({ "availabilityId": availabilityId, "selectedDate": changeDateFormatYYYY(date) });
          if (response.status === 200) {
            //showToastSuccess(`Successful!`);
            setLoaded(false);
            getAvailabilityList();
          } else {
            //alert(response?.data || response.message);
          }
        } catch (error) {
          error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
      });
  }

  const filterMonths = (e) => {
    const searchWord = e.target.value;
    const result = unavailableList.filter((value) => {
      return format(new Date(value), 'LLL').toLowerCase() === searchWord.toLowerCase();
    });
    if (searchWord === "all") {
      setFilterData(unavailableList);
    } else {
      setFilterData(result);
    }
  };
  const popover1 = (
    <Popover id="popover-basic" className='rounded' style={{ minWidth: '500px' }}>
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        {/* <h6 className='mb-3'>Calender - <span>{auth.authUser.full_name}</span></h6> */}
        <div className="px-1">
          <CalendarWeek showDetailsHandle={showDetailsHandle} date={date} setTimeList={setTimeList} setBookingList1={setBookingList1} sessionType={sessionType} />
          {/* <br />
          {showDetails && <Details data={data} />} */}
          {/* {console.log(showDetailsHandle, "showDEtailsHandle mycalender")} */}
          <div className='d-flex flex-row justify-content-between'>
            <div className="col-md-6  card mt-2" style={{ backgroundColor: "#E3ECED" }}>
              <h5 className="description_btnsave px-5 mt-2 py-3">Availability </h5>
              <div className=" unavailable_list mt-1" >
                {timeList.length ? timeList.map((dt, i) =>
                  <div
                    key={i}
                    className="d-flex flex-row align-items-center justify-content-between ms-3 py-1 px-4 " style={{ borderColor: "#1f7e78" }} onClick={() => {
                      rescheduleSet(dt.start + " - " + dt.end);
                      setRescheduleTime(formatAMPM(dt.start) + " - " + formatAMPM(dt.end))
                    }}>
                    <p className='mb-1' style={rescheduleTime !== (formatAMPM(dt.start) + " - " + formatAMPM(dt.end)) ? { color: "#1f7e78", cursor: 'pointer' } : { color: "darkblue", cursor: 'pointer' }}>
                      {BookingList.filter((dt1) => { return (formatAMPM(dt1.startTime).includes(formatAMPM(dt.start))) }).length ?
                        null
                        : formatAMPM(dt.start) + " - " + formatAMPM(dt.end)}
                    </p>
                  </div>
                ) : <p className="px-5">Slots not available</p>}
              </div>
            </div>
            <div className="col-md-6  card mt-2 ms-2" style={{ backgroundColor: "#E3ECED" }}>
              <h5 className="description_btnsave px-5 mt-2 py-3" >Booked Slots </h5>
              <div className=" unavailable_list mt-1" >
                {BookingList1.length ? BookingList1.map((dt, i) =>
                  <div
                    key={i}
                    className="d-flex flex-row align-items-center justify-content-between ms-3 py-1 px-4 " style={{ borderColor: "#1f7e78" }}>
                    <p className='mb-0' style={{ color: "#1f7e78" }}>{formatAMPM(dt.startTime) + " - " + formatAMPM(dt.endTime)}</p>
                  </div>
                ) : <p className="px-5 ms-1">No slots booked</p>}
              </div>
            </div>
          </div>
          <div className="mt-3 ">

            <p className="whole_label">Rescheduled Time:</p>
            <div className=" d-flex flex-row justify-content-between">
              <div>
                <input
                  type="text"
                  value={rescheduleTime}
                  className="description_inputf"
                  placeholder='Please select from availability list'
                // options={availableTimings()}
                // onChange={(opt, meta) => {
                //   // console.log(opt, "opt")
                //   rescheduleSet(opt.value);
                //   setRescheduleTime(opt);
                // }}
                />
                {error && !rescheduleTime && <h6 className="text-danger  error">Please select time from available slots.</h6>}
              </div>
              <div>
                <button onClick={() => { if (rescheduleTime) { setAttend(""); rescheduleTimeSlots(date); getTodaysBookingList(date); } }} type='button' className="description_btnsave  ms-5"
                // data-bs-toggle="modal" data-bs-target="#rescheduleModal"
                >Reschedule</button>
              </div>
            </div>
          </div>
        </div>
        {/* <DeleteModal
          title={'Reschedule'}
          content1={'Are you sure you want to reschedule'}
          content2={'this booking?'}
          modalId={'rescheduleModal'}
          button2={'No'}
          button1={'Yes'}
          onDelete={() =>
            rescheduleTimeSlots(date)
          }
        /> */}
      </Popover.Body>
    </Popover>
  );

  const popover = (
    <Popover id="popover-basic" className='rounded' style={{ minWidth: '300px' }}>
      {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
      <Popover.Body>
        <h6 className='mb-3'>Calender - <span>{auth.authUser.full_name}</span></h6>
        <div className="px-2">
          <h3 className="text-capitalize">{sessionType} <span className="text-lowercase">with </span> {sessionWith}</h3>
          <p className='pt-1 mb-1'><AiOutlineClockCircle className='me-2 mb-1' />{format(date, 'EEE, MM/dd/yyyy')} <span> {startTime + " - " + endTime}</span> </p>
          <p className='pt-1 mb-1 text-capitalize'><BsPersonCircle className='me-2 mb-1' />{sessionType == "group" ? "Group Session" : "Individual Session"}</p>

          <div className="mt-3 d-flex justify-content-between">
            {status === "pending" ?
              <button onClick={() => setAttend("yes")} type='button' className="btn btn-sm btn-outline-light border border-dark text-dark"><AiOutlineCheck className='text-success me-1 mb-1' />Confirm</button>
              : null}
            <OverlayTrigger onEnter={() => {
              // setAttend("");
              // setSessionType(dt.type);
              // setBookingId(dt._id);
              // setSessionWith(dt.userId.length !== 0 ? dt.userId?.full_name : "");
              // setStartTime(formatAMPM(dt.startTime));
              // setEndTime(formatAMPM(dt.endTime))
            }} trigger="click"
              placement="bottom"
              rootClose={true}
              overlay={popover1}>
              <button onClick={() => { setAttend("reschedule"); setPopClose(false); }} type='button' className="btn btn-sm btn-outline-light border border-dark text-dark"><MdClose className='text-danger me-1 mb-1' />Reschedule</button>
            </OverlayTrigger>
          </div>
        </div>

        {attend === "yes" && (
          <div className="p-2 mt-4">
            <h6>Yes I'll attend</h6>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="flexCheckChecked" defaultChecked />
              <label class="form-check-label" for="flexCheckChecked">
                Notification to attendee's
              </label>
            </div>
            <div class="mb-3">
              {/* <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label> */}
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(data) => { setConfirmMessage(data.target.value) }
              }></textarea>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button onClick={() => { setAttend(""); confirmBooking(request) }} type='button' className="btn btn-sm btn-primary"><AiOutlineSend className='mb-1 me-1' />Send</button>
              <button onClick={() => setAttend("")} type='button' className="btn btn-sm btn-outline-light border border-secondary text-secondary"><FaRegTrashAlt className='mb-1 me-1' />Discard</button>
            </div>
          </div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div
      >
        {/* {isLoading ? */}
        <div className="mt-2" >
          <p className="text-secondary">View all of your appointments, events, and program dates all in one screen!</p>
          <div className="row" >
            <div className="col-md-6">
              <div className="shadow-sm rounded pb-4 px-4">
                <Calendar
                  // editableDateInputs={true}
                  className='custom-calender available_calender'
                  minDate={startOfMonth(new Date())}
                  maxDate={subDays(addMonths(startOfMonth(new Date()), 3), 1)}
                  // disabledDates={disabledDates}
                  showMonthAndYearPickers={false}
                  weekdayDisplayFormat='E'
                  // showMonthArrow={false}
                  // scroll={{ "enabled": true }}
                  months={1}
                  direction={"vertical"}
                  color={"#1f7e78"}
                  date={date}
                  onChange={item => {
                    setDate(item);
                    getTodaysBookingList(changeDateFormatYYYY(item))
                  }}
                  moveRangeOnFirstSelection={false}
                />
              </div>
            </div>


            <div className="col-md-6" >
              <div className="shadow-sm rounded py-4 px-4 mt-3 mt-md-0">
                {/* Show about the date */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <p className="mb-0 whole_label">{format(date, 'EEE, do MMMM')} </p>
                  <Form className='bg-light py-1 px-2 rounded'
                    onClick={() => {
                      if ((disabledDates.filter(dt => new Date(dt).toDateString() === date.toDateString())).length)
                        available_box(date)
                      else
                        unavailable_box(date)
                    }}>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={(disabledDates.filter(dt => new Date(dt).toDateString() === date.toDateString())).length}
                      label={(disabledDates.filter(dt => new Date(dt).toDateString() === date.toDateString())).length ? "Mark as Available" : "Mark as Unavailable"}
                    />
                  </Form>
                </div>
                <hr />
                <div className="unavailable_list mb-4">
                  {BookingList.length ? BookingList.map((dt, i) => {
                    return (
                      <div
                        key={i} >
                        <OverlayTrigger onEnter={() => {
                          setAttend("");
                          setSessionType(dt.type);
                          setBookingId(dt._id);
                          setSessionWith(dt.userId.length !== 0 ? dt.userId?.full_name : "");
                          setStartTime(formatAMPM(dt.startTime));
                          setEndTime(formatAMPM(dt.endTime))
                          setRequest(dt);
                          setStatus(dt.status);
                          setPopClose(true);
                        }} trigger="click" placement="left"
                          rootClose={popClose}
                          overlay={popover}>
                          <div className="pointer shadow-sm rounded mt-2 mb-3 px-3 py-2 border-start border-5 border-success">
                            <div className="row">
                              <div className="col-sm-3">
                                <p>{formatAMPM(dt.startTime)}</p>
                                <p className='mb-0'>{diff_minutes(new Date(dt.startTime), new Date(dt.endTime)) + " min"}</p>
                              </div>
                              <div className="col-md-9">
                                <h4 className="text-capitalize">{dt.type == "group" ? "Group Session" : "Individual Session"}</h4>
                                <p className='rounded mb-0 bg-light py-1 px-2 text-capitalize'>{dt.type == "group" ? "Group Session - " : "Individual Session"}<span> {dt?.userId?.length !== 0 ? dt?.userId?.full_name + " - " + dt?.status : dt?.status}</span></p>
                              </div>
                            </div>
                          </div>
                        </OverlayTrigger>
                      </div>
                    )
                  }
                  ) : <p>No Bookings yet</p>}
                </div>
                {/* Unavailable Dates */}
                {/* <div className="d-flex justify-content-between mb-2">
                      <p className="whole_label">Unavailable Dates</p>
                      <select defaultValue="all" className='month-selector' onChange={(e) => filterMonths(e)}>
                        <option value="all">All</option>
                        {Array(12).fill(0).map((_, i) => {
                          let month = format(addMonths(startOfYear(new Date()), i), 'LLL');
                          return (<option key={i} value={month}>{month}</option>);
                        }
                        )}
                      </select>
                    </div>
                    <div className="unavailable_list">
                      {filterData.length ? filterData.slice(0).reverse().map((dt, i) =>
                        <div key={i} className="card d-flex flex-row align-items-center justify-content-between py-3 px-4 mb-3">
                          <p className='mb-0'>{format(new Date(dt), 'PPPP')}</p>
                          <span className="delete text-danger" title='Delete' style={{ cursor: "pointer" }}>
                            <BsTrash
                              className="delete text-danger"
                              onClick={() => available_box(dt)}
                            />
                          </span>
                        </div>
                      ) : <p>No dates found</p>}
                    </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* : <p className='whole_label'>Checking Availability...</p>} */}

      </div>
      {/* <EventViewModal
        gname={state?.selectedGroup?.groupName}
        gid={state?.selectedGroup?._id}
        show={modalShow}
        getGroupPosts={getGroupPosts}
        onHide={() => setModalShow(false)}
      /> */}

    </>
  );
};

export default MyCalender;