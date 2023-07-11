import React, { useState, useEffect } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { GoPrimitiveDot } from "react-icons/go";
import { getReminder } from "../../services/ReminderService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import ReminderList from "./ReminderList";

const Reminder = () => {
  let navigate = useNavigate();
  const auth = useAuth();
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    getReminderList2();
  }, []);

  const getReminderList2 = async () => {
    try {
      const response = await getReminder();

      if (response.status === 200) {
        setReminderList(response?.data?.data);
      } else {
        console.log(response?.data || response.message);
      }
    } catch (error) {
      setReminderList([]);
      error?.data?.data &&
        console.log(error?.data?.data || error.data?.message);
    }
  };
  return (
    <>
      <div className="reminder">
        <p className="reminder_title">
          reminders{" "}
          <RiEditBoxLine
            className="icon"
            data-bs-toggle="modal"
            data-bs-target="#remindlist"
          />
        </p>
        <div className="reminder_outerdiv87">
          {reminderList.length ? reminderList.map((clm,i) => {
            return (
                <div key={i} className="d-flex reminder_txt">
                  <GoPrimitiveDot className="icon" />
                  <p>{clm.reminder}</p>
                </div>
            );
          }) : <p class="mt-3 text-center message_headfour34" style={{color: "white" , fontSize: "14px"}}>Please add reminder...</p>}
        </div>
      </div>

      <ReminderList getReminderList2={getReminderList2} />
    </>
  );
};

export default Reminder;
