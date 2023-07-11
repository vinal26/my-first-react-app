import React, { useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft, HiOutlineRefresh } from "react-icons/hi";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import GroupFeeds from "./GroupFeeds";
import DeleteModal from "../../commonComponent/DeleteModal";
import { deleteGroupService, getGroupbyId } from "../../services/GroupService";
import { showToastError, showToastSuccess } from "../../Utils/Helper";
import { useEffect } from "react";

const GroupDetails = (onRefresh) => {
    const [selectedGroup, setSelectedGroup] = useState({})
    const navigate = useNavigate();
    let location = useLocation();
    let user = location?.state?.user || '';
    // console.log(user, "user")
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
    useEffect(() => {
        getGroupDetails();
        console.log(selectedGroup, "selectedGroup")
    }, []);
    const deleteGroup = async () => {
        try {
            const response = await deleteGroupService(user._id);
            if (response) {
                showToastSuccess(response?.data || 'Group deleted successfully.');
                onRefresh();
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
    return (
        <>
            <Navbar />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <p className="dashboard_title">
                            <HiOutlineArrowSmLeft
                                onClick={() => navigate(-1)}
                                className="icon"
                            />
                            groups
                            <span className="patient_lifestyle3">
                                <GoPrimitiveDot />
                                {selectedGroup?.groupName}
                            </span>
                        </p>
                        <div className="row">
                            {/* <div className="col-md-4">
                                <GroupLists grpSearch={grpSearch} setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup} />
                            </div> */}

                            <div className="col-md-12 p-4">
                                <div className="group_header43 rounded">
                                    <div className="row">
                                        <div className="col-md-1 mchat_wid1">
                                            <img src={selectedGroup?.groupImage && selectedGroup?.groupImage} onError={(e) => {
                                                e.target.src = "images/avatar.png" //replacement image imported above
                                            }} alt="" className="member_listimage" />
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
                                        <div className="col-md-11 mchat_wid2">
                                            <h5>
                                                {selectedGroup?.groupName}

                                                <button
                                                    className="start_call"
                                                    style={{ backgroundColor: '#d81010', marginLeft: 10 }}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#deleteGroup"
                                                >
                                                    <span>{'Delete Group'}</span>
                                                </button>
                                                <Link

                                                    to={`/groupupdate`}
                                                    state={{ selectedGroup }}
                                                >
                                                    {/* <Link to={`/groupupdate?groupId=${user?._id}`}> */}
                                                    <button style={{ marginRight: "20px" }} >Edit Group</button>
                                                </Link>

                                            </h5>
                                            <p>{selectedGroup?.groupType}</p>
                                            <p style={{ marginTop: "-15px" }}>{selectedGroup?.groupMembers?.length} Members</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <GroupFeeds selectedGroup={selectedGroup} /> */}
                                <hr className="group_hr34" />
                                {/* <div className="row">
                                    <div className="col-md-12 text-center mt-3">
                                        <button className="mt-1 group_careteambtn">Activities</button>
                                        <Link className="link_text" to="/members" >
                                            <button className="group_careteambtn">members</button>
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupDetails;
