import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MemberProfileCard from "./MemberProfileCard";
import MessageList from "../message/MessageList";
import GroupsHeader from "../groups/GroupsHeader";
import { GoPrimitiveDot } from "react-icons/go";
import Avatar from "../../commonComponent/Avatar";
import { AiOutlinePlus } from "react-icons/ai";
import AddMemberModal from "../groups/AddMemberModal";
import { deleteGroupService, deleteMemberService, getGroupbyId, updateGroupService } from "../../services/GroupService";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import { toastMsg } from "../../Utils/AllConstant";
import DeleteModal from "../../commonComponent/DeleteModal";
import { FaTrash } from "react-icons/fa";

const Members = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const [isLoading, setLoader] = useState(true);
  const [selectedGroupID, setSelectedGroupID] = useState()
  const [memberID, setMemberID] = useState()
  const [updateMember, setUpdateMembers] = useState([])
    const [selectedGroup, setSelectedGroup] = useState({})
    const [selectedGroupMembers, setSelectedGroupMembers] = useState([])
  let user = location?.state?.user || '';
  // console.log(user, "user");

  const getGroupDetails = async () => {
      try {
          const response = await getGroupbyId(user._id);
          if (response.status === 200) {
              // console.log(response.data.data, "response");
              setSelectedGroup(response?.data?.data[0]);
          }
      } catch (error) {
          // setLoader(false);
          console.log(error);
      }
  }
  const updateGroup = async () => {
    try {
      const response = await updateGroupService(selectedGroupID, {
        ...selectedGroup,
        groupMembers: [...selectedGroup?.groupMembers, ...selectedGroupMembers]
      });
      if (response) {
        showToastSuccess(toastMsg.updateGroup)
        // props.onRefresh()
        setSelectedGroupMembers([]);
        getGroupDetails();
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const deleteMember = async (member) => {
    try {
      const response = await deleteMemberService(selectedGroupID, member);
      if (response) {
        showToastSuccess(response?.data || 'Member deleted successfully.');

        getGroupDetails()
      } else {
        showToastError(response?.data || response.message || "Some error occurred")

      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
      navigate(-1);
    }
  }
  const deleteGroup = async () => {
    try {
      const response = await deleteGroupService(user._id);
      if (response) {
        showToastSuccess(response?.data || 'Group deleted successfully.');
        // onRefresh();
        navigate(-1);
        // getSessionById()
      } else {
        showToastError(response?.data || response.message || "Some error occurred")

        navigate(-1);
      }
    } catch (error) {
      showToastError(error?.data?.data || error.data?.message || "Some error occurred")
      navigate(-1);
    }
  }
  useEffect(() => {
    console.log(user, "selectedGroup");
    getGroupDetails();
  }, [])

  useEffect(() => {
    setSelectedGroupID(user._id)
  }, [user._id])
  return (
    <>
      <Navbar />

      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            {/* <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              {selectedGroup?.groupName}
              <span className="patient_lifestyle3">
                <GoPrimitiveDot />
                members
              </span>
            </p> */}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate("/")}>Groups</li>
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Details</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Members</li>
              </ol>
            </nav>

            <div className="row mt-4">

              {user ? (
                <div className="col-md-12">
                  <div className="group_header43 py-2 px-3 rounded mb-4">
                    <div className="row">
                      <div className="col-md-1 d-flex align-items-center">
                        <img src={
                          selectedGroup?.groupImage &&
                          selectedGroup?.groupImage
                        }
                          onError={(e) => {
                            e.target.src = "images/avatar.png"; //replacement image imported above
                          }}
                          alt="" />

                      </div>
                      <div className="col-md-11 d-flex justify-content-between align-items-center">
                          <div>
                            <span style={{ color: '#1f7e78' }}>{selectedGroup?.groupName}{""}</span>
                            <p className="m-0">{selectedGroup?.groupType}</p>
                            <p className="m-0" style={{ color: '#1f7e78' }}>{selectedGroup?.groupMembers?.length} Members</p>
                          </div>
                          <button className="btn btn-primary btn-custom" data-bs-toggle="modal" data-bs-target="#addmembermodal1">
                            <AiOutlinePlus /> Add Members
                          </button>
                          {/* <Link

                            to={`/groupupdate`}
                            state={{ user: user }}
                          >
                            <button style={{ marginRight: "20px", width: "20%" }} >Edit Group</button>
                          </Link> */}
                          {/* <button
                            className="start_call"
                            style={{ backgroundColor: '#d81010', marginRight: "15px", width: "20%" }}
                            data-bs-toggle="modal"
                            data-bs-target="#deleteGroup"
                          >
                            <span>{'Delete Group'}</span>
                          </button> */}

                      </div>
                    </div>
                  </div>
                  <DeleteModal
                    title={'Delete'}
                    content1={'Are you sure you want to delete'}
                    content2={'this group?'}
                    modalId={'deleteGroup'}
                    button2={'No'}
                    button1={'Yes'}
                    onDelete={() => deleteGroup()}
                  />
                  <AddMemberModal addMember={updateGroup} members={selectedGroup?.groupMembers} setMembers={setSelectedGroupMembers} />

                </div>) : null}

                {/* <div className="w-100 mt-4">
                  <div className="members_card text-center">

                    <p>{selectedGroup?.description}</p>
                  </div>
                </div> */}
              <DeleteModal
                title={'Delete'}
                content1={'Are you sure you want to delete'}
                content2={'this member?'}
                modalId={'deleteMember'}
                button2={'No'}
                button1={'Yes'}
                onDelete={() =>
                  deleteMember(memberID)
                  // console.log(memberID, "memberId")
                }
              />
              <div className="row">
                {selectedGroup?.groupMemerDetails?.map((item, index) => {
                  // console.log(item, "item")
                  return (

                    <div className="col-md-3 mt-2 " key={index}>
                      <div className="members_card text-center" style={{ position: "relative" }}>
                        <div style={{
                          position: "absolute",
                          right: "10px",
                          top: "10px"
                        }}>


                          <span onClick={() => setMemberID(item.user_id)} > <FaTrash
                            data-bs-toggle="modal"
                            data-bs-target="#deleteMember"
                            className="like_group" /></span>
                        </div>
                        <Avatar image={item.userprofilePicture} />

                        <p>{item.userName}</p>

                      </div>
                    </div>

                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Members;
