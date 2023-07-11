import { parseISO, format } from "date-fns";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { MdPreview } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import { setGroupList } from "../../Reducer/actions/groupAction";
import { getMyGroupList } from "../../services/GroupService";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import GroupRightSection from "./GroupRightSection";


const GroupInfo = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [groupLists, setGroupLists] = useState([]);
    const [filterdata, setFilterData] = useState([]);
    const [isLoading, setLoader] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState("")

    // useEffect(() => {
    //     getGroupLists();
    // }, [])

    const onselectgroup = (groupdetails) => {
        setSelectedGroup(groupdetails);
    };

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
                {/* <button style={{ marginRight: 10 }} onClick={() => navigate('/groupadd')} className="active_assign_now">Create New Group</button> */}
            </p>
            <div>
                <GroupRightSection selectedGroup={state.selectedGroup} />
            </div>
        </div>
    </div>
    </div>
    </>
    );

}

export default GroupInfo;
