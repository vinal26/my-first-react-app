import React from "react";
import Avatar from "../../commonComponent/Avatar";

const AllPatientProfile = () => {
  return (
    <>
      <div className="allpatient_profile">
        <div className="text-center">
          <Avatar
            image={''}
          />
        </div>

        <div className="mt-3">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <p className="leftside">name:</p>
                </td>
                <td>
                  <p className="rightside">laxy smirth</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="leftside">DOB/Age:</p>
                </td>
                <td>
                  <p className="rightside">22/08/1995 (26)</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="leftside">Gender:</p>
                </td>
                <td>
                  <p className="rightside">9989778890</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="leftside">Email:</p>
                </td>
                <td>
                  <p className="rightside">laxy@gmail.com</p>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="leftside">Address:</p>
                </td>
                <td>
                  <p className="rightside">
                    Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
                    Bangalore-560016
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2" className="text-center">
                  <p className="leftside  mt-2">quick links</p>
                </td>
              </tr>

              <tr>
                <td colspan="2">
                  <p className="mergeside  mt-2">
                    Billing and payments Reports
                  </p>
                </td>
              </tr>

              <tr>
                <td colspan="2">
                  <p className="mergeside">Assign a program</p>
                </td>
              </tr>

              <tr>
                <td colspan="2">
                  <button className="mt-3">send message</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllPatientProfile;
