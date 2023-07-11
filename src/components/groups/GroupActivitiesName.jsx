import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCareplanList } from "../../services/GroupService";
import GroupCareplanList from "./GroupCareplanList";
import GroupProgramList from "./GroupProgramList";

const GroupActivitiesName = ({ selectedGroup, posts, getGroupPosts }) => {
  const navigate = useNavigate();
  const [careShow, setCareShow] = React.useState(false);
  const [programShow, setProgramShow] = React.useState(false);
  // const getAssignedCareplanList = async () => {
  //   console.log('called!!');
  //   try {
  //     const response = await getCareplanList({ 'careplanIds': selectedGroup?.careplanId });
  //     if (response.status === 200) {
  //       console.log(response?.data?.data, "careplanList")
  //       setCarePlanList(response?.data?.data);
  //       // setFilterData(response?.data?.data);
  //     }
  //   } catch (error) {
  //     // setLoader(false);
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   // console.log(props.selectedgroup);
  //   getAssignedCareplanList();
  // }, [selectedGroup])
  return (
    <>
      <div className="groupname">
        <p className="name mb-2">{selectedGroup.groupName}</p>

        <img
          src={selectedGroup?.groupImage && selectedGroup?.groupImage}
          onError={(e) => {
            e.target.src = "images/defaultPlaceholder.jpg"; //replacement image imported above
          }}
          alt=""
          className="rounded"
        />
        <p className="gparagraph mt-3">{selectedGroup.description}</p>

        <div className="row">
          <div className="col-md-6">
            {/* <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green pointer" onClick={() => setProgramShow(true)}>Programs</span> */}
            <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green pointer"
              onClick={() =>
                navigate("/groupprograms", {
                  state: {
                    selectedgroup: selectedGroup
                  },
                })
              }>Programs</span>
          </div>
          <div className="col-md-6">
            <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green pointer"
              onClick={() =>
                navigate("/groupcareplans", {
                  state: {
                    selectedgroup: selectedGroup
                  },
                })
              }>Care Plans</span>
          </div>

          <div className="col-md-6">
            <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green pointer"
              onClick={() =>
                navigate("/groupposts", {
                  state: {
                    selectedGroup: selectedGroup
                  },
                })
              }
            >
              Posts
            </span>
          </div>

          <div className="col-md-6">
            <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green pointer"
              onClick={() =>
                navigate("/grouppolls", {
                  state: {
                    selectedGroup: selectedGroup
                  },
                })
              }
            >Polls</span>
          </div>
          <div className="col-md-6">
            <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green pointer"
              onClick={() =>
                navigate("/groupfiles", {
                  state: {
                    selectedGroup: selectedGroup
                  },
                })
              }
            >Files</span>
          </div>
          <div className="col-md-6">
            <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green">Reports</span>
          </div>
          <div className="col-md-6">
            <Link className="link_text" to="/members" state={{ user: selectedGroup }}>
              <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green">Members</span>
            </Link>
          </div>
          <div className="col-md-6">
            <span className="badge w-100 rounded-pill py-2 px-3 my-1 bg-green">Events</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <GroupCareplanList
        show={careShow}
        onHide={() => setCareShow(false)}
        selectedgroup={selectedGroup}
      />
      <GroupProgramList
        show={programShow}
        onHide={() => setProgramShow(false)}
        selectedgroup={selectedGroup}
      />
    </>
  );
};

export default GroupActivitiesName;
