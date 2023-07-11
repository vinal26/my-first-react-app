import Button from "../../commonComponent/Button";
import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DateInput from "../../commonComponent/CutomDatePicker";
import { createCarePlanGoalService } from "../../services/CreateCarePlanService";
import { changeDateFormat, changeDateFormatmmddyyyy, isEmpty } from "../../Utils/Helper";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";


let defaultCarePlanGoalDetail = {
  name: '',
  description: '',
  care_plan_id: "",
  start_date: "",
  end_date: "",
  status: ""
}

const CarePlanGoals = () => {
  const navigate = useNavigate();
  const care_plan_id = useSelector(state => state.carePlan?.selectedCarePlan?._id);
  const [goalDetail, setGoalDetail] = useState({ ...defaultCarePlanGoalDetail, care_plan_id });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoader] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      
      createGoal();
    }
  }

  const validate = () => {
    let isValid = true;
    let errors = {}
    for (const property in goalDetail) {
      if (!goalDetail[property] || isEmpty(goalDetail[property])) {
        isValid = false;
        errors = { ...errors, [property]: true }
      }
    }
    setErrors(errors)
    return isValid;
  }

  const createGoal = async () => {
    setLoader(true);
    try {
      const params = {
        ...goalDetail,
        start_date: changeDateFormatmmddyyyy(goalDetail.start_date),
        end_date: changeDateFormatmmddyyyy(goalDetail.end_date)
      }
      const response = await createCarePlanGoalService(params);
      setLoader(false);
      if (response) {
        navigate(-1)
      }
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  }

  const onChangeGoalDetail = (key, value) => {
    let goal = {
      ...goalDetail, 
      [key]: value, 
    }
    setGoalDetail(goal);
    setErrors({...errors, [key]: false})
  }


  const getDate = (date) => {
    try {
      if (date && new Date(date) != 'Invalid Date') {
        return new Date(date)
      }
      // return new Date()
    } catch (error) {

    }
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
            <div className="col-md-10">
              <Sidebar />
            </div>
            <div className="col-md-12">
              <p className="dashboard_title">
                <Link to="" className="link_text">
                  <HiOutlineArrowSmLeft onClick={() => navigate(-1)} className="icon" />
                </Link>
                Care Plans
                <span className="patient_lifestyle2">
                  <GoPrimitiveDot />
                  Goal
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
                          placeholder="Goal Name"
                          value={goalDetail.name}
                          onChange={(e) => onChangeGoalDetail('name', e.target.value)}
                        />
                        {renderError('Please enter name', errors.name)}
                      </div>
                      <div className="col-md-12">
                        <textarea
                          rows="6"
                          type="text"
                          className="description_inputf description_descpf"
                          placeholder="Description"
                          value={goalDetail.description}
                          onChange={(e) => onChangeGoalDetail('description', e.target.value)}
                        />
                        {renderError('Please enter description', errors.description)}
                      </div>
                      {/* <div className="col-md-12">
                        <select name="" className="description_inputf">
                          <option value="">Assigned by</option>
                          <option value="">1</option>
                          <option value="">1</option>
                          <option value="">1</option>
                          <option value="">1</option>
                        </select>
                      </div> */}
                      <div className="col-md-6">
                        <DateInput
                          value={getDate(goalDetail.start_date) || ''}
                          onChangeDate={(date) => {
                            onChangeGoalDetail('start_date', date);
                          }}
                          maxDate={goalDetail.end_date}
                          inputClassName={"description_inputf d-flex align-items-center"} />
                          {renderError('Please select start date', errors.start_date)}
                        {/* <input
                          type="date"
                          className="description_inputf"
                          placeholder="program name"
                          value={goalDetail.start_date}
                          max={goalDetail.end_date}
                          onChange={(e) => onChangeGoalDetail('start_date', e.target.value)}
                        /> */}
                      </div>

                      <div className="col-md-6">
                        <DateInput
                          value={getDate(goalDetail.end_date) || ''}
                          onChangeDate={(date) => onChangeGoalDetail('end_date', date)}
                          minDate={goalDetail.start_date}
                          inputClassName={"description_inputf d-flex align-items-center"} />
                          {renderError('Please select end date', errors.end_date)}
                        {/* <input
                          type="date"
                          className="description_inputf"
                          placeholder="program name"
                          value={goalDetail.end_date}
                          min={goalDetail.start_date}
                          onChange={(e) => onChangeGoalDetail('end_date', e.target.value)}
                        /> */}
                      </div>
                      <div className="col-md-12">
                        <select name={goalDetail.status} onChange={(e) => onChangeGoalDetail('status', e.target.value)} className="description_inputf">
                          <option selected disabled value="active">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        {renderError('Please select status', errors.status)}
                      </div>
                      <div className="col-md-6">
                        <Button isLoading={isLoading} style={isLoading ? { cursor: 'none' } : {}}  disabled={isLoading} className="update_btnsave" text={'save'} >save</Button>
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

export default CarePlanGoals;
