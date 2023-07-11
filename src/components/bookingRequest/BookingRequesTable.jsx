import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import { confirmBookingStatus, getBookingByStatus, getBookings, updateBookingStatus } from "../../services/DoctorService";
import { createZoomMeetingService } from "../../services/ZoomService";
import { convertTime12to24, formatAMPM, showToastError, showToastSuccess, validDate } from "../../Utils/Helper";
import DateInput from "../../commonComponent/CutomDatePicker";

const BookingRequesTable = () => {
  const [BookingList, setBookingList] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date())
  let initialDate = format(new Date(), "yyyy-MM-dd");
  const navigate = useNavigate();

  const getBookingList = async (date) => {
    try {
      const response = await getBookingByStatus(date, "pending");
      if (response.status === 200) {
        setBookingList(response?.data?.data.reverse());
      } else {
        showToastError(response?.data || response.message)
      }
      setLoader(false);
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
        // "start_time": request.booking_date + convertTime12to24(time24h),
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
            getBookingList(format(selectedDate, "yyyy-MM-dd"));
          } else {
            showToastError(response?.data || response.message);
          }
        }
      }
      else {
        const response = await confirmBookingStatus(payload);
        if (response.status === 200) {
          showToastSuccess(response?.data?.data)
          getBookingList(format(selectedDate, "yyyy-MM-dd"));
        } else {
          showToastError(response?.data || response.message);
        }
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message)
    }
  }

  useEffect(() => {
    getBookingList(initialDate);
  }, [initialDate])


  return (
    <>
      {/* <div className="table_resouter">
        {BookingList.length ? <table className="table appointment_table table_resinner2 booking_request_table">
          <thead>
            <tr className="text-center">
              <th scope="col">name</th>
              <th scope="col">age</th>
              <th scope="col">gender</th>
              <th scope="col">date</th>
              <th scope="col">time</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody className="mb-5">
            {BookingList.map(dt => {
              let disabled = validDate(format(new Date(dt?.booking_date || dt?.date), "MM-dd-yyyy"));
              return <tr key={dt?._id} className={`text-center mt-5`}>
                <td>{dt?.full_name && dt?.full_name}</td>
                <td>{dt?.age && dt?.age}</td>
                <td>{dt?.gender && dt?.gender}</td>
                <td>{format(new Date(dt?.booking_date), "MM-dd-yyyy")}</td>
                <td className="text_unset">{dt?.time ? dt?.time : "N/A".toLowerCase()}</td>
                <td>
                  {!disabled && <button className={`border-0 rounded-circle p-1 text-white bg-success`}
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    title={`Accept ${disabled == true ? "Disabled" : ""}`}
                    style={{ width: "42px", height: "42px" }}
                    disabled={disabled || false}
                    onClick={() => updateBooking({ "bookingId": dt?._id, "status": "confirmed" }, dt)}
                  >
                    <FiCheck
                      size={"2em"}
                      className="icon"
                    />
                  </button>}
                  <button className="border-0 ms-2 rounded-circle p-1 text-white bg-danger"
                    data-bs-toggle="tooltip" data-bs-placement="top"
                    title="Deny"
                    style={{ width: "42px", height: "42px" }}
                    onClick={() => updateBooking({ "bookingId": dt._id, "status": "cancelled" }, dt)}
                  >
                    <FiX
                      size={"2em"}
                      className="icon"
                    />
                  </button>
                </td>
              </tr>
            })}
          </tbody>
        </table> : <div className="card p-2"><div className="card-body ml-10">There are currently no appointments.</div></div>}
      </div> */}
      <div className="mt-4" style={{ backgroundColor: "white" }}>
        <div className="d-flex  " >
          <div className="col-md-8 mt-3 ">
            <h4 className="px-4 mt-2">Booking Requests</h4>
          </div>
          <div className="col-md-4 mt-3 d-flex">
            <div className="col-md-6 px-4">
              <button className="description_btntoday w-100" style={{
                backgroundColor: "#1f7e78",
                borderColor: "#1f7e78",
              }} onClick={() => { setSelectedDate(new Date()); getBookingList(format(selectedDate, "yyyy-MM-dd")); }}>Today</button>
            </div>
            <div className="col-md-6 px-4">
              <DateInput
                value={selectedDate}
                onChangeDate={(date) => {
                  // console.log(date, "dateee")
                  setSelectedDate(date)
                  // setError({ ...error, start_date: false })
                  getBookingList(format(date, "yyyy-MM-dd"));

                }}
                // maxDate={endDateCreate}
                // minDate={new Date()}
                inputClassName={"description_inputf d-flex align-items-center"} />
            </div>
          </div>
        </div>
        <hr style={{ marginTop: "-15px" }} />
        <div className="table_resouter upcoming_scroll_div mx-3">
          {isLoading ? (<center>
            <Loader visible={isLoading}
              style={{ top: "-15px", position: "relative" }} /> </center>)
            : BookingList.length ? (
              <table className="table appointment_table1 table_resinner2 ">
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
                <tbody className="mb-5 ">
                  {BookingList.length && BookingList?.map(dt => {
                    let disabled = validDate(format(new Date(dt?.bookingDate), "MM-dd-yyyy"));
                    // let changeDateFormat = dt?.booking_date?.split("-")
                    return <tr key={dt?._id} className={`text-center mt-5`}>
                      <td>{dt?.userId?.full_name && dt?.userId?.full_name}</td>
                      {/* <td>{dt?.age && dt?.age}</td> */}
                      <td>{dt?.type === "session" ? "Individual Session" : "Group Session"}</td>
                      <td>{format(new Date(dt?.bookingDate), "MM-dd-yyyy")}</td>
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
            ) : (<div className="card p-2 mx-2"><div className="card-body">There are currently no booking requests for this date.</div></div>)}

        </div>
      </div>
    </>
  );
};

export default BookingRequesTable;
