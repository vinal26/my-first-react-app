import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getActiveProgram } from "../../services/ActivePrograms";
import Loader from "../../commonComponent/Loader";
import { getAge } from "../../Utils/Helper";
import MyPatientActiveProgramList from "../allPatient/MyPatientActiveProgramList";
import GroupAssignModal from "./GroupAssignModal";
import { getGroupbyId } from "../../services/GroupService";
import SquareAvatar from "../../commonComponent/SquareAvatar";

const GroupAllProgram = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const group = location.state;
  const [list, setList] = useState([]);
//   console.log(list, 'programs');
  const [programList, setProgramList] = useState([]);
  const [isLoading, setLoader] = useState(true);

//   const age = getAge(group.dob) || '';
  useEffect(() => {
    getProgramData()
    getData()
  }, [])

  const getData = async () => {
    try {
        const response = await getGroupbyId(group.selectedgroup._id);
        if (response.status === 200) {
          setList(response?.data?.data[0].programId)
        }
      } catch (error) {
        // setLoader(false);
        console.log(error);
      }
  }

  const getProgramData = async () => {
    try {
      const response = await getActiveProgram()
      if (response.status === 200) {
        setProgramList(response?.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }



  const renderUserHeader = () => {
    return (
      <div className="daily_journal px-3 card rounded shadow-sm mb-4">
        <div className="d-sm-flex align-items-center">
          <div>
            <SquareAvatar className="rounded" image={group.selectedgroup?.groupImage} />
          </div>
          <div className="flex-grow-1 px-3">
            <h5 className="my-0 fs-5">{group.selectedgroup.groupName}</h5>
            <span className="mb-0 fs-6">{group.selectedgroup.description}</span>
          </div>
          <div>
            {programList.length && <button data-bs-toggle="modal"
                data-bs-target="#activeprogramassignnow" className="btn btn-primary btn-custom">Assign now</button> || null}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 py-4 px-5">
            <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              {`Active Programs`}
            </p>
            {renderUserHeader()}
            <div>
              {list?.length>0 ? <MyPatientActiveProgramList list={programList.filter(dt => list.includes(dt._id))} /> : <Loader visible={isLoading} emptyTextKey={'noActiveProgram'} mainClassName="mb-5 pb-5" />}
            </div>
            {/* <AllButton group={group}/> */}
            <GroupAssignModal allList={programList} existedList={programList.filter(dt => list.includes(dt._id))} groupId={group.selectedgroup._id} onComplete={() => { getData(); getProgramData() }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupAllProgram;