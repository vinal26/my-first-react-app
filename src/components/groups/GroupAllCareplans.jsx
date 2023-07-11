import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../commonComponent/Loader";
import { getGroupbyId } from "../../services/GroupService";
import SquareAvatar from "../../commonComponent/SquareAvatar";
import MyPatientCarePlanList from "../allPatient/MyPatientCarePlanList";
import { getAllCarePlanListService } from "../../services/CreateCarePlanService";
import GroupAssignCareModal from "./GroupAssignCareModal";

const GroupAllCareplans = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const group = location.state;
  const [list, setList] = useState([]);
//   console.log(list, 'programs');
  const [careList, setCareList] = useState([]);
  const [isLoading, setLoader] = useState(true);

//   const age = getAge(group.dob) || '';
  useEffect(() => {
    getCarePlanData()
    getData()
  }, [])

  const getData = async () => {
    try {
        const response = await getGroupbyId(group.selectedgroup._id);
        if (response.status === 200) {
          setList(response?.data?.data[0].careplanId)
        }
      } catch (error) {
        // setLoader(false);
        console.log(error);
      }
  }

  const getCarePlanData = async () => {
    try {
      const response = await getAllCarePlanListService()
      if (response.status === 200) {
        setCareList(response?.data);
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
            {careList.length && <button data-bs-toggle="modal"
                data-bs-target="#careplanamassignnow" className="btn btn-primary btn-custom">Assign now</button> || null}
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
                {list.length>0 ? <MyPatientCarePlanList list={careList.filter(dt => list.includes(dt._id))} /> : <Loader visible={isLoading} emptyTextKey={'noCarePlan'} mainClassName="mb-5 pb-5" />}
                </div>
            </div>
            </div>
        </div>
        <GroupAssignCareModal allList={careList} existedList={careList.filter(dt => list.includes(dt._id))} userId={group.selectedgroup._id} onComplete={() => { getData(); getCarePlanData() }} />
    </>
  );
};

export default GroupAllCareplans;