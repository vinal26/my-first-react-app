import react, { useEffect, useState } from 'react';
import Select from "react-select";
import { changeUserLifestyleTemplate, getTemplateListService } from '../../services/LifestyleService';
import { getMealPlansListService, changeUserMealPlanService } from '../../services/PatientService';
import { toastMsg } from '../../Utils/AllConstant';
import { showToastSuccess } from '../../Utils/Helper';

const ChooseUserMealPlan= ({ userID, onSaveMealPlan }) => {
  const [list, setList] = useState([]);
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  useEffect(() => {
    getMealPlanList()
  }, [])

  const getMealPlanList = async () => {
    try {
      const response = await getMealPlansListService()
      if (response.data.data) {
        setList(response.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getList = () => {
     let result = list?.map((dt) => ({
       value: dt?._id,
       label: dt?.mealPlanName,
     }));
     return result;
  }

  const onChangeSelected = (data) => {
    const selectedItem = list.find((item) => item._id === data.value)
    setSelectedMealPlan(selectedItem);
  }

  const getSelectedMealPlan = () => {
    return selectedMealPlan ? { label: selectedMealPlan.mealPlanName, value: selectedMealPlan._id } : ''
  }

  const onSave = async () => {
    try {
      if (selectedMealPlan) {
        const params = {
          "mealPlanId": selectedMealPlan._id,
          "userId": {"userId":[userID]}
        }
        console.log(params);
        const response = await changeUserMealPlanService(params)
        if (response) {
           showToastSuccess(toastMsg.changeMealPlanTemplate)
           onSaveMealPlan()
           setSelectedMealPlan('');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="modal fade"
      id="chooseMealPlan"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    ><div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 text-center">
            <h5 className="modal-title w-100" id="staticBackdropLabel">
              Choose Meal Plan
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setSelectedMealPlan('')}
            ></button>
          </div>
          <div className="modal-body">
            <Select
              className=""
              placeholder={"Please select Meal Plan"}
              onChange={onChangeSelected}
              options={getList()}
              value={getSelectedMealPlan()}
            />
          </div>
          <div>
            <center>
              <button
                type="button"
                className="cancel_delete_blog"
                data-bs-dismiss="modal"
                onClick={() => setSelectedMealPlan('')}
              >
                Cancel
              </button>
              <button
                data-bs-dismiss="modal"
                onClick={onSave}
                disabled={!selectedMealPlan}
                type="button"
                className={selectedMealPlan ? "delete_blog" : 'cancel_delete_blog'}
              >
                Save
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  )

}
export default ChooseUserMealPlan;