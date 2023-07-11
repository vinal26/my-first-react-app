import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ApiConfig from "../../config/ApiConfig";
import { createCarePlanTaskService } from "../../services/CreateCarePlanService";
import { isEmpty } from "../../Utils/Helper";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Button from "../../commonComponent/Button";

const defaultAssignBy = ['Physician', 'Nutritionist', 'Care coordinator', 'Health Coach', 'Behavior Specialist', 'Group moderator', 'Patient'];

let defaultCarePlanTaskDetail = {
  name: "",
  care_plan_id: "",
  care_plan_goal_id: "",
  sla: "",
  frequency: "",
  assign_by: "",
  start_goal: "",
}

const CarePlanTask = () => {
  const navigate = useNavigate();
  const care_plan_id = useSelector(state => state.carePlan.selectedCarePlan?._id);

  const [taskDetail, setTaskDetail] = useState({ ...defaultCarePlanTaskDetail, care_plan_id, care_plan_goal_id: ApiConfig.goalID })
  const [errors, setErrors] = useState({});
  const [isLoading, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createTask();
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {}
    for (const property in taskDetail) {
      if (!taskDetail[property] || isEmpty(taskDetail[property])) {
        isValid = false;
        errors = { ...errors, [property]: true }
      }
    }
    setErrors(errors)
    return isValid;
  }


  const createTask = async () => {
    setLoader(true);
    try {
      const response = await createCarePlanTaskService({ ...taskDetail, sla: `${taskDetail.sla} hours` });
      setLoader(false);
      if (response) {
        navigate(-1)
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }

  const onChangeTaskDetail = (key, value) => {
    setTaskDetail({ ...taskDetail, [key]: value });
    setErrors({ ...errors, [key]: false })
  }

  const renderError = (msg, value) => {
    return (
      value ? (
        <h6 className="blog_error_text4" style={{ marginTop: -15, marginBottom: 15 }}>
          {msg}
        </h6>) : null)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <p className="dashboard_title">
                <Link to="" className="link_text">
                  <HiOutlineArrowSmLeft onClick={() => navigate(-1)} className="icon" />
                </Link>
                Care Plans
                <span className="patient_lifestyle2">
                  <GoPrimitiveDot />
                  task
                </span>
              </p>
              <div class="container">
                <div class="row justify-content-start">
                  <div className="col-md-12">
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="description_inputf"
                          placeholder="Task Name"
                          value={taskDetail.name}
                          onChange={(e) => onChangeTaskDetail('name', e.target.value)}
                        />
                        {renderError('Please enter name', errors.name)}
                      </div>

                      <div className="col-md-12">
                        <select name={taskDetail.frequency} onChange={(e) => onChangeTaskDetail('frequency', e.target.value)} className="description_inputf">
                          <option selected disabled value="">Task Frequency</option>
                          <option value="yearly">Yearly</option>
                          <option value="monthly">Monthly</option>
                          <option value="weekly">Weekly</option>
                          <option value="daily">Daily</option>
                        </select>
                        {renderError('Please select frequency', errors.frequency)}
                      </div>
                      <div className="col-md-12">
                        <input
                          type="number"
                          className="description_inputf"
                          placeholder="Task SLA"
                          value={taskDetail.sla}
                          onChange={(e) => onChangeTaskDetail('sla', e.target.value)}
                        />
                        {renderError('Please enter SLA', errors.sla)}
                      </div>

                      <div className="col-md-12">
                        <select ame={taskDetail.assign_by} onChange={(e) => onChangeTaskDetail('assign_by', e.target.value)} className="description_inputf">
                          <option selected disabled value="">Assignee</option>
                          {defaultAssignBy.map((item) => <option value={item}>{item}</option>)}
                        </select>
                        {renderError('Please select Assignee', errors.assign_by)}
                      </div>
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="description_inputf"
                          placeholder="Starts on completion of below Goal(s)"
                          value={taskDetail.start_goal}
                          onChange={(e) => onChangeTaskDetail('start_goal', e.target.value)}
                        />
                        {renderError('Please select starts on completion of below goal', errors.start_goal)}
                      </div>
                      <div className="col-md-6">
                        {/* <button className="update_btnsave">save</button> */}
                        <Button isLoading={isLoading} 
                        style={isLoading ? { cursor: 'none' } : {}}  
                        disabled={isLoading} className="update_btnsave" 
                        text={'save'} >save</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CarePlanTask;
