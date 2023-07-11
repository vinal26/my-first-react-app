import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../commonComponent/Avatar";
import MyPatientCarePlanList from "./MyPatientCarePlanList";
import { getAge, scrollToTop } from "../../Utils/Helper";
import CarePlanAssignModal from "./CarePlanAssignModal";
import CarePlanGoalModal from "./CarePlanGoalModal";
import CarePlanTaskModal from "./CarePlanTaskModal";
import { myPatientCarePlanListService } from "../../services/ActivePrograms";
import Loader from "../../commonComponent/Loader";
import { getAllCarePlanListService } from "../../services/CreateCarePlanService";

const MyPatientCarePlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [carePlanlist, setCarePLanList] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setLoader] = useState(true);
  const user = location.state;

  useEffect(()=>{
    // scrollToTop()
    getData()
    getCarePlanData()
  },[])

  const getData = async () => {
    try {
      const response = await myPatientCarePlanListService(user._id)
      setLoader(false)
      if (response) {
        setList(response)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  const getCarePlanData = async () => {
    try {
      const response = await getAllCarePlanListService()
      if (response.status === 200) {
        setCarePLanList(response?.data);
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
            <Avatar image={user?.profilePicture} />
          </div>
          <div className="flex-grow-1 px-3">
            <h5 className="my-0 fs-5">{user?.full_name}</h5>
            <span className="mb-0 fs-6">Age: {getAge(user.dob) || ''}</span>
          </div>
          <div>
            <button data-bs-toggle="modal"
                 data-bs-target="#careplanamassignnow" className="btn btn-primary btn-custom">Assign now</button>
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
              {`care plan`}
            </p>
            {renderUserHeader()}
            <div>
              {list.length>0 ? <MyPatientCarePlanList list={list} /> : <Loader visible={isLoading} emptyTextKey={'noCarePlan'} mainClassName="mb-5 pb-5" />}
            </div>
          </div>
        </div>
      </div>
      <CarePlanAssignModal allList={carePlanlist} existedList={list} userId={user._id} onComplete={() => { getData(); getCarePlanData() }} />
      {/* <CarePlanGoalModal />
      <CarePlanTaskModal /> */}
    </>
  );
};

export default MyPatientCarePlan;
