import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateCarePlanTaskService } from "../../services/CreateCarePlanService";
import Navbar from "../header/Navbar";
import Sidebar from "../sidebar/Sidebar";

const CarePlanTaskEdit = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const carePlanTaskDetail = state?.carePlanTaskDetail;
    const [taskDetail, setTaskDetail] = useState({ ...carePlanTaskDetail, assign_by: carePlanTaskDetail.assignBy })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updateTask();
        }
    }

    const validate = () => {
        return (taskDetail.name && taskDetail.sla && taskDetail.frequency && taskDetail.assign_by) || false;
    }

    const updateTask = async () => {
        try {
            const response = await updateCarePlanTaskService(taskDetail._id, taskDetail);
            if (response) {
                navigate(-1)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeTaskDetail = (key, value) => {
        setTaskDetail({ ...taskDetail, [key]: value });
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
                                            </div>

                                            <div className="col-md-12">
                                                <select name={taskDetail.frequency} onChange={(e) => onChangeTaskDetail('frequency', e.target.value)} className="description_inputf">
                                                    <option selected disabled value="">Task Frequency</option>
                                                    <option selected={taskDetail.frequency === 'yearly'} value="yearly">Yearly</option>
                                                    <option selected={taskDetail.frequency === 'monthly'} value="monthly">Monthly</option>
                                                    <option selected={taskDetail.frequency === 'weekly'} value="weekly">Weekly</option>
                                                    <option selected={taskDetail.frequency === 'daily'} value="daily">Daily</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12">
                                                <input
                                                    type="text"
                                                    className="description_inputf"
                                                    placeholder="Task SLA"
                                                    value={taskDetail.sla}
                                                    onChange={(e) => onChangeTaskDetail('sla', e.target.value)}
                                                />
                                            </div>

                                            <div className="col-md-12">
                                                <select ame={taskDetail.assign_by} onChange={(e) => onChangeTaskDetail('assign_by', e.target.value)} className="description_inputf">
                                                    <option selected disabled value="">Assignee</option>
                                                    <option selected={taskDetail.assign_by === 'userordoctorname'} value="userordoctorname">useror doctorname</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12">
                                                <input
                                                    type="text"
                                                    className="description_inputf"
                                                    placeholder="Starts on completion of below Goal(s)"
                                                // value={taskDetail.sla}
                                                // onChange={(e) => onChangeTaskDetail('sla', e.target.value)}
                                                />
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

export default CarePlanTaskEdit;
