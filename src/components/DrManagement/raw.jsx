import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { doctorContext } from "../../Context/DoctorContext";

const DoctorViewProfile = () => {
  const { state } = useContext(doctorContext);
  const { doctor } = state

  return (
    <>
      <div className="view_profile12">
        {/* <div className="row">
          <div className="col-md-1 actlist_wid1">
            <img src="images/profile.png" alt="" className="drprofile_image" />
          </div>
          <div className="col-md-11 actlist_wid2">
            <p className="drprofile_title">Profile</p>
          </div>
        </div> */}

        {/* <hr className="drprofile_hr" /> */}
        <div className="table_resouter">                       
          {doctor ?
          <> <table class="table table-borderless table_resinner4">
              <thead>
              </thead>
              <tbody>
                <tr className="goal_table">
                  <td>full name:</td>
                  <td>email:</td>
                  <td>Years of Experience:</td>
                  <td>Qualification:</td>
                  <td>Publication:</td>
                </tr>
                <tr className="goal_table2">
                  <td>{doctor.first_name && doctor.last_name ? `${doctor.first_name} ${doctor.last_name}` : "Not Defined"}</td>
                  <td>{doctor.email}</td>
                  <td className="active_care">{doctor.yearsOfExperience}</td>
                  <td>{doctor.qualifications}</td>
                  <td>{doctor.publications}</td>
                </tr>
              </tbody>
            </table>
          
             <div className="row">
          <div className="col-md-12">
            <Link to="/editprofile" className="link_text">
              <button className="description_btnsave mt-2">edit profile</button>
            </Link>
          </div>
          </div></>
         :
          <p className="p-3 mb-0"><b>Select a profile</b></p>
          }
        </div>
      
      </div>
    </>
  );
};

export default DoctorViewProfile;
