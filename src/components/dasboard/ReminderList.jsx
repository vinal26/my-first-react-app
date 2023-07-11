import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  AddReminder,
  getReminder,
  deleteReminder,
} from "../../services/ReminderService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import ToastBox from "../../commonComponent/ToastBox";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import { toastMsg } from "../../Utils/AllConstant";

const ReminderList = ({ getReminderList2 }) => {
  let navigate = useNavigate();
  const auth = useAuth();
  const [addReminder, setAddReminder] = useState("");
  const [reminderList, setReminderList] = useState([]);
  const [toastShow, setToastShow] = useState(false);
  const [checkOne, setCheckOne] = useState(false);
  const [addingVal, setAdd] = useState(false);
  const [valueError , setValueError] = useState(false);
  useEffect(() => {
    getReminderList();
  }, []);

  const handleReminder = async (e) => {
    e.preventDefault();
    if(addReminder == '')
    {
      setValueError(true); return;
    }
    setAdd(true);
    setValueError(false);
    var parms = {};
    parms["reminder"] = addReminder.trim();

    try {
      const response = await AddReminder(parms);
      if (response.status === 200) {
        if (response?.data.messsage === "Invalid token") {
          showToastError(toastMsg.tokenExpire)
          auth.setLogout();
          navigate("/", { replace: true });
        } else {
          showToastSuccess(toastMsg.reminderCreated)
          setCheckOne(true);
          setAddReminder("");
        }
        setAdd(false);
      } else {
        showToastError(response?.data || response.message || toastMsg.errorMssg)
      }
    } catch (error) {
      showToastError(error?.data?.data || error?.data?.message || toastMsg.errorMssg)
    }

    getReminderList();
    getReminderList2();
    console.log(parms);
  };

  const getReminderList = async () => {
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

  const removeFav = async (id, e) => {

    try {
      const response = await deleteReminder(id);
      if (response.status === 200) {
        if (response?.data.messsage === "Invalid token") {
          showToastError(toastMsg.tokenExpire)
          auth.setLogout();
          navigate("/", { replace: true });
        } else {
          showToastSuccess(toastMsg.reminderDeleted)
          setCheckOne(false);
        }
      } else {
        showToastError(response?.data || response.message || toastMsg.errorMssg)
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || toastMsg.errorMssg)
    }
    getReminderList();
    getReminderList2();
  };
  return (
    <>
      <div
        className="modal fade"
        id="remindlist"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content chooselist_mdiv8">
            <div className="modal-body">
              <p className="choosep_title text-center">
                reminders <ImCross data-bs-dismiss="modal" className="icon" />
              </p>

              <div className="row mt-4">
                {reminderList.map((clm, i) => {
                  return (
                    <div key={i} className="col-md-12 ">
                      <div className="btn-group reminder_gbtn">
                        <div className="reminder_inputf5 d-flex align-items-center" >{clm.reminder}</div>

                        <div className="boxmod">
                           <RiDeleteBin2Fill className="add" onClick={(e) => removeFav(clm._id, e)}/> 
                          {/* <input
                            type="checkbox"
                            onChange={(e) => removeFav(clm._id, e)}
                            className="delete"
                          /> */}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <form onSubmit={handleReminder}>
                  <div className="col-md-12 ">
                    <div className="btn-group reminder_gbtn">
                      <input
                       // pattern="^\S.*$"
                        title="Check for leading whitespaces"
                        name="addPoints"
                        placeholder="Add Point*"
                        className="reminder_inputf5"
                        value={addReminder}
                        onChange={(e) => setAddReminder(e.target.value.trimStart())}
                      />
                      
                    </div>       
                    {valueError && addReminder==''  && <div className="text-danger mt-1" style={{marginLeft:"3%"}}>Please add point</div>}             
                  </div>

                  <div className="col-md-12 text-center">
                    <button disabled={addingVal} type="submit" className="reminder_addnew45">
                      add new
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default ReminderList;
