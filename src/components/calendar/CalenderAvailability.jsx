import { addDays, addMonths, differenceInDays, format, parse, parseISO, startOfMonth, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { Calendar, DateRange } from "react-date-range";
import Select from "react-select";
import { addAvailability, getAvailability, getAvailableSlots, getBookingByDate } from "../../services/DoctorService";
import { changeDateFormat, changeDateFormatYYYY, dateSort, formatAMPM, showToastError, showToastSuccess } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import { timezone, toastMsg } from "../../Utils/AllConstant";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import AddForms from "./AddForms";
import { useNavigate } from "react-router-dom";
import { getServiceList } from "../../services/MyService";

const CalenderAvailability = (props) => {
  const navigate = useNavigate();
  // console.log(addMonths(startOfMonth(new Date()),3));
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [formName, setformName] = useState("")
  const [breakTime, setBreakTime] = useState("")
  const [chatPrice, setChatPrice] = useState(0)
  const [sessionPrice, setSessionPrice] = useState(0)
  const [groupPrice, setGroupPrice] = useState(0)
  const [chat, setChat] = useState(false)
  const [session, setSession] = useState(false)
  const [group, setGroup] = useState(false)
  const [startTime24, setStartTime24] = useState("")
  const [endTime24, setEndTime24] = useState("")
  const [showTimePicker, setTimePickerVisible] = useState(false);
  const [showEndTimePicker, setEndTimePickerVisible] = useState(false);
  const [chatDuration, setChatDuration] = useState(0)
  const [groupDuration, setGroupDuration] = useState(0)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [formId, setFormId] = useState("")
  const [timeZoneObject, setTimeZoneObject] = useState({})
  const [weekDays, setWeekDays] = useState([])
  const [disabledDates, setDisabledDates] = useState([])
  const [BookingList, setBookingList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [daysDatesError, setDaysDatesError] = useState(false);
  const [dropDownList, setDropDownList] = useState(false);
  const [isLoading, setLoader] = useState(true);
  const [filterdata, setFilterData] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [service, setService] = useState([]);
  const appointmentData = [{ label: "Group Sessions", value: "group" }, { label: "Individual Session", value: "session" }]
  let initialDate = format(new Date(), "yyyy-MM-dd");
  
  const getAvailabilityList = async () => {
    try {
      const response = await getAvailability();
      if (response.status === 200) {
        // console.log(response, formatTime(response?.data?.data[0].startTime), "availability data");
        setTimeZoneObject({ value: response?.data?.data[0]?.timezone, label: formatTimeZone(response?.data?.data[0]?.timezone) });
        setWeekDays(response?.data?.data[0]?.days.map((dt) => { return { value: dt, label: formatDays(dt) } }))
        setBreakTime({ value: response?.data?.data[0]?.breakTime, label: formatInterval(response?.data?.data[0]?.breakTime) })
        setFormId(response?.data?.data[0]?.form?._id);
        setGroup(response?.data?.data[0]?.group)
        setSession(response?.data?.data[0]?.session)
        setGroupPrice(response?.data?.data[0]?.groupRate)
        setSessionPrice(response?.data?.data[0]?.sessionRate)
        setGroupDuration({ value: response?.data?.data[0]?.groupDuration, label: formatInterval(response?.data?.data[0]?.groupDuration) })
        setSessionDuration({ value: response?.data?.data[0]?.sessionDuration, label: formatInterval(response?.data?.data[0]?.sessionDuration) })
        setformName(response?.data?.data[0].form?.formName)
        formatStartTime(response?.data?.data[0].startTime);
        formatEndTime(response?.data?.data[0].endTime);
        if (response?.data?.data[0]?.group === true) {
          document.getElementById("flexCheckDefault0").checked = true;
        }
        if (response?.data?.data[0]?.session === true) {
          document.getElementById("flexCheckDefault1").checked = true;
        }
      } else {
        alert(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }

  const getTodaysBookingList = async (date) => {


    try {
      const response = await getBookingByDate(date);
      if (response.status === 200) {
        // console.log(response, "booking data");
        setBookingList(response.data.data.length >= 1 ? response?.data?.data : []);
      } else {
        alert(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }
  const getTimeSlots = async (date) => {
    try {
      const response = await getAvailableSlots({ "date": date, "serviceId": service.value ? service.value : "" });
      if (response.status === 200) {
        setTimeList(response.data.data.length > 1 ? dateSort(response?.data?.data) : []);
      } else {
        showToastSuccess(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message);
    }
  }
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

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
    getAvailabilityList();
    // getTodaysBookingList(initialDate);
    setTimeZoneObject(timezone[0]);
    // getTimeSlots(initialDate);
    getMyServiceList()
  }, [])

  useEffect(() => {
    if(service.length!==0){
      getTodaysBookingList(changeDateFormatYYYY(selectedDate));
      getTimeSlots(changeDateFormatYYYY(selectedDate));
    }
  }, [service, selectedDate])

  function formatDays(day) {
    // console.log(date, "dateeee")
    if (day == 0)
      return "Sunday"
    else if (day == 1)
      return "Monday"
    else if (day == 2)
      return "Tuesday"
    else if (day == 3)
      return "Wednesday"
    else if (day == 4)
      return "Thursday"
    else if (day == 5)
      return "Friday"
    else if (day == 6)
      return "Saturday"
  }
  function formatTimeZone(day) {
    // console.log(date, "dateeee")
    if (day == "AST")
      return "Atlantic Standard Time - (AST)"
    else if (day == "EST")
      return "Eastern Standard Time - (EST)"
    else if (day == "CST")
      return "Central Standard Time - (CST)"
    else if (day == "MST")
      return "Mountain Standard Time - (MST)"
    else if (day == "PST")
      return "Pacific Standard Time - (PST)"
    else if (day == "AKST")
      return "Alaskan Standard Time - (AKST)"
    else if (day == "HST")
      return "Hawaii-Aleutian Standard Time - (HST)"
    else if (day == "UTC-11")
      return "Samoa standard time - (UTC-11)"
    else if (day == "UTC+10")
      return "Chamorro Standard Time - (UTC+10)"
  }
  function formatInterval(day) {
    // console.log(date, "dateeee")
    if (day == 10)
      return "10 Minutes"
    else if (day == 30)
      return "30 Minutes"
    else if (day == 45)
      return "45 Minutes"
    else if (day == 60)
      return "1 Hour"
  }
  function formatStartTime(date) {
    var arr1 = date.split(":")
    var arr = arr1[2].split(" ")
    setStartTime(arr1[0] + ":" + arr1[1] + " " + arr[1].toLowerCase())
    setStartTime24(arr1[0] + ":" + arr1[1] + ":00 " + arr[1].toUpperCase());
  }
  function formatEndTime(date) {
    var arr1 = date.split(":")
    var arr = arr1[2].split(" ")
    setEndTime(arr1[0] + ":" + arr1[1] + " " + arr[1].toLowerCase())
    setEndTime24(arr1[0] + ":" + arr1[1] + ":00 " + arr[1].toUpperCase());
  }
  const startTimeSetting = (date12, date24) => {
    // console.log(date12, date24, "time")
    setStartTime(date12);
    const myArray1 = date12.split(":");
    if (myArray1[0] < 10) { date12 = "0" + date12; }
    const myArray = date12.split(" ");
    // console.log(myArray, "myArray")
    setStartTime24(myArray[0] + ":00 " + myArray[1].toUpperCase());

    // setStartTime24(date24)
  }

  const endTimeSetting = (date12, date24) => {
    console.log(date12, "date12")
    setEndTime(date12);
    const myArray1 = date12.split(":");
    if (myArray1[0] < 10) { date12 = "0" + date12; }
    const myArray = date12.split(" ");
    // console.log(myArray, "myArray")
    setEndTime24(myArray[0] + ":00 " + myArray[1].toUpperCase());

    // setEndTime24(date24)
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

  let nameSort = (filterdata1) => {
    const result = filterdata1.sort(function compare(a, b) {
      if (a.type.toLowerCase() < b.type.toLowerCase()) {
        return -1;
      } if (a.type.toLowerCase() > b.type.toLowerCase()) {
        return 1;
      }
      return 0;
    })
    return result;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime ||
      !endTime ||
      // !duration ||
      !timeZoneObject.value ||
      weekDays.length == 0 ||
      ((new Date('1/1/2022 ' + endTime) - new Date('1/1/2022 ' + startTime)) < 1)
      //  ||
      // !checkDaysDates())
    ) {
      setError(true)
      // checkDaysDates()
    }
    else {
      setError(false);
      let addObject = {
        "days": weekDays.map(dt => { return dt.value }),
        // "startTime": `${startTime24}:00`,
        // "endTime": `${endTime24}:00`,
        "startTime": startTime24,
        "endTime": endTime24,
        "timezone": timeZoneObject?.value,
        "chat": chat,
        "session": session,
        "group": group,
        "chatDuration": chatDuration?.value || 0,
        "sessionDuration": session === true ? sessionDuration?.value : 10,
        "groupDuration": group === true ? groupDuration?.value : 10,
        "currency": "USD",
        "chatRate": Number(chatPrice),
        "sessionRate": session === true ? Number(sessionPrice) : 0,
        "groupRate": group === true ? Number(groupPrice) : 0,
        "breakTime": breakTime.value,
        "startTimeInterval": "00:00:00 AM",
        "endTimeInterval": "00:00:00 AM",
        "formId": formId
      }
      // console.log(addObject, "params");
      //  return;
      try {
        const response = await addAvailability(addObject);
        if (response.status === 200) {
          //console.log(response?.data);
          showToastSuccess(`Successfully Saved!`);
          getAvailabilityList();
          // getTimeSlots(selectedDate);
          getTodaysBookingList(initialDate);
          getTimeSlots(initialDate);
          // setToastShow(true);
          // resetValues();
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
    setWeekDays([]);
    setLoaded(false);
    getAvailabilityList(selectedDate);
    // getTimeSlots(selectedDate);
    setBreakTime("");
    setChatPrice("");
    setGroupPrice("");
    setSessionPrice("");
    setGroupDuration(0);
    setSessionDuration(0);
    setFormId("");
    setStartTime("");
    setEndTime("");
    setStartTime24("");
    setChat(false);
    setGroup(false);
    setSession(false);
    setEndTime24("");
    setError(false);
    setChatDuration(0);
    setTimeZoneObject(timezone[0])
  }

  const menuClass = `dropdown-menu${dropDownList ? " show" : ""}`;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row" >
          <div className="col-md-12">
            <p className="text-secondary my-2">Start<span className="text-lowercase"> by setting your services and available times.</span>This<span className="text-lowercase">  will allow your clients to set appointments with you.</span></p>

            <div className="row">
              <div className="col-md-12 mt-4">
                <p className="whole_label">Available <span className="text-lowercase">days of the week</span></p>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={"Select week days"}
                  value={weekDays}
                  options={[{ 'value': 0, 'label': 'Sunday' }, { 'value': 1, 'label': 'Monday' }, { 'value': 2, 'label': 'Tuesday' }, { 'value': 3, 'label': 'Wednesday' }, { 'value': 4, 'label': 'Thursday' }, { 'value': 5, 'label': 'Friday' }, { 'value': 6, 'label': 'Saturday' }]}
                  onChange={(opt, meta) => {
                    setWeekDays(opt);
                  }}
                />
                {error && weekDays.length === 0 && <h6 className="text-danger  error">Please add the available week days</h6>}
                {daysDatesError && <h6 className="text-danger  error">Please select weekdays from the dates selected</h6>}
              </div>
              {/* <div className="col-md-6 mt-4">
                <p className="whole_label">Preferred <span className="text-lowercase"> time interval between sessions</span></p>
                <Select
                  placeholder={"Select preferred time interval"}
                  value={breakTime}
                  options={[{ 'value': 10, 'label': '10 Minutes' },
                  { 'value': 30, 'label': '30 Minutes' },
                  { 'value': 45, 'label': '45 Minutes' },
                  { 'value': 60, 'label': '1 Hour' }]}
                  onChange={(opt) => {
                    setBreakTime(opt);
                  }}
                />
                {error && !breakTime && <h6 className="text-danger error">Please add time interval</h6>}
              </div> */}
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6" >
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
              </div>

              {/* <div className="col-md-6">
                <p className="whole_label">Form</p>
                <button type="button" className="btn btn-primary btn-custom-light-modal1 w-100 py-3" data-bs-toggle="modal" data-bs-target="#addformsmodal">
                  <div className=" d-flex justify-content-space-between align-items-center "> <AiOutlinePlus />{formName ? "     " + formName : ""} </div>
                </button>
              </div> */}
            </div>

            <div className="col-md-12">
              <div className="row">
                {/* <div className="col-md-6" >
                  <p className="whole_label">Appointment Type</p>
                  <p className="text-secondary ">Please<span className="text-lowercase"> note that all appointment types are virtual</span></p>

                  <div className="row">
                    <div className="col-md-6  ">
                      {appointmentData.map((dt, index) => {
                        return (

                          <div
                            key={index}
                            // className={`card mb-2 p-1 ${index == 0 ? "active" : ""}`}
                            className={` px-3`}
                            // style={{ background: "#F2F4F6" }}
                            // onClick={() => {
                            // }}
                            id={index}
                          >
                            <div className="btn-group align-items-center">
                              <p className="affir_checkbox">
                                <input
                                  type="checkbox"
                                  name="members"
                                  value={dt.value}
                                  // checked={dt.value}
                                  id={"flexCheckDefault" + index}
                                  onChange={(e) => {
                                    // if (e.target.value === "Chat" && e.target.checked === true)
                                    //   setChat(true)
                                    if (e.target.value === "group" && e.target.checked === true)
                                      setGroup(true)
                                    else if (e.target.value === "session" && e.target.checked === true)
                                      setSession(true)
                                    else if (e.target.value === "group" && e.target.checked === false)
                                      setGroup(false)
                                    else if (e.target.value === "session" && e.target.checked === false)
                                      setSession(false)
                                    // else if (e.target.value === "Chat" && e.target.checked === false)
                                    //   setChat(false)
                                  }}
                                // onChange={(e) => UpdateMember(e.target.checked, e.target.value)}
                                />
                              </p>
                              <div className="actlist_wid2 ms-2">
                                <p className="py-0">
                                  {dt.label}
                                </p>
                              </div>
                            </div>
                          </div>

                        )
                      })}
                    </div>
                    <div>
                    </div>
                  </div>
                  {group === true ?
                    <>
                      <div className="d-flex"
                      // style={chat !== true ? { marginTop: "30px" } : null}
                      >
                        <div className="col-md-7 pe-2">
                          <p className="whole_label">Group Session Duration</p>
                          <Select
                            value={groupDuration}
                            options={[{ 'value': 10, 'label': '10 Minutes' },
                            { 'value': 30, 'label': '30 Minutes' },
                            { 'value': 45, 'label': '45 Minutes' },
                            { 'value': 60, 'label': '1 Hour' }]}
                            onChange={(opt, meta) => {
                              setGroupDuration(opt);
                            }}
                          />
                          {error && !groupDuration && group === true && <h6 className="text-danger  error">Please enter group duration</h6>}
                        </div>
                        <div className="col-md-5 ps-2">
                          <p className="whole_label">Group Price</p>
                          <input
                            type="number"
                            className="description_inputf"
                            value={groupPrice}
                            placeholder="$20"
                            onChange={(e) => {
                              setGroupPrice(e.target.value);

                            }}
                          />
                          {error && !groupPrice && group === true && <h6 className="text-danger  error">Please enter group price</h6>}
                        </div>
                      </div>
                    </>
                    : null}

                  {session === true ?
                    <>
                      <div className="d-flex"
                      // style={group !== true ? { marginTop: "60px" } : null}
                      >
                        <div className="col-md-7 pe-2">
                          <p className="whole_label">Individual Session Duration</p>
                          <Select
                            value={sessionDuration}
                            options={[{ 'value': 10, 'label': '10 Minutes' },
                            { 'value': 30, 'label': '30 Minutes' },
                            { 'value': 45, 'label': '45 Minutes' },
                            { 'value': 60, 'label': '1 Hour' }]}
                            onChange={(opt, meta) => {
                              setSessionDuration(opt);
                            }}
                          />
                          {error && !sessionDuration && session === true && <h6 className="text-danger  error">Please enter session duration</h6>}
                        </div>
                        <div className="col-md-5 ps-2">
                          <p className="whole_label">Individual Price</p>
                          <input
                            type="number"
                            className="description_inputf"
                            value={sessionPrice}
                            placeholder="$20"
                            onChange={(e) => {
                              setSessionPrice(e.target.value);

                            }}
                          />
                          {error && !sessionPrice && session === true && <h6 className="text-danger  error">Please enter session price</h6>}
                        </div>
                      </div>
                    </>
                    : null}


                </div> */}

                <div className="col-md-12">
                  <p className="whole_label mt-4">Timezone</p>
                  <Select
                    placeholder={"Select TimeZone"}
                    value={timeZoneObject}
                    options={timezone}
                    onChange={(opt) => {
                      setTimeZoneObject(opt)
                    }}
                  />
                  {error && !timeZoneObject && <h6 className="text-danger error">Please select timezone</h6>}
                </div>


              </div>
            </div>
          </div>
        </div>
        <AddForms members={formId} setMembers={setFormId} formName={formName} setFormName={setformName} />
        <div className="col-md-12 mt-4">
          <button type="submit" className="update_btncalender">Save <span className="text-lowercase">availability</span></button>
        </div>
      </form>
      <hr />
      <div>

          <div className="row" >
            <div className="col-md-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Select a Date & Time</h5>
                <div className="dropdown">
                  <button
                    onBlur={() => { setDropDownList(false) }}
                    onClick={() => { setDropDownList(!dropDownList); }}
                    className="btn btn-primary btn-custom-light-modal1 position-relative dropdown-toggle" type="button">
                    Sort by
                    <ul className={menuClass + " top-0 end-0 w-100"} style={{marginTop: '3.5em'}}>
                      <li><a className="dropdown-item pointer" onClick={() => { nameSort(BookingList) }}>Appointment Type</a></li>
                      <li><a className="dropdown-item pointer" onClick={() => { dateSort(BookingList); }
                      }>Time</a></li>
                    </ul>
                  </button>
                </div>
              </div>
              <Calendar
                // editableDateInputs={true}
                className='custom-calender '
                minDate={startOfMonth(new Date())}
                maxDate={subDays(addMonths(startOfMonth(new Date()), 3), 1)}
                // disabledDates={disabledDates}
                showMonthAndYearPickers={false}
                // showMonthArrow={false}
                // scroll={{ "enabled": true }}
                months={1}
                direction={"vertical"}
                color={"#1f7e78"}
                date={selectedDate}
                onChange={item => {
                  console.log(item, changeDateFormatYYYY(item), "unavailable box");
                  // unavailable_box(item);
                  // getTimeSlots(changeDateFormatYYYY(item));
                  // getTodaysBookingList(changeDateFormatYYYY(item));
                  setSelectedDate(item);
                }}
                moveRangeOnFirstSelection={false}
              />
              {/* {selectedDate.toString()} */}
            </div>


            <div className="col-md-4" >
              <Select
                placeholder={"Select a service"}
                value={service}
                options={serviceList.map(dt => { return {label: dt.serviceName, value: dt._id}})}
                onChange={(opt) => {
                  setService(opt)
                }}
              />
              <div className="d-flex justify-content-between mb-2" >
                <p className="whole_label">{format(selectedDate, 'EEE, do MMMM')}</p>
                {/* <select defaultValue="all" className='month-selector'
                 onChange={(e) => filterMonths(e)}
                > */}
                {/* <option value="all">All</option> */}
                {/* {Array(12).fill(0).map((_, i) => {
                  let month = format(addMonths(startOfYear(new Date()), i), 'LLL');
                  return (<option key={i} value={month}>{month}</option>);
                }
                )} */}
                {/* </select> */}
              </div>
              <button type="button" className="btn btn-primary btn-custom-light-modal w-100">
                <GoPrimitiveDot size="1.5em" color="green" /> <span style={{ marginLeft: "2px", whiteSpace: "pre-wrap" }}>Available timings that have been booked</span>
              </button>
              <div className="unavailable_list mt-2" >
                {timeList.length ? timeList.map((dt, i) =>
                  <div
                    key={i}
                    className="card flex-row py-3 px-4 my-3 mx-5" style={{ borderColor: "#1f7e78" }}>
                    {BookingList.filter((dt1) => { return (formatAMPM(dt1.startTime).includes(formatAMPM(dt.start))) }).length ? <GoPrimitiveDot size="1.5em" color="green" /> : null}
                    <p className='mb-0' style={{ color: "#1f7e78", whiteSpace: "pre-wrap" }}>{formatAMPM(dt.start)}</p>
                  </div>
                ) : <p className="py-5 d-flex justify-content-center">No slots available</p>}
              </div>
            </div>
            <div className="col-md-3" >
              <div className="card  mt-md-0" style={{ height: "400px", overflow: "hidden" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <p className="whole_label">Your <span className="text-lowercase">schedule from your calendar</span> </p>
                  </div>
                  <button type="button" className="btn btn-primary btn-custom-light-modal1 w-100" >
                    <span style={{ color: "#1f7e78", whiteSpace: "pre-wrap" }} onClick={() => props.onNext()} >
                      <img className="mx-1" src="images/calnder.png" ></img>     Go To Calender</span>
                  </button>
                  <hr className="mt-4" />
                  <div className="unavailable_list mb-4">
                    {BookingList.length ? BookingList.map((dt, i) => {
                      return (
                        <div
                          key={i} >
                          <p className='mt-4 mb-0' style={{ whiteSpace: "pre-wrap" }}>{formatAMPM(dt.startTime) + "-" + formatAMPM(dt.endTime)}</p>
                          <p className='whole_label mb-2' style={{ whiteSpace: "pre-wrap" }}>{dt.type}<span className="text-lowercase"> {dt.userId.length !== 0 ? " with " : null}</span>{dt.userId.length !== 0 ? dt.userId?.full_name : null}</p>
                        </div>
                      )
                    }
                    ) : <p>No Bookings Yet</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default CalenderAvailability;
