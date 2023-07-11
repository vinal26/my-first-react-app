import CareTaskListOne from "./CareTaskListOne";
import CareTaskListTwo from "./CareTaskListTwo";
import React, { useEffect, useState } from "react";
import Loader from "../../commonComponent/Loader";
import ApiConfig from "../../config/ApiConfig";
import { getCarePlanGoalService, getTaskListService, selectTaskForGoalService } from "../../services/CreateCarePlanService";
import CareTaskList from "./CareTaskList";
import { useSelector } from "react-redux";

const CarePlanTaskTable = () => {
  const goalID = ApiConfig.goalID; // TODO: Remove static goalID
  const _id = goalID;
  const care_plan = useSelector(state => state.carePlan.selectedCarePlan);

  const [taskList, setTaskList] = useState([]);
  const [goalList, setGoalList] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    getTaskList();
    getGoalList();
  }, [care_plan])

  const getTaskList = async () => {
    try {
      const response = await getTaskListService(_id);
      setLoader(false);
      if (response) {
        setTaskList(response.data);
      }
    } catch (error) {
      setLoader(false);
      setTaskList([]);
    }
  }


  const getGoalList = async () => {
    try {
      const response = await getCarePlanGoalService(care_plan?._id);
      console.log('getGoalList', response);
      setLoader(false);
      if (response) {
        setGoalList(response.data);
        setSelectedGoal(response.data?.[0])
      }
    } catch (error) {
      setLoader(false);
      setGoalList([]);
    }
  }

  const changeSelectedGoal = (goal) => {
    setSelectedGoal(goal)
  }

  const selectTaskForGoal = async (task) => {
    try {
      const response = await selectTaskForGoalService(task._id, selectedGoal._id);
      if (response) {
        const result = goalList.map((item) => {
          if (item._id === selectedGoal._id) {
            return response.data
          }
          return item;
        })
        setGoalList(result)
        setSelectedGoal(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      {/* {list.map((item) => <CareTaskList key={`${item._id} `} item={item} deleteGoal={deleteGoal} />)} */}
      <div className="col-md-12">
        <Loader visible={isLoading} emptyTextKey={""} />
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <CareTaskListOne list={goalList} selectedGoal={selectedGoal} changeSelectedGoal={changeSelectedGoal} />
              </div>
              <div className="col-md-6">
                <CareTaskListTwo list={taskList} selectedGoal={selectedGoal} selectTaskForGoal={selectTaskForGoal} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarePlanTaskTable;