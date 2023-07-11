import React from "react";
import { Link } from "react-router-dom";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import ApiConfig from "../../config/ApiConfig";

const ActiveProgramListRightSection = ({ program }) => {
  let startDates = program?.startDate?.split("T");
  let endDates = program?.endDate?.split("T");
  let createDates = program?.createdAt?.split("T");
  if (!program) {
    return
  }

  return (
    <>
      <div className="active_program-position">
        <div className="allpatient_profile mt-2">
          <div className="row">
            <div className="col-md-10">
              <p className="viewrecipetitle">
                {program.programName}
              </p>
              <p className="viewrecipe_server">
                {program.description}
              </p>
            </div>
            <div className="col-md-2">
              {/* <div className="activeeditbtn_back"> */}
              <center>
                {/* <Link to={`/groupupdate?groupId=${user?._id}`}> */}
                <Link
                  to="/activeprogram"
                  state={{ program, isFromCreate: false }}
                  className="link_text">
                  <button className="mt-5 editbtn_active_program">Edit</button>
                </Link>
              </center>

            </div>

            <div className="row">
              <div className="col-md-4">
                <p className="editprogram_server">
                  Created by : <span>{program.createdByDoc}</span>
                </p>
              </div>

              <div className="col-md-4">
                <p className="editprogram_server">
                  Created on: <span>{createDates[0]} </span>
                </p>
              </div>

              <div className="col-md-4">
                <p className="editprogram_server">
                  Members: <span>{program?.programMembers}</span>
                </p>
              </div>
            </div>    </div>
          <hr className="viewrecipe_hr mt-4 mb-1" />
          <div className="text-center mt-4">
            <SquareAvatar
              src={ApiConfig.ImageUrl + 'programs/' + program.createdBy + '/' + program.programImage}
              className="squre_image2"
            />
          </div>

          <div className="row">
            <div className="col-md-4">
              <p className="editprogram_server">
                Program Title : <br /><span>{program.programName}</span>
              </p>
            </div>

            <div className="col-md-8">
              <p className="editprogram_server">
                Description: <br /><span>{program.description}</span>
              </p>
            </div>

          </div>

          <div className="row">
            <div className="col-md-3">
              <p className="editprogram_server">
                Start Date : <br /><span>{startDates[0]}</span>
              </p>
            </div>

            <div className="col-md-3">
              <p className="editprogram_server">
                End Date: <br /><span>{endDates[0]}</span>
              </p>
            </div>

            <div className="col-md-3">
              <p className="editprogram_server">
                No. of Participants: <br /><span>11K</span>
              </p>
            </div>
            {/* <div className="col-md-3">
              <p className="editprogram_server">
                Participants in waiting : <br /><span>4</span>
              </p>
            </div> */}
          </div>
        </div>
      </div>


    </>
  );
};

export default ActiveProgramListRightSection;
