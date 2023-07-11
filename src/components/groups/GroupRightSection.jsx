import React, { useState } from "react";
import Loader from "../../commonComponent/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { changePatientStatusService } from "../../services/DoctorService";
import AddMemberModal from "./AddMemberModal";
import GroupFeeds from "./GroupFeeds";
import { ImAttachment } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { updateGroupService } from "../../services/GroupService";
import { useEffect } from "react";
import { showToastSuccess } from "../../Utils/Helper";
import { toastMsg } from "../../Utils/AllConstant";
import AddPostModal from "./AddPostModal";

const GroupRightSection = (props) => {
    const [isLoading, setLoader] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState({})
    const [selectedGroupID, setSelectedGroupID] = useState()
    const [selectedGroupMembers, setSelectedGroupMembers] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const { isAdmin } = useAuth();
    const auth = useAuth();
    const navigate = useNavigate();
    console.log(props, "props");

    const onselectgroup = (groupdetails) => {
        setSelectedGroup(groupdetails);
    };

    // const changeStatus = async () => {
    //     try {
    //         const params = { status: props.selectedPatient?.status === 'active' ? 'inactive' : 'active' }
    //         const response = await changePatientStatusService(params, props.selectedPatient._id);
    //         props.onStatusChange(props.selectedPatient?.status === 'active' ? 'inactive' : 'active');
    //         // TODO: Add changes when patient inactive
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const updateGroup = async () => {
        try {
            const response = await updateGroupService(selectedGroupID, {
                ...props.selectedGroup,
                groupMembers: [...props?.selectedGroup?.groupMembers, ...selectedGroupMembers]
            });
            if (response) {
                showToastSuccess(toastMsg.updateGroup)
                props.onRefresh()
                setSelectedGroupMembers([]);
            }
            setLoader(false);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(selectedGroupMembers);
    }, [selectedGroupMembers])

    // useEffect(() => {
    //     setSelectedGroupID(props.selectedGroup._id)
    // }, [props.selectedGroup._id])

    return (
        <>

            {props.selectedGroup ? (
                <div className="col-md-12">
                    <div className="group_header43 rounded">
                        <div className="row">
                            <div className="col-md-1 mchat_wid1 ">
                                <img src={
                                    props?.selectedGroup?.groupImage &&
                                    props?.selectedGroup?.groupImage
                                }
                                    onError={(e) => {
                                        e.target.src = "images/avatar.png"; //replacement image imported above
                                    }}
                                    alt="" />

                            </div>
                            <div className="col-md-11 mchat_wid2">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Link className="link_text" to="/members" state={{ user: props?.selectedGroup }}>
                                            <h5 style={{ color: '#1f7e78' }} className="ms-0 mb-3 fw-bold">{props?.selectedGroup?.groupName}</h5>
                                            <p style={{ color: '#1f7e78' }} className="ms-0">{props.selectedGroup.groupType}{" • "}{props?.selectedGroup?.groupMembers?.length} Members</p>
                                        </Link>
                                    </div>
                                    <div className="d-flex">
                                        {/* <Link to="/grouppostadd" state={{ groupID: props?.selectedGroup?._id }}>
                                            <button className="description_btnsave ms-2">

                                                <AiOutlinePlus /> Add Post
                                            </button>
                                        </Link> */}

                                        {/* Add Modal */}
                                        <button className="description_btnsave ms-2" onClick={() => setModalShow(true)}>
                                            <AiOutlinePlus /> Add New Post
                                        </button>

                                        <button className="description_btnsave ms-2 me-0" data-bs-toggle="modal" data-bs-target="#addmembermodal1">
                                            <AiOutlinePlus /> Add Members
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddMemberModal addMember={updateGroup} members={props?.selectedGroup?.groupMembers} setMembers={setSelectedGroupMembers} />
                    <GroupFeeds onRefresh={props.onRefresh} selectedGroup={props.selectedGroup} />
                    <AddPostModal gname={props?.selectedGroup?.groupName} gid={props?.selectedGroup?._id} show={modalShow} onHide={() => setModalShow(false)}/>

                </div>
            ) : null}


        </>
    );
};

export default GroupRightSection;
