import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import Avatar from "../../commonComponent/Avatar";
import { formatDate } from "../../Utils/Helper";

const MyPatientCarePlanList = ({ list }) => {
  return (
    <>{list?.map((item) =>
        <div key={item._id} className="mypatient_activeprogram7 w-100 shadow-sm rounded card px-3 py-4 mx-0">
          <h5>{item.name}</h5>
          <p className="fw-light">{item.description}</p>
          <div className="table_resouter card bg-light p-2">
            <table class="table table-borderless table_resinner mb-0">
              <tbody>
                <tr style={{ lineHeight: "15px" }}>
                  <td>
                    Assign Date:
                    <span className="mypatcplan"> {formatDate(item.assignDate)}</span>
                  </td>
                  <td colSpan="2">
                    Duration:
                    <span className="mypatcplan"> {item.duration}</span>
                  </td>
                </tr>
                {/* <tr style={{ lineHeight: "15px" }}>
                  <td colSpan="3">
                    Goal :
                    <span className="mypatcplan">
                      Aggressive blood pressure control to target values
                      130/80
                    </span>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>)}
    </>
  );
};

export default MyPatientCarePlanList;
