import React, { useEffect, useState } from "react";
import "../appointment/style.css";
import { Link } from "react-router-dom";
import "./style.css";
import Avatar from "../../commonComponent/Avatar";
import Loader from "../../commonComponent/Loader";
import { getUpcomingGroupSession } from "../../services/DoctorService";
import { changeDateFormat, onStartSession, showToastError } from "../../Utils/Helper";

const GroupSession = () => {
  const [SessionList, setSessionList] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const getSessionList = async () => {
    try {
      const response = await getUpcomingGroupSession();
      if (response.status === 200) {
        console.log(response, "response data");
        // const result = response?.data?.data?.filter((value) => {
        //   if (changeDateFormat(value?.sessionDate) < changeDateFormat(new Date())) {

        //     return (
        //       value
        //     );
        //   }
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

  useEffect(() => {
    getSessionList();
  }, [])

  return (
    <>



      <div className="table_resouter upcoming_scroll_div" style={{ width: "100%" }}>
        <hr style={{ marginTop: "6px" }} />
        {isLoading ? (<center>
          <Loader visible={isLoading}
            style={{ top: "-15px", position: "relative" }} /> </center>)
          : SessionList.length ? (
            <table className="table appointment_table table_resinner2">
              <thead>
                <tr className="text-center">
                  <th scope="col">image</th>
                  <th scope="col">group name</th>
                  <th scope="col">session</th>
                  <th scope="col">people</th>
                  <th scope="col">date</th>
                  <th scope="col">time</th>
                  <th scope="col" colSpan={2}>active</th>
                </tr>
              </thead>

              <tbody className="mb-5" >
                {SessionList.length && SessionList?.map(dt => {
                  console.log(dt.epMasterId.title.length);
                  let groupName = dt.epMasterId.title.length > 20
                    ? dt.epMasterId.title.substring(0, 20) + "..."
                    : dt.epMasterId.title.substring(0, 20)
                  return <tr key={dt._id} className="text-center mt-5">
                    <td>
                      <Avatar image={dt.image} className="group_profile" />
                    </td>
                    <td className="tooltip-td">{groupName} <span className="tooltiptext">{dt.epMasterId.title}</span></td>
                    <td>{dt.title}</td>
                    <td>{dt.bookUser ? dt.bookUser.length : 0}/{dt.epMasterId.approvedUser ? dt.epMasterId.approvedUser.length : 0} people coming</td>
                    <td>{dt.sessionDate}</td>
                    <td style={{ textTransform: "lowercase" }}>{dt.sessionTime}</td>
                    <td>
                      <button onClick={() => onStartSession(dt?.sessionLink_doctor)} className="start_call">
                        <span>start</span>
                      </button>
                    </td>
                    <td>
                      <button className="appointment_cancel">
                        <span>cancel</span>
                      </button>
                    </td>
                  </tr>
                })}
              </tbody>

            </table>) :
            (<div className="card p-2"><div className="card-body">There are currently no group sessions.</div></div>)
        }
      </div>

    </>
  );
};

export default GroupSession;
