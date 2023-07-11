import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import AllButton from "./AllButton";
import MyPatientActiveProgramList from "./MyPatientActiveProgramList";
import Avatar from "../../commonComponent/Avatar";
import ActiveProgramAssignModal from "./ActiveProgramAssignModal";
import { getActiveProgram, getPatientProgramListService, myPatientActiveProgramListService } from "../../services/ActivePrograms";
import Loader from "../../commonComponent/Loader";
import { getAge } from "../../Utils/Helper";

const MyPatientActiveProgram = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const [list, setList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const age = getAge(user.dob) || '';
  useEffect(() => {
    getData()
    getProgramData()
  }, [])

  const getData = async () => {
    try {
      const response = await myPatientActiveProgramListService(user._id)
      setLoader(false)
      if (response) {
        setList(response)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
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
            <Avatar image={user.profilePicture} />
          </div>
          <div className="flex-grow-1 px-3">
            <h5 className="my-0 fs-5">{user.full_name}</h5>
            <span className="mb-0 fs-6">Age: {age}</span>
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
              {list?.length>0 ? <MyPatientActiveProgramList list={list} /> : <Loader visible={isLoading} emptyTextKey={'noActiveProgram'} mainClassName="mb-5 pb-5" />}
            </div>
            {/* <AllButton user={user}/> */}
            <ActiveProgramAssignModal allList={programList} existedList={list} userId={user._id} onComplete={() => { getData(); getProgramData() }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPatientActiveProgram;
