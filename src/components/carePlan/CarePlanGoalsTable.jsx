import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../commonComponent/Loader";
import { setSelectedCarePlanID } from "../../Reducer/actions/carePlanAction";
import { changeGoalStatusService, getGoalListService } from "../../services/CreateCarePlanService";
import CareGoalItem from "./CareGoalItem";

const CarePlanGoalsTable = ({ changeSelectedGoal }) => {
  const care_plan = useSelector(state => state.carePlan.selectedCarePlan);
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [isLoading, setLoader] = useState(true);

  useEffect(() => {
    getGoalList();
  }, [care_plan?._id])

  const getGoalList = async () => {
    try {
      const response = await getGoalListService(care_plan?._id);
      setLoader(false);
      if (response) {
        setList(response.data);
      }
    } catch (error) {
      setLoader(false);
      setList([]);
    }
  }

  // const deleteGoal = async (_id) => {
  //   try {
  //     const response = await deleteGoalService(_id);
  //     if (response) {
  //       const result = list.filter((item) => item._id !== _id);
  //       setList(result);
  //     }
  //   } catch (error) {
  //     setList([]);
  //     console.log(error)
  //   }
  // }

  const changeStatus = async (goal_id) => {
    try {
      const response = await changeGoalStatusService(goal_id, care_plan?._id);
      if (response) {
        dispatch(setSelectedCarePlanID(response.data))
        changeSelectedGoal(response.data);
      }
    } catch (error) {
      setList([]);
    }
  }

  return (
    <>
      <div className="col-md-12">
        <Loader visible={isLoading} emptyTextKey={list?.length === 0 && 'carePlanGoal'} />
        <div className="row">
          <div className="col-md-12">
            {/* {list.map((item) => <CareGoalItem goals={care_plan?.goals || []} item={item} deleteGoal={deleteGoal} changeStatus={changeStatus} />)} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarePlanGoalsTable;
