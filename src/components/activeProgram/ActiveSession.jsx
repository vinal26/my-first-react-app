import React from "react";
import { useState } from "react";
import { format } from 'date-fns';
import {
  addActiveSession,
  deleteSessionService,
  getActiveProgramById,
  getActiveSession,
  getSessionDaysService,
  getSIngleSession,
  putSIngleActiveSession,
} from "../../services/ActivePrograms";
import { useEffect } from "react";
import { changeDateFormat, changeDateFormatmmddyyyy, checkEndDate, convertTime12to24, dateSort, formatAMPM, isEmpty, onStartSession, showToastError, showToastSuccess } from "../../Utils/Helper";
import TimePicker from "../../commonComponent/TimePicker";
import Loader from "../../commonComponent/Loader";
import DropDownMultiSelect from "../../commonComponent/DropDownMultiSelect";
import Button from "../../commonComponent/Button";
import { createZoomMeetingService } from "../../services/ZoomService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { timezone } from "../../Utils/AllConstant";
import DeleteModal from "../../commonComponent/DeleteModal";
import { AiOutlinePlus } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import DateInput from "../../commonComponent/CutomDatePicker";
import { toDate } from "date-fns";
import { getAvailableSlots } from "../../services/DoctorService";

let selectedDeleteSession = '';

const ActiveSession = (props) => {
  // console.log('props', props)
  const navigate = useNavigate();
  const auth = useAuth();
  const programId = props.programId;
  const [programDetails, setProgramDetails] = useState({});
  const [sessionName, setSessionName] = useState("");
  const [description, setDescription] = useState("");
  const [sessionStartTime, setSessionStartTime] = useState("");
  const [sessionEndTime, setSessionEndTime] = useState("");
  const [sessionWeeks, setSessionWeeks] = useState("");
  const [noOfSession, setNoOfSession] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [sessionTimeZone, setSessionTimeZone] = useState("");
  const [getSessionList, setGetSessionList] = useState([]);
  const [sessionDays, setSessionDays] = useState("");
  const [sessionDate, setSessionDate] = useState(new Date());
  const [editSessionDate, setEditSessionDate] = useState("");
  const [isLoading, setLoader] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [showTimePicker, setTimePickerVisible] = useState(false);
  const [error, setError] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const [sessionApiChange, setSessionApiChange] = useState("");
  const [sessionId, setSessionId] = useState("");


  useEffect(() => {
    getSessionById();
    // getSessionDays();
    getActiveProgramByIds();
    getTimeSlots(format(sessionDate, "yyyy-MM-dd"));
  }, [programId, sessionId]);

  const getDate = (date) => {
    try {
      if (date && new Date(date) != 'Invalid Date') {
        return new Date(date)
      }
      // return new Date()
    } catch (error) { }
  }
  const startDateCreate = getDate(programDetails[0]?.startDate);
  const endDateCreate = getDate(programDetails[0]?.endDate)
  const checkValidation = () => {
    try {
      let errorsResult = error;
      let isValid = true;

      if (!sessionName || isEmpty(sessionName)) {
        isValid = false;
        errorsResult = { ...errorsResult, sessionName: true }
      }
      if (!description || isEmpty(description)) {
        isValid = false;
        errorsResult = { ...errorsResult, description: true }
      }
      if (!sessionStartTime || isEmpty(sessionStartTime)) {
        isValid = false;
        errorsResult = { ...errorsResult, startTime: true }
      }
      // if (!noOfSession || isEmpty(noOfSession)) {
      //   isValid = false;
      //   errorsResult = { ...errorsResult, session: true }
      // }
      // if (!sessionTimeZone || isEmpty(sessionTimeZone)) {
      //   isValid = false;
      //   errorsResult = { ...errorsResult, timeZone: true }
      // }
      setError(errorsResult)

      return isValid;

      // if (isValid) {
      //   handleSubmitSession()
      // }
    } catch (error) {
    }
  }
  const getTimeSlots = async (date) => {
    try {
      const response = await getAvailableSlots({ "date": date, "type": "group" });
      if (response.status === 200) {
        // console.log(response, "booking data");
        setTimeList(response.data.data.length > 1 ? dateSort(response?.data?.data) : []);
      } else {
        alert(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }
  const getSessionDays = async () => {
    try {
      const response = await getSessionDaysService(programId);
      if (response) {
        setSessionDays(response);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const createMeeting = async () => {
    try {
      // if (sessionApiChange == "edit") {
      const session = editSessionDate;
      const weekDay = {
        Sunday: 1,
        Monday: 2,
        Tuesday: 3,
        Wednesday: 4,
        Thursday: 5,
        Friday: 6,
        Saturday: 7,
      }
      const start_time = changeDateFormatmmddyyyy(session?.[0]) + convertTime12to24(sessionTime);
      const end_time = changeDateFormatmmddyyyy(session?.[session?.length - 1]) + convertTime12to24(sessionTime);

      const meetingDetail = {
        "topic": programDetails?.programName,
        "type": 8,
        "start_time": sessionStartTime,
        "duration": "60",
        "recurrence": {
          "end_date_time": sessionEndTime,
          "monthly_week": 1,
          "monthly_week_day": 1,
          "repeat_interval": 2,
          "type": 2,

          // "weekly_days": weekDay[sessionWeeks],
        },
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
        }
      }

      const meetingResponse = await createZoomMeetingService(meetingDetail);
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
  const getActiveProgramByIds = async () => {
    setLoader(true)
    // console.log(sessionId);
    try {
      const response = await getActiveProgramById(programId);
      if (response.status === 200 && response?.data) {
        setProgramDetails(response?.data?.data);
      } else {
        console.log(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {

      console.log(error?.data || error.message);
      setLoader(false)
    }
  };
  const getSIngleSessionById = async (sessionId) => {
    setLoader(true)
    try {
      if (!sessionId) {
        return;
      }
      const response = await getSIngleSession(programId, sessionId);
      if (response.status === 200 && response?.data?.data) {
        console.log(response, "response session")
        const session = response.data.data;
        // setSIngleGetSession(session);
        setSessionName(session.title);
        // setSessionTime(session.sessionTime);
        // setSessionTimeZone(session.session_timezone);
        setSessionStartTime(session.startTime)
        setDescription(session.description);
        // setSessionWeeks(getSessionWeekDay(session.sessionDate));
        setSessionDate(new Date(session.sessionDate))
        // setNoOfSession([{ value: session.sessionDate, label: session.sessionDate }])
      } else {
        console.log(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      // setSIngleGetModule([]);
      // setInputList([{ addPoints: "" }]);
      // setAttachmentList([]);
      // setModuleContent('')
      // setModuleName("");
      // setDescription("");
      // setCoverShowImageCreate("")
      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
      setLoader(false)
    }
  };
  const handleSubmitSession = async (e) => {
    // const sessionTimeEdit = sessionTime.split(" ");

    e.preventDefault();
    if (!checkValidation()) {
      return;
    }
    setSubmit(true)
    // const sessionD = session.toString();
    if (sessionApiChange == "edit") {
      try {
        const sessionD = format(sessionDate, "yyyy-MM-dd")
        var parms = {
          "programId": programId,
          "title": sessionName,
          "sessionDate": sessionD,
          "startTime": sessionStartTime,
          "endTime": sessionEndTime,
          "description": description,
          // "session_timezone": sessionTimeZone,
          "sessionId": sessionId
        };
        const meetingResponse = await createMeeting();
        if (meetingResponse) {
          parms.sessionLink_doctor = meetingResponse.start_url;
          parms.sessionLink_user = meetingResponse.join_url;
          const response = await putSIngleActiveSession(parms);
          // setShowLoader(false)
          setSubmit(false);
          if (response.status === 200) {
            // props.onSave();
            document.getElementById('btn-close').click()
            showToastSuccess(`Active session is updated`);
            getSessionById();
          } else {
            showToastError(
              response?.data || response.message || "Some error occurred"
            );
          }
        }
      } catch (error) {
        // setShowLoader(false)
        showToastError(
          error?.data?.data || error.data?.message || "Some error occurred"
        );
      }
    } else {
      try {
        const sessionD = format(sessionDate, "yyyy-MM-dd")
        // const session = noOfSession?.map((item) => item.value);
        var params = {
          "programId": programId,
          "title": sessionName,
          "description": description,
          "sessionDate": sessionD,
          "startTime": sessionStartTime,
          "endTime": sessionEndTime,
          // "session_timezone": sessionTimeZone,
        };
        const meetingResponse = await createMeeting();
        if (meetingResponse) {
          params.sessionLink_doctor = meetingResponse.start_url;
          params.sessionLink_user = meetingResponse.join_url;
          const response = await addActiveSession(params);
          setSubmit(false);
          if (response.status === 200) {
            // props.onSave();
            document.getElementById('btn-close').click()
            showToastSuccess(`Active session is created`);
            getSessionById();
            setDescription("");
            setSessionName("");
            setSessionStartTime("");
            setSessionDate(new Date())
            // setSessionWeeks("");
            // setNoOfSession("");
            // setSessionTimeZone("");

          } else {
            showToastError(response?.data || response.message || "Some error occurred")
          }
        }
      } catch (error) {
        setSubmit(false)
        showToastError(error?.data?.data || error.data?.message || "Some error occurred")
      }
    }
  };

  const getSessionById = async () => {
    try {
      const response = await getActiveSession(programId);
      setLoader(false);
      if (response.status === 200) {
        setGetSessionList(response?.data?.data);
      }
    } catch (error) {
      setLoader(false);
      setGetSessionList([]);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      const response = await deleteSessionService(sessionId, programId);
      if (response) {
        showToastSuccess(response?.data || 'Session deleted successfully.');
        getSessionById()
      } else {
        showToastError(response?.data || response.message || "Some error occurred")
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
    }
  }

  const getDropDownSessionDays = () => {
    console.log(sessionDays)
    const days = sessionDays ? Object.keys(sessionDays) : [];
    return days;
  }

  const getSessionWeek = (sessionWeeksEdit) => {
    const week = sessionWeeks ? sessionDays[sessionWeeks] : sessionWeeksEdit ? sessionDays[sessionWeeksEdit] : [];
    const result = week ? week.map((item) => { return { value: item, label: changeDateFormatmmddyyyy(item) } }) : [];
    console.log(result, "result")
    return result;
  }

  const renderError = (msg, value) => {
    return (
      value ? (
        <h6 className="text-danger error" style={{ marginBottom: 15, marginTop: -15 }}>
          {msg}
        </h6>) : null)
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmitSession}>
        <div className="row">
          <div className="col-md-12">
            <p className="whole_label">session <span className="small_letter2">title</span><span className="text-danger"> *</span></p>
            <input
              type="text"
              placeholder="Session title"
              className="description_inputf mb-4"
              value={sessionName}
              onChange={(e) => {
                setSessionName(e.target.value);
                setError({ ...error, sessionName: false });
              }}
            />
            {renderError('Please enter name', error.sessionName)}
          </div>
          <div className="col-md-12">
            <p className="whole_label">description<span className="text-danger"> *</span></p>
            <textarea
              rows="6"
              type="text"
              className="description_inputf description_descpf is-invalid mb-4"
              placeholder="Please add description"
              value={description}
              onChange={(e) => {
                setError({ ...error, description: false })
                setDescription(e.target.value)
              }}
            />
            {renderError('Please enter description', error.description)}
          </div>
          {/* <div className="col-md-12">
            <p className="whole_label">session <span className="small_letter2">time</span><span className="text-danger"> *</span></p>
            <TimePicker
              value={sessionTime ? sessionTime : null}
              visibility={showTimePicker}
              onChangeDate={(date) => {
                setSessionTime(date);
                setError({ ...error, time: false });
              }}
              onDone={() => setTimePickerVisible(false)}>
              <span onClick={() => setTimePickerVisible(!showTimePicker)}>
                <input
                  placeholder="--:--"
                  disabled
                  className="description_inputf"
                  value={sessionTime}
                />
                <img src="images/clock.png" className="clock_icon" alt="" />
              </span>
            </TimePicker>
            {renderError('Please select time', error.time)}
          </div> */}
          {/* <div className="col-md-12 ">
            <div className="row">
              <div className="col-md-6 ">Current sessions Day</div>
              <div className="col-md-6 "> {getSessionWeekDay(editSsessionDate)}</div>
            </div>

            <div className="row">
              <div className="col-md-6 ">Current session date</div>
              <div className="col-md-6 ">{editSsessionDate}</div>
            </div>


          </div> */}
          {/* {sessionApiChange != "edit" ?
            <div className="col-md-12">
              <p className="whole_label">session <span className="small_letter2">day</span><span className="text-danger"> *</span></p>
              <select
                name=""
                value={sessionWeeks}
                onChange={(e) => {
                  console.log(e.target.value)
                  setSessionWeeks(e.target.value);
                  setNoOfSession('')
                  setError({ ...error, week: false });
                }}
                className="description_inputf">
                <option disabled value="">{`Please choose...`}</option>
                {getDropDownSessionDays().map((item) => <option value={item}>{item}</option>)}
              </select>
              {renderError('Please select session week', error.week)}
            </div>
            : null} */}
          {/* {sessionApiChange != "edit" ?
            <div className="col-md-12">
              <p className="whole_label">session <span className="small_letter2">date</span><span className="text-danger"> *</span></p>
              <DropDownMultiSelect
                list={getSessionWeek()}
                placeHolder={'Please choose...'}
                onChange={(opt) => {
                  setNoOfSession(opt);
                  setError({ ...error, session: false });
                  console.log(opt, "noOfSession")
                }}
                defaultValue={noOfSession}
                value={noOfSession}
              />
              {renderError('Please select no. of session', error.session)}
            </div> */}
          {/* : */}
          <div className="col-md-12">
            <p className="whole_label">session <span className="small_letter2">date</span><span className="text-danger"> *</span></p>
            <DateInput
              value={sessionDate}
              onChangeDate={(date) => {
                setSessionDate(date);
                getTimeSlots(format(date, "yyyy-MM-dd"));
                setError({ ...error, sessionDate: false })
              }}
              imageStyle={{ width: "22px", height: "22px", position: "absolute", borderRadius: "0px", marginBlock: "17px", left: "20px" }}
              maxDate={endDateCreate}
              // minDate={new Date()}
              minDate={startDateCreate}
              inputClassName={"description_inputf d-flex align-items-center"} />
            {renderError('Please select date session', error.sessionDate)}
          </div>
          {/* } */}
          {/* <div className="col-md-12">
            <p className="whole_label">Timezone <span className="small_letter2"></span><span className="text-danger"> *</span></p>
            <select
              name=""
              value={sessionTimeZone}
              onChange={(e) => {
                setSessionTimeZone(e.target.value);
                setError({ ...error, timeZone: false });
              }}
              className="description_inputf">
              <option disabled value="">{`Please choose...`}</option>
              {timezone.map((item) => <option value={item.value}>{item.label}</option>)}
            </select>
            {renderError('Please select time zone', error.timeZone)}
          </div> */}
          <div className="col-md-12">
            <p className="whole_label">Available<span className="small_letter2"> times: </span></p>
            {renderError('Please select session time', error.startTime)}
            <div className="d-flex justify-content-space-between memlist_scroll mt-1 spacing_scroll" style={{ height: 200 }}>
              <div className="col-md-6">
                {timeList.length ? timeList.map((dt, i) =>
                  <div
                    key={i}
                    // className={`card mb-2 p-1 ${index == 0 ? "active" : ""}`}
                    className={` px-3`}
                    // style={{ background: "#F2F4F6" }}
                    // onClick={() => {
                    // }}
                    id={i}
                  >
                    <p className="affir_checkbox">
                      <input
                        type="radio"
                        name="members"
                        value={sessionStartTime}
                        checked={dt.start === sessionStartTime}
                        id={"flexCheckDefault"}
                        onChange={() => {
                          setSessionStartTime(dt.start);
                          setSessionEndTime(dt.end);
                          setError({ ...error, startTime: false });
                        }}
                      />
                      {formatAMPM(dt.start) + " - " + formatAMPM(dt.end)}
                    </p>

                  </div>
                ) : <p>No slots available</p>}
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <hr className="mt-4 px-3" />
            <Button isLoading={isSubmit} disabled={isSubmit} type="submit" id="reateProgram" text={sessionApiChange == "edit" ? 'Update Session' : 'Create New Session'} style={isSubmit ? { cursor: 'none' } : { width: "max-content", marginLeft: 0 }} className="description_btnsave " />
          </div>
        </div>
      </form >
    )
  }

  const renderSessionList = () => {
    return getSessionList.map((session, index) => {
      const canStartSession = !checkEndDate(session.sessionDate);
      console.log(canStartSession, session.sessionDate, "canStartSession")
      var time = new Date(session.createdAt);
      return (
        <div className="d-flex mb-3" key={index}>
          <span className="px-3 py-3 numbr">{index + 1 < 10 && "0"}{index + 1}</span>
          <div className="flex-grow-1 card d-flex px-4 py-3 flex-row justify-content-between align-items-center">
            <div>
              <h5>{session.title}</h5>
              <p className="mb-0">{changeDateFormatmmddyyyy(session.sessionDate)}</p>
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
            <div className="d-flex">
              <button
                className="btn btn-primary btn-custom-light"
                data-bs-toggle="modal" data-bs-target="#deleteSession"
                style={{ marginRight: "15px" }}
                onClick={() => {
                  setSessionId(session._id);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-primary btn-custom-light"
                // data-bs-toggle="modal" data-bs-target="#exampleModal"
                disabled={auth?.authUser?._id !== session?.createdById || !canStartSession} onClick={() => canStartSession && auth?.authUser?._id === session?.createdById && onStartSession(session?.sessionLink_doctor)} style={{ backgroundColor: canStartSession ? null : '#d81010' }}
              >
                {canStartSession ? 'start session' : 'session completed'}
              </button>
              <button
                className="btn btn-primary btn-custom-light ms-3"
                data-bs-toggle="modal" data-bs-target="#sessionModal"
                onClick={() => {
                  setSessionApiChange("edit");
                  setSessionId(session._id);
                  getSIngleSessionById(session._id)
                }}
              >
                <RiEdit2Fill className="me-2" /> Edit
              </button>
            </div>
          </div>
        </div>
      );
    })
  }
  return (
    <div className="px-5 mt-5">
      <div className="col-md-12 d-flex justify-content-between">
        <div className="w-80">
          <h4>Add Session</h4>
        </div>
        <div className="w-20 d-flex">
          <button className="btn btn-primary btn-custom" data-bs-toggle="modal" data-bs-target="#sessionModal"
            style={{ marginLeft: "150px" }}
            onClick={() => {
              getSessionById();
              setDescription("");
              setSessionName("");
              setSessionStartTime("");
              setSessionDate(new Date())
              setSessionApiChange("Add");
            }}
          > Add New Session</button>
        </div>
      </div>
      <div className="table_resouter mt-4">
        {isLoading ? (
          <center>
            <div
              style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
              class="spinner-border mt-3 mb-4"
              role="status"
            />
          </center>
        ) : getSessionList == "" ? (
          <Loader textClassName={`mt-0`} showBR={false} emptyTextKey={`addNewSession`} mainClassName={`active_n0data2`} />
        ) : renderSessionList()}
      </div>
      <div className="col-md-12 mt-5">
        <hr />
        <div className="d-flex justify-content-between">
          <div text={'Back'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width:"120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onBack()}>Back</div>

          <div text={'Continue'} style={{ cursor: 'pointer', backgroundColor: '#fff', color: 'black', border: '1px solid #bbb9b9', width:"120px" }} className="description_btnsave d-flex justify-content-center align-items-center" onClick={() => !isLoading && props.onSave()}>Continue</div>

        </div>
      </div>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="sessionModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header p-4">
              <h5 className="mb-0">{sessionApiChange == "edit" ? "Edit Session" : "Add New Session"}</h5>
              <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pb-4 px-4">
              {isLoading ? (
                <center>
                  <div
                    style={{ width: "3rem", height: "3rem", color: "#1f7e78" }}
                    class="spinner-border mt-3 mb-4"
                    role="status"
                  />
                </center>
              ) : (
                renderForm())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveSession;
