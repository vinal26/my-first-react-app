import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { getBookingsByDate } from "../../services/DoctorService";
import Loader from "../../commonComponent/Loader";
import { updateBookingStatus } from "../../services/DoctorService";
import { showToastSuccess, showToastError, onStartSession } from "../../Utils/Helper";
import { getUserInfoService } from "../../services/PatientService";
import { useNavigate } from "react-router-dom";

const AppointmenTable = () => {
  const [BookingList, setBookingList] = useState([]);
  const [isLoading, setLoader] = useState(true);
  let navigate = useNavigate();

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

  const getTodaysBookingList = async () => {
    let date = format(new Date(), "yyyy-MM-dd");

    try {
      const response = await getBookingsByDate(date);
      if (response.status === 200) {
        //console.log(response?.data);
        setBookingList(response?.data?.data);
      } else {
        alert(response?.data || response.message);
      }
      setLoader(false)
    } catch (error) {
      error?.data?.data && alert(error?.data?.data || error.data?.message);
    }
  }

  useEffect(() => {
    getTodaysBookingList();
  }, [])

  const updateBooking = async (payload) => {
    try {
      const response = await updateBookingStatus(payload);
      if (response.status === 200) {
        showToastSuccess(response?.data?.message)
        getTodaysBookingList();
      } else {
        showToastError(response?.data || response.message)
      }
    } catch (error) {
      error?.data?.data && showToastError(error?.data?.data || error.data?.message)
    }
  }

  const userOnClickHandler = async (user_id) => {
    const user_data = await getUserData(user_id);
    if (user_data.length != 0) {
      navigate("/allpatientoverview", { state: { user: user_data, route: true } })
    }
  }


  return (
    <>
      <div className="table_resouter upcoming_scroll_div">
        <hr style={{ marginTop: "6px" }} />
        {isLoading ? (<center>
          <Loader visible={isLoading}
            style={{ top: "-15px", position: "relative" }} /> </center>) :
          BookingList.length ? (<table className="table appointment_table table_resinner2">
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
                let changeDateFormat = dt?.booking_date?.split("-");
                return <tr key={dt._id} className="text-center mt-5">
                  <td>
                    <span
                      onClick={() => { userOnClickHandler(dt?.userId) }}
                      className="link_profile"
                    >
                      {dt.full_name && dt.full_name}
                    </span>
                  </td>
                  <td>{dt.age && dt.age}</td>
                  <td>{dt.gender && dt.gender}</td>
                  <td>{`${changeDateFormat[1]}-${changeDateFormat[2]}-${changeDateFormat[0]}`}</td>
                  <td className="text_unset">{dt.time}</td>
                  <td>
                    <button onClick={() => onStartSession(dt?.sessionLink_doctor)} className="start_call">
                      <span>start call</span>
                    </button>
                    <button
                      className="appointment_cancel ms-2"
                      onClick={() => updateBooking({ "bookingId": dt._id, "status": "cancelled" })}>
                      <span>cancel</span>
                    </button>
                  </td>

                </tr>
              })}

            </tbody>
          </table>) : (<div className="card p-2"><div className="card-body">There are currently no appointments.</div></div>)
        }
      </div>
    </>
  );
};

export default AppointmenTable;
