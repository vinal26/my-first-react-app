import React, { useEffect, useState } from 'react'
import { getPastBookings } from '../../services/DoctorService';
import { getUserInfoService } from '../../services/PatientService';
import { useNavigate } from "react-router-dom";

function PastAppointments() {
    const [BookingList, setBookingList] = useState([]);
    let navigate = useNavigate();
    const getPastBookingList = async () => {

        try {
            const response = await getPastBookings();
            if (response.status === 200) {
                // console.log(response?.data);
                setBookingList(response?.data?.data);
            } else {
                alert(response?.data || response.message);
            }
        } catch (error) {
            error?.data?.data && alert(error?.data?.data || error.data?.message);
        }
    }

    useEffect(() => {
        getPastBookingList();
    }, [])

    const userOnClickHandler = async (user_id) => {
        const user_data = await getUserData(user_id);
        if (user_data.length != 0) {
            navigate("/allpatientoverview", { state: { user: user_data, route: true } })
        }
    }

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
            <div className="table_resouter upcoming_scroll_div">
                <hr style={{ marginTop: "6px" }} />
                {BookingList.length ? <table className="table appointment_table table_resinner2">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">name</th>
                            <th scope="col">age</th>
                            <th scope="col">gender</th>
                            {/* <th scope="col">blood pressure</th> */}
                            <th scope="col">Date</th>
                            <th scope="col">time</th>
                            {/* <th scope="col">action</th> */}
                        </tr>
                    </thead>
                    <tbody className="mb-5">
                        {BookingList.map(dt => {
                            let changeDateFormat = dt?.booking_date?.split("-")
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
                                {/* <td>{dt.blood_pressure && dt.blood_pressure}</td> */}
                                <td>{`${changeDateFormat[1]}-${changeDateFormat[2]}-${changeDateFormat[0]}`}</td>
                                <td className="text_unset">{dt.time}</td>
                                {/* <td>
                    <button className="start_call">
                        <span>start call</span>
                    </button>
                    <button className="appointment_cancel ms-2">
                        <span>cancel</span>
                    </button>
                    </td> */}

                            </tr>
                        })}
                    </tbody>
                </table> : <div className="card p-2"><div className="card-body">There are currently no appointments.</div></div>}
            </div>
        </>
    )
}

export default PastAppointments