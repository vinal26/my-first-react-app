import React, { useState, useRef } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useNavigate } from "react-router-dom";
import GroupLists from "./GroupLists";
import GroupRightSection from "./GroupRightSection";
import { useEffect } from "react";

const Groups = () => {

  const [getList, setgetList] = useState(false);
  const [getMyList, setgetMyList] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("")
  const [grpSearch, setGrpSearch] = useState("")
  const navigate = useNavigate();

  const childRef = useRef();

  // let onSearch = (e) => {
  //   if (e.target.value) {
  //     setGrpSearch(e.target.value)
  //   } else {
  //     setGrpSearch("")
  //   }
  // }
  const onselectgroup = (groupdetails) => {
    setSelectedGroup(groupdetails);
  };

  const onStatusChange = (status) => {
    setSelectedGroup({ ...selectedGroup, status: status });
    setgetList(!getList);
    setgetMyList(!getMyList);
  }

  // const onRefresh = () => {
  //   childRef.current.getGroupLists()
  // }

  // useEffect(() => {
  //   onRefresh()
  // }, [])
  
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
              groups
              <button style={{ marginRight: 10 }} onClick={() => navigate('/groupadd')} className="active_assign_now">Create New Group</button>
            </p> */}
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item cursor-pointer" onClick={() => navigate(-1)}>Dashboard</li>
                <li class="breadcrumb-item active fw-bold" aria-current="page">Groups</li>
              </ol>
            </nav>
            <div>
                <GroupLists
                  // ref={childRef}
                  onselectgroup={onselectgroup}
                  selectedGroup={selectedGroup}
                  getList={getList}
                />
                {/* <GroupLists grpSearch={onSearch} setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groups;
