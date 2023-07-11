import React, { useState } from "react";
import Loader from "../../commonComponent/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { changePatientStatusService } from "../../services/DoctorService";
import { sendInvitationService } from "../../services/PatientOverviewServices";
import { showToastSuccess } from "../../Utils/Helper";

const AllPatientListRightSection = (props) => {
  const [isLoading, setLoader] = useState(true);
  const { isAdmin } = useAuth();
  const auth = useAuth();
  const navigate = useNavigate();

  function getAge() {
    var today = new Date();
    var birthDate = new Date(props.selectedPatient.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const changeStatus = async () => {
    try {
      const params = { status: props.selectedPatient?.status === 'active' ? 'inactive' : 'active' }
      const response = await changePatientStatusService(params, props.selectedPatient._id);
      props.onStatusChange(props.selectedPatient?.status === 'active' ? 'inactive' : 'active');
      // TODO: Add changes when patient inactive
    } catch (error) {
      console.log(error);
    }
  }

  const sendInvitation = async () => {
    try {
      const response = await sendInvitationService(props.selectedPatient);
      console.log('Send invitation reply.....', response)
      if (response) {
        showToastSuccess('Invitation send successfully');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigateToChat = () => {
    auth.createDialog(props.selectedPatient);
    navigate('/messages', { state: { route: 'allpatientlist' } })
  }

  return (
    <>
      <div className="allpatient_profile mt-2">
        {props.selectedPatient ? (
          <div className="text-center">
            <div class="d-flex flex-column align-items-end">
              <p className="patient_active_in">active <label className="switch">
                <input type="checkbox" onClick={() => isAdmin && changeStatus()} checked={props.selectedPatient?.status === 'active' ? true : false} />
                <span className="slider round"></span>
              </label></p>
            </div>
            <img
              src={
                props.selectedPatient.profilePicture &&
                props.selectedPatient.profilePicture
              }
              onError={(e) => {
                e.target.src = "images/avatar.png"; //replacement image imported above
              }}
              alt=""
            />
          </div>
        ) : null}

        <div className="mt-3">
          <table class="table table-borderless">
            <tbody>
              {props.selectedPatient ? (
                <>
                  <tr>
                    <td>
                      <p className="leftside">name:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {props.selectedPatient.full_name}{" "}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="leftside">DOB/Age:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {props.selectedPatient.dob} ({getAge()})
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="leftside">Gender:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {props.selectedPatient.gender}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="leftside">Email:</p>
                    </td>
                    <td>
                      <p className="rightside">{props.selectedPatient.email}</p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p className="leftside">Address:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {props.selectedPatient.city}{" "}
                        {props.selectedPatient.country}{" "}
                        {props.selectedPatient.stste}
                      </p>
                    </td>
                  </tr>
                  {/* {console.log(props.selectedPatient, "onBoarding")} */}
                  {props.selectedPatient?.onBoarding ?
                    < tr >
                      <td colspan="2" className="text-center">
                        <div >
                          <p onClick={navigateToChat} className="mergeside">
                            Send a Message
                          </p>
                        </div>
                      </td>
                    </tr> : null}

                  <tr>
                    <td colspan="2">
                      <div className="btn-group allpatient_seprate_btn" >
                        <Link
                          // to="/allpatientoverview"
                          to="/allpatientinfo"
                          state={{ user: props.selectedPatient }}
                          className="link_text">
                          <button className="mt-3 col-md-12 button_view_profile">view profile</button>
                        </Link>

                        <Link
                          to="/editpatient"
                          state={{ user: props.selectedPatient }}
                          className="link_text">
                          <button className="mt-3 button_view_profile button_view_profile_left">Edit profile</button>
                        </Link>

                        {props.selectedPatient.status?.toLowerCase() === 'inactive' && !props.selectedPatient.onBoarding ?
                          <Link
                            to=""
                            state={{ user: props.selectedPatient }}
                            className="link_text">
                            <button onClick={() => sendInvitation(props.selectedPatient._id)} className="mt-3 button_view_profile button_view_profile_left">Resend invitation</button>
                          </Link> : null}
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                <center>
                  {/* <div
                  style={{ width: "3rem", height: "3rem", color: "#1f7e78" , top: "170px", 
                position: "relative"}}
                  class="spinner-border mt-3 mb-5"
                  role="status"
                /> */}

                  <Loader
                    visible={false}
                    style={{ top: "100px", position: "relative" }}
                  />
                </center>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllPatientListRightSection;
