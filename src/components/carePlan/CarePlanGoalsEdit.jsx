import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateCarePlanGoalService } from "../../services/CreateCarePlanService";
import { changeDateFormatmmddyyyy, isEmpty } from "../../Utils/Helper";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";
import DateInput from "../../commonComponent/CutomDatePicker";

const CarePlanGoalsEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const care_plan_id = useSelector(state => state.carePlan?.selectedCarePlan?._id);
  const [goalDetail, setGoalDetail] = useState({ ...state?.careGoalDetail, care_plan_id });
  const [errors, setErrors] = useState({name: false, description: false, start_date: false, end_date: false, status: false});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateGoal();
    }
  }

  const validate = () => {
    let isValid = true;
    let errorsResult = errors;
    for (const property in errors) {
      if (!goalDetail[property] || isEmpty(goalDetail[property])) {
        isValid = false;
        errorsResult = { ...errorsResult, [property]: true }
      }
    }
    setErrors(errorsResult)
    return isValid;
  }

  const updateGoal = async () => {
    try {
      const params = {
        ...goalDetail,
        start_date: changeDateFormatmmddyyyy(goalDetail.start_date),
        end_date: changeDateFormatmmddyyyy(goalDetail.end_date)
      }
      const response = await updateCarePlanGoalService(params._id, params);
      if (response) {
        navigate(-1)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeGoalDetail = (key, value) => {
    let goal = {
      ...goalDetail, 
      [key]: value, 
    }
    // if(key === 'start_date' && goalDetail.start_date) {
    //   goal.end_date = ''
    // }
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
                          maxDate={getDate(goalDetail.end_date)}
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
                          minDate={getDate(goalDetail.start_date)}
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
                          <option disabled value="selectstatus">Select Status</option>
                          <option selected={goalDetail.status === 'active'} value="active">Active</option>
                          <option selected={goalDetail.status === 'inactive'} value="inactive">Inactive</option>
                        </select>
                        {renderError('Please select status', errors.status)}
                      </div>
                      <div className="col-md-6">
                        <button className="update_btnsave">save</button>
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

export default CarePlanGoalsEdit;
