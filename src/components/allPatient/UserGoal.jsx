import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import AllButton from "./AllButton";
import Avatar from "../../commonComponent/Avatar";
import UserGoalComponent, { UserGoalAnswerComponent } from "./UserGoalComponent";
import { getUserSetGoalData } from "../../services/PatientService";
import { setUserGoalQuestion } from '../../Utils/AllConstant';
import { scrollToTop } from "../../Utils/Helper";

const UserGoal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const [goalQuestions, setGoalsQuestion] = useState([]);
  const [goal, setGoals] = useState([]);

  // getUserSetGoalData
  const getGoalData = async () =>{
    let resp = await getUserSetGoalData(user._id);
    if(resp.data.length > 0){
      let goalQue = resp.data[0].goalQuestionResponse.map((item,index)=>{
        return {
          question: setUserGoalQuestion[index],
          answer: item
        }
      })
      setGoals(resp.data[0]?.goals)
      setGoalsQuestion(resp.data[0].goalQuestionResponse || [])
    }
    
  }

  useEffect(()=>{
    if(user){
      scrollToTop()
      getGoalData()
    } 
  },[user])

  const renderUserHeader = () => {
    return (
      <div className="daily_journal">
        <div className="row">
          <div className="col-md-1 mchat_wid1 text-center">
            <Avatar image={user?.profilePicture} />
          </div>
          <div className="col-md-11 mchat_wid2 d-flex align-items-center">
            <h5 className="usergoalh5">
              {user?.full_name||"User"} 
            </h5>
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
          <div className="col-md-10">
            <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              Health Plan
            </p>
            {renderUserHeader()}
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="usergoal_div">
                  <UserGoalComponent goal={goal} />
                  <UserGoalAnswerComponent goalQuestions={goalQuestions}/>
                </div>
              </div>
            </div>

            <div className="mt_patient_top9">
              <AllButton user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGoal;
