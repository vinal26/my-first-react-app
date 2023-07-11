import React from 'react';
import { GoPrimitiveDot } from "react-icons/go";
import SquareAvatar from '../../commonComponent/SquareAvatar';
import ApiConfig from '../../config/ApiConfig';
import { formatDate, formatNewDate } from '../../Utils/Helper';
import { format } from 'date-fns';

const MyPatientActiveProgramList = ({ list }) => {
  return (
    <>{list?.map((item) =>
      <div key={item._id} className="card shadow-sm rounded mt-3 px-3 py-4">
        <div className="row">
          <div className="col-md-1 text-center">
            <SquareAvatar
              src={ApiConfig.ImageUrl + 'programs/' + item.createdBy + '/' + item.programImage}
              className="member_listimage rounded"
            />
          </div>

          <div className="col-md-11">
            <h5>{item.programName}</h5>
            <p>{item.description}</p>
            <div className="table_resouter card bg-light p-2">
              <table class="table mb-0 table-borderless table_resinner4">
                <tbody>
                  <tr>
                    <td><span className="fw-bold">Start Date:</span> {formatNewDate(item.startDate)}</td>
                    <td className='text-capitalize'><span className="fw-bold">Program Type:</span> {item.programType}</td>
                    <td><span className="fw-bold">Status:</span> {item.status ? <span className='text-success'>◉ Active</span> : <span className='text-danger'>◉ In Active</span>}</td>
                  </tr>
                  <tr>
                    <td><span className="fw-bold">End Date:</span>  {formatNewDate(item.endDate)}</td>
                    <td><span className="fw-bold">Price:</span> {item.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>)}
    </>
  )
}

export default MyPatientActiveProgramList;