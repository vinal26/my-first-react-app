import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { doctorContext } from "../../Context/DoctorContext";
import Avatar from "../../commonComponent/Avatar";
import { changeDoctorStatusService } from "../../services/DoctorService";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";

const DoctorViewProfile = () => {
  const { state ,dispatch, setUpdateDoctorStatus,updateDoctorStatus} = useContext(doctorContext);
  const { isAdmin } = useAuth();
  const { doctor } = state;

  const navigate = useNavigate();

  const changeStatus = async () => {
    try {
      const params = { status: doctor?.status === 'active' ? 'inactive' : 'active' }
      const response = await changeDoctorStatusService(params, doctor._id);
      // TODO: Add changes when patient inactive
      await dispatch({
        type: "Update Profile",
        profile: {...state.doctor , status : doctor?.status === 'active' ? 'inactive' : 'active' }
      });
      setUpdateDoctorStatus(!updateDoctorStatus)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="allpatient_profile mt-4">
        {doctor ? (
          <div className="text-center">
            <div class="d-flex flex-column align-items-end">
              <p className="patient_active_in">
                active{" "}
                <label class="switch">
                  <input onClick={() => isAdmin && changeStatus()} type="checkbox" checked={doctor?.status === 'active' ? true : false} />
                  <span class="slider round"></span>
                </label>
              </p>
            </div>
            <Avatar
              image={
                doctor.profilePicture ? ApiConfig.ImageUrl + 'doctor/' + doctor._id + '/' + doctor.profilePicture : "/images/avatar.png"
              }
              className="member_listimage"
            />
          </div>
        ) : null}

        <div className="mt-3">
          <table class="table table-borderless">
            <tbody>
              {doctor ? (
                <>
                  <tr>
                    <td>
                      <p className="leftside">Full name:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {doctor.first_name && doctor.last_name
                          ? `${doctor.first_name} ${doctor.last_name}`
                          : "Not Defined"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="leftside">Email:</p>
                    </td>
                    <td>
                      <p className="rightside">{doctor.email}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="leftside">Years of Experience:</p>
                    </td>
                    <td>
                      <p className="rightside">{doctor.yearsOfExperience}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="leftside">Category:</p>
                    </td>
                    <td>
                      <p className="rightside">{doctor.docCategory}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="leftside">Qualification:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {Array.isArray(doctor.qualifications)
                          ? doctor?.qualifications.length > 0
                            ? doctor.qualifications.map((item, idx, arr) => {
                              return (
                                <span key={item.qualificationId}>
                                  {item.name}
                                  {arr.length - 1 == idx ? "" : ","}{" "}
                                </span>
                              );
                            })
                            : "N/A"
                          : doctor.qualifications}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p className="leftside">Publication:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {Array.isArray(doctor.publications)
                          ? doctor.publications.length > 0
                            ? doctor.publications.map((item, idx, arr) => {
                              return (
                                <span key={idx}>
                                  {item}
                                  {arr.length - 1 == idx ? "" : ","}{" "}
                                </span>
                              );
                            })
                            : "N/A"
                          : doctor.publications}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <p className="leftside">Services:</p>
                    </td>
                    <td>
                      <p className="rightside">
                        {Array.isArray(doctor.services)
                          ? doctor?.services.length > 0
                            ? doctor.services.map((item, idx, arr) => {
                              return (
                                <span key={item.serviceId}>
                                  {item.name}
                                  {arr.length - 1 == idx ? "" : ","}{" "}
                                </span>
                              );
                            })
                            : "N/A"
                          : doctor.services}
                      </p>
                    </td>
                  </tr>
                  { isAdmin ? <tr>
                    <td colspan="2">
                      <Link
                        to="/editdoctor"
                        state={{ user: doctor}}
                        className="link_text">
                        <button className="mt-3">Edit Profile</button>
                      </Link>
                    </td>
                  </tr> : null}
                </>
              ) : (
                <p className="p-3 mb-0">
                  <b>Select a profile</b>
                </p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DoctorViewProfile;
