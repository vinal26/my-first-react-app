import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import "./style.css";
import {useLocation, useNavigate } from "react-router-dom";
import DailyJournalheader from "./DailyJournalheader";
import DailyJournalComponent from "./DailyJournalComponent";
import AllButton from "./AllButton";
import ChooseUserMealPlan from "./ChooseUserMealPlan";
import { getDailySleep, 
  getDailyEat, 
  getDailyMove,
  getDailyFeeling,
  getDailyReflect,
  getDailyWaterIntake,
  getUserSymptoms,
  getUserInfoService,
  getMealPlansInfoService,
  getUserMealPlansInfoService
 } from "../../services/PatientService";

const DailyJournal = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let user = location.state;

  let [sleepData , setSleepData] = useState([]);
  let [eatData , setEatData] = useState([]);
  let [moveData , setMoveData] = useState([]);
  let [reflectData , setReflectData] = useState([]);
  let [waterIntakeData , setWaterIntakeData] = useState([]);
  let [feelingData , setFeelingData] = useState([]);
  let [symptomData , setSymptomData] = useState([]);
  let [mealPlanData , setMealPlanData] = useState([]);
  const [dailyJournalDate , setDailyJournalDate] = useState(new Date());
  const [showChooseMealPlanModal, setChooseMealPlanModal] = useState(true);

  useEffect(()=>{
    getDetail(dailyJournalDate);
  },[dailyJournalDate])

  useEffect(()=>{
    getSymptomDetail()
    getMealPlanDetail()
  },[])

  const onChangeJournalDateHandler = (date) => {
    setDailyJournalDate(date)
  }

  const onChangeMealPlan = () => {
    setChooseMealPlanModal(true)
  }

  const onSaveMealPlan = () => {
    getMealPlanDetail()
  }

  const getDetail = (date) =>  {
    getSleepDetail(date)
    getEatDetail(date)
    getMoveDetail(date)
    getFeelingDetail(date)
    getReflectDetail(date)
    getWaterIntakeDetail(date)
  }

  const getSleepDetail = async(date) =>  {
      try {
          const response = await getDailySleep(date , user._id);
          if(response.data.status === 200)
          {
            setSleepData(response.data.data)
          }
      } catch (error) {
          console.log(error);
      }
  }

  const getEatDetail = async(date) =>  {
      try {
          const response = await getDailyEat(date , user._id);
          if(response.data.status === 200)
          {
            setEatData(response.data.data)
          }
      } catch (error) {
          console.log(error);
      }
  }

  const getMoveDetail = async(date) =>  {
    try {
        const response = await getDailyMove(date , user._id);
        if(response.data.status === 200)
        {
          setMoveData(response.data.data)
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getReflectDetail = async(date) =>  {
    try {
        const response = await getDailyReflect(date , user._id);
        if(response.data.status === 200)
        {
          setReflectData(response.data.data)
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getWaterIntakeDetail = async(date) =>  {
    try {
        const response = await getDailyWaterIntake(date , user._id);
        if(response.data.status === 200)
        {
          setWaterIntakeData(response.data.data)
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getFeelingDetail = async(date) =>  {
    try {
        const response = await getDailyFeeling(date , user._id);
        if(response.data.status === 200)
        {
          setFeelingData(response.data.data)
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getSymptomDetail = async() =>  {
    try {
        const response = await getUserSymptoms(user._id);
        if(response.data.status === 200)
        {
          setSymptomData(response.data.data)
        }
    } catch (error) {
        console.log(error);
    }
  }

  const getMealPlanDetail = async() => {
    console.log(user._id);
    try {
        const response = await getUserMealPlansInfoService(user._id);
        if(response.data.status === 200)
        {
          console.log(response.data.data, "MealPlan Info");
          setMealPlanData(response.data.data)
        }
    } catch (error) {
        console.log(error);
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
          <div className="col-md-10 py-4 px-5">
            <p className="dashboard_title">
              <HiOutlineArrowSmLeft
                onClick={() => navigate(-1)}
                className="icon"
              />
              daily journal
            </p>
            <DailyJournalheader user={user} onChange={onChangeJournalDateHandler} date={dailyJournalDate}/>
            <DailyJournalComponent 
                sleepData={sleepData}
                eatData={eatData}
                moveData={moveData}
                reflectData={reflectData}
                waterIntakeData={waterIntakeData}
                feelingData={feelingData}
                symptomData={symptomData}
                mealPlanData={mealPlanData}
                onChangeMealPlan={onChangeMealPlan}
              />

            {/* <AllButton user={user}/> */}
          </div>
        </div>
      </div>

      {showChooseMealPlanModal && <ChooseUserMealPlan userID={user._id} onSaveMealPlan={onSaveMealPlan}/>}
    </>
  );
};

export default DailyJournal;
